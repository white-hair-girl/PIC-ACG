<template>
  <div>
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <img :src="item.img" :alt="item.title" @click="viewDetail(item)">
        </van-swipe-item>
      </van-swipe>

      <notice-bar left-icon="volume-o" mode="link" scrollable text="点击广告,拯救哔咔" />

      <!-- <van-row class="home-feed-type">
        <van-col span="6" v-for="(item, index) in homeFeedType" :key="index">
          <img :src="item.icon" alt="">
          <span>{{ item.name }}</span>
        </van-col>
      </van-row> -->

      <van-row class="home-feed" type="flex" justify="space-around">

        <van-col span="11" v-for="(item, index) in homeFeeds" :key="index">

          <manga-model :title="item.title" :introduce="item.comic_info.main_style_name" :src="item.image"
            :toId="item.item_id">
            <template #icon>
              <van-icon name="ellipsis" />
            </template>
          </manga-model>

        </van-col>



      </van-row>
    </div>
  </div>
</template>

<script>
import {
  Banner,
  GetClassPageAllTabs,
  HomeFeed
} from '../api/api'

import { NoticeBar } from 'vant';
import mangaModel from '../components/MangaModel';


export default {
  name: 'Recommend',

  components: {
    mangaModel,
    NoticeBar
  },

  data() {
    return {
      banner: [],
      homeFeedType: [],
      homeFeeds: [],
    };
  },

  created() {

    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0, // 持续展示 toast
    });

    Banner().then(res => {

      this.banner = res.data.data;

    }).catch(err => {
      console.log('err ==> ', err);

    }).then(() => {

      GetClassPageAllTabs().then(res => {

        this.homeFeedType = res.data.data.home_feed;

      }).catch(err => {
        console.log('err ==> ', err);
      });

      HomeFeed().then(res => {

        this.homeFeeds = res.data.data.feeds;

      }).catch(err => {
        console.log('err ==> ', err);
      });

    }).then(() => {
      // 手动清除 Toast
      this.$toast.clear();
    })


  },

  methods: {
    //跳转到详情页面
    viewDetail(cid) {
      console.log(cid);
      // this.$router.push({ name: 'Detail', params: { cid } });
    },
  }
}
</script>

<style lang="scss" scoped>
.my-swipe {
  .van-swipe-item {

    img {
      width: 100%;
    }
  }
}

.van-notice-bar {
  height: 20px;
  margin-bottom: 10px;
}

.home-feed-type {
  margin: 20px 0;

  .van-col {
    display: flex;
    justify-content: center;
    align-content: center;

    &:not(&:last-child) {

      span {
        border-right: 1px solid gray;
      }
    }

    img {
      width: 30px;
      height: 30px;
    }

    span {
      font-size: 10px;
      width: 50px;
      margin: auto 0;

    }
  }

}

.home-feed {

  .manga {
    border-radius: 8px;
    overflow: hidden;
  }

  .type {
    display: flex;
    margin-bottom: 4px;
    justify-content: space-between;
    font-size: 10px;
    color: #aeaeae;


    .van-icon {
      transform: rotate(90deg);
    }
  }

}
</style>