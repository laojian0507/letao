<template>
  <div class="addrsEdit_container">
    <van-address-edit
      :address-info="address"
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { AddressEdit, Toast } from "vant";
import areaList from "@/utils/area.js";
import { updateaddress, deladdress, getaddress } from "@/api/index.js";

export default {
  components: {
    "van-address-edit": AddressEdit,
  },
  data() {
    return {
      address: {},
      areaList,
      address_id: "",
    };
  },
  created() {
    this.$parent.title = "编辑地址";
    this.$parent.active = -1;
    this.address = JSON.parse(this.$route.params.obj);
    this.address_id = this.address.id;
  },
  methods: {
    async onSave(val) {
      let userId = this.$store.state.userInfo.id;

      if (val.isDefault) {
        let list = await getaddress(userId);
        list.map(async (v) => {
          if (v.isDefault == 1) {
            v.isDefault = false;
            await updateaddress(v.id, v);
          }
        });
      }

      let { status, message } = await updateaddress(this.address_id, val);
      Toast(message);
      status == 0 && this.$router.push("/addressList");
    },
    async onDelete() {
      let { status, message } = await deladdress(this.address_id);
      Toast(message);
      status == 0 && this.$router.push("/addressList");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
