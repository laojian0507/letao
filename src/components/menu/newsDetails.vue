<template>
  <div class="container">
    <div class="news_container">
      <h3 class="title">{{news.title}}</h3>
      <div class="info">
        <span>发布时间：{{news.add_time | timeFormat }}</span>
        <span>阅读{{news.click}}次</span>
      </div>
      <van-divider :style="{ borderColor: 'rgb(175,175,175)', padding: '0 10px' }"></van-divider>
      <div class="content" v-html="news.content"></div>

      <!-- 评论文本框 -->
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="搞点事情呗"
        show-word-limit
      />
      <van-button type="primary" @click="submit_comment" color="rgb(48, 126, 229)" block>评论</van-button>

      <!-- 评论列表 -->
      <div class="comment_list">
        <van-pull-refresh animation-duration="1000" v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            offset="0"
            finished-text="不要拉了，没有更多了"
            @load="onLoad"
            class="list"
          >
            <van-cell class="item" v-for="item in comments" :key="item.id">
              <div class="content">{{item.user_name}}： {{item.content}}</div>
              <div class="time">评论时间：{{ item.add_time | timeFormat }}</div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getNewsDetails,
  getNewsComments,
  addNewsComment,
} from "@/api/index.js";
import { Divider, Field, Button, Toast, PullRefresh, List, Cell } from "vant";
import "@/utils/filters.js";
export default {
  components: {
    "van-divider": Divider,
    "van-field": Field,
    "van-button": Button,
    "van-pull-refresh": PullRefresh,
    "van-list": List,
    "van-cell": Cell,
  },
  data() {
    return {
      // 留言内容
      message: "",
      news: {},
      newsId: this.$route.params.id,
      pageIndex: 0,
      loading: false,
      finished: false,
      refreshing: false,
      isMore: true,
      comments: [],
    };
  },
  created() {
    this.$parent.title = "新闻详情";
    this.$parent.active = -1;
    this.getNewsDatails();
    this.getNewsCommentsData();
  },
  methods: {
    //   获取新闻详情数据
    async getNewsDatails() {
      let { message } = await getNewsDetails(this.newsId);
      this.news = message[0];
    },
    // 获取对应的评论
    async getNewsCommentsData() {
      if (this.isMore) {
        this.pageIndex++;
        let { message } = await getNewsComments(this.newsId, this.pageIndex);
        if (message.length == 0) {
          this.isMore = false;
          this.finished = true;
          Toast("没有更多啦");
          return;
        }
        this.comments = this.comments.concat(message);
      } else {
        Toast("没有更多啦");
      }
    },
    // 提交评论
    async submit_comment() {
      if (this.message.trim() == "") {
        Toast("不能空评论");
        return;
      }
      let { status, message } = await addNewsComment(this.newsId, {
        content: this.message,
      });
      if (status == 0) {
        Toast(message);
      } else {
        Toast("评论失败");
      }
    },
    // 下拉刷新
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          // 下拉刷新触发
          this.isMore = true;
          this.pageIndex = 0;
          this.comments = [];
          this.refreshing = false;
        }
        // 页面每加载一次触发一次
        this.getNewsCommentsData();
        this.loading = false;

        if (!this.isMore) {
          // 加载完毕
          this.finished = true;
        }
      }, 1000);
    },
    // 加载更多
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
  background-color: rgb(250, 249, 249);
  .news_container {
    padding: 0 10px;

    .title {
      text-align: center;
      font-size: 16px;
      color: #404040;
      padding: 10px 0px;
    }

    .info {
      font-size: 13px;
      color: #888;
      display: flex;
      justify-content: space-between;
    }

    .content {
      /deep/ img {
        width: 100%;
      }
    }

    .comment_list {
      .list {
        .van-cell {
          padding: 8px;
        }
        .item {
          background-color: rgb(232, 232, 232);
          margin: 10px 0px;
          font-size: 12px;
          color: #000;
        }
      }
    }
  }
}
</style>
