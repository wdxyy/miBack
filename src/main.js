import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'

//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
// 公共的js
import Util from "./common/js/util";
import './component'
Vue.prototype.common = Util

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
var vm = new Vue({})

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.path == '/login') {
    sessionStorage.getItem('user') && sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
    vm.$message({
      message: '请先登录',
      type: 'warning',
    })
  } else {
    next()
  }
})
//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

