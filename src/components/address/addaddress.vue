<template>
  <div class="addrsEdit_container">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import { AddressEdit, Toast } from "vant";
import areaList from "@/utils/area.js";
import { addaddress, getaddress, updateaddress } from "@/api/index.js";
export default {
  components: {
    "van-address-edit": AddressEdit,
  },
  created() {
    this.$parent.title = "添加地址";
    this.$parent.active = -1;
    this.$parent.isHome = false;
  },
  data() {
    return {
      areaList,
    };
  },
  methods: {
    async onSave(val) {
      let userId = this.$store.state.userInfo.id;
      // 如果勾选默认地址
      if (val.isDefault) {
        let list = await getaddress(userId);
        list.map(async (v) => {
          if (v.isDefault == 1) {
            v.isDefault = 0;
            await updateaddress(v.id, v);
          }
        });
      }

      let { status, message } = await addaddress(userId, val);
      Toast(message);
      status == 0 && this.$router.push("/addressList");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
