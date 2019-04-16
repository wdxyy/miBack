import axios from 'axios';
import { Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 测试地址
// axios.defaults.baseURL = 'http://192.168.0.73:80';
// 线上地址
axios.defaults.baseURL = 'http://cus.qkjinrong.cn';
// 服务器错误
const httpError = function () {
    Message({
        message: "服务器有误，请稍后重试",
        type: 'error'
    })
    location.href = "/#/login"
}
// 服务器正常
var result = function (res, str) {
    {
        if (res.data.success) {
            return res.data.data || res.data.success;
        } else {
            if (res.data.code == -2) {
                setTimeout(() => {
                    MessageBox.confirm('请先前往米链抢单公众号进行实名认证', '未认证', {
                        center: true,
                        confirmButtonText: '确定',
                        confirmButtonClass: "buyBtn",
                        showCancelButton: false
                    })
                }, 300)
            } else {
                if (res.data.code == 0) {
                    location.href = "/#/login"
                }
                Message({
                    message: res.data.msg,
                    type: "error"
                });
            }
        }
    }
}
// 用户登录
export const requestLogin = data => { return axios.post('/api/core/login2', data).then(res => result(res)).catch(() => httpError()) };
// 获得该用户的信息
export const getUserInfo = () => { return axios.get('/core/admin/selectLoginAdmin').then(res => result(res)).catch(() => httpError()) };
// 退出登录
export const loginOut = () => { return axios.get('/api/core/logout').then(res => result(res)).catch(() => httpError()) }
// 个人订单统计
export const tjOrder = () => { return axios.get('/api/coreUser/statistics').then(res => result(res)).catch(() => httpError()) }
// 查询客户列表
export const userList = data => { return axios.post('/api/loanAaOrdersList/myOrders', data).then(res => result(res)).catch(() => httpError()) }
// 客户标签列表
export const userLabel = data => { return axios.get('/api/loanAaOrders/findLabel', data).then(res => result(res)).catch(() => httpError()) }
// 客户详情
export const userDetail = id => { return axios.get('/api/loanAaOrdersList/findMyOrderDetails?id=' + id).then(res => result(res)).catch(() => httpError()) }
// 订单列表
export const orderList = data => { return axios.post('/api/loanAaOrdersList/findList', data).then(res => result(res)).catch(() => httpError()) }
// 订单详情
export const orderDetail = id => { return axios.get('/api/loanAaOrdersList/findOrderDetails?id=' + id).then(res => result(res)).catch(() => httpError()) }
// 积分记录
export const billRecord = data => { return axios.post('/api/loanAaOrdersList/billDetails', data).then(res => result(res)).catch(() => httpError()) }
// 添加跟进记录
export const addFollowUpRecord = data => { return axios.post('/api/loanAaOrders/addFollowUpRecord', data).then(res => result(res)).catch(() => httpError()) }
// 批量抢单
export const buyOrder = ids => { return axios.get('/api/loanAaOrdersList/buyOrders?ids=' + ids).then(res => result(res)).catch(() => httpError()) }

