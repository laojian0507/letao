<template>
  <div class="container">
    <!-- 头部 -->
    <!-- sticky吸顶 -->
    <van-sticky>
      <div id="header" class="header" v-if="active == 0">
        <img src="@/assets/images/logo.png" alt />
        <van-search placeholder="请输入搜索关键词" />
      </div>
      <!-- $router.go(-1) -->
      <van-nav-bar v-else :title="title" left-text="返回" @click-left="goBack" left-arrow></van-nav-bar>
    </van-sticky>

    <!-- 中间 -->
    <router-view></router-view>

    <!-- 首页底部 -->
    <van-tabbar v-model="active" v-show="isHome" route>
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item
        to="/shopcar"
        :badge="$store.getters.getGoodsCount"
        icon="shopping-cart-o"
      >购物车</van-tabbar-item>
      <van-tabbar-item to="/person" icon="user-o">我的乐淘</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Icon,
  Sticky,
  Search,
  GoodsActionIcon,
  GoodsAction,
  GoodsActionButton,
} from "vant";

export default {
  components: {
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
    "van-nav-bar": NavBar,
    "van-icon": Icon,
    "van-sticky": Sticky,
    "van-search": Search,
    "van-goods-action-icon": GoodsActionIcon,
    "van-goods-action": GoodsAction,
    "van-goods-action-button": GoodsActionButton,
  },
  data() {
    return {
      active: 0,
      title: "",
      isHome: true,
    };
  },
  methods: {
    goBack() {
      if (this.title === "收货地址") {
        this.$router.push("/person");
      } else if (this.title === "我的乐淘") {
        this.$router.push("/home");
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 750px;
  min-width: 320px;
  margin: auto;
  margin-bottom: 50px;

  .header {
    display: flex;
    align-items: center;
    background-color: #fff;

    img {
      height: 44px;
      margin-left: 4px;
    }

    .van-search {
      flex: 1;
    }
  }
}
</style>
