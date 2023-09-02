<template>
  <div>

    <van-search v-model="searchValue" shape="round" placeholder="请输入搜索关键词" maxlength="20" show-action
      @search="comicSearch">

      <template #action>
        <div @click="goBacck">返回</div>
      </template>

    </van-search>

    <div class="search-content">

      <vertiacl-model v-for="(item, index) in searchList" :key="index" :toId="item.id" :author="item.author_name[0]"
        :styles="item.styles[0]" :isFinish="item.is_finish === 0 ? '连载中' : '已完结'" :src="item.vertical_cover">
        <template #title>
          <div class="title" v-html="item.title" ref="keyList"></div>
        </template>
      </vertiacl-model>

    </div>


  </div>
</template>

<script>
import vertiaclModel from '../components/MangaModelVert';

import {
  searchPage
} from '../api/api.js';

export default {
  name: 'Search',

  components: {
    vertiaclModel
  },


  data() {
    return {
      searchValue: '',

      searchList: [],

      recommends: [],
    };
  },

  created() {

    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0, // 持续展示 toast
    });

    this.searchValue = this.$route.params.value;

    searchPage(this.searchValue).then(res => {

      this.searchList = res.data.data.list;
      this.recommends = res.data.data.recommends;

      console.log(this.searchList);

    }).catch(err => {
      console.log('err ==> ', err);
    }).then(() => {
      // 手动清除 Toast
      this.$toast.clear();
    })

  },

  //数据同步到视图之前
  updated() {

    if (this.$refs.keyList) {
      for (let i = 0; i < this.$refs.keyList.length; i++) {
        const element = this.$refs.keyList[i];

        //寻找title标签中的搜索关键字添加高亮
        if (element.children.length !== 0) {

          for (let j = 0; j < element.children.length; j++) {
            const e = element.children[j];

            e.style.color = '#ec97b6';
            e.style.fontStyle = 'normal';
          }

        }

      }

    }

  },

  methods: {
    comicSearch() {

      if (!this.searchValue) {
        return;
      }

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0, // 持续展示 toast
      });

      searchPage(this.searchValue).then(res => {

        this.searchList = res.data.data.list;
        this.recommends = res.data.data.recommends;

      }).catch(err => {
        console.log('err ==> ', err);
      }).then(() => {
        // 手动清除 Toast
        this.$toast.clear();
      })
    },

    goBacck() {
      this.$router.back();
    },
  }
}
</script>

<style lang="less" scoped>
.keyword {
  color: #ec97b6;
}

.search-content {
  width: 90%;
  margin: 0 auto;
}
</style>