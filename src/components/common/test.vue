<template>
  <div>
    <button @click="isShowStar = !isShowStar">点击</button>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <van-icon v-if="isShowStar" class="star" name="star" color="red" size="20px" />
    </transition>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  components: {
    "van-icon": Icon,
  },
  data() {
    return {
      isShowStar: false,
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.transform = "translate(0px, 0px)";
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.transform = "translate(150px, 450px)";
      el.style.transition = "all 1s ease";
      done();
    },
    afterEnter(el) {
      this.isShowStar = !this.isShowStar;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
