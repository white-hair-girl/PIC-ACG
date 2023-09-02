<template>
  <div>
    <div class="comic-container">

      <div class="img-content" @click="showChange">
        <div class="normal-mode" v-if="readMode === 0">

          <van-swipe :loop="false" class="comic-swipe" @change="swipeChange" ref="swipe">
            <van-swipe-item v-for="(item, index) in imgUrl" :key="index">

              <img :src="item" alt="Comic Page" lazy-load>

            </van-swipe-item>

            <template #indicator>
              <div class="custom-indicator">{{ current }}/{{ imgUrl.length }}</div>
            </template>

          </van-swipe>

        </div>

        <div class="scroll-mode" v-if="readMode === 1">
          <van-image v-for="(item, index) in imgUrl" :key="index" :src="item" ref="img">
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
        </div>

      </div>

      <van-popup v-model="show" position="bottom" :overlay="false" :round="true">

        <div class="content" v-show="!showSet">
          <div class="control">
            <span @click="previousChapter">上一话</span>
            <van-slider v-model="sliderValue" bar-height="4px" active-color="#ec97b6" @touchmove.stop
              @change="sliderChange" :min="1" :max="imgUrl.length">

              <template #button>
                <div class="custom-button">{{ sliderValue }}</div>
              </template>
            </van-slider>
            <span @click="nextChapter">下一话</span>
          </div>

          <div class="set">
            <div class="icons">
              <van-icon name="setting-o" size="30" @click="intoSet" />
              <span>设置</span>
            </div>
            <div class="icons">
              <van-icon name="chat-o" size="30" />
              <span>评论</span>
            </div>
            <div class="icons">
              <van-icon name="label-o" size="30" />
              <span>目录</span>
            </div>

          </div>

        </div>

        <div class="setContent" v-show="showSet">

          <div class="readMode">
            <span>阅读模式</span>

            <div v-for="(item, index) in readModeInfo" :key="index" :class="[item[0], { active: index === readMode }]"
              @click="readModeChoose(index)">
              <van-icon name="down" size="20" />
              <span>{{ item[1] }}</span>
            </div>
          </div>

        </div>

      </van-popup>

      <div class="navbar" ref="navbar">

        <div class="left">
          <div class="leave" @click="goBacck">
            <van-icon name="arrow-left" />
          </div>
          <div class="title">第{{ chapterInfo.ord }}话 &nbsp;&nbsp;{{ chapterInfo.title.replace(/^第\w*话/, '') }}</div>
        </div>

        <div class="right">

          <van-icon name="ellipsis" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetImageIndex,
  GetImageToken
} from '../api/api'

import { Toast } from 'vant';

