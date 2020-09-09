<template>
  <div class="login-container">
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
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          native-type="submit"
        >登录</van-button>
      </div>

      <div class="toRegister">
        <router-link to="/register">新用户注册</router-link>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button, Toast } from "vant";
import { login } from "@/api/index.js";

export default {
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
  },
  created() {
    this.$parent.title = "登录";
    this.$parent.active = -1;
    this.$parent.isHome = false;
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(values) {
      let { message, status, token, userInfo } = await login(values);
      if (status == 0) {
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        this.$router.push("/home");
        // 登录成功修改store中的用户数据
        this.$store.commit('updataUserInfo', userInfo);
      }
      Toast(message);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  margin-top: 20px;

  .toRegister {
    text-align: center;
    color: rgba(138, 138, 138, 0.76);
  }
}
</style>
