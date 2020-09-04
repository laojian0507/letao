<template>
  <div class="news_container">
    <van-cell
      class="items"
      :to="'/newsDetails/'+item.id"
      v-for="item in itemChildren"
      :key="item.id"
    >
      <div class="img_container">
        <img @click.stop="click_img(item.id)" v-lazy="item.img_url" alt />
      </div>
      <div class="info_container">
        <div class="title">{{ item.title }}</div>
        <div class="info">
          <span class="zhaiyao">{{item.zhaiyao}}</span>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { Cell } from "vant";

export default {
  props: ["itemChildren"],

  components: {
    "van-cell": Cell,
  },
  methods: {
    click_img(id) {
      this.$emit("clickImg", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.news_container {
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

          .zhaiyao {
            margin-left: 5px;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>