export default {
  name: 'viewManga',

  data() {

    return {
      chapterInfo: {
        id: '',
        ord: 0,
        title: '',
      },
      allImg: [],
      imgUrl: [],
      current: 0,
      show: false,
      sliderValue: 1,

      showSet: false,

      readMode: 0,

      readModeInfo: [
        ['normal', '普通模式'],
        ['scroll', '滚动模式'],
        ['rightStart', '日漫模式'],
      ],
    }
  },

  created() {

    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0, // 持续展示 toast
    });

    const mangaList = JSON.parse(localStorage.getItem('mangaList'));

    let id = this.$route.params.id;

    for (let i = 0; i < mangaList.length; i++) {
      const element = mangaList[i];

      if (element.id == id) {

        this.chapterInfo = element;

        break;
      }

    }

    GetImageIndex(id).then(res => {

      this.allImg = res.data.data.images;

    }).catch(err => {
      console.log('err ==> ', err);
    }).then(() => {

      this.allImg.forEach((item) => {
        // item.path = 'https://manga.hdslb.com' + item.path + '@660w.webp';

        GetImageToken(item.path).then(res => {

          let url = res.data.data[0];

          this.imgUrl.push(url.url + '?token=' + url.token);

        })

      });

    }).then(() => {
      // 手动清除 Toast
      this.$toast.clear();
    })


  },

  methods: {
    //滑动漫画更改数字
    swipeChange(index) {
      this.current = index + 1;
      this.sliderValue = index + 1;
    },

    //滑动滑块切换页数
    sliderChange(sliderValue) {
      Toast('当前页数：' + sliderValue);
      // 注意：组件挂载后才能访问到 ref 对象
      if (this.readMode === 0) {
        this.$refs.swipe.swipeTo(sliderValue - 1);
      } else if (this.readMode === 1) {
        window.scrollTo({
          top: (sliderValue - 1) * 560,
          behavior: "smooth"
        });
      } else {

      }

    },

    //设置显示控制
    showChange() {
      this.show = !this.show;

      if (this.show) {
        this.$refs.navbar.style.visibility = 'visible';
      } else {
        this.$refs.navbar.style.visibility = 'hidden';
      }

      setTimeout(() => {
        this.showSet = false;
      }, 500);

    },

    intoSet() {
      this.showSet = true;
    },

    //更换阅读模式
    readModeChoose(i) {

      if (this.readMode === i) {
        return;
      }

      this.readMode = i;

      if (this.readMode === 0) {

      }
    },

    goBacck() {
      this.$router.go(-1);
    },

    nextChapter() {
      const mangaList = JSON.parse(localStorage.getItem('mangaList'));

      for (let i = 0; i < mangaList.length; i++) {

        let id = this.chapterInfo.id;

        if (mangaList[i].id == id) {

          const { id, ord, title } = mangaList[i + 1];

          setTimeout(() => {
            this.$router.replace({ name: 'ViewManga', params: { id, ord, title } });

            location.reload();
          }, 300)

          return;
        }

      }
    },

    previousChapter() {
      const mangaList = JSON.parse(localStorage.getItem('mangaList'));

      for (let i = 0; i < mangaList.length; i++) {

        let id = this.chapterInfo.id;

        if (mangaList[i].id == id) {

          const { id, ord, title } = mangaList[i - 1];

          setTimeout(() => {
            this.$router.replace({ name: 'ViewManga', params: { id, ord, title } });

            location.reload();
          }, 300)

          return;
        }

      }
    }

  },

}
</script>

<style lang="less" scoped>
.comic-container {
  color: #fff;
  background-color: #000;
}

.img-content {
  .normal-mode {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    min-height: 100vh;
    /* 使 container 高度至少与视口一样高，以确保内容居中 */
    margin: 0;
    /* 清除默认的 body 外边距 */
    color: #fff;

    .comic-swipe {
      max-width: 100%;
      /* 设置轮播图的最大宽度 */

      img {
        width: 100%;
      }
    }

    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }
  }

  /* .scroll-mode {
    height: 100vh;
    overflow-y: auto;
  } */
}

.van-action-sheet,
.van-popup {
  color: #fff;
  background-color: rgba(0, 0, 0, .7);
}

.content {
  padding: 30px 0 20px;

  .control {
    display: flex;
    align-items: center;
    padding: 0 16px 30px;
    border-bottom: 1px solid gray;

    .van-slider {
      width: 60%;
      margin: 0 auto;

      .custom-button {
        width: 26px;
        color: #fff;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        background-color: #ec97b6;
        border-radius: 100px;
      }
    }
  }

  .set {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    .icons {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

  }
}

.setContent {
  padding-bottom: 50px;

  .readMode {
    display: flex;
    justify-content: space-between;
    padding: 30px 16px 30px;
    border-bottom: 1px solid gray;

    >span {
      font-size: 16px;
      text-align: center;
      line-height: 50px;
    }

    >div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 70px;
      height: 50px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #fff;
      border-radius: 6px;
    }

    div.active {
      color: #ec97b6;
      border-color: #ec97b6;
    }

    .normal {
      i {
        transform: rotate(-90deg);
      }
    }

    .rightStart {
      i {
        transform: rotate(90deg);
      }
    }
  }

}

.navbar {
  visibility: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, .7);
  display: flex;
  justify-content: space-between;
  font-size: 16px;

  .left {
    display: flex;
    align-items: center;

    .leave {}

    >div {
      margin-left: 14px;
    }
  }

  .right {

    margin: auto 0;

    .van-icon {
      transform: rotate(90deg);
    }

  }
}
</style>