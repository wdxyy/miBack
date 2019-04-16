<template>
  <section>
    <!--工具条-->
    <el-row class="toolbar" style="padding-bottom: 0px;">
      <el-col :span="5" style="line-height:40px">
        <span>我的积分：</span>
        <strong>{{points}}</strong>
      </el-col>
      <el-col :span="17">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-select v-model="filters.type" @change="getRecord" placeholder="请选择类型">
              <el-option label="全部" selected value="0">
              </el-option>
              <el-option label="充值" value="1">
              </el-option>
              <el-option label="购买" value="2">
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
            <el-button type="primary" v-on:click="getRecord" class="el-icon-search"></el-button>
          </el-form-item>
          <refresh-Btn></refresh-Btn>
          <back-Btn></back-Btn>
        </el-form>
      </el-col>
    </el-row>
    <!--列表-->
    <!-- -->
    <el-table :data="recordArr" highlight-current-row style="width: 100%;" border>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.type==1">
            充值
          </div>
          <div v-if="scope.row.type==2">
            购买
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="时间" align="center" :formatter="filterDate"></el-table-column>
      <el-table-column prop="num" label="积分" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="filters.pageSize" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>
<script>
import { billRecord } from "../../api/api.js";
export default {
  data() {
    return {
      filters: {
        type: "",
        pageNum: 1,
        pageSize: 10,
        startTime: "",
        endTime: ""
      },
      obj: {
        type: "",
        pageNum: 1,
        pageSize: 10,
        startTime: "",
        endTime: ""
      },
      total: 0,
      sum: 0,
      recordArr: [],
      totalRecord: []
    };
  },
  computed: {
    points() {
      this.sum = 0;
      if (this.totalRecord.length > 1) {
        this.sum = this.totalRecord.reduce((prev, next) => {
          prev = this.totalRecord.indexOf(prev) > -1 ? prev.num : prev;
          return parseInt(prev) + parseInt(next.num);
        });
      } else if (this.totalRecord.length == 1) {
        this.sum = this.totalRecord[0].num;
      }
      return this.sum;
    }
  },
  methods: {
    getRecord() {
      this.filters.startTime = this.common.formatDate.format(
        this.filters.startTime
      );
      this.filters.endTime = this.common.formatDate.format(
        this.filters.endTime
      );
      billRecord(this.filters).then(res => {
        this.recordArr = res.records;
        this.total = res.total;
      });
    },
    // 得到总的记录
    getTotalRecord() {
      billRecord(this.obj).then(res => {
        this.total = res.total;
        this.obj.pageSize = this.total;
        billRecord(this.obj).then(d => {
          this.totalRecord = d.records;
        });
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.filters.pageNum = val;
      this.getRecord();
    },
    // 处理时间
    filterDate(row) {
      var date = row.createTime;
      return new Date(date).toLocaleDateString().replace(/\//g, "-");
    }
  },
  mounted() {
    this.getRecord();
    this.getTotalRecord();
  }
};
</script>

<style scoped>
</style>