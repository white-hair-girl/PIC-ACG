<template>
  <div>
    <div class="mange" @click="click">

      <div class="img-box">
        <img v-lazy="src" alt="">
      </div>

      <div class="info">

        <slot name="title">
          <div class="title">{{ title }}</div>
        </slot>

        <ul>
          <li>{{ author }}</li>
          <li>{{ styles }}</li>
          <li>{{ isFinish }}</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'vertical',

  props: {
    title: {
      default: 'title'
    },

    author: {

    },

    styles: {
      // default: 'style',
    },

    isFinish: {
      // default: 'isFinish',
    },

    src: {
      default: 'https://i0.hdslb.com/bfs/manga-static/4745c828966e91359a4b09eadfe66ea25394fafc.jpg'
    },

    toId: {

    }
  },

  methods: {
    click() {

      if (this.toId) {
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
.mange {
  display: flex;
  margin-bottom: 12px;

  .img-box {
    width: 30%;
    border-radius: 6px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .info {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 16px;
    padding: 6px 0;

    .title {
      font-size: 16px;


      .keyword {
        color: #ec97b6;
      }
    }

    ul {
      color: #8e9299;
    }
  }
}
</style>