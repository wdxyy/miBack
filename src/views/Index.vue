<template>
    <div>
        <el-row type="flex" justify="space-around">
            <el-col :span="8">
                <el-card :body-style="{padding:'0 20px'}">
                    <div slot="header">
                        <span>个人信息</span>
                    </div>
                    <el-row type="flex" justify="space-between" style="padding:20px 0;borderBottom:1px solid #efefef">
                        <el-col :span="7" type="flex">
                            <el-row type="flex">
                                <el-col :span="10"><img :src="info.headImg" alt="" width="50" height="50"></el-col>
                                <el-col :span="14" style="margin:auto 0">
                                    <div class="uname">
                                        <strong>{{info.realName||'暂无'}}</strong>
                                    </div>
                                    <div>{{info.mobile|filterTel}}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" style="text-align:right;margin:auto 0">
                            <div>我的金币
                                <strong>{{info.account}}</strong>
                            </div>
                            <router-link to="/billRecord" tag="div" style="color:#169BD5" class="todetail">交易详情 ></router-link>
                            <div></div>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="space-around" style="padding:40px 0">
                        <el-col :span="5" style="text-align:center">
                            <div class="nums">{{orderObj.orderNum}}</div>
                            <div>订单总数</div>
                        </el-col>
                        <el-col :span="5" style="text-align:center">
                            <div class="nums">{{orderObj.followNum}}</div>
                            <div>未处理单数</div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div slot="header">
                        <span>快捷入口</span>
                    </div>
                    <div class="toList">
                        <router-link to="/orderList" tag="div"><img src="../assets/qd.png" alt="">
                            <span>抢单</span>
                        </router-link>
                        <router-link to="/userList" tag="div"><img src="../assets/kh.png" alt="">
                            <span>客户</span>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="marginTop:70px">
            <el-col :span="20" :offset="2">
                <el-card>
                    <div slot="header">
                        <span>说明</span>
                    </div>
                    <div class="note">1. 本平台订单均来自信贷360APP的特价单，特价单暂不支持退单服务</div>
                    <div class="note">2. 可在米链抢单公众号上进行注册-认证-充值-抢单</div>
                    <div class="note">3. 公众号上抢单支持手动抢单和自动抢单，自动抢单可以在公众号菜单栏设置</div>
                    <div class="note">4. 抢单成功后公众号会有相关交易推送消息提醒</div>
                    <div class="note">5. PC端后台支持抢单和批量导出订单</div>
                    <div class="note">6. 可通过微信公众号“米链抢单”联系客服</div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { tjOrder } from "../api/api";
export default {
  data() {
    return {
      orderObj: {}
    };
  },
  props: ["info"],
  filters: {
    filterTel(v) {
      return v.replace(v.substr(3, 3), "***");
    }
  },
  methods: {
    orderSum() {
      tjOrder().then(res => {
        this.orderObj = res;
      });
    }
  },
  mounted() {
    this.orderSum();
  }
};
</script>

<style scoped>
.el-card__header span {
  font-weight: bold;
}
.note {
  line-height: 46px;
}
.todetail {
  cursor: pointer;
  font-weight: bold;
  margin-top: 5px;
  margin-right: 5px;
}
.toList {
  display: flex;
}
.toList > div {
  cursor: pointer;
  font-weight: bold;
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: center;
}
.toList img {
  width: 65px;
  height: 65px;
}
.toList span {
  display: inline-block;
  margin-top: 5px;
  font-size: 18px;
}
.nums {
  font-weight: bold;
  font-size: 22px;
}
</style>