<template>
  <div class="qualificationList containerBox">
    <div class="toolbar-box">
      <div v-if="activeName=='first'">
        <common-row class="changeInput">
          <common-col :height="50" :lot="5">
            <div class="btn-box">
              <label for>供应商账号：</label>
              <el-input v-model="searchBox.userName" placeholder="请输入供应商账号" clearable></el-input>
            </div>
          </common-col>
          <common-col :height="50" :lot="5">
            <div class="btn-box">
              <label for>供应商名称：</label>
              <el-input v-model="searchBox.supplierName" placeholder="请输入供应商名称" clearable></el-input>
            </div>
          </common-col>
          <common-col :height="50" :lot="5">
            <div class="btn-box">
              <label for>联系人：</label>
              <el-input v-model="searchBox.contPsonMobile" placeholder="请输入联系人/联系电话" clearable></el-input>
            </div>
          </common-col>
          <common-col :lot="5" :height="50">
            <div class="btn-box">
              <label for>供应商类型：</label>
              <el-select v-model="searchBox.type" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </common-col>
        </common-row>
        <common-row class="changeInput">
          <common-col :height="50" :lot="5" class="outselectCanleder">
            <div class="btn-box">
              <label for>审核时间：</label>
              <el-date-picker
                v-model="verifyTime"
                type="daterange"
                class="selectCanlend"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </common-col>
        </common-row>
      </div>
      <div v-if="activeName=='second'">
        <common-row class="changeInput">
          <common-col :height="50" :lot="5">
            <div class="btn-box">
              <label for>供应商账号：</label>
              <el-input v-model="searchBox.userName" placeholder="请输入供应商账号" clearable></el-input>
            </div>
          </common-col>
          <common-col :height="50" :lot="5">
            <div class="btn-box">
              <label for>供应商名称：</label>
              <el-input v-model="searchBox.supplierName" placeholder="请输入供应商名称" clearable></el-input>
            </div>
          </common-col>
          <common-col :height="50" :lot="5">
            <div class="btn-box">
              <label for>联系人：</label>
              <el-input v-model="searchBox.contPsonMobile" placeholder="请输入联系人/联系电话" clearable></el-input>
            </div>
          </common-col>
          <common-col :lot="5" :height="50">
            <div class="btn-box">
              <label for>供应商类型：</label>
              <el-select v-model="searchBox.type" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </common-col>
          
        </common-row>
        <common-row class="changeInput">
          <common-col :height="50" :lot="5" class="outselectCanleder">
            <div class="btn-box">
              <label for>审核时间：</label>
              <el-date-picker
                v-model="verifyTime"
                type="daterange"
                class="selectCanlend"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </common-col>
          <common-col :height="50" :lot="5" class="outselectCanleder">
            <div class="btn-box">
              <label for>提交时间：</label>
              <el-date-picker
                v-model="submitTime"
                type="daterange"
                class="selectCanlend"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </common-col>
        </common-row>
      </div>
      <div v-if="activeName=='third'">
        <common-row class="changeInput">
          <common-col :height="50" :lot="5">
            <div class="btn-box">
              <label for>供应商账号：</label>
              <el-input v-model="searchBox.userName" placeholder="请输入供应商账号" clearable></el-input>
            </div>
          </common-col>
          <common-col :height="50" :lot="5">
            <div class="btn-box">
              <label for>供应商名称：</label>
              <el-input v-model="searchBox.supplierName" placeholder="请输入供应商名称" clearable></el-input>
            </div>
          </common-col>
          <common-col :height="50" :lot="5">
            <div class="btn-box">
              <label for>联系人：</label>
              <el-input v-model="searchBox.contPsonMobile" placeholder="请输入联系人/联系电话" clearable></el-input>
            </div>
          </common-col>
          <common-col :height="50" :lot="5" class="outselectCanleder">
            <div class="btn-box">
              <label for>审核时间：</label>
              <el-date-picker
                v-model="verifyTime"
                type="daterange"
                class="selectCanlend"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </common-col>
        </common-row>
        <common-row class="changeInput">
          <common-col :height="50" :lot="5" class="outselectCanleder">
            <div class="btn-box">
              <label for>提交时间：</label>
              <el-date-picker
                v-model="submitTime"
                type="daterange"
                class="selectCanlend"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </common-col>
        </common-row>
      </div>
      <common-row>
        <common-col :height="30">
          <div class="btn-box">
            <el-button size="small" type="primary" style="margin-top:5px;" @click="serchData">查询</el-button>
          </div>
        </common-col>
      </common-row>
    </div>
    <div class="tabs-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="first">
          <waitShenHe :one="tabControlObj.one" :searchVal="searchBox" ref="waitShenHe"></waitShenHe>
        </el-tab-pane>
        <el-tab-pane label="审核通过" name="second">
          <auditOver :two="tabControlObj.two" :searchVal="searchBox" ref="auditOver"></auditOver>
        </el-tab-pane>
        <el-tab-pane label="审核拒绝" name="third">
          <auditRefuse :three="tabControlObj.three" :searchVal="searchBox" ref="auditRefuse"></auditRefuse>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import waitShenHe from "./waitShenHe/waitShenHe";
