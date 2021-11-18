<template>
<!--  <div>login</div>-->
  <div>
    <div class="login" v-if="two">

      <el-form :model="loginForm" status-icon ref="loginForm" label-width="70px" class="login-form">
        <div style="font-size: xx-large!important;font-family: 华文行楷;padding: 20px">管理员登录</div>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="loginForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="loginForm.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="submitLoginForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {loginCheck}  from "../network/user";

export default {
  name: 'Login',
  data() {
    return {
      two: true,
      registerForm: {
        name: '',
        pwd: '',
        checkPwd: '',
      },
      loginForm: {
        name: 'admin',
        pwd: 'admin',
      },
    };
  },
  methods: {
    submitLoginForm(formName) {
      var that = this;
      loginCheck(that.loginForm).then(res => {
        // localStorage.setItem('name', response.data.details.id);
        // localStorage.setItem('pwd',response.data.details.username);
        console.log(res);
        if (res.data !== "") {
          console.log(res.data)
          localStorage.setItem('name', res.data[0].name);
          console.log(localStorage.getItem('name'));
          alert('登录成功!');
          // 将登录成功之后的token，保存到客户端的sessionStorage中
          window.sessionStorage.setItem('token', res.data.token)
          // 通过编程式导航跳转到后台首页，路由地址是/home
          that.$router.push('/home')
          // that.$router.replace('/home');
        } else {
          alert('登录失败!');
        }

      })

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
  .login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 705px;
    width: 100%;
    background-image: url("../assets/login.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }
  .login-form {
    width: 500px;
    background-color: rgba(223, 228, 234, 0.6);
    padding: 30px 30px 0px 20px;
    border-radius: 25px;
  }
</style>
