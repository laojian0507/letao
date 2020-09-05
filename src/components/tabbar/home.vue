<template>
  <div class="home_container">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, i) in swipeData" :key="i">
        <img :src="item.img" alt />
      </van-swipe-item>
    </van-swipe>

    <!-- 菜单 -->
    <van-grid class="menu" :column-num="4" :border="false">
      <van-grid-item to="/goodsList">
        <img src="@/assets/images/menu10.png" alt />
        <span>数码电器</span>
      </van-grid-item>
      <van-grid-item to="/newsList">
        <img src="@/assets/images/menu19.png" alt />
        <span>乐淘头条</span>
      </van-grid-item>
      <van-grid-item to="/pretty_pic">
        <img src="@/assets/images/menu18.png" alt />
        <span>美图欣赏</span>
      </van-grid-item>
      <van-grid-item to="/test">
        <img src="@/assets/images/menu15.png" alt />
        <span>乐淘服饰</span>
      </van-grid-item>
      <van-grid-item>
        <img src="@/assets/images/menu13.png" alt />
        <span>乐淘超市</span>
      </van-grid-item>
      <van-grid-item>
        <img src="@/assets/images/menu12.png" alt />
        <span>9.9元拼单</span>
      </van-grid-item>
      <van-grid-item>
        <img src="@/assets/images/menu16.png" alt />
        <span>物流查询</span>
      </van-grid-item>
      <van-grid-item>
        <img src="@/assets/images/menu17.png" alt />
        <span>查看全部</span>
      </van-grid-item>
    </van-grid>

    <van-divider
      :style="{ color: '#333', borderColor: '#333', padding: '0 16px', fontSize: '16px' }"
    >为你推荐</van-divider>

    <div class="recGoods">
      <div
        class="goodItem"
        @click="skipGoodsDetails(item.id)"
        v-for="item in goodsListData"
        :key="item.id"
      >
        <!-- 指令实现懒加载 -->
        <img v-lazy="item.img_url" alt />

        <div class="fooder">
          <div class="title">{{ item.title }}</div>
          <span class="price">￥{{ item.sell_price }}</span>
          <span class="buy">{{ item.buy }}购买</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Divider,
  Sticky,
  Search,
} from "vant";
import { getSwipe, getRemGoodsList } from "@/api/index.js";
export default {
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-grid": Grid,
    "van-grid-item": GridItem,
    "van-divider": Divider,
    "van-sticky": Sticky,
    "van-search": Search,
  },
  data() {
    return {
      swipeData: [],
      goodsListData: [],
    };
  },
  methods: {
    async getSwipeData() {
      if (this.swipeData.length == 0) {
        var res = await getSwipe();
        this.swipeData = res.message;
      }
    },
    async getGoodsListData() {
      if (this.goodsListData.length == 0) {
        var res = await getRemGoodsList();
        this.goodsListData = res.message;
      }
    },
    skipGoodsDetails(id) {
      this.$router.push(`/goodsDetails/${id}`);
    },
  },
  created() {
    this.getSwipeData();
    this.getGoodsListData();
    this.$parent.title = "首页";
    this.$parent.active = 0;
    this.$parent.isHome = true;
  },
};
</script>

<style lang="scss" scoped>
.home_container {
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

  .my-swipe {
    height: 200px;
    .van-swipe-item {
      img {
        height: 200px;
        width: 100%;
      }
    }
  }

  .menu {
    .van-grid-item {
      img {
        width: 44px;
      }
      span {
        font-size: 16px;
        color: #524949;
        margin-top: 6px;
      }
    }
  }

  .recGoods {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .goodItem {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 46%;
      margin: 4px;
      overflow: hidden;
      border-radius: 10px;
      background-color: #fff;

      img {
        width: 100%;
      }

      .fooder {
        padding: 0px 6px;
        .title {
          font-size: 12px;
          color: #333;
        }
        .price {
          font-size: 16px;
          color: #f50;
          margin-left: 15px;
          font-weight: 700;
        }
        .buy {
          font-size: 14px;
          color: #999;
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
