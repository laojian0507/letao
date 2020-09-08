<template>
  <div class="container">
    <van-cell-group>
      <div class="user_info">
        <img src="@/assets/images/photo.png" alt />
        <span>用户名：{{$store.state.userInfo.username}}</span>
      </div>
      <van-cell title="修改密码" to="/changePassword" is-link size="large" />
      <van-cell title="我的订单" to="/myOrder" is-link size="large" />
      <van-cell title="地址管理" to="/addressList" is-link size="large" />
      <van-cell title="提交反馈" to="/coupleBack" is-link size="large" />
      <van-cell title="关于乐淘" value="v6.4.7" size="large" />
    </van-cell-group>

    <!-- 底部退出登录 -->
    <van-tabbar class="loginOut">
      <van-button @click="loginOut" block>退出登录</van-button>
    </van-tabbar>
  </div>
</template>

<script>
import { Button, Cell, CellGroup, Tabbar, Toast, Dialog } from "vant";
import { isLogin } from "@/api/index.js";
export default {
  data() {
    return {
      userInfo: "",
    };
  },
  methods: {
    // 退出登录
    loginOut() {
      Dialog.confirm({
        message: "是否退出?",
      })
        .then(() => {
          // 清空本地存储
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          Toast("退出成功");
          this.$router.push("/home");
        })
        .catch(() => {
        });
    },
  },
  components: {
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    "van-tabbar": Tabbar,
  },
  created() {
    isLogin();
    this.$parent.title = "我的乐淘";
    this.$parent.active = 2;
    // 隐藏底部
    this.$parent.isHome = false;
  },
};
</script>

<style lang="scss" scoped>
.container {
  .van-cell-group {
    .user_info {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      img {
        width: 20%;
        margin-right: 100px;
      }

      div {
        font-size: 18px;
        color: #5d5555;
      }
    }
  }

  .loginOut {
    background-color: #fff;
    height: 44px;
  }
}
</style>
