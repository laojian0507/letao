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
import changePassword from "@/components/person/changePassword.vue";
import coupleBack from "@/components/person/coupleBack.vue";
import myOrder from "@/components/person/myOrder.vue";
import login from "@/components/person/login.vue";
import register from "@/components/person/register.vue";
import addressList from "@/components/address/addressList.vue";
import addressEdit from "@/components/address/addressEdit.vue";
import addaddress from "@/components/address/addaddress.vue";
// import test from "@/components/common/test.vue";

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
    {path: "/addressList", component: addressList},
    {path: "/changePassword", component: changePassword},
    {path: "/coupleBack", component: coupleBack},
    {path: "/myOrder", component: myOrder},
    {path: "/login", component: login},
    {path: "/register", component: register},
    {path: "/addressEdit/:obj", component: addressEdit},
    {path: "/addaddress", component: addaddress},
    // {path: "/test", component: test},
]

const router = new VueRouter({
  routes
})

// 路由守卫
// router.beforeEach((to, from, next) => {
//     if(to.path != '/home' && to.path != '/shopcar' && to.path != '/person'){
//         // Vue.nextTick(()=>{
//         //     console.log(Vue.title);
//         // })
//         // console.log(to);
//         // let hread = document.getElementsByClassName("header")[0]
//     }
//     // let header = document.getElementById("header");
//     // console.log(header);
//     next()
// })

export default router
