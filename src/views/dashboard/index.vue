<template>
  <div class="dashboard-container container-home">
    <div class="header_time">
      <span>实时数据</span>
      <span>{{currentTime}}</span>
      <i class="el-icon-refresh" @click="updateET"></i>
    </div>
    <el-row class="tabHeader">
      <el-col :span="2">
        <div></div>
      </el-col>
      <el-col :span="3" v-if="supolyType==300">
        <div>新增供应商</div>
      </el-col>
      <el-col :span="3">
        <div>新增采购单</div>
      </el-col>
      <el-col :span="3">
        <div>采购发货数</div>
      </el-col>
      <el-col :span="3">
        <div>补发发货数</div>
      </el-col>
      <el-col :span="3">
        <div>货损数</div>
      </el-col>
      <!-- <el-col :span="4">
        <div>结算金额(元)</div>
      </el-col>-->
    </el-row>
    <el-row class="tabHeader2">
      <el-col :span="2">
        <div>今日</div>
      </el-col>
      <el-col :span="3" v-if="supolyType==300">
        <div>{{showData.GYSDataList?showData.GYSDataList[0].Number:0}}</div>
      </el-col>
      <el-col :span="3">
        <div>{{showData.CGDDataList?showData.CGDDataList[0].Number:0}}</div>
      </el-col>
      <el-col :span="3">
        <div>{{showData.CGFHDataList?showData.CGFHDataList[0].Number:0}}</div>
      </el-col>
      <el-col :span="3">
        <div>{{showData.BFFHDataList?showData.BFFHDataList[0].Number:0}}</div>
      </el-col>
      <el-col :span="3">
        <div>{{showData.HSDataList?showData.HSDataList[0].Number:0}}</div>
      </el-col>
      <!-- <el-col :span="4">
        <div>结算金额(元)</div>
      </el-col>-->
    </el-row>
    <el-row class="tabHeader3">
      <el-col :span="2" class="current">
        <div>昨日</div>
      </el-col>
      <el-col :span="3" v-if="supolyType==300">
        <div>{{showData.GYSDataList?showData.GYSDataList[1].Number:0}}</div>
      </el-col>
      <el-col :span="3">
        <div>{{showData.CGDDataList?showData.CGDDataList[1].Number:1}}</div>
      </el-col>
      <el-col :span="3">
        <div>{{showData.CGFHDataList?showData.CGFHDataList[1].Number:1}}</div>
      </el-col>
      <el-col :span="3">
        <div>{{showData.BFFHDataList?showData.BFFHDataList[1].Number:1}}</div>
      </el-col>
      <el-col :span="3">
        <div>{{showData.HSDataList?showData.HSDataList[1].Number:1}}</div>
      </el-col>
      <!-- <el-col :span="4">
        <div>结算金额(元)</div>
      </el-col>-->
    </el-row>
    <!-- 表格数据 -->
    <div class="table_content">
      <div class="table_left">
        <tabChange @handleEvent="handleSetLineChartData"></tabChange>
        <div style="margin-top:30px;">
          <lineEchats :chart-data="lineChartData"></lineEchats>
        </div>
      </div>
      <div class="table_right">
        <div class="right_top" v-if="supolyType==300">
          <rightTop v-if="supolyType==300" :supplyData="supplyData" :shangJiaData="shangJiaData"></rightTop>
        </div>
        <div class="right_bottom">
          <rightBottom
            :waitSendNum="waitSendNum"
            :waitShenLose="waitShenLose"
            :waitSendBFNum="waitSendBFNum"
          ></rightBottom>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils/index";
