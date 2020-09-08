<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        offset="0"
        finished-text="不要拉了，没有更多了"
        @load="onLoad"
        class="list"
      >
        <van-cell class="item" :to="'/goodsDetails/'+item.id" v-for="item in goodsListData" :key="item.id">
          <div class="img_container">
            <img v-lazy="item.img_url" alt />
          </div>
          <div class="fooder">
            <div class="title">{{ item.title }}</div>
            <span class="price">￥{{ item.sell_price }}</span>
            <del class="buy">{{ item.market_price }}</del>
            <div class="hotAndStock">
              <span class="hot">热卖中</span>
              <span class="stock">剩 {{item.stock_quantity}} 件</span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getGoodsList } from "@/api/index.js";
import { Button, Toast, PullRefresh, List, Cell } from "vant";
export default {
  components: {
    "van-button": Button,
    "van-pull-refresh": PullRefresh,
    "van-list": List,
    "van-cell": Cell,
  },
  data() {
    return {
      goodsListData: [],
      index: 0,
      isMore: true,
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created() {
    this.$parent.title = "商品列表";
    this.$parent.active = -1;
    this.getGoodsListData();
  },
  methods: {
    //   获取商品列表数据
    async getGoodsListData() {
      // 判断是否有更多 false不再发送请求
      if (this.isMore) {
        this.index++;
        let { message } = await getGoodsList(this.index);
        if (message.length == 0) {
          this.isMore = false;
          this.finished = true;
          Toast("已加载完全部商品");
          return;
        }
        this.goodsListData = this.goodsListData.concat(message);
      } else {
        Toast("已加载完全部商品");
      }
    },
    // 加载更多
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          // 下拉刷新触发
          this.isMore = true;
          this.index = 0;
          this.goodsListData = [];
          this.refreshing = false;
        }
        // 页面每加载一次触发一次
        this.getGoodsListData();
        this.loading = false;

        if (!this.isMore) {
          // 加载完毕
          this.finished = true;
        }
      }, 1000);
    },
    // 重新加载
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .van-cell {
      padding: 0px;
    }

    .item {
      width: 46%;
      margin: 4px;
      overflow: hidden;
      border-radius: 10px;
      background-color: #fff;

      .van-cell__value {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .img_container {
        img {
          width: 100%;
        }
      }

      .fooder {
        padding: 0px 6px;

        .title {
          font-size: 12px;
          color: #333;

          // 1行溢出显示省略号
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .price {
          font-size: 16px;
          color: #f50;
          font-weight: 700;
          margin-left: 15px;
        }
        .buy {
          font-size: 14px;
          color: #999;
          margin-left: 30px;
        }

        .hotAndStock {
          .hot,
          .stock {
            font-size: 14px;
            color: #333;
            margin-left: 15px;
          }
        }
      }
    }
  }
}
</style>
