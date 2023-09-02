<template>
  <div>
    <header>
      <van-nav-bar title="我的" :right-text="status" @click-right="intoLogin" />
    </header>

    <div class="user-info">
      <div class="back-img">
        <img src="../assets/avatar.png" alt="">
      </div>

      <div class="checkIn">
        <img src="../assets/icon_punch_in.png" alt="">
        <span>打哔咔</span>
      </div>

      <div class="info">
        <div class="level">
          Lv.1 (20/200)
        </div>

        <div class="avatar">
          <img src="../assets/avatar.png" alt="">
        </div>

        <div class="user-name">
          {{ nickName }}
        </div>

        <div class="sign">
          个性签名
        </div>

      </div>
    </div>

    <div class="manga-info">
      <van-tabs v-model="active" line-width="50%" color="#ec97b6">

        <van-tab title="漫画" class="mangas">

          <div class="downloaded">
            <van-cell title="已下载" :icon="icon" value="更多" is-link size="large" center />

          </div>


          <div class="history">
            <van-cell title="最近观看" :icon="icon" value="更多" is-link size="large" @click="moreHistory" />
            <div class="content">
              <div class="manga" v-for="(item, index) in viewHistory" @click="viewDetail(item.id)" :key="index">
                <div class="img-box">
                  <img :src="item.vertical_cover" alt="">
                </div>

                <div class="title van-multi-ellipsis--l2">{{ item.title }}</div>
              </div>
            </div>
          </div>


          <div class="collected">
            <van-cell title="已收藏" :icon="icon" value="更多" is-link size="large" @click="moreCollected" />
            <div class="content">
              <div class="manga" v-for="(item, index) in collection" :key="index" @click="viewDetail(item.id)">
                <div class="img-box">
                  <img :src="item.vertical_cover" alt="">
                </div>

                <div class="title van-multi-ellipsis--l2">{{ item.title }}</div>
              </div>
            </div>
          </div>

        </van-tab>

        <van-tab title="评论">
        </van-tab>


      </van-tabs>
    </div>

  </div>
</template>

<script>
import { checkToken, getUserInfo } from '../api/api.js'
import { Dialog, Notify } from 'vant';

export default {
  name: 'My',

  data() {
    return {
      active: 0,

      status: '',

      icon: require('../assets/register_name.png'),

      nickName: '游客',

      collection: [],
      viewHistory: [],

      dialogShow: false,
    }
  },

  created() {

    const token = localStorage.getItem('token');

    let collection = localStorage.getItem('collection');
    let viewHistory = localStorage.getItem('viewHistory');

    if(collection) {
      this.collection = JSON.parse(collection).slice(0, 4);
    }

    if(viewHistory) {
      this.viewHistory = JSON.parse(viewHistory).slice(0, 4);
    }
    
    if (token) {

      this.status = '注销';

      checkToken(token).then(res => {

        if (res.data.errno === 0) {
          this.nickName = res.data.nickName;
        }

      }).catch(err => {
        console.log('err ==> ', err);
      });

      getUserInfo(token).then(res => {

        /* if (res.data.errno === 0) {
          this.nickName = res.data.nickName;
        } */

      }).catch(err => {
        console.log('err ==> ', err);
      })

    } else {
      this.status = '登录';
    }


  },

  methods: {
    intoLogin() {
      const token = localStorage.getItem('token');
      if (token) {
        Dialog.confirm({
          title: '是否确认注销',
          // message: '弹窗内容',
          confirmButtonColor: '#ec97b6',
          cancelButtonColor: 'gray',
        })
          .then(() => {
            // on confirm

            Notify({
              message: '已注销',
              background: '#ec97b6',
              duration: 1000,
            });

            localStorage.clear();

            setTimeout(() => {
              location.reload()
            }, 1000);
          })
          .catch(() => {
            // on cancel
          });
      } else {
        this.$router.push({ name: 'Login' });
      }
    },

    viewDetail(cid) {
      console.log(cid);
      this.$router.push({ name: 'Detail', params: { cid } });
    },

    moreHistory() {
      setTimeout(() => {
        this.$router.push({ name: 'History' });
      }, 300);
    },
    moreCollected() {
      setTimeout(() => {
        this.$router.push({ name: 'Collection' });
      }, 300);
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  position: relative;
  color: #fff;
  height: 36vh;
  overflow: hidden;

  .back-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    z-index: -1;
    filter: brightness(50%);

    img {
      width: 100%;
      transform: translateY(-120px);
    }
  }

  .checkIn {
    position: absolute;
    top: 0;
    right: 6px;
    width: 50px;
    text-align: center;

    img {
      width: 100%;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;

    >div {
      margin-top: 14px;
    }

    .level {
      font-size: 14px;
    }

    .avatar {
      width: 100px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
      }
    }

    .user-name {
      font-size: 16px;
      font-weight: 700;
    }
  }
}

.manga-info {
  .mangas {
    >div {
      border-bottom: 1px solid #b1b1b1;

      .content {
        display: flex;
        width: 95%;
        overflow: hidden;
        padding: 0 8px;
        font-size: 12px;

        .manga {
          width: 25%;
          margin-right: 3%;
          text-align: center;

          &:last-child {
            margin-right: 0;
          }

          .img-box {

            img {
              width: 100%;
            }
          }

          .title {
            height: 5vh;
          }
        }
      }
    }
  }
}
</style>