//tab切换，表格
import tabChange from "./components/tabChange";
import lineEchats from "./components/lineChart";
import rightTop from "./components/rightTop";
import rightBottom from "./components/rightBottom";
const lineChartData = {
  cGSendNum: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
    supplementData: [109, 99, 111, 123, 145, 155, 166, 177],
    data: ["7/1", "7/2", "7/3", "7/4", "7/5", "7/6", "7/7"],
    length: ["采购单", "采购发货数", "补发发货数"]
  },
  HSNum: {
    HSNum: [200, 192, 120, 144, 160, 130, 140],
    data: ["7/1", "7/2", "7/3", "7/4", "7/5", "7/6", "7/7"],
    length: ["货损数"]
  },
  supplyer: {
    supplyer: [80, 100, 121, 104, 105, 90, 100],
    data: ["7/1", "7/2", "7/3", "7/4", "7/5", "7/6", "7/7"],
    length: ["新增供应商"]
  }
};
export default {
  name: "Dashboard",
  components: { tabChange, lineEchats, rightTop, rightBottom },
  data() {
    return {
      currentRole: "adminDashboard",
      currentTime: null,
      lineChartData: lineChartData.cGSendNum,
      //平台类型
      supolyType: null,
      //展示数据
      showData: {},
      supplyData: 0,
      shangJiaData: 0,
      waitSendNum: 0,
      waitShenLose: 0,
      waitSendBFNum: 0,
      //数据的类型，时间
      type: "cGSendNum",
      time: "week"
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    // if (!this.roles.includes("admin")) {
    //   this.currentRole = "editorDashboard";
    // }
    this.supolyType = this.$user.UserInfo().SupplierType;
    this.getCurrentTime();
    this.getData();
  },
  methods: {
    getCurrentTime() {
      var current = new Date().getTime();
      this.currentTime = parseTime(current);
    },
    //
    handleSetLineChartData(type) {
      if (type == "week" || type == "mouth" || type == "twomouth") {
        this.time = type;
        this.transparenData(this.type, this.time);
      } else {
        this.type = type;
        this.transparenData(this.type, this.time);
      }
    },
    getData() {
      let loadingInstance1 = this.showLoading();
            loadingInstance1.close();

      this.$https
        .fetchNetPost("/api.Erp.Base_Manage.Base_User.GetPlatformStatistics")
        .then(res => {
          if (res.data.Success) {
            loadingInstance1.close();
            this.showData = res.data.Data;
            this.supplyData = res.data.Data.SupplierStatus1000Count;
            this.shangJiaData = res.data.Data.ProductStatus1000Count;
            this.waitSendNum = res.data.Data.DFHCGDCount;
            this.waitShenLose = res.data.Data.DSHHSCount;
            this.waitSendBFNum = res.data.Data.DFHBFDCount;
            //展示数据
            this.transparenData(this.type, this.time);
          } else {
            this.$message.error(res.data.msg);
            loadingInstance1.close();
          }
        })
    },
    transparenData(type, time) {
      if (time == "week") {
        if (type == "cGSendNum") {
          this.lineChartData.HSNum = [];
          this.lineChartData.supplyer = [];
          if (this.showData.CGDDataList) {
            this.lineChartData.expectedData = this.showData.CGDDataList.map(
              (item, index) => {
                if (index < 7) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          if (this.showData.CGFHDataList) {
            this.lineChartData.actualData = this.showData.CGFHDataList.map(
              (item, index) => {
                if (index < 7) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          if (this.showData.BFFHDataList) {
            this.lineChartData.supplementData = this.showData.BFFHDataList.map(
              (item, index) => {
                if (index < 7) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          this.lineChartData.length = ["采购单", "采购发货数", "补发发货数"];
        } else if (type == "HSNum") {
          this.lineChartData.expectedData = [];
          this.lineChartData.actualData = [];
          this.lineChartData.supplementData = [];
          this.lineChartData.supplyer = [];
          if (this.showData.HSDataList) {
            this.lineChartData.HSNum = this.showData.HSDataList.map(
              (item, index) => {
                 if (index < 7) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          this.lineChartData.length = ["货损数"];
        } else if (type == "supplyer") {
          this.lineChartData.expectedData = [];
          this.lineChartData.actualData = [];
          this.lineChartData.supplementData = [];
          this.lineChartData.HSNum = [];
          if (this.showData.GYSDataList) {
            this.lineChartData.supplyer = this.showData.GYSDataList.map(
              (item, index) => {
                 if (index < 7) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          this.lineChartData.length = ["新增供应商"];
        }
        //时间
        var data = [];
        this.showData.BFFHDataList.forEach((item, index) => {
          if (index < 7) {
            data.push(item.TimeText);
          }
        });
        this.lineChartData.data = data;
      } else if (time == "mouth") {
        if (type == "cGSendNum") {
          this.lineChartData.HSNum = [];
          this.lineChartData.supplyer = [];
          if (this.showData.CGDDataList) {
            this.lineChartData.expectedData = this.showData.CGDDataList.map(
              (item, index) => {
                if (index < 30) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          if (this.showData.CGFHDataList) {
            this.lineChartData.actualData = this.showData.CGFHDataList.map(
              (item, index) => {
                if (index < 30) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          if (this.showData.BFFHDataList) {
            this.lineChartData.supplementData = this.showData.BFFHDataList.map(
              (item, index) => {
                if (index < 30) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          this.lineChartData.length = ["采购单", "采购发货数", "补发发货数"];
        } else if (type == "HSNum") {
          this.lineChartData.expectedData = [];
          this.lineChartData.actualData = [];
          this.lineChartData.supplementData = [];
          this.lineChartData.supplyer = [];
          if (this.showData.HSDataList) {
            this.lineChartData.HSNum = this.showData.HSDataList.map(
              (item, index) => {
                 if (index < 30) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          this.lineChartData.length = ["货损数"];
        } else if (type == "supplyer") {
          this.lineChartData.expectedData = [];
          this.lineChartData.actualData = [];
          this.lineChartData.supplementData = [];
          this.lineChartData.HSNum = [];
          if (this.showData.GYSDataList) {
            this.lineChartData.supplyer = this.showData.GYSDataList.map(
              (item, index) => {
                 if (index < 30) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          this.lineChartData.length = ["新增供应商"];
        }
        //时间
        var data = [];
        this.showData.BFFHDataList.forEach((item, index) => {
          if (index < 30) {
            data.push(item.TimeText);
          }
        });
        this.lineChartData.data = data;
      } else if (time == "twomouth") {
         if (type == "cGSendNum") {
          this.lineChartData.HSNum = [];
          this.lineChartData.supplyer = [];
          if (this.showData.CGDDataList) {
            this.lineChartData.expectedData = this.showData.CGDDataList.map(
              (item, index) => {
                if (index < 60) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          if (this.showData.CGFHDataList) {
            this.lineChartData.actualData = this.showData.CGFHDataList.map(
              (item, index) => {
                if (index < 60) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          if (this.showData.BFFHDataList) {
            this.lineChartData.supplementData = this.showData.BFFHDataList.map(
              (item, index) => {
                if (index < 60) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          this.lineChartData.length = ["采购单", "采购发货数", "补发发货数"];
        } else if (type == "HSNum") {
          this.lineChartData.expectedData = [];
          this.lineChartData.actualData = [];
          this.lineChartData.supplementData = [];
          this.lineChartData.supplyer = [];
          if (this.showData.HSDataList) {
            this.lineChartData.HSNum = this.showData.HSDataList.map(
              (item, index) => {
                 if (index < 60) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          this.lineChartData.length = ["货损数"];
        } else if (type == "supplyer") {
          this.lineChartData.expectedData = [];
          this.lineChartData.actualData = [];
          this.lineChartData.supplementData = [];
          this.lineChartData.HSNum = [];
          if (this.showData.GYSDataList) {
            this.lineChartData.supplyer = this.showData.GYSDataList.map(
              (item, index) => {
                 if (index < 60) {
                  return item.Number;
                }
                return 0;
              }
            );
          }
          this.lineChartData.length = ["新增供应商"];
        }
        //时间
        var data = [];
        this.showData.BFFHDataList.forEach((item, index) => {
          data.push(item.TimeText);
        });
        this.lineChartData.data = data;
      }
    },
    //更新
    updateET(){
      this.getCurrentTime();
      this.getData();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.dashboard-container {
  padding: 0px 0 0 20px;
  box-sizing: border-box;
  .header_time {
    height: 40px;
    display: flex;
    align-items: center;
    span:first-child {
      font-size: 20px;
      color: #000;
      font-weight: 600;
      margin-right: 20px;
    }
    span:nth-of-type(2) {
      font-size: 14px;
      color: #999;
      margin-right: 20px;
    }
    .el-icon-refresh {
      font-size: 23px;
      color: #1890ff;
      font-weight: 700;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .tabHeader {
    margin-top: 10px;
    font-size: 15px;
  }
  .tabHeader2 {
    margin-top: 10px;
    color: #1890ff;
    font-size: 18px;
  }
  .tabHeader3 {
    margin-top: 10px;
    font-size: 13px;
    color: #999;
  }
  .el-col {
    border: 1px solid transparent;
  }
  .table_content {
    margin-top: 40px;
    display: flex;
    .table_left {
      flex: 7;
    }
    .table_right {
      flex: 3;
      > div {
        width: 290px;
        // background-color: #f2f2f2;
        border: 1px solid rgba(0,0,0,0.14901960784313725);
        // height: 220px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
