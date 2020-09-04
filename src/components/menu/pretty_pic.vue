<template>
  <div class="container">
    <van-tree-select :items="items" @click-nav="navHandle" :main-active-index.sync="activeIndex">
      <template #content>
        <!-- <span>右侧下标{{activeIndex}}</span> -->
        <news v-if="isRender" @clickImg="look_thum" :itemChildren="items[activeIndex].children"></news>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import { TreeSelect, ImagePreview, Toast } from "vant";
import news from "@/components/common/news.vue";
import {
  getCategory,
  getcatelist,
  getthumbimages,
  getNewsDetails,
} from "@/api/index.js";

export default {
  components: {
    "van-tree-select": TreeSelect,
    news,
  },
  data() {
    return {
      items: [],
      activeIndex: 0,
      categoryList: [],
      isRender: false,
    };
  },
  created() {
    this.$parent.title = "美图欣赏";
    this.$parent.active = -1;
    this.getCategoryData();
  },
  methods: {
    async getCategoryData() {
      let { message } = await getCategory();
      let categoryId = message[0].id;
      message[0].children = await this.getcatelistData(categoryId);

      message.map((v) => {
        v.text = v.title;
        delete v.title;
      });
      this.items = message;
      //  获取数据后再渲染
      this.isRender = true;
    },
    async getcatelistData(id) {
      let { message } = await getcatelist(id);
      message.map((v) => {
        v.text = v.title;
      });
      return message;
    },
    async navHandle(index) {
      // 如果数据已存在则不重新加载
      if (this.items[index].children) {
        return;
      }
      this.isRender = false;
      let id = this.items[index].id;
      this.items[index].children = await this.getcatelistData(id);
      this.isRender = true;
    },
    async look_thum(id) {
      let { message } = await getthumbimages(id);
      if (message.length == 0) {
        Toast("暂时没图片哦");
        return;
      }
      let tempThum = [];
      message.map((v) => tempThum.push(v.src));
      ImagePreview(tempThum);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .van-tree-select {
    height: 100vh !important;
  }
}
</style>
