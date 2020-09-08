<template>
  <div class="goods_container">
    <van-swipe class="my-swipe" v-if="goodsSwipe.length != 0" indicator-color="#ccc">
      <van-swipe-item v-for="item in goodsSwipe" :key="item.src">
        <img @click.stop="img_preview" :src="item.src" alt />
      </van-swipe-item>
    </van-swipe>

    <van-empty
      @click="clickEmpty"
      v-else
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="图片被外星人拐走了……"
    />

    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <van-icon v-if="isShowStar" class="star" name="star" color="red" size="20px" />
    </transition>

    <div class="goodsInfo common">
      <div class="title">{{goodsInfo.title}}</div>
      <van-divider />
      <div class="price">
        <del class="market_price">市场价：{{goodsInfo.market_price}}</del>
        <span class="sell_price_desc">本店价：</span>
        <span class="sell_price">￥{{goodsInfo.sell_price}}</span>
      </div>
      <div class="count">
        <span class="desc">购买数量：</span>
        <van-stepper v-model="goods_count" theme="round" button-size="24" disable-input />
      </div>
    </div>

    <div class="elseInfo common">
      <van-divider :style="{ color: '#969799', borderColor: '#969799' }">其他信息</van-divider>
      <div class="info">
        <div class="goodsNo">商品货号：{{goodsInfo.goods_no}}</div>
        <div class="stock_quantity">库存情况：{{goodsInfo.stock_quantity}}</div>
        <div class="add_time">上架时间：{{goodsInfo.add_time | timeFormat('YYYY-MM-DD')}}</div>
      </div>
    </div>

    <div class="introduce common">
      <van-divider :style="{ color: '#969799', borderColor: '#969799' }">介绍</van-divider>
      <div class="content" v-html="goodsInfo.content"></div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="$store.getters.getGoodsCount"
        to="/shopcar"
      />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button
        @click="add_shopcart(); isShowStar = !isShowStar"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import {
  Swipe,
  SwipeItem,
  Empty,
  Divider,
  Stepper,
  GoodsActionIcon,
  GoodsAction,
  GoodsActionButton,
  ImagePreview,
  Toast,
  Icon,
} from "vant";
import { getGoodsSwipe, getGoodsInfo } from "@/api/index.js";

export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsInfo: {},
      goodsSwipe: [],
      goods_count: 1,
      shopcartArr: [],
      isShowStar: false,
    };
  },
  components: {
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
    "van-empty": Empty,
    "van-divider": Divider,
    "van-stepper": Stepper,
    "van-goods-action-icon": GoodsActionIcon,
    "van-goods-action": GoodsAction,
    "van-goods-action-button": GoodsActionButton,
    "van-icon": Icon,
  },
  created() {
    this.$parent.title = "商品详情";
    this.$parent.active = -1;
    this.$parent.isHome = false;
    this.getGoodsSwipeDataAndInfo();
  },
  methods: {
    //   三个方法是加入购物车的动画过渡
    beforeEnter(el) {
      el.style.transform = "translate(0px, 120px)";
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.transform = "translate(-150px, 730px)";
      el.style.transition = "all 1.5s ease";
      done();
    },
    afterEnter(el) {
      this.isShowStar = !this.isShowStar;
    },
    // 获取商品轮播图和商品数据
    async getGoodsSwipeDataAndInfo() {
      let swipe = await getGoodsSwipe(this.id);
      let info = await getGoodsInfo(this.id);
      this.goodsInfo = info.message;
      this.goodsSwipe = swipe.message;
    },
    // 加入购物车
    add_shopcart() {
      let goods = {
        id: this.goodsInfo.id,
        goods_count: this.goods_count,
        price: this.goodsInfo.sell_price,
        select: true,
      };
      //   到仓库进行本地存储
      this.$store.commit("add_goods_car", goods);
    },
    // 商品详情图片预览
    async img_preview() {
      let { message } = await getGoodsSwipe(this.id);
      if (message.length == 0) {
        return;
      }
      let tempThum = [];
      message.map((v) => {
        tempThum.push(v.src);
      });
      ImagePreview(tempThum);
    },
    clickEmpty() {
      Toast("暂时没有图片哦");
    },
  },
};
</script>

<style lang="scss" >
.goods_container {
  display: flex;
  justify-content: center;
  padding: 5px 5px;
  background-color: rgb(241, 241, 241);
  flex-wrap: wrap;

  img {
    width: 100%;
    vertical-align: top;
  }

  .star {
    position: absolute;
  }

  .common {
    width: 100%;
    background-color: #fff;
    border-radius: 6px;
    margin-top: 10px;
    padding: 8px;
  }

  .my-swipe {
    width: 100%;
    height: 240px;
    background-color: #fff;
    border-radius: 6px;
    .van-swipe__track {
      .van-swipe-item {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 240px;
          height: 100%;
        }
      }
    }
  }

  .van-empty {
    width: 100%;
    padding: 0;
    background-color: #fff;
    border-radius: 6px;
  }

  .goodsInfo {
    .tiele {
      font-size: 16px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .price {
      font-size: 16px;
      color: #333;
      margin-bottom: 15px;

      .market_price,
      .sell_price_desc {
        margin-left: 20px;
      }

      .sell_price {
        color: #ff0000;
      }
    }

    .count {
      display: flex;
      margin-bottom: 10px;
      .desc {
        margin-left: 20px;
      }
    }
  }

  .elseInfo {
    font-size: 16px;
    color: #333;

    .van-divider {
      margin: 4px 0;
    }

    .info {
      margin-bottom: 10px;
    }
  }

  .introduce {
    .content {
      table {
        width: 100%;
      }
    }
  }

  .dot {
    width: 15px;
    height: 15px;
    background-color: rgb(255, 0, 0);
    border-radius: 50%;
  }
}
</style>
