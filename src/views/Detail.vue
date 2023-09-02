<template>
  <div class="detail">

    <!-- <van-nav-bar left-text="返回" left-arrow @click-left="goBacck" /> -->
    <div class="goBack" @click="goBacck">
      <van-icon name="arrow-left" />
      <span>返回</span>
    </div>

    <div class="manga-info">

      <div class="back-img">
        <img :src="cInfo.horizontal_cover" alt="">
      </div>


      <div class="cover">

        <div class="title">{{ cInfo.title }}</div>

        <div class="intro">

          <div class="cover-img">
            <img :src="cInfo.vertical_cover" alt="">
          </div>

          <ul>
            <li class="van-ellipsis">作者
              <span>{{ author }}</span>
            </li>
            <li>状态
              <span>{{ cInfo.is_finish === 0 ? '连载中' : '已完结' }}</span>
            </li>
            <li>最后更新
              <span>{{ lastTime }}</span>
            </li>
            <li>热度
              <span>{{ likeCount }}</span>
            </li>
          </ul>

        </div>
      </div>
      <div class="btn">
        <van-row type="flex" justify="space-around">
          <van-col span="6">
            <van-button icon="plus" type="primary" size="small" color="#e8ae5a" @click="collect">{{ isCollect ? '取消收藏'
              : '加入书架' }}</van-button>
          </van-col>
          <van-col span="5">
            <van-button icon="plus" type="primary" size="small" color="#f80f13">评论</van-button>
          </van-col>
          <van-col span="10">
            <van-button type="primary" size="small" color="#218fda" @click="viewManga">{{ viewChapter ?
              `继续阅读:第${viewChapter}话` : '开始阅读' }}</van-button>
          </van-col>
        </van-row>

      </div>
    </div>

    <div class="tag">
      <span v-for="(item, index) in cInfo.tags" :key="index">{{ item.name }}</span>
    </div>

    <div class="brief-intro">

      <van-tabs v-model="active" background="#f6f7fb" color="#ec97b6">

        <van-tab title="简介">

          <div class="main-info">
            <van-row type="flex" justify="space-around">
              <van-col span="8">
                <div class="now-info">
                  <strong>{{ cInfo.is_finish === 0 ? '连载中' : '已完结' }}</strong>
                  <span>状态</span>
                </div>
              </van-col>
              <van-col span="8">
                <div class="now-info">
                  <strong>{{ likeCount }}</strong>
                  <span>热度</span>
                </div>
              </van-col>
              <van-col span="8">
                <div class="now-info">
                  <strong>第{{ cInfo.last_ord }}话</strong>
                  <span>更新</span>
                  <span class="update-time">
                    ({{ lastTime }})
                  </span>
                </div>
              </van-col>
            </van-row>
          </div>


          <div class="intro-content">

            <span>内容简介</span>
            <div class="content">
              {{ evaluate }}
            </div>

          </div>

          <div class="suggest">

            <div class="su-title">
              <span>更多推荐</span>
              <span @click="updateRecommend"><van-icon name="replay" />换一换</span>
            </div>

            <van-row type="flex" justify="space-around">
              <van-col span="7" v-for="(item, index) in recommend[recommendIndex]" :key="index">
                <manga-model :title="item.title" :introduce="`更新至${item.last_ord}话`" :src="item.vertical_cover"
                  @click="viewDetail(item.id)">

                </manga-model>
              </van-col>

            </van-row>
          </div>



        </van-tab>


        <van-tab title="章节">
          <div class="chapters">
            <div class="content">
              <span v-for="(item, index) in mangaList" :key="index" @click="geiIdView(item.id, item.ord, item.title)"
                :class="{ readed: index < viewChapter }">第{{
                  item.ord }}话</span>
            </div>

          </div>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>

<script>
import mangaModel from '../components/MangaModel';
import {
  GetComicDetail,
  GetComicMoreRecommend,
  checkToken
} from '../api/api.js';

