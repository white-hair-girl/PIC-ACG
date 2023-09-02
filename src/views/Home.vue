<template>
  <div class="home">
    <van-nav-bar left-text="首页"/>


    <van-tabs v-model="active" swipeable lazy-render color="#ec97b6" @change="getTabId">

      <van-tab v-for="(item, index) in homeType" :title="item.name" :key="index">
        <hot v-if="item.page === 'hot'"></hot>
        <recommend v-if="item.page === 'recommend'"></recommend>
        <voiced v-if="item.page === 'voiced'"></voiced>
        <girl v-if="item.page === 'girl'"></girl>
        <boy v-if="item.page === 'boy'"></boy>
      </van-tab>

    </van-tabs>


  </div>
</template>

<script>
import { Toast } from 'vant';
import { GetClassPageAllTabs } from '../api/api'
import hot from './Hot.vue';
import recommend from './Recommend.vue';
import voiced from './Voiced.vue';
import girl from './Girl.vue';
import boy from './Boy.vue';


export default {
  name: 'Home',

  components: {
    hot,
    recommend,
    voiced,
    girl,
    boy
  },

  data() {
    return {
      searchValue: '',
      active: 1,
      homeType: [],
      homeTypeName: ['hot', 'recommend', 'girl', 'boy', 'voiced'],
    };
  },

  created() {

    GetClassPageAllTabs().then(res => {

      res.data.data.home_type.splice(res.data.data.home_type.length - 2)

      this.homeType = res.data.data.home_type.map((e, i) => {
        let obj = {
          id: e.id,
          name: e.name,
          tab_type: e.tab_type,
          page: this.homeTypeName[i],
        };

        return obj;
      });

      // console.log(this.homeType);


    }).catch(err => {
      console.log('err ==> ', err);
    })
  },


  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },

    getTabId(i) {
      console.log(this.homeType[i].id);
    }
  },
};
</script>

<style lang="less" scoped>
.home {
  margin-bottom: 50px;
}

.my-swipe {

  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}

.home-feed {
  height: 100px;
}
</style>