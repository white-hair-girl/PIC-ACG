<template>
  <div>
    <van-search v-model="searchValue" shape="round" placeholder="请输入搜索关键词" maxlength="20" @search="comicSearch">
    </van-search>

    <div class="label">
      <div class="styles">
        <!-- <span>风格</span> -->
        <span v-for="(item, index) in styles" :key="item.id" @click="stylesChange(item.id, index)"
          :class="{ active: index === styleActive }">{{
            item.name }}</span>
      </div>

      <div class="areas">
        <!-- <span>区域</span> -->
        <span v-for="(item, index) in areas" :key="item.id" @click="areasChange(item.id, index)"
          :class="{ active: index === areasActive }">{{ item.name }}</span>
      </div>

      <div class="status">
        <!-- <span>完结状态</span> -->
        <span v-for="(item, index) in status" :key="item.id" @click="statusChange(item.id, index)"
          :class="{ active: index === statusActive }">{{ item.name }}</span>
      </div>

    </div>

    <div class="mangas">

      <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->

      <van-row type="flex" justify="space-start" gutter="10">


        <van-col span="8" v-for="(item, index) in mangaData" :key="index">

          <div class="content">
            <manga-model :title="item.title" :introduce="item.bottom_info" :src="item.vertical_cover"
              :toId="item.season_id"></manga-model>
          </div>


        </van-col>

      </van-row>

      <!-- </van-list> -->

    </div>

  </div>
</template>

<script>
import {
  GetAllLabel,
  GetLabelPage
} from '../api/api'

import mangaModel from '../components/MangaModel';

export default {
  name: 'Sort',

  components: {
    mangaModel
  },

  data() {
    return {
      searchValue: '',

      loading: false,
      finished: false,
      list: [],

      styles: [
        {
          "id": -1,
          "name": "全部"
        }
      ],
      areas: [
        {
          "id": -1,
          "name": "全部"
        }
      ],
      status: [
        {
          "id": -1,
          "name": "全部"
        }
      ],

      styleActive: 0,
      areasActive: 0,
      statusActive: 0,

      styleId: -1,
      areaId: -1,
      isFinish: -1,

      mangaData: [],

      index: 0,
    };
  },

  created() {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0, // 持续展示 toast
    });

    GetAllLabel().then(res => {
      let data = res.data.data;

      this.styles = this.styles.concat(data.styles);
      this.styles.splice(-2, 1);

      this.areas = this.areas.concat(data.areas);

      this.status = this.status.concat(data.status);


    }).catch(err => {
      console.log('err ==> ', err);
    });

    GetLabelPage().then(res => {

      this.mangaData = res.data.data;

    }).catch(err => {
      console.log('err ==> ', err);
    }).then(() => {
      // 手动清除 Toast
      this.$toast.clear();
    });
  },

  methods: {
    //当每项改变时触发共同的逻辑
    commonChange(id, index, activeProperty, idProperty) {
      if (this[activeProperty] === index) {
        return;
      }

      this[activeProperty] = index;
      this[idProperty] = id;

      this.labelChange();
    },

    stylesChange(id, index) {
      this.commonChange(id, index, 'styleActive', 'styleId');
    },

    areasChange(id, index) {
      this.commonChange(id, index, 'areasActive', 'areaId');
    },

    statusChange(id, index) {
      this.commonChange(id, index, 'statusActive', 'isFinish');
    },

    //改变后再次发送请求
    labelChange() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0, // 持续展示 toast
      });

      GetLabelPage(this.styleId, this.areaId, this.isFinish).then(res => {

        this.mangaData = res.data.data;

      }).catch(err => {
        console.log('err ==> ', err);
      }).then(() => {
        // 手动清除 Toast
        this.$toast.clear();
      });
    },

    comicSearch() {
      if (!this.searchValue) {
        return;
      }

      this.$router.push({ name: 'Search', params: { value: this.searchValue } });
    },

    onLoad() {
      // 异步更新数据
      console.log(this.index);

      this.list = this.list.concat(this.mangaData.slice(this.index, this.index + 10));

      // 加载状态结束
      this.loading = false;

      this.index += 10;

      console.log(this.index);

      // 数据全部加载完成
      if (this.list.length >= 34) {
        this.index = 0;
        this.finished = true;
      }
    },
  }

}
</script>

<style lang="less" scoped>
.label {
  // width: 95%;
  padding: 0 3%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(187, 181, 181);
  margin-bottom: 20px;

  >div {
    width: 100%;
    margin-bottom: 5px;

    span {
      float: left;
      margin-top: 3%;
      margin-right: 3%;
      display: inline-block;
      width: 22%;
      height: 24px;
      text-align: center;
      line-height: 24px;
      background-color: #f5f6f8;
      border: 1px solid #f5f6f8;
      border-radius: 6px;

      &:nth-child(4n) {
        margin-right: 0;
      }

      &.active {
        background-color: #fee3ec;
        border: 1px solid #ec97b6;
      }
    }

  }
}

.mangas {
  width: 96%;
  margin: 0 auto;
}
</style>