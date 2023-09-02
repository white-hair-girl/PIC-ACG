<template>
  <div class="login">
    <van-nav-bar>

      <template #left>
        <div class="right-title" @click="showRegiterBox">注册</div>
      </template>

      <template #title>
        <div class="title"></div>
      </template>

      <template #right>
        <div class="right-title" @click="goPage('Home')">游客模式</div>
      </template>

    </van-nav-bar>

    <div class="login-box">

      <div class="logo">
        <img class="auto-img" src="../assets/icon_no_comment.png" alt="">
      </div>

      <div class="form-box">

        <van-form @submit="login">
          <van-field v-model="userInfo.phone" name="手机号" label="手机号" placeholder="手机号(11位)"
            :rules="[{ required: true, message: '请填写手机' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }]" />


          <van-field v-model="userInfo.password" :type="isOpenPassword ? 'text' : 'password'" name="密码" label="密码"
            placeholder="密码(6-16位)"
            :rules="[{ required: true, message: '请填写密码' }, { pattern: /^[A-Za-z]\w{5,15}$/, message: '密码格式错误' }]"
            :right-icon="isOpenPassword ? 'eye-o' : 'closed-eye'" @click-right-icon="viewPassword" />

          <div class="forgot">

            <div class="forgot-text">忘记密码？</div>
          </div>


          <div class="login-btn">

            <van-button round block color="#ec97b6" native-type="submit">登 录</van-button>

            <div class="tips">

              <div>提示：</div>
              <div class="tips-text">1.密码支持字母数字下划线组合，且必须以字母开头。</div>
              <div class="tips-text">2.昵称支持中英文组合。</div>

            </div>
          </div>
        </van-form>

      </div>

    </div>


    <!-- 注册弹窗 -->
    <van-popup v-model="show" position="bottom" closeable>

      <div class="r-box">

        <div>

          <van-form @submit="register">
            <van-field v-model="registerUserInfo.phone" name="手机号" label="手机号" placeholder="手机号(11位)"
              :rules="[{ required: true, message: '请填写手机' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }]" />


            <van-field v-model="registerUserInfo.password" :type="isOpenPassword ? 'text' : 'password'" name="密码"
              label="密码" placeholder="密码(6-16位)"
              :rules="[{ required: true, message: '请填写密码' }, { pattern: /^[A-Za-z]\w{5,15}$/, message: '密码格式错误' }]"
              :right-icon="isOpenPassword ? 'eye-o' : 'closed-eye'" @click-right-icon="viewPassword" />


            <van-field v-model="registerUserInfo.nickName" name="昵称" label="昵称" placeholder="昵称(1-8位)"
              :rules="[{ required: true, message: '请填写昵称' }, { pattern: /^[A-Za-z\u4e00-\u9fa5]{1,8}$/, message: '昵称格式错误' }]" />


            <div class="login-btn">

              <van-button round block color="#ec97b6" native-type="submit">注 册</van-button>

            </div>
          </van-form>

        </div>

      </div>

    </van-popup>

  </div>
</template>

<script>

import { registerUser, loginUser } from '../api/api.js'

export default {
  name: 'Login',

  data() {
    return {
      //是否显示注册弹窗
      show: false,

      //登录数据
      userInfo: {
        phone: '',
        password: ''
      },

      //注册数据
      registerUserInfo: {
        phone: '',
        password: '',
        nickName: ''
      },

      isOpenPassword: false
    }
  },

  methods: {
    viewPassword() {
      this.isOpenPassword = !this.isOpenPassword;
    },

    //显示注册弹窗
    showRegiterBox() {
      this.show = true;
    },

    //跳转页面
    goPage(name) {
      this.$router.push({ name });
    },

    //注册
    register() {
      console.log('this.registerUserInfo ==> ', this.registerUserInfo);

      registerUser({ ...this.registerUserInfo }).then(res => {
        console.log('res ==> ', res);

        this.$toast(res.data.message);

        if (res.status === 200) {
          this.show = false;

          for (let key in this.registerUserInfo) {
            this.registerUserInfo[key] = '';
          }

        }

      }).catch(err => {
        console.log('err ==> ', err);
      })
    },

    //登录
    login() {
      console.log(111);
      loginUser({ ...this.userInfo }).then(res => {
        console.log('res ==> ', res);

        this.$toast(res.data.message);

        if (res.data.errno === 0) {
          //保存token到本地存储中
          localStorage.setItem('token', res.data.token);

          setTimeout(() => {
            this.$router.push({ name: 'My' });
          }, 300)
        }



      }).catch(err => {
        console.log('err ==> ', err);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;

  .van-field {
    height: 60px;
  }

  .r-title {
    text-align: center;
    font-size: 18px;
    padding: 20px 0;
  }

  .r-box {
    padding: 40px 10px 10px;
  }

  .tips {
    margin-top: 20px;
    color: #666;
    font-size: 12px;
  }

  .tips-text {

    margin-top: 5px;
  }

  .forgot-text {
    color: #666;
    font-size: 14px;
    margin-left: auto;
  }

  .forgot {
    display: flex;
    margin-top: 15px;
  }

  .form-box {
    margin-top: 50px;
  }

  .login-btn {
    padding: 0 15px;
    margin-top: 40px;
  }

  .login-box {
    margin-top: 40px;
  }

  .logo {
    width: 160px;
    height: 160px;
    // background-color: #e8e8e8;
    margin: 0 auto;

    .auto-img {
      width: 100%;
    }
  }

  .title {
    font-weight: bold;
  }

  .right-title {
    color: #ec97b6;
  }
}
</style>