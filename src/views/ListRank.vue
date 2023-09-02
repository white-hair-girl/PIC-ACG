<template>
  <div>
    <van-search v-model="searchValue" shape="round" placeholder="请输入搜索关键词" maxlength="20" @search="comicSearch">
    </van-search>

    <div class="list-rank">
      <div class="aside">
        <sidebar v-model="activeKey" @change="selectType">
          <sidebar-item :title="item.name
            " v-for="(item, index) in listRank" :key="index" />
        </sidebar>
      </div>

      <div class="content">

        <div class="description">{{ description }}</div>

        <div class="manga-list">

          <div class="manga-item" v-for="(item, index) in mangaList" :key="index" @click="viewDetail(item.comic_id)">

            <i class="number">
              {{ index < 3 ? (index + 1) : (index + 1).toString().padStart(2, '0') }} </i>

                <div class="img-box">
                  <img :src="item.vertical_cover" alt="">
                </div>

                <div class="info">
                  <div class="title">
                    {{ item.title }}
                  </div>

                  <ul>
                    <li>{{ item.author[0] }}</li>
                    <li>{{ item.styles }}</li>
                    <li>{{ item.is_finish === 0 ? '连载中' : '已完结' }}</li>
                  </ul>
                </div>
          </div>
          <!-- <div class="manga-item">

            <i class="number">
              1
            </i>

            <div class="img-box">
              <img src="https://i0.hdslb.com/bfs/manga-static/4745c828966e91359a4b09eadfe66ea25394fafc.jpg" alt="">
            </div>

            <div class="info">
              <div class="title">
                乔乔的奇妙冒险 第9部 The <em class="keyword">JOJO</em> Lands
              </div>

              <ul>
                <li>荒木飞吕彦</li>
                <li>奇幻</li>
                <li>连载中</li>
              </ul>
            </div>
          </div> -->

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  getListRank,
  getRankInfo
} from '../api/api'

import { Sidebar, SidebarItem } from 'vant';

export default {
  name: 'ListRank',

  components: {
    Sidebar,
    SidebarItem
  },

  data() {
    return {
      activeKey: 0,

      searchValue: '',

      listRank: [],

      description: '',
      mangaList: [],
    };
  },

  created() {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0, // 持续展示 toast
    });

    getListRank().then(res => {

      this.listRank = res.data.data.list;

    }).catch(err => {
      console.log('err ==> ', err);
    }).then(() => {

      let firstId = this.listRank[this.activeKey].id;

      getRankInfo(firstId).then(res => {

        this.description = res.data.data.description;
        this.mangaList = res.data.data.list;

        this.mangaList.forEach((item) => {

          if (!item.styles[0]) {
            item.styles = '';
            return;
          }

          item.styles = item.styles[0].name;
        });


      }).catch(err => {
        console.log('err ==> ', err);
      });
    }).then(() => {
      // 手动清除 Toast
      this.$toast.clear();
    })

  },

  methods: {
    comicSearch() {
      if (!this.searchValue) {
        return;
      }

      this.$router.push({ name: 'Search', params: { value: this.searchValue } });
    },

    viewDetail(cid) {
      console.log(cid);
      this.$router.push({ name: 'Detail', params: { cid } });
    },

    //根据类型获取漫画数据
    getMangaByType(id) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0, // 持续展示 toast
      });

      getRankInfo(id).then(res => {

        this.description = res.data.data.description;
        this.mangaList = res.data.data.list;

        this.mangaList.forEach((item) => {

          if (!item.styles[0]) {
            item.styles = '';
            return;
          }

          item.styles = item.styles[0].name;
        });


      }).catch(err => {
        console.log('err ==> ', err);
      }).then(() => {
        // 手动清除 Toast
        this.$toast.clear();
      });
    },

    //切换商品类型
    selectType(index) {
      console.log(this.listRank[index].id);

      let id = this.listRank[index].id;

      //根据类型获取商品数据
      this.getMangaByType(id);
    },
  }
}
</script>

<style lang="less" scoped>
.list-rank {
  display: flex;

  .aside {}

  .content {
    width: 100%;
    height: calc(100vh - 105px);
    overflow-y: auto;


    .description {
      margin: 12px 0;
      color: #8e9299;
    }

    .manga-list {

      .manga-item {

        display: flex;
        margin-bottom: 12px;

        .number {
          font-size: 80px;
          font-weight: 700;
          color: #cf9871;

        }

        &:nth-child(n + 4) {
          .number {
            font-size: 40px;
          }
        }

        .img-box {
          width: 40%;

          img {
            width: 100%;
          }
        }

        .info {
          width: 70%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 10px;
          padding: 2px 0;

          .title {
            font-size: 16px;
          }

          ul {
            color: #8e9299;
          }
        }
      }
    }
  }
}
</style>