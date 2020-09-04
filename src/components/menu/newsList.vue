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
        <van-cell class="items" :to="'/newsDetails/'+item.id"  v-for="item in newsListData" :key="item.id">
          <div class="img_container">
            <img v-lazy="item.img_url" alt />
          </div>
          <div class="info_container">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <span class="time">发布时间：{{ item.add_time | timeFormat('YYYY-MM-DD') }}</span>
              <span class="click">阅读数:{{ item.click }}</span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Button, Toast, PullRefresh, List, Cell } from "vant";
import { getNewsList } from "@/api/index.js";
import "@/utils/filters.js";

export default {
  components: {
    "van-pull-refresh": PullRefresh,
    "van-list": List,
    "van-cell": Cell,
  },
  data() {
    return {
      newsListData: [],
      loading: false,
      finished: false,
      refreshing: false,
      isMore: true,
      page: 0,
      pageSize: 8,
    };
  },

  methods: {
    async getNewsListData() {
      if (this.isMore) {
        this.page++;
        let { message } = await getNewsList(this.page, this.pageSize);
        if (message.length == 0) {
          this.isMore = false;
          this.finished = true;
          Toast("没有更多啦");
          return;
        }
        this.newsListData = this.newsListData.concat(message);
      } else {
        Toast("没有更多啦");
      }
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          // 下拉刷新触发
          this.isMore = true;
          this.page = 0;
          this.newsListData = [];
          this.refreshing = false;
        }
        // 页面每加载一次触发一次
        this.getNewsListData();
        this.loading = false;

        if (!this.isMore) {
          // 加载完毕
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  created() {
    this.$parent.title = "新闻列表";
    this.$parent.active = -1;
    this.getNewsListData();
  },
};
</script>

<style lang="scss" scoped>
.container {
  .list {
    .items {
      background-color: rgb(238, 238, 238);
      padding: 2px 5px;
      border-bottom: 1px solid #ccc;
      .van-cell__value {
        display: flex;

        .img_container {
          width: 100px;
          height: 100px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .info_container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 6px;
          .title {
            font-size: 13px;
            font-weight: 700;
            margin: 8px 5px;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          .info {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #888;

            .time {
              margin-left: 5px;
            }
            .click {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
