<template>
  <div class="main">

    <div class="two">
      <!-- Main的二级路由 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <van-tabbar v-model="active" active-color="#0C34BA" inactive-color="#646566" :route="true" class="tabbar">

      <van-tabbar-item v-for="(item, index) in tabbarData" :key="index" :to="{ name: item.name }">
        <!-- <span>{{ item.title }}</span> -->
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
        </template>
        
      </van-tabbar-item>

    </van-tabbar>

  </div>
</template>

<script>
export default {
  name: 'Main',

  data() {
    return {
      active: 0,

      //tabbar数据
      tabbarData: [
        {
          title: '首页',
          activeIcon: require('../assets/home_white.png'),
          inactiveIcon: require('../assets/home_pink.png'),
          //路由名称
          name: 'Home'
        },
        {
          title: '搜索',
          activeIcon: require('../assets/cat_white.png'),
          inactiveIcon: require('../assets/cat_pink.png'),
          name: 'Sort'
        },
        {
          title: '排行榜',
          activeIcon: require('../assets/game_white.png'),
          inactiveIcon: require('../assets/game_pink.png'),
          name: 'ListRank'
        },
        {
          title: '我的',
          activeIcon: require('../assets/member_white.png'),
          inactiveIcon: require('../assets/member_pink.png'),
          name: 'My'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.two {
  margin-bottom: 50px;
}
.van-tabbar-item__icon {
  >img {
    height: 54px;
  }
}
</style>