<template>
  <div class="container">
    <van-cell-group>
      <div class="user_info">
        <img src="@/assets/images/photo.png" alt />
        <span>用户名：查理</span>
      </div>
      <van-cell title="修改密码" to="/changePassword" is-link size="large" />
      <van-cell title="我的订单" to="/myOrder" is-link size="large" />
      <van-cell title="地址管理" to="/addrs" is-link size="large" />
      <van-cell title="提交反馈" to="/coupleBack" is-link size="large" />
      <van-cell title="关于乐淘" value="v6.4.7" size="large" />
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup } from "vant";

export default {
  components: {
    "van-cell-group": CellGroup,
    "van-cell": Cell,
  },
  created() {
    this.$parent.title = "我的乐淘";
    this.$parent.active = 2;
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
}
</style>
