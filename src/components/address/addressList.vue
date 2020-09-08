<template>
  <div class="addrs_container">
    <van-empty
      v-if="list.length == 0"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="还没有收货地址哦,快去添加一个吧"
    />

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { AddressList, Toast, Empty } from "vant";
import { getaddress } from "@/api/index.js";
export default {
  components: {
    "van-address-list": AddressList,
    "van-empty": Empty,
  },
  created() {
    this.$parent.title = "收货地址";
    this.$parent.active = -1;
    this.getaddressData();
  },
  data() {
    return {
      chosenAddressId: "",
      list: [],
    };
  },
  methods: {
    onAdd() {
      this.$router.push("/addaddress");
    },
    onEdit(item, index) {
        item = JSON.stringify(item)
      this.$router.push(`/addressEdit/${item}`);
    },
    async getaddressData() {
      let userId = this.$store.state.userInfo.id;
      let list = await getaddress(userId);
      list.map((v) => {
        v.isDefault && (this.chosenAddressId = v.id);
        v.address = v.city + v.province + v.country + v.addressDetail;
      });
      list && (this.list = list);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
