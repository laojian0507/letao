<template>
  <div>
    <van-tabs v-model="active" sticky>
      <van-tab title="全部订单">
        <van-card
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        >
          <template #tags>
            <van-tag plain type="danger">标签</van-tag>
            <van-tag plain type="danger">标签</van-tag>
          </template>
          <template #footer>
            <van-button size="mini" round>按钮</van-button>
            <van-button size="mini" round>按钮</van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待发货"></van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="已完成"></van-tab>
      <van-tab title="待评价"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Card, Tag, Button } from "vant";
export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-card": Card,
    "van-tag": Tag,
    "van-button": Button,
  },
  created() {
    this.$parent.title = "我的订单";
    this.$parent.active = -1;
  },
};
</script>

<style lang="scss" scoped>
</style>
