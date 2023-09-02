<template>
  <div>
    <div class="NoOne">
      <div class="rank">
        <div class="rank-text">
          No.1
        </div>
      </div>


      <div class="img-box" @click="viewDetail(one.comic_id)">
        <img :src="one.cover">
      </div>


      <p class="manga-title">
        {{ one.comic_title }}
        <span>奇幻</span>
      </p>
      <p class="introduce van-ellipsis">
        {{ one.recommendation }}
      </p>
    </div>

    <div class="noTwo">
      <van-row gutter="10" type="flex" justify="space-between">

        <van-col span="12" v-for="(item, index) in two" :key="index">

          <manga-model :title="item.comic_title" :introduce="item.recommendation" :src="item.cover" :toId="item.comic_id">

            <template>
              <div class="rank">
                <div class="rank-text">
                  No.{{ index + 2 }}
                </div>
              </div>
            </template>

          </manga-model>
        </van-col>

      </van-row>
    </div>

    <div class="noSix">
      <van-row gutter="10">

        <van-col span="6" v-for="(item, index) in six" :key="index">
          <manga-model :title="item.comic_title" :src="item.cover" :toId="item.comic_id">

            <template>
              <div class="rank">
                <div class="rank-text">
                  No.{{ index + 6 }}
                </div>
              </div>
            </template>

          </manga-model>
        </van-col>

      </van-row>

    </div>
  </div>
</template>

<script>
import mangaModel from './MangaModel';
import {
  GetType7,
} from '../api/api'

export default {
  components: {
    mangaModel
  },

  data() {
    return {
      type7: [],
      type7Item: [],
      one: '',
      two: [],
      six: []
    };
  },

  created() {
    //获取type为7的漫画内容
    GetType7(1153).then(res => {

      this.one = res.data.data.rank.slice(0, 1)[0];
      this.two = res.data.data.rank.slice(1, 5);
      this.six = res.data.data.rank.slice(5, 9);

      console.log(this.one);

    }).catch(err => {
      console.log('err ==> ', err);
    });
  },

  methods: {
    viewDetail(cid) {
      console.log(cid);
      this.$router.push({ name: 'Detail', params: { cid } });
    },
  },
}
</script>

<style lang="less" scoped>
.manga {
  position: relative;

  .rank {
    position: absolute;
    left: 0;
    top: 0;
    width: 36px;
    height: 0;
    border-top: 18px solid red;
    border-right: 10px solid transparent;
    text-align: center;
    z-index: 1;

    .rank-text {
      transform: translateY(-120%);
      font-size: 12px;
      color: white;
    }
  }
}

.NoOne {
  position: relative;
  margin-bottom: 10px;

  .rank {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 0;
    border-top: 20px solid red;
    border-right: 10px solid transparent;
    text-align: center;
    z-index: 999;

    .rank-text {
      transform: translateY(-120%);
      font-size: 12px;
      color: white;
    }
  }

  .img-box {

    img {
      width: 100%;
    }
  }

  .manga-title {
    font-size: 18px;
    margin-bottom: 6px;

    span {
      font-size: 12px;
      background-color: #e0f2fb;
      color: #5ca7d1;
      padding: 2px;

    }
  }

  .introduce {
    color: #ababab;
  }


}
</style>