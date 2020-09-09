import axios from 'axios'
import { Toast } from "vant";
import router from "@/router/index.js"



const instance = axios.create({
    baseURL: "http://api.w0824.com/api",
})

instance.interceptors.request.use(function (config) {

    // 自定义请求头
    let token = localStorage.getItem('token') || "";
    token && (config.headers.token = token)

    // console.log(config);
    // console.log(config.url.indexOf('?'));
    // config.url.indexOf('?') > -1 ? config.url = config.url+`&v=${Math.random()}` : config.url = config.url+`?v=${Math.random()}`;
    // console.log(config.url);

    return config;
}, function (err) {
    return Promise.reject(err);
})

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (err) {
    var status = err.response.status;

    if (status == 401) {
        Toast("登录信息已过期，请重新登录");
        router.push('/login');
    } else {
        Toast("服务器繁忙，稍后再试");
    }
    // return Promise.reject(err);
})

export default instance;

