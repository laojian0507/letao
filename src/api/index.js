
import instance from './config.js';

// 获取轮播图
export function getSwipe() {
    return instance.get("/getlunbo");
}

// 获取首页商品推荐
export function getRemGoodsList() {
    return instance.get("/recommend?limit=6");
}

// 获取商品列表
export function getGoodsList(index) {
    return instance.get(`/getgoods?pageindex=${index}`);
}

// 获取新闻列表
export function getNewsList(page = 1, pagesize = 10) {
    return instance.get(`/getnewslist?page=${page}&pagesize=${pagesize}`);
}

// 获取新闻详情
export function getNewsDetails(id) {
    return instance.get(`/getnew/${id}`);
}

// 获取新闻评论
export function getNewsComments(id, pageIndex) {
    return instance.get(`/getcomments/${id}?pageindex=${pageIndex}`);
}

// 添加新闻评论
export function addNewsComment(id, content) {
    return instance.post(`/postcomment/${id}`, content);
}

// 获取商品详情轮播图
export function getGoodsSwipe(id) {
    return instance.get(`/getthumbimages/${id}`);
}

// 获取商品详情
export function getGoodsInfo(id) {
    return instance.get(`/getgoodsinfo/${id}`);
}

// /getshopcarlist/89,93
// 获取购物车列表
// export function getGoodsInfo(id) {
//     return instance.get(`/getshopcarlist/${id}`);
// }

// 获取美图分类
export function getCategory() {
    return instance.get(`/getcategory`);
}

// 获取分类下的文章列表
export function getcatelist(id) {
    return instance.get(`/getcatelist/${id}`);
}

// 获取分类下的文章缩略图
export function getthumbimages(id) {
    return instance.get(`/getthumbimages/${id}`);
}

// // 获取分类下的文章缩略图
// export function getimageInfo(id) {
//     return instance.get(`/getimageInfo/${id}`);
// }


// 获取购物车列表
export function getshopcarlist(id) {
    return instance.get(`/getshopcarlist/${id}`);
}

// 用户登录
export function login(data) {
    return instance.post(`/login`,data);
}

// 判断是否登录
export async function isLogin() {
    let token = localStorage.getItem("token");
    try {
        //{status: 0, message: "ok"}
        let res = await instance.post(`/checktoken?token=${token}`);
        return res.status;
    }catch (e) {
        throw new Error("token解析错误");
    }
}


// 用户注册
export function register(data) {
    return instance.post(`/register`,data);
}

// export function getUserInfo() {
//     return JSON.parse(localStorage.getItem('userInfo') || "");
// }

// 用户添加收货地址
export function addaddress(userId, info) {
    return instance.post(`/addaddress/${userId}`, info);
}

// 获取用户收货地址
export function getaddress(userId) {
    return instance.get(`/getaddress/${userId}?v=${Math.random()}`);
}

// 编辑用户收货地址
export function updateaddress(addressId, info) {
    return instance.post(`/updateaddress/${addressId}`, info);
}

// 删除用户收货地址
export function deladdress(addressId) {
    return instance.post(`/deladdress/${addressId}`);
}


