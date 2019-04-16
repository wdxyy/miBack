<template>
	<section>
		<back-Btn></back-Btn>
		<refresh-Btn></refresh-Btn>
		<el-row type="flex">
			<el-card style="width:40%">
				<el-row>
					<el-col>
						<el-row>
							<el-col :span="10">
								<strong>{{detail.realName}} :</strong>
								<span>{{detail.mobile}}</span>
							</el-col>
							<el-col :span="8">
								<strong>申请时间: </strong>{{detail.applyTime|filterDate}}</el-col>
						</el-row>
					</el-col>
					<el-col style="margin-top:10px;" class="commStyle">
						<el-row>
							<el-col :span="20">
								<div>
									<strong>贷款金额：</strong>
									<span>{{detail.loanAmount}}</span>
								</div>
							</el-col>
							<el-col :span="20">
								<div>
									<strong>贷款期限：</strong>
									<span>{{detail.loanTerm}}</span>
								</div>
							</el-col>
							<el-col :span="20">
								<div>
									<strong>贷款目的：</strong>
									<span>{{detail.loanUseType}}</span>
								</div>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-card>
			<el-card style="width:40%">
				<div slot="header">
					<span>基本信息</span>
				</div>
				<el-row>
					<el-col :span="5" class="bld">年龄:</el-col>
					<el-col :span="5">{{detail.age}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld"> 文化程度:</el-col>
					<el-col :span="5">{{detail.culture}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld">所在城市 :</el-col>
					<el-col :span="10">{{detail.address}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld">本地社保：</el-col>
					<el-col :span="5">{{detail.localSocialSecurity}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld">本地公积金： </el-col>
					<el-col :span="5">{{detail.localHousingFund}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld">户籍所在地： </el-col>
					<el-col :span="5">{{detail.census}}</el-col>
				</el-row>
			</el-card>
		</el-row>
		<el-row type="flex">
			<el-card style="width:40%">
				<div slot="header">
					<span>工作信息</span>
				</div>
				<el-row>
					<el-col :span="5" class="bld">职业身份 :</el-col>
					<el-col :span="5">{{detail.profession}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld"> 月均收入 :</el-col>
					<el-col :span="5">{{detail.workMonthlySalary}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld">收入形式 :</el-col>
					<el-col :span="10">{{detail.workIncomeType}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld">当前单位工龄 </el-col>
					<el-col :span="5">{{detail.workWorkingLen}}</el-col>
				</el-row>
			</el-card>
			<el-card style="width:40%">
				<div slot="header">
					<span>资产信息</span>
				</div>
				<el-row>
					<el-col :span="5" class="bld"> 信用卡额度 :</el-col>
					<el-col :span="10">{{detail.creditCardAmount}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld"> 信用记录:</el-col>
					<el-col :span="10">{{detail.creditRecord}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld">是否有微粒贷 :</el-col>
					<el-col :span="10">{{detail.micloan}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld">微粒贷额度：</el-col>
					<el-col :span="10">{{detail.micloanAmount}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld"> 是否有借呗 </el-col>
					<el-col :span="10">{{detail.borrowIt}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld">名下房产 </el-col>
					<el-col :span="10">{{detail.realEstate}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld">名下车产 </el-col>
					<el-col :span="10">{{detail.carProduction}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="5" class="bld">个人保险 </el-col>
					<el-col :span="10">{{detail.insurance}}</el-col>
				</el-row>
			</el-card>
		</el-row>
	</section>
</template>

<script>
import { orderDetail } from "../../api/api";
export default {
  data() {
    return {
      detail: {}
    };
  },
  methods: {
    getDetail(id) {
      orderDetail(id).then(res => {
        this.detail = res;
      });
    }
  },
  filters: {
    filterDate(v) {
      return v == undefined
        ? ""
        : new Date(v).toLocaleDateString().replace(/\//g, "-");
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.getDetail(id);
  }
};
</script>

<style scoped>
section {
  margin-top: 30px;
}
.commStyle {
}
.el-card {
  width: 80%;
  margin: 40px;
}
.el-col {
  line-height: 30px;
}
</style>