<template>
  <div class="shopCart_container">
    <div class="empty_container" v-if="shopCart_data == '' ">
      <h3>
        亲，您的购物车空空如也，去
        <a href="#/home">首页</a>逛逛吧!
      </h3>
      <img src="@/assets/images/car.png" alt />
      <div>
        <a href="#/login">登录</a> 后可以同步电脑与手机购物车中的商品
      </div>
    </div>

    <div class="hasGoods" v-else>
      <van-divider :style="{ color: '##6f7370', borderColor: '#545e6c', padding: '0 16px' }">收货地址</van-divider>

      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />

      <van-divider :style="{ color: '##6f7370', borderColor: '#545e6c', padding: '0 16px' }">购买的商品</van-divider>

      <van-checkbox-group @change="changeChecked" v-model="select_result" ref="checkboxGroup">
        <div class="shop_item" v-for="(item, index) in my_cart_data" :key="item.id">
          <van-checkbox :name="item.id"></van-checkbox>
          <div class="img_container">
            <img :src="item.thumb_path" alt />
          </div>
          <div class="info">
            <div class="title">{{item.title}}</div>
            <div class="price_num">
              <span class="price">￥{{item.sell_price}}</span>
              <van-stepper
                @change="changeNum(item.id, $store.getters.getGoodsNumber[item.id])"
                v-model="$store.getters.getGoodsNumber[item.id]"
                theme="round"
                button-size="22"
                disable-input
              />
              <van-button type="danger" @click="dele_goods(item.id, index)">删除</van-button>
            </div>
          </div>
        </div>
      </van-checkbox-group>

      <van-divider
        content-position="left"
        :style="{ color: 'rgb(255, 0, 0)', borderColor: '#545e6c', padding: '0 16px' }"
      >共选中{{$store.getters.getSelectedGoodsNum}}件商品</van-divider>

      <van-cell>
        <img class="playIcon" src="@/assets/images/wxplay.jpg" alt />
        <span>微信支付</span>
      </van-cell>
      <van-cell>
        <img class="playIcon" src="@/assets/images/yinlian.jpg" alt />
        <span>银联支付</span>
      </van-cell>

      <van-submit-bar
        :price="$store.getters.getTotalPrice"
        button-text="提交订单"
        @submit="submitOrder"
      >
        <van-button
          type="primary"
          round
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          style="height:40px"
          @click="checkAll"
        >全选</van-button>
      </van-submit-bar>

      <!-- 弹窗 -->
      <van-popup v-model="show" closeable close-icon="close" :style="{ height: '30%' }" round />
    </div>
  </div>
</template>

<script>
import {
  Divider,
  AddressList,
  Toast,
  Switch,
  Button,
  Stepper,
  SubmitBar,
  Checkbox,
  Cell,
  CheckboxGroup,
  Popup,
} from "vant";
import { getshopcarlist } from "@/api/index.js";
export default {
  components: {
    "van-divider": Divider,
    "van-address-list": AddressList,
    "van-switch": Switch,
    "van-button": Button,
    "van-stepper": Stepper,
    "van-submit-bar": SubmitBar,
    "van-checkbox": Checkbox,
    "van-cell": Cell,
    "van-checkbox-group": CheckboxGroup,
    "van-popup": Popup,
  },
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "郑先生",
          tel: "13000000000",
          address: "广东省深圳市龙华区观澜街道旅游商务学校",
          isDefault: true,
        },
      ],
      checked: false,
      shopCart_data: this.$store.state.carData,
      my_cart_data: [], //真正的购物车数据
      select_result: [], //存储选中的商品的id
      show: false,
    };
  },
  methods: {
    onAdd() {
      Toast("新增地址");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    submitOrder() {
      Toast.loading({
        message: "生成订单中...",
        // 是否禁止背景点击
        forbidClick: true,
        // 加载图标类型
        loadingType: "spinner",
        // 是否显示背景遮罩层
        overlay: true,
        // 关闭时的回调函数
        // onClose: onClose(),
      });

    //   let _this = this;
    //   function onClose() {
    //     setTimeout(function () {
    //       _this.showPopup();
    //     }, 2000);
    //   }
    },
    // 展示弹窗
    showPopup() {
      this.show = true;
    },
    // 全选或反选
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(); //反选
      } else {
        this.$refs.checkboxGroup.toggleAll(true);
      }
      this.checked = !this.checked;
    },
    // 获取我的购物车商品
    async getMyCartData() {
      if (this.shopCart_data.length != 0) {
        let ids = this.$store.getters.getCarGoodsId;
        let { message } = await getshopcarlist(ids);
        this.my_cart_data = message;
      }
    },
    // 删除商品
    dele_goods(id, index) {
      this.$store.commit("dele_goods", id);
      this.my_cart_data.splice(index, 1);
    },
    // 默认选中商品
    checked_goods() {
      this.shopCart_data.forEach((v) => {
        if (v.select) {
          this.select_result.push(v.id);
        }
      });
    },
    // 修改商品数量
    changeNum(id, val) {
      this.$store.commit("changeGoodsNum", { id: id, goods_count: val });
    },
    // 修改商品选中状态
    changeChecked() {
      this.$store.commit("changeChecked", this.select_result);
    },
  },
  created() {
    this.$parent.title = "我的购物车";
    this.$parent.active = 1;
    this.$parent.isHome = true;
    this.getMyCartData();
    this.checked_goods();
  },
};
</script>

<style lang="scss" scoped>
.shopCart_container {
  background-color: #f1f1f1;
  padding: 10px 8px;
  margin-bottom: 100px;
  .empty_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;

    img {
      margin-bottom: 5px;
    }
  }

  .hasGoods {
    .van-divider {
      margin: 0;
    }

    .van-address-list {
      padding: 10px 0px;
      .van-address-list__bottom {
        display: none;
      }
    }

    .shop_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      -webkit-box-pack: justify;
      -webkit-box-align: center;
      background-color: #fff;
      padding: 12px;
      margin: 10px 0px 20px 0px;
      border-radius: 8px;

      .img_container {
        width: 50px;
        height: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 16px;
        color: #000;

        .title {
          width: 270px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .price_num {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          // -webkit-box-orient: horizontal;
          // -webkit-box-direction: normal;
          // -webkit-box-pack: justify;
          // -webkit-box-align: center;

          .price {
            color: #ff0000;
            font-weight: 700;
          }

          .van-button {
            width: 60px;
            height: 32px;
          }
        }
      }
    }

    .van-cell {
      border-radius: 8px;
      margin: 10px 0;
      .van-cell__value {
        display: flex;
        align-content: center;

        .playIcon {
          width: 30px;
          margin-right: 10px;
        }
      }
    }

    .van-submit-bar {
      margin-bottom: 50px;
    }
  }
}
</style>
