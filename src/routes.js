import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Indexs from './views/Index.vue'
import orderList from './views/nav2/orderList.vue'
import orderDetail from './views/nav2/orderDetail.vue'
import billRecord from './views/nav2/billRecord.vue'
import userList from './views/nav1/userList'
import userDetail from './views/nav1/userDetail'

let routes = [{
    path: '/login',
    component: Login,
    name: '',
    hidden: true,
    meta: { title: '米链抢单系统' }
}, {
    //{ path: '/main', component: Main }, {
    path: '/',
    component: Home,
    name: '',
    hidden: true,
    children: [{ path: '/main', component: Main, name: '主页', hidden: true },
    ]
}, {
    path: '/',
    component: Home,
    name: '首页',
    leaf: true, //只有一个节点
    iconCls: 'el-icon-message', //图标样式class
    children: [{ path: '/index', component: Indexs, name: '首页', meta: { title: '米链抢单系统' } },
    { path: '/orderlist', component: orderList, name: '抢单', meta: { keepAlive: true, title: '米链抢单系统' } },
    { path: '/orderDetail', component: orderDetail, name: '抢单详情', meta: { title: '米链抢单系统' } },
    { path: '/billRecord', component: billRecord, name: '交易详情', meta: { title: '米链抢单系统' } },
    ]
}, {
    path: '/',
    component: Home,
    name: '我的客户',
    iconCls: 'el-icon-edit-outline',
    leaf: true, //只有一个节点
    children: [{ path: '/userList', component: userList, name: '客户列表', meta: { keepAlive: true, title: '米链抢单系统' } }, { path: '/userDetail', component: userDetail, name: '客户详情', meta: { title: '米链抢单系统' } },
    ]
}
];

export default routes; 