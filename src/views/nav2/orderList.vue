<template>
  <section>
    <!--工具条-->
    <el-row class="toolbar" style="padding-bottom: 0px;">
      <el-col :span="22">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-select v-model="prov" placeholder="选择省份" @change="selectProvince">
              <el-option v-for="(item,i) in provArr" :label="item.sf" :value="item.id" :key="i">
              </el-option>
            </el-select>
            <el-select v-model="filters.cityName" placeholder="选择城市" @change="selectOrder">
              <el-option v-for="(v,key,i) in cityObj" :label="v" :key="i" :value="v">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="filters.startTime" type="date" placeholder="开始日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="filters.endTime" type="date" placeholder="截止日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="selectOrder" class="el-icon-search"></el-button>
          </el-form-item>
          <refresh-Btn></refresh-Btn>
        </el-form>
      </el-col>
      <el-col :span="2">
        <back-Btn></back-Btn>
      </el-col>
    </el-row>
    <!--列表-->
    <!-- -->
    <el-table ref="multipleTable" border :data="orderArr" highlight-current-row @selection-change="selsChange" style="width: 100%;" v-loading="loading">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="realName" label="姓名" width="120" align="center">
      </el-table-column>
      <el-table-column prop="address" label="城市" width="180" align="center">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="150" align="center">
      </el-table-column>
      <el-table-column prop="loanAmount" label="贷款金额（万）" width="120" align="center">
      </el-table-column>
      <el-table-column prop="loanTerm" label="周期（月）" min-width="80" align="center">
      </el-table-column>
      <el-table-column prop="price" label="价格（金币）" min-width="80" align="center">
      </el-table-column>
      <el-table-column prop="loanUseType" label="用途" min-width="120" align="center">
      </el-table-column>
      <el-table-column prop="applyTime" label="申请时间" min-width="150" align="center" :formatter="filterDate">
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="toDetail(scope.row.id)" type="primary">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="primary" @click="buy()" :disabled="this.sels.length===0">购买</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="filters.pageNum" :page-size="filters.pageSize" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <router-view></router-view>
  </section>
</template>

<script>
import util from "../../common/js/util";
import { orderList, buyOrder } from "../../api/api";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import City from "../../bdata/map.json";
export default {
  data() {
    return {
      filters: {
        cityName: "",
        startTime: "",
        endTime: "",
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      prov: "",
      provArr: [],
      cityObj: {},
      sels: [], //列表选中列
      orderArr: [],
      loading: true
    };
  },
  methods: {
    // 获得省份
    getProvince() {
      for (var prop in City) {
        if (prop.endsWith("0000")) {
          var obj = { id: prop, sf: City[prop] };
          this.provArr.push(obj);
        }
      }
    },
    // 选择省份
    selectProvince() {
      this.cityObj = {};
      for (var prop in City) {
        if (
          prop.startsWith(this.prov.substr(0, 2)) &&
          prop.endsWith("00") &&
          prop != this.prov
        ) {
          this.cityObj[prop] = City[prop];
          this.filters.cityName = "";
        }
      }
    },
    // 获得订单
    getOrder() {
      // 处理时间
      this.filters.startTime = this.common.formatDate.format(
        this.filters.startTime
      );
      this.filters.endTime = this.common.formatDate.format(
        this.filters.endTime
      );
      console.log(this.filters);
      orderList(this.filters).then(res => {
        this.loading = false;
        this.orderArr = res.list;
        this.total = res.total;
      });
    },
    // 搜索
    selectOrder() {
      this.filters.pageNum = 1;
      this.getOrder();
    },
    // 处理日期
    filterDate(row, col) {
      var d = row.applyTime;
      return d && new Date(d).toLocaleDateString().replace(/\//g, "-");
    },
    //分页
    handleCurrentChange(val) {
      this.filters.pageNum = val;
      this.getOrder();
    },
    //详情
    toDetail: function(id) {
      this.$router.push({ path: "orderDetail", query: { id: id } });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    // 购买
    buy() {
      let ids = "";
      var price = 0;
      var length = this.sels.length;
      if (length > 1) {
        price = this.sels.reduce((prev, next) => {
          prev = this.sels.indexOf(prev) > -1 ? prev.price : prev;
          return prev + next.price;
        });
      } else {
        price = this.sels[0].price;
      }
      ids = this.sels
        .map(item => {
          return item.id;
        })
        .join(",");
      this.$confirm("确定立即购买？", `需支付  ${price}积分`, {
        center: true,
        cancelButtonClass: "buyBtn",
        confirmButtonClass: "buyBtn"
      })
        .then(() => {
          buyOrder(ids).then(res => {
            if (res) {
              this.$confirm(`获得${length}枚优质客户名单`, "抢单成功", {
                center: true,
                cancelButtonText: "继续抢单",
                confirmButtonText: "查看我的客户",
                cancelButtonClass: "buyBtn",
                confirmButtonClass: "buyBtn"
              })
                .then(() => {
                  this.$router.push("userList");
                })
                .catch(() => {
                  this.$router.push("orderlist");
                });
            }
            this.$refs.multipleTable.clearSelection();
          });
        })
        .catch(() => {
          this.$refs.multipleTable.clearSelection();
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (from.path == "/orderDetail" || to.path == "/orderDetail") {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
    next();
  },
  mounted() {
    // 获得省份
    this.getProvince();
    this.getOrder();
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>