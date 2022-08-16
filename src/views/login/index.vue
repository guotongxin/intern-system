<template>
  <div class="login-container">
    <div class="loginBox">
       <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">高校实习管理系统</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

        <div class="tips">
          <span style="margin-right:20px;">username: admin</span>
          <span> password: any</span>
        </div>

    </el-form>
    </div>
   
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { loginAPI } from '@/api/user.js'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不少于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
     handleLogin() { // 登录
      this.$refs.loginForm.validate(async(valid) => { // 登录校验
        if (valid) {
          this.loading = true
          const res = await loginAPI(this.loginForm)
          // console.log('登录成功',res)
          if(res.data.code==10000){ //登录成功
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success',
            duration:500
          });
          this.$store.commit('user/SET_TOKEN', res.data.token)
          // console.log(this.loginForm)
          // console.log(res)
          console.log(res.data)
          this.$store.commit('user/SET_USERINFO', res.data.userInfo[0])
          // 跳转首页或者未遂地址
          this.$router.push(this.$route.query.redirect ||'/notice/index')
          }else{
            this.$message.error('登录失败~请核对用户名密码');
          }
          this.loading = false
        } else {
          return false // 未通过
        }
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #2d3a4b;
$light_gray: #333;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      // background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
  }
  .el-form-item {
    border: 1px solid #DCDFE6;
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
  .el-button--medium{
    height: 50px;
    line-height: 20px;
    font-size: 22px;
  }
}
</style>

<style lang="scss" scoped>

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #333;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  background: url('../../assets/bg.jpg');
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .loginBox{
     height: 100%;
     width: 100%;
    background: url('../../assets/logingBg.png') no-repeat 100% 100%;
    position: relative;
  }
  .login-form {
    position: absolute;
    left: 20%;
    top: 50%;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: -200px 0 0 0;
    background:#f5f5f5;
  }
  .tips {
    font-size: 14px;
    // color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      // font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
