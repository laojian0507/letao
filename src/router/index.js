import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from "@/components/tabbar/home.vue";
import shopcar from "@/components/tabbar/shopcar.vue";
import person from "@/components/tabbar/person.vue";
import goodsDetails from "@/components/goods/goodsDetails.vue";
import goodsList from "@/components/menu/goodsList.vue";
import newsList from "@/components/menu/newsList.vue";
import pretty_pic from "@/components/menu/pretty_pic.vue";
import newsDetails from "@/components/menu/newsDetails.vue";
import addrs from "@/components/person/addrs.vue";
import changePassword from "@/components/person/changePassword.vue";
import coupleBack from "@/components/person/coupleBack.vue";
import myOrder from "@/components/person/myOrder.vue";
import login from "@/components/person/login.vue";
import addrsEdit from "@/components/person/addrsEdit.vue";

const routes = [
    {path: "/", redirect: '/home'},
    {path: "/home", component: home},
    {path: "/shopcar", component: shopcar},
    {path: "/person", component: person},
    {path: "/goodsDetails/:id", component: goodsDetails},
    {path: "/goodsList", component: goodsList},
    {path: "/newsList", component: newsList},
    {path: "/pretty_pic", component: pretty_pic},
    {path: "/newsDetails/:id", component: newsDetails},
    {path: "/addrs", component: addrs},
    {path: "/changePassword", component: changePassword},
    {path: "/coupleBack", component: coupleBack},
    {path: "/myOrder", component: myOrder},
    {path: "/login", component: login},
    {path: "/addrsEdit", component: addrsEdit},
]

const router = new VueRouter({
  routes
})

export default router
