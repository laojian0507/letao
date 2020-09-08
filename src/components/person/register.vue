<template>
  <div class="register-container">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="repassword"
        type="password"
        name="repassword"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请确认密码' }]"
      />
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          native-type="submit"
        >注册</van-button>
      </div>

      <div class="toLogin">
        <router-link to="/login">已有账号？马上去登录</router-link>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button, Toast } from "vant";
import { register } from "@/api/index.js";

export default {
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
  },
  created() {
    this.$parent.title = "注册";
    this.$parent.active = -1;
    this.$parent.isHome = false;
  },
  data() {
    return {
      username: "",
      password: "",
      repassword: "",
    };
  },
  methods: {
    async onSubmit() {
      if (this.password.trim() !== this.repassword.trim()) {
        Toast("密码不一致，请重新尝试");
        return;
      }

      let obj = {
        username: this.username.trim(),
        password: this.password.trim(),
      };

      let { status, message } = await register(obj);
      Toast(message);
      if (status == 1) {
        return;
      }
      //   注册成功跳转登录 为了获取token
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  margin-top: 20px;

  .toLogin {
    text-align: center;
    color: rgba(133, 132, 132, 0.37);
  }
}
</style>