export default {
  name: 'Detail',

  components: {
    mangaModel
  },

  data() {
    return {
      active: 0,

      cid: '',

      cInfo: {},

      collection: {},
      history: {},

      author: '',

      lastTime: '',

      likeCount: 0,

      evaluate: '',

      recommend: [],

      recommendIndex: 0,

      mangaList: [],

      listId: [],

      isCollect: 0,

      viewChapter: 0,

    }
  },

  created() {

    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0, // 持续展示 toast
    });


    this.cid = this.$route.params.cid;

    //查看是否已收藏
    let collection = this.$store.state.collection;
    //查看是否有历史记录
    let viewHistory = this.$store.state.viewHistory;

    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id == this.cid) {
        this.isCollect = 1;
        break;
      }
    }

    for (let i = 0; i < viewHistory.length; i++) {
      if (viewHistory[i].id == this.cid) {
        this.viewChapter = viewHistory[i].ord;
        break;
      }
    }

    //获取漫画详情
    GetComicDetail(this.cid).then(res => {

      this.cInfo = res.data.data;

      this.author = this.cInfo.author_name.join(' ');

      this.lastTime = this.cInfo.ep_list[0].pub_time.substr(0, 10);

      this.evaluate = this.cInfo.evaluate.replace(/\【.*?\】/g, "");;

      this.mangaList = this.cInfo.ep_list.reverse().map((item) => {

        return {
          id: item.id,
          ord: item.ord,
          title: item.title,
          like_count: item.like_count,
        }
      });

      localStorage.setItem('mangaList', JSON.stringify(this.mangaList));

      // this.$store.commit('getMangaList', this.mangaList);


      //本地存储信息
      const { id, title, vertical_cover, styles, is_finish } = this.cInfo;

      this.collection = { id, title, vertical_cover, styles, is_finish };

      this.collection.author = this.author;
      this.collection.styles = this.collection.styles.join(' ');

      // console.log(this.collection);


    }).catch(err => {
      console.log('err ==> ', err);
    }).then(() => {

      //对漫画热度进行格式化
      for (let i = 0; i < this.mangaList.length; i++) {
        const element = this.mangaList[i];
        this.likeCount += element.like_count;
      }

      if (this.likeCount < 10000) {
        this.likeCount.toString();
      } else {
        const num = (this.likeCount / 10000).toFixed(1);
        this.likeCount = num + 'w';
      }
    }).then(() => {
      //获取漫画推荐
      GetComicMoreRecommend(this.cid).then(res => {
        let arr = res.data.data.recommend_comics;
        let remain = arr.length % 6;

        //分割为数组以切换内容
        for (let i = 0; i < arr.length; i += 6) {
          if (remain !== 0) {
            if (i === arr.length - remain) {
              this.recommend.push(arr.slice(i, i + remain).concat(arr.slice(0, 6 - remain)));
              break;
            }
            this.recommend.push(arr.slice(i, i + 6));
          } else {
            this.recommend.push(arr.slice(i, i + 6));
          }
        }

      }).catch(err => {
        console.log('err ==> ', err);
      })

    }).then(() => {
      // 手动清除 Toast
      this.$toast.clear();
    })


  },

  beforeRouteUpdate(to, from, next) {
    console.log(to.params.cid);
    //如果目标路由存在cid,说明是详情页面,进行刷新
    if (to.params.cid) {
      location.reload();
    }

    next();
  },

  methods: {
    goBacck() {
      this.$router.back();
    },

    //更新漫画推荐
    updateRecommend() {
      let j = this.recommendIndex + 1;

      if (j > 3) {
        this.recommendIndex = 0;
      } else {
        this.recommendIndex = j;
      }

    },

    //跳转到新页面
    viewDetail(cid) {
      console.log(cid);
      this.$router.push({ name: 'Detail', params: { cid } });
      location.reload();
    },

    //观看漫画
    viewManga() {
      // console.log(id);
      // console.log(this.cInfo.ep_list);
      this.viewChapter - 1 < 0 ? this.viewChapter = 0 : this.viewChapter;

      let id = this.mangaList[this.viewChapter - 1].id;

      this.history = this.collection;

      this.history.ord = this.mangaList[this.viewChapter].ord;

      this.$store.commit('addViewHistory', this.history);

      setTimeout(() => {
        this.$router.push({ name: 'ViewManga', params: { id } });
      }, 300)
    },

    //获取id观看漫画
    geiIdView(id, ord, title) {

      console.log(id, ord, title);

      this.history = this.collection;

      this.history.ord = ord;

      this.$store.commit('addViewHistory', this.history);

      setTimeout(() => {
        this.$router.push({ name: 'ViewManga', params: { id, ord, title } });
      }, 300)

    },

    //收藏漫画
    collect() {

      const token = localStorage.getItem('token');

      if (!token) {
        this.$toast('请先登录');
        return;
      }

      checkToken(token).then(res => {

        if (res.data.errno === 0) {


          if (this.isCollect) {

            this.isCollect = 0;
            this.$toast('取消收藏');

            this.$store.commit('removeCollection', this.cid);

          } else {
            this.isCollect = 1;
            this.$toast('已收藏');

            // const { id, title, vertical_cover } = this.cInfo;
            // let mangaInfo = { id, title, vertical_cover };

            this.$store.commit('addCollection', this.collection);


          }

        }
      }).catch(err => {
        console.log('err ==> ', err);
      });
    }

  }

}
</script>

