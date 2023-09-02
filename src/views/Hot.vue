<template>
  <div class="hot">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in banner" :key="index" ref="slide">
          <img :src="item.image_url" alt="">
        </div>
      </div>
    </div>

    <div class="allSort">
      <div class="sortContent">
        <div class="title">
          <div class="title-text">新作飙升榜</div>
        </div>

        <Type7></Type7>

      </div>

      <div class="sortContent" v-for="(item, i) in type3" :key="i">
        <div class="title">
          <div class="title-text">{{ item.name }}</div>
          <div class="checkAll">查看全部 &gt;</div>
        </div>

        <Type3 :mangaObj="item.content[item.cIndex]" @btnClick="updateCIndex(i)" ref="mangaContent"></Type3>

      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css'
import {
  GetClassPageLayout,
  GetClassPageHomeBanner,
  GetType3,
  GetType7,
  GetType8,
} from '../api/api'

import Type3 from '../components/MangasType3';
import Type7 from '../components/MangasType7';

export default {
  name: 'Hot',

  components: {
    Type3,
    Type7,

  },

  data() {
    return {
      banner: [],
      layoutTitle: [],
      hotDaily: [],

      type3: [],
      type7: [],
      type8: [],

      type3Item: [],
      type7Item: [],
    };
  },

  created() {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0, // 持续展示 toast
    });

    //获取轮播图
    GetClassPageHomeBanner(1145).then(res => {

      this.banner = res.data.data.banner;

    }).catch(err => {
      console.log('err ==> ', err);
    }).then(() => {
      // 手动清除 Toast
      this.$toast.clear();
    });

    //获取每项标题
    GetClassPageLayout(341).then(res => {
      this.layoutTitle = res.data.data.layout.filter(item => [3, 7, 8].includes(item.type));

      //获取类型为3的标题
      this.type3 = this.layoutTitle.filter(item => item.type === 3).map(item => {

        return {
          id: item.id,
          name: item.name,
          content: [],
          cIndex: 0,
        }
      });

      this.type7 = this.layoutTitle.filter(item => item.type === 7);
      this.type8 = this.layoutTitle.filter(item => item.type === 8);


    }).catch(err => {
      console.log('err ==> ', err);
    }).then(() => {

      //发送请求为类型为3的标题添加内容
      for (let i = 0; i < this.type3.length; i++) {
        const ele = this.type3[i];

        GetType3(ele.id).then(res => {
          let arr = res.data.data.roll_six_comics;
          let remain = arr.length % 6;

          //分割为数组以切换内容
          for (let i = 0; i < arr.length; i += 6) {
            if (remain !== 0) {
              if (i === arr.length - remain) {
                this.type3Item.push(arr.slice(i, i + remain).concat(arr.slice(0, 6 - remain)));
                break;
              }
              this.type3Item.push(arr.slice(i, i + 6));
            } else {
              this.type3Item.push(arr.slice(i, i + 6));
            }
          }

          this.type3[i].content = this.type3Item;

          this.type3Item = [];


        }).catch(err => {
          console.log('err ==> ', err);
        });

      }
    })

    //获取type为7的漫画内容
    GetType7(1147).then(res => {


    }).catch(err => {
      console.log('err ==> ', err);
    });

    //获取type为8的漫画内容
    GetType8(1147).then(res => {


    }).catch(err => {
      console.log('err ==> ', err);
    });
  },

  mounted() {
    setTimeout(() => {

      for (let i = 0; i < this.$refs.slide.length; i++) {
        const element = this.$refs.slide[i];
        element.style.display = 'block';
      }

      new Swiper('.swiper-container', {
        autoplay: true,
        loop: true, // 循环模式选项

        effect: 'coverflow',
        slidesPerView: 3,
        centeredSlides: true,

        coverflowEffect: {
          rotate: 20,
          stretch: 0,
          depth: 0,
          modifier: 2,
          slideShadows: true
        },
      })
    }, 2000);

  },

  methods: {
    updateCIndex(index) {
      let j = this.type3[index].cIndex + 1;

      if (j > 2) {
        this.type3[index].cIndex = 0;
      } else {
        this.type3[index].cIndex = j;
      }

      console.log(index);
    }
  },

}

</script>

<style lang="less" scoped>
.swiper-container {
  width: 100%;

  .swiper-wrapper {
    .swiper-slide {
      display: none;

      img {
        width: 100%;
      }
    }
  }

}

.trapezoid {
  width: 200px;
  height: 0;
  border-top: 100px solid red;
  // border-left: 50px solid transparent;
  border-right: 50px solid transparent;
}



.allSort {
  width: 90%;
  margin: 10px auto 0;

  .sortContent {
    margin-bottom: 20px;

    .title {
      display: flex;
      justify-content: space-between;
      align-content: center;
      margin-bottom: 10px;

      .title-text {
        font-size: 16px;
      }

      .checkAll {
        color: #ababab;
        line-height: 20px;
      }
    }

  }

}
</style>