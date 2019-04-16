<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.realName" placeholder="姓名" @keyup.enter.native="getUsers(true)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="filters.startTime" type="date" placeholder="开始日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="filters.endTime" type="date" placeholder="截止日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.cityName" placeholder="城市" @keyup.enter.native="getUsers(true)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filters.qualification" multiple collapse-tags style="margin-left: 20px;" placeholder="资质">
            <el-option label="有社保" value="有社保"></el-option>
            <el-option label="有公积金" value="有公积金"></el-option>
            <el-option label="有房产" value="有房产"></el-option>
            <el-option label="有个人保险" value="有个人保险"></el-option>
            <el-option label="信用良好" value="信用良好"></el-option>
            <el-option label="有车产" value="有车产"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers(true)" class="el-icon-search"></el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTotal ">导出</el-button>
        </el-form-item>
        <el-form-item>
          <refresh-Btn/>
        </el-form-item>
        <el-form-item style="float:right">
          共计
          <strong>{{total}}</strong> 个客户
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <!-- -->
    <el-table :data="users" border highlight-current-row style="width: 100%;" v-loading="loading">

      <el-table-column prop="realName" label="姓名" width="100" align="center">
      </el-table-column>
      <el-table-column prop="address" label="城市" width="180" align="center">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="130" align="center">
      </el-table-column>
      <el-table-column prop="loanAmount" label="贷款金额" width="80" align="center">
      </el-table-column>
      <el-table-column prop="loanTerm" label="周期" min-width="80" align="center">
      </el-table-column>
      <el-table-column prop="loanUseType" label="用途" min-width="160" align="center">
      </el-table-column>
      <el-table-column prop="aptitude" label="资质" min-width="300" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="购买时间" min-width="150" align="center" :formatter="filterDate">
      </el-table-column>
      <el-table-column label="状态" min-width="180" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.lastFollowLabel" style="width:70%;display:flex;justify-content:space-between;margin:0 auto">
            <span style="line-height:32px">{{scope.row.lastFollowLabel}}</span>
            <el-button style="margin-left:5px" size="small" type="primary" class="el-icon-plus" @click="editLabel(scope.$index,scope.row)"></el-button>
          </div>
          <div v-if="!scope.row.lastFollowLabel" style="width:70%;display:flex;justify-content:space-between;margin:0 auto">
            <span style="line-height:32px">未处理</span>
            <el-button style="margin-left:5px" size="small" type="primary" class="el-icon-plus" @click="editLabel(scope.$index,scope.row)"></el-button>
          </div>

        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="toDetail(scope.row.id)" type="primary">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :current-page="filters.pageNum" :page-size="filters.pageSize" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <!--跟进结构-->
    <el-dialog title="跟进结果" width="40%" :visible.sync="showLabel" :close-on-click-modal="false">
      <template>
        <el-radio-group v-model="checked">
          <el-radio style="margin-bottom:20px" v-for="(item,i) in resultArr" :key="i" :label="item" border size="medium">{{item.text}}</el-radio>
        </el-radio-group>
      </template>
      <div style="margin-top:20px">
        <el-input type="textarea" focus :rows="4" placeholder="添加备注，可不填" v-model="textarea"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="showLabel = false">取消</el-button>
        <el-button type="primary" @click.native="labelSubmit">提交</el-button>
      </div>
    </el-dialog>
    <router-view></router-view>
    <!-- 导出表格 -->
    <table id="outTable" v-show="false">
      <tr>
        <td>姓名</td>
        <td>城市</td>
        <td>手机号</td>
        <td>贷款金额</td>
        <td>周期</td>
        <td>用途</td>
        <td>资质</td>
        <td>购买时间</td>
        <td>状态</td>
      </tr>
      <tr v-for="(item,i) in totalUser" :key="i">
        <td>{{item.realName}}</td>
        <td>{{item.address}}</td>
        <td>{{item.mobile}}</td>
        <td>{{item.loanAmount}}</td>
        <td>{{item.loanTerm}}</td>
        <td>{{item.loanUseType}}</td>
        <td>{{item.aptitude}}</td>
        <td v-text="filterDate(item)"></td>
        <td>{{item.lastFollowLabel}}</td>
      </tr>
    </table>
  </section>
</template>

<script>
import util from "../../common/js/util";
import {
  userList,
  userListTotal,
  userLabel,
  addFollowUpRecord
} from "../../api/api";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      filters: {
        startTime: "", //开始时间
        endTime: "", //截止时间
        realName: "", //姓名
        cityName: "", //城市
        qualification: [], //资质
        pageNum: 1,
        pageSize: 10
      },
      labelObj: {
        orderId: "",
        mark: "",
        spell: "",
        hostInfoTime: "",
        tipText: ""
      },
      users: [],
      totalUser: [],
      total: 0,
      sels: [], //列表选中列
      showLabel: false,
      textarea: "",
      resultArr: [],
      checked: {},
      loading: true
    };
  },
  methods: {
    // 跟进记录
    editLabel(index, row) {
      this.textarea = "";
      this.showLabel = true;
      this.labelObj.orderId = row.orderId;
      this.getLabel();
    },
    // 跟进记录--获得标签
    getLabel() {
      userLabel().then(res => {
        this.resultArr = res.labellists;
      });
    },
    // 提交跟进记录
    labelSubmit() {
      this.labelObj.hostInfoTime = new Date()
        .toLocaleDateString()
        .replace(/\//g, "-");
      this.labelObj.mark = this.checked.value;
      this.labelObj.spell = this.checked.spell;
      this.labelObj.tipText = this.textarea;
      addFollowUpRecord(this.labelObj).then(res => {
        if (res) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.showLabel = false;
          this.getUsers();
        }
      });
    },
    // 导出表
    getTotal() {
      let obj = {};
      Object.assign(obj, this.filters);
      obj.pageSize = this.total;
      userList(obj).then(res => {
        this.totalUser = res.orderlists;
        setTimeout(() => {
          this.exportExcel();
        }, 300);
      });
    },
    exportExcel() {
      var wb = XLSX.utils.table_to_book(document.getElementById("outTable"));
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "客户列表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    // 处理日期
    filterDate(row, col) {
      var d = row.createTime;
      return new Date(d).toLocaleDateString().replace(/\//g, "-");
    },
    //分页
    handleCurrentChange(val) {
      this.filters.pageNum = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers(flag = false) {
      if (flag) {
        this.$set(this.filters, "pageNum", 1);
      }
      // 时间处理
      this.filters.startTime = this.common.formatDate.format(
        this.filters.startTime
      );
      this.filters.endTime = this.common.formatDate.format(
        this.filters.endTime
      );
      userList(this.filters).then(res => {
        this.loading = false;
        this.users = res.orderlists;
        this.total = res.count;
      });
    },
    //详情
    toDetail: function(id) {
      this.$router.push({ path: "userDetail", query: { id: id } });
    }
  },

  beforeRouteLeave(to, from, next) {
    if (from.path == "/userDetail" || to.path == "/userDetail") {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
    next();
  },
  mounted() {
    this.getUsers();
    this.getLabel();
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>