<style lang="less" scoped>
.detail {
  .goBack {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #ec97b6;
    font-size: 14px;
    z-index: 99;
  }

  .manga-info {
    color: #fff;
    position: relative;

    .back-img {
      width: 100%;
      filter: brightness(40%);
      z-index: -1;

      img {
        width: 100%;
      }
    }

    .cover {
      position: absolute;
      left: 50%;
      top: 5%;
      transform: translateX(-50%);
      width: 80%;
      margin: 0 auto;
      padding-top: 10px;
      text-align: center;

      .title {
        font-size: 18px;
        margin: 0 0 10px;
      }

      .intro {
        display: flex;
        transform: translateX(10%);

        .cover-img {
          width: 30%;

          img {
            width: 100%;
          }
        }

        ul {
          width: 60%;
          margin-left: 20px;
          font-size: 14px;

          li {
            margin-bottom: 10px;
            text-align: left;
          }
        }
      }
    }

    .btn {
      padding: 10px 0;
      background-color: #f6f7fb;


      button {
        width: 100%;
        border-radius: 5px;
      }
    }
  }

  .tag {
    width: 100%;
    margin: 10px 0;
    background-color: #f6f7fb;
    color: #97949e;
    padding: 5px 0;

    span {
      padding: 0 10px;
      display: inline-block;
      height: 20px;

      line-height: 20px;
      text-align: center;

      margin: 5px 0 5px 5px;
      border: 2px solid #97949e;
      border-radius: 10px;
    }
  }

  .brief-intro {

    .main-info {
      border: 3px solid #edeef0;
      border-left: none;
      border-right: none;
      background-color: #f6f7fb;

      .now-info {
        display: flex;
        flex-direction: column;
        padding: 10px 0 20px;
        text-align: center;


        strong {
          font-size: 14px;
          margin-bottom: 6px;
        }

        span {
          color: #97949e;
        }

        span.update-time {
          margin-top: 5px;
          font-size: 4px;
        }
      }
    }


    .intro-content {
      padding: 10px 14px;
      background-color: #f6f7fb;

      span {
        display: inline-block;
        margin: 4px 0;
        font-size: 10px;
        color: #97949e;
      }

      .content {
        line-height: 18px;
      }
    }

    .suggest {
      margin-top: 10px;
      background-color: #f6f7fb;

      .su-title {
        display: flex;
        justify-content: space-between;
        padding: 8px 14px;
        line-height: 14px;

        span {
          font-size: 14px;
        }

        a {
          color: #97949e;
        }
      }
    }

    .chapters {
      justify-content: space-between;
      width: 100%;
      background-color: #f6f7fb;

      .content {
        width: 94%;
        margin: 0 auto;
        // padding: 0 3%;

        &::after {
          /* content属性不能省略 */
          content: "";
          /* 清除左右浮动 */
          clear: both;
          /* 转成块级元素 */
          display: block;

        }

        .readed {
          background-color: #fee3ec;
          border: 2px solid #ec97b6;
        }

        span {
          float: left;
          width: 22%;
          height: 30px;
          line-height: 30px;
          text-align: center;

          margin-right: 2.5%;
          margin-top: 10px;

          border: 2px solid #97949e;
          border-radius: 5px;

          &:nth-child(4n) {
            margin-right: 0;
          }
        }
      }




    }
  }


}</style>