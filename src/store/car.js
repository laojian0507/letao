
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var myCarData = JSON.parse(localStorage.getItem("mycart") || "[]")
const store = new Vuex.Store({
    state: {
        carData: myCarData,
    },
    mutations: {
        // 添加商品
        add_goods_car(state, goods) {
            var index = state.carData.findIndex(
                (obj) => obj.id == goods.id
            );
            if (index !== -1) {
                state.carData[index].goods_count += goods.goods_count;
            } else {
                state.carData.push(goods);
            }
            localStorage.setItem("mycart", JSON.stringify(state.carData));
        },
        // 删除商品
        dele_goods(state, id) {
            var index = state.carData.findIndex(
                (obj) => obj.id == id
            );
            state.carData.splice(index, 1);
            localStorage.setItem("mycart", JSON.stringify(state.carData));
        },
        // 改变商品数量
        changeGoodsNum (state ,obj) {
            var index = state.carData.findIndex(
                (obj) => obj.id == obj.id
            );
            state.carData[index].goods_count = obj.goods_count
            localStorage.setItem("mycart", JSON.stringify(state.carData));
        },
        /* 改变商品选中状态 */
        changeChecked(state, arr) {
            state.carData.forEach( v => {
                let index = arr.indexOf(v.id)
                // 表示该id存在数组中
                if(index != -1){
                    v.select = true;
                }else {
                    v.select = false;
                }
            })
            localStorage.setItem("mycart", JSON.stringify(state.carData));

        }

    },
    getters: {
        // 获取商品总数
        getGoodsCount(state) {
            let total = 0;
            // 购物车没商品则不循环
            if (state.carData.length == 0) {
                return total;
            } else {
                state.carData.forEach(v => {
                    total += v.goods_count;
                })
            }
            return total;
        },
        // 获取选中的商品总价，除开价格为null
        getTotalPrice(state) {
            let totalPrice = 0;
            state.carData.forEach(v => {
                if (v.select && v.price != null) {
                    totalPrice += parseInt(parseInt(v.goods_count) * parseInt(v.price))
                }
            })
            return totalPrice * 100;
        },
        // 拼接购物车商品id
        getCarGoodsId(state) {
            let idArr = [];
            state.carData.forEach((v) => {
                idArr.push(v.id)
            });
            return idArr.join(',')
        },
        // 根据购物车id获取购物车商品的数量
        getGoodsNumber (state) {
            let obj = {};
            state.carData.forEach((v) => {
                obj[v.id] = v.goods_count;
            });
            return obj;
        },
        // 获取选中的购物车商品总数量
        getSelectedGoodsNum(state) {
            let selectNum = 0;
            if(state.carData.length == 0){
                return selectNum;
            }else {
                state.carData.forEach( v=> {
                    if(v.select){
                        selectNum += v.goods_count;
                    }
                })
            }
            return selectNum;
        }

    }
})

export default store;