import auditOver from "./auditOver/auditOver";
import auditRefuse from "./auditRefuse/auditRefuse";
import dayJs from "dayjs";
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      options: [
        { label: "制造商(工厂)", value: 100 },
        { label: "批发商", value: 200 },
        { label: "经销商", value: 300 },
        { label: "代理商", value: 400 }
      ],
      searchBox: {
        userName: "",
        supplierName: "",
        contPsonMobile: "",
        type: "",
        startSubmitTime: "",
        endSubmitTime: "",
        startAuditTime: "",
        endAuditTime: ""
      },
      verifyTime: [],
      submitTime: [],
      //控制tab栏切换
      tabControlObj: {
        one: true,
        two: false,
        three: false
      }
    };
  },
  props: [],
  computed: {
    height() {
      console.log(window.innerHeight);
      return {
        height: window.innerHeight - 100 + "px"
      };
    }
  },
  components: { waitShenHe, auditOver, auditRefuse },
  methods: {
    handleClick(val) {
      this.activeName = val.name;
      this.searchBox = {
        userName: "",
        supplierName: "",
        contPsonMobile: "",
        type: "",
        startSubmitTime: "",
        endSubmitTime: "",
        startAuditTime: "",
        endAuditTime: ""
      };
      //时间清空
      this.verifyTime = "";
      this.submitTime = "";
      if (val.name == "first") {
        this.tabControlObj = {
          one: true,
          two: false,
          three: false
        };
      } else if (val.name == "second") {
        this.tabControlObj = {
          one: false,
          two: true,
          three: false
        };
      } else if (val.name == "third") {
        this.tabControlObj = {
          one: false,
          two: false,
          three: true
        };
      }
    },
    //查询
    serchData() {
      console.log(this.verifyTime);
      if (this.verifyTime) {
        this.searchBox.startAuditTime = this.verifyTime.length
          ? dayJs(this.verifyTime[0]).format("YYYY-MM-DD HH:mm:ss")
          : "";
        this.searchBox.endAuditTime = this.verifyTime.length
          ? dayJs(this.verifyTime[1]).format("YYYY-MM-DD HH:mm:ss")
          : "";
      } else {
        this.searchBox.startAuditTime = "";
        this.searchBox.endAuditTime = "";
      }
      if (this.submitTime) {
        this.searchBox.startSubmitTime = this.submitTime.length
          ? dayJs(this.submitTime[0]).format("YYYY-MM-DD HH:mm:ss")
          : "";
        this.searchBox.endSubmitTime = this.submitTime.length
          ? dayJs(this.submitTime[1]).format("YYYY-MM-DD HH:mm:ss")
          : "";
      } else {
        this.searchBox.startSubmitTime = "";
        this.searchBox.endSubmitTime = "";
      }

      if (this.activeName == "first") {
        this.$refs.waitShenHe.getData();
      } else if (this.activeName == "second") {
        this.$refs.auditOver.getData();
      } else if (this.activeName == "third") {
        this.$refs.auditRefuse.getData();
      }
    }
  },
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style scoped lang="scss">
</style>

<style lang="scss">
.qualificationList {
  .btn-box {
    margin: 0px 5px;
    height: 30px;
    label {
      min-width: 30px;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
    }
  }
  // 输入框样式
  .changeInput {
    .el-input {
      width: 160px;
      height: 30px;
      font-size: 14px;
      .el-input__inner {
        padding: 0 5px;
        height: 100%;
        width: 100%;
      }
    }
  }

  //选择框样式
  .el-select {
    width: 160px;
    height: 30px;
    line-height: 30px;
    .el-input__suffix {
      line-height: 30px;
      .el-input__suffix-inner {
        .el-input__icon {
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
  //时间
  .outselectCanleder {
    .btn-box {
      label {
        min-width: 40px;
        font-size: 14px;
      }
      .selectCanlend {
        height: 30px;
        width: 220px;
        padding: 3px 5px;
        .el-input__icon {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
        }
        .el-range-input {
          width: 70px;
          font-size: 14px;
        }
        .el-range-separator {
          font-size: 14px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>




