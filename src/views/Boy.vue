<template>
  <div>
    <van-tabs v-model="active" swipeable lazy-render color="#ec97b6" @change="getTabId">

      <van-tab v-for="(item, index) in layout" :title="item.name" :key="index">

      </van-tab>

    </van-tabs>


    <div class="mangas">
      <van-row type="flex" justify="space-between" gutter="10">

        <van-col span="12" v-for="(item, index) in mangas" :key="index">

          <manga-model :title="item.title" :src="item.image"
          :toId="item.item_id">

          <template #introduce>
            <span class="decision">
              {{ item.comic_info.decision === '' ? '佳作' : item.comic_info.decision }}
            </span>
          </template>
          
          </manga-model>

        </van-col>

      </van-row>

    </div>


  </div>
</template>

<script>
import {
  GetClassPageLayout,
  getSexRecommend
} from '../api/api'
import mangaModel from '../components/MangaModel';


export default {
  name: 'Boy',

  components: {
    mangaModel
  },

  data() {
    return {
      active: 0,
      layout: {},
      mangas: {},
    }
  },

  created() {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0, // 持续展示 toast
    });

    GetClassPageLayout(331).then(res => {

      this.layout = res.data.data.layout;

    }).catch(err => {
      console.log('err ==> ', err);
    }).then(() => {

      let id = this.layout[this.active].id;

      console.log(id);

      getSexRecommend(id).then(res => {

        this.mangas = res.data.data.comics;

      }).catch(err => {
        console.log('err ==> ', err);
      });
    }).then(() => {
      // 手动清除 Toast
      this.$toast.clear();
    })

  },

  methods: {
    getTabId(i) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0, // 持续展示 toast
      });

      let id = this.layout[i].id;

      getSexRecommend(id).then(res => {

        this.mangas = res.data.data.comics;

      }).catch(err => {
        console.log('err ==> ', err);
      }).then(() => {
        // 手动清除 Toast
        this.$toast.clear();
      });

    }
  },
}
</script>

<style lang="less" scoped>
.mangas {
  width: 95%;
  margin: 0 auto;
  margin-top: 6px;

  .decision {
    color: #ebbc64;
    font-weight: 700;
  }

}
</style>