<template>
  <div>
    <van-nav-bar left-text="返回" right-text="清空历史" left-arrow @click-left="goBacck" @click-right="clearHistory" :fixed="true"/>

    <div class="content">

        <Swipe-cell  v-for="(item, index) in viewHistory" :key="index" :before-close="beforeClose">

          <vertiacl-model
          :title="item.title"
          :author="item.author"
          :styles="item.styles" 
          :isFinish="item.is_finish === 0 ? '连载中' : '已完结'" 
          :src="item.vertical_cover"
          @click="viewDetail(item.id)">
          </vertiacl-model>

          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>

      </Swipe-cell>

    </div>

  </div>
</template>

<script>
import vertiaclModel from '../components/MangaModelVert';
import { SwipeCell,Dialog } from 'vant';

export default {
  name: 'History',

  components: {
    vertiaclModel,
    SwipeCell
  },


  data() {
    return {

      viewHistory: [],

    };
  },

  created() {

    let viewHistory = localStorage.getItem('viewHistory');

    this.viewHistory = JSON.parse(viewHistory);



  },

  methods: {
    goBacck() {
      this.$router.back();
    },

    viewDetail(cid) {
      this.$router.push({ name: 'Detail', params: { cid } });
    },

    clearHistory() {
      Dialog.confirm({
        title: '确定清空所有历史记录吗？',
        confirmButtonColor: '#ec97b6',
        cancelButtonColor: 'gray',
      }).then(() => {
        localStorage.removeItem('viewHistory');
        location.reload();
      }).catch(() => {

      // on cancel

      });;
    },

    // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    beforeClose({ position, instance }) {
      switch (position) {
        case 'right':
          Dialog.confirm({
            title: '确定删除吗？',
            confirmButtonColor: '#ec97b6',
            cancelButtonColor: 'gray',
          }).then(() => {

            console.log(instance.$children[0].$options.propsData.title);

            let title = instance.$children[0].$options.propsData.title

            for (let i = 0; i < this.viewHistory.length; i++) {
              if (this.viewHistory[i].title == title) {
                this.viewHistory.splice(i, 1);
                break;
              }
            }

            localStorage.setItem('viewHistory', JSON.stringify(this.viewHistory));

            instance.close();

          }).catch(() => {

            instance.close();

          });;
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 95%;
  margin: 50px auto 0;

  .delete-button {
    height: 100%;
  }
}
</style>