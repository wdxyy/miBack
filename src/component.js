import Vue from 'vue'
export default (
  Vue.component('refresh-Btn', {
    template: `<el-button type="primary" @click="refresh()" icon="el-icon-refresh">刷新</el-button>`,
    methods: {
      refresh() {
        window.location.reload();
      }
    },
  }),
  Vue.component('back-Btn', {
    template: `<el-button type="primary" @click="back()" style="margin-left:35px" icon="el-icon-back">返回</el-button>`,
    methods: {
      back() {
        this.$router.go(-1)
      }
    },
  })

)

