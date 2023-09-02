<template>
  <div class="manga" @click="click">

    <slot></slot>


    <img v-lazy="src">

    <!-- <van-image lazy-load :src="src">

      <template v-slot:loading>

        <van-loading type="spinner" color="#da557d" size="30" />

        <img src="../assets/R.gif" alt="">

      </template>

      <template v-slot:error>加载失败</template>

    </van-image> -->


    <div class="title" :class="{ 'van-ellipsis': titleHide }">{{ title }}</div>
    <div class="type" :class="{ 'van-ellipsis': introHide }">
      <slot name="introduce">
        <span class="van-ellipsis">{{ introduce }}</span>
      </slot>
      <slot name="icon"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Normal',

  props: {
    title: {
      default: 'title'
    },

    introduce: {
      default: '佳作'
    },

    src: {
      // default: 'https://i0.hdslb.com/bfs/manga-static/86705dd9499f340815fdea183c327a0650082790.jpg'
    },

    titleHide: {
      default: true,
    },

    introHide: {
      default: true,
    },

    toId: {

    }
  },

  methods: {
    click() {

      if(this.toId) {
        console.log(this.toId);
        let cid = this.toId
        this.$router.push({ name: 'Detail', params: { cid } });
      } else {
        this.$emit('click');
      }

    }
  }

}
</script>

<style lang="less" scoped>
/* img[src=""],
img:not([src]) {
  width: 0;
  height: 0;
  background: url('../assets/1377339.png') no-repeat center;
  background-size: 100% 100%;
} */

.manga {

  background-color: #f5f5f5;
  border: 1px solid #f5f5f5;
  // border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
  // width: 100%;

  img {
    width: 100%;
    // background: url('../assets/R.gif') no-repeat center;
    // background-size: cover;
  }

  /* .load-box {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100%;
  } */

  .title {
    font-size: 12px;
    margin: 2px 0;
  }

  .type {
    display: flex;
    margin-bottom: 4px;
    justify-content: space-between;
    font-size: 12px;
    color: #aeaeae;


    .van-icon {
      transform: rotate(90deg);
    }
  }
}
</style>