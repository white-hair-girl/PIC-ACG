<template>
  <div>
    <div class="mangas">
      <van-row type="flex" justify="space-between" gutter="10">

        <van-col span="8" v-for="(item, index) in mangaObj" :key="index">

          <manga-model :title="item.title" :introduce="item.recommendation" :src="item.vertical_cover" :toId="item.comic_id"></manga-model>

        </van-col>

      </van-row>

      <div class="update">
        <van-button icon="replay" size="normal" round text="#000" @click="btnFn">
          换一批
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import mangaModel from './MangaModel';

export default {
  components: {
    mangaModel
  },

  props: {
    mangaObj: {
      type: Array,
    },

  },

  methods: {
    btnFn() {
      this.$emit('btnClick')
    },
  }
}
</script>

<style lang="less" scoped>
.manga {
  background-color: #fff;
  border: none;
}

.update {
  width: 65%;
  height: 34px;
  margin: 0 auto 20px;

  .van-button {
    width: 100%;
    height: 100%;
    background-color: #f1f1f3;

  }
}
</style>