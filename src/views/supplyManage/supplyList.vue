<template>
  <div class="supplyList">
    <div class="toolbar-box">
      <common-row class="changeInput" v-if="activeName=='first'">
        <common-col :height="50" :lot="5">
          <div class="btn-box">
            <label for>供应商账号：</label>
            <el-input v-model="searchBox.userName" placeholder="请输入供应商账号" clearable></el-input>
          </div>
        </common-col>
        <common-col :height="50" :lot="5" class="changeInput">
          <div class="btn-box">
            <label for>供应商名称：</label>
            <el-input v-model="searchBox.supplierName" placeholder="请输入供应商名称" clearable></el-input>
          </div>
        </common-col>
        <common-col :height="50" :lot="5" class="changeInput">
          <div class="btn-box">
            <label for>联系人：</label>
            <el-input v-model="searchBox.contPsonMobile" placeholder="请输入联系人/练习电话" clearable></el-input>
          </div>
        </common-col>
        <common-col :lot="5" :height="50" class="changeInput">
          <div class="btn-box">
            <label for>认证状态：</label>
            <el-select v-model="searchBox.renStatus" placeholder="请选择" clearable>
              <el-option
                v-for="item in quartyStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </common-col>
      </common-row>
      <common-row class="changeInput" v-if="activeName=='second'">
        <common-col :height="50" :lot="5">
          <div class="btn-box">
            <label for>供应商：</label>
            <el-input v-model="searchBox.supplayMessage" placeholder="请输入供应商姓名/手机号" clearable></el-input>
          </div>
        </common-col>
        <common-col :height="50" :lot="5" class="changeInput">
          <div class="btn-box">
            <label for>供应商省份：</label>
            <el-select v-model="searchBox.procovce" placeholder="请选择" clearable multiple >
              <el-option
                v-for="item in quartyStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </common-col>
        <common-col :height="50" :lot="5" class="changeInput">
          <div class="btn-box">
            <label for>采购类型：</label>
            <el-select v-model="searchBox.type" placeholder="请选择" clearable>
              <el-option
                v-for="item in quartyStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </common-col>
        <common-col :lot="5" :height="50" class="changeInput">
          <div class="btn-box displayflex">
            <label for style="line-height:30px;">商品数：</label>
            <el-input
              v-model="searchBox.productCountMin"
              style="width: 60px;"
              type="number"
              placeholder
              clearable
            ></el-input>
            <span class="heng-line" style="line-height:30px;">——</span>
            <el-input
              v-model="searchBox.productCountMax"
              style="width: 60px;"
              type="number"
              placeholder
              clearable
            ></el-input>
          </div>
        </common-col>
      </common-row>
      <common-row class="changeInput" v-if="activeName=='first'">
        <common-col :lot="5" :height="50" class="changeInput">
          <div class="btn-box displayflex">
            <label for style="line-height:30px;">商品数：</label>
            <el-input
              v-model="searchBox.productCountMin"
              style="width: 60px;"
              type="number"
              placeholder
              clearable
            ></el-input>
            <span class="heng-line" style="line-height:30px;">——</span>
            <el-input
              v-model="searchBox.productCountMax"
              style="width: 60px;"
              type="number"
              placeholder
              clearable
            ></el-input>
          </div>
        </common-col>
        <common-col :height="50" :lot="5" class="outselectCanleder">
          <div class="btn-box">
            <label for>注册时间：</label>
            <el-date-picker
              v-model="registTime"
              type="daterange"
              class="selectCanlend"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </common-col>
      </common-row>
      <common-row class="changeInput" v-if="activeName=='second'">
        <common-col :height="50" :lot="5" class="outselectCanleder">
          <div class="btn-box">
            <label for>创建时间：</label>
            <el-date-picker
              v-model="registTime"
              type="daterange"
              class="selectCanlend"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </common-col>
      </common-row>
      <common-row v-if="activeName=='first'">
        <common-col :height="50">
          <div class="btn-box">
            <el-button size="small" type="primary" style="margin-top:5px;" @click="searchData">查询</el-button>
          </div>
          <div class="btn-box">
            <el-button
              size="small"
              type="primary"
              style="margin-top:5px;"
              @click="exportDataEvent"
            >导出数据</el-button>
          </div>
        </common-col>
      </common-row>
       <common-row v-if="activeName=='second'">
        <common-col :height="50">
          <div class="btn-box">
            <el-button size="small" type="primary" style="margin-top:5px;">查询</el-button>
          </div>
          <div class="btn-box">
            <el-button
              size="small"
              type="primary"
              style="margin-top:5px;"
              @click="addSupplyerEv"
            >新增合作供应商</el-button>
          </div>
          <div class="btn-box">
            <el-button size="small" type="primary" style="margin-top:5px;" @click="allDelet">批量删除</el-button>
          </div>
        </common-col>
      </common-row>
    </div>
    <div class="tabs-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="供应商管理" name="first">
          <supply-manage :searchBox="searchBox" ref="supplyManage" :val1='tabStatus1'></supply-manage>
        </el-tab-pane>
        <el-tab-pane label="合作供应商" name="second">
          <teamwork-suppler :searchBox="searchBox" :val2='tabStatus2' ref="teamWork"></teamwork-suppler>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import dayJs from "dayjs";
//导入供应商管理页面
import supplyManage from "./components/supplyManage";
import teamworkSuppler from './components/teamWorkSupplyer';
export default {
  name: "",
  data() {
    return {
      quartyStatus: [
        { value: 1, label: "通过" },
        { value: 2, label: "拒绝" }
      ],
      searchBox: {
        userName: "",
        supplierName: "",
        contPsonMobile: "",
        IsCertSucAll: "",
        IsSupplierCertSuc: "",
        productCountMin: "",
        productCountMax: "",
        startTime: "",
        endTime: "",
        //状态
        renStatus: "",
        //合作供应商数据
        procovce:[],
        type:'',
        supplayMessage:'',
        //多选控制数据
        selectStutusControle:false
      },
      registTime: [],
      //tab栏
      activeName: "first",
      tabStatus1:false,
      tabStatus2:false,
    };
  },
  props: [],
  computed: {},
  components: {
    supplyManage,teamworkSuppler
  },
  methods: {
    searchData() {
      if (this.registTime) {
        this.searchBox.startTime = this.registTime.length
          ? dayJs(this.registTime[0]).format("YYYY-MM-DD HH:mm:ss")
          : "";
        this.searchBox.endTime = this.registTime.length
          ? dayJs(this.registTime[1]).format("YYYY-MM-DD HH:mm:ss")
          : "";
      } else {
        this.searchBox.startTime = "";
        this.searchBox.endTime = "";
      }

      this.$refs.supplyManage.getData();
    },
    //到处数据
    exportDataEvent() {
      this.$refs.supplyManage.exportDataEvent();
    },

    //tab切换
    handleClick(val) {
      this.activeName = val.name;
      this.searchBox={
        userName: "",
        supplierName: "",
        contPsonMobile: "",
        IsCertSucAll: "",
        IsSupplierCertSuc: "",
        productCountMin: "",
        productCountMax: "",
        startTime: "",
        endTime: "",
        //状态
        renStatus: "",
        //合作供应商数据
        procovce:[],
        type:'',
        supplayMessage:'',
      }
      this.registTime=[]
      //判断切换
      if(val.name=='first'){
        this.tabStatus1=true
        this.tabStatus2=false
      }else if(val.name=='second'){
        this.tabStatus1=false
        this.tabStatus2=true

      }
    },
    //批量删除
    allDelet(){
      if(this.searchBox.selectStutusControle){
        console.log(this.$refs.teamWork)
       this.$refs.teamWork.deleteDialogVisible=true
      }else {
        this.$message.error('请勾选数据');
      }
    },
    //新增供应商
    addSupplyerEv(){
      this.$refs.teamWork.eitorDialogVisible=true;
      this.$refs.teamWork.delEitSupplay='新增';
      this.$refs.teamWork.formData={
        supplyName: "",
        supplyPhone: "",
        supplyProvence:'',
        ruleCGType:'',
        IsEnble:false
      }
    }
  },
  created() {
    // this.getData();
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped lang="scss">
</style>

<style lang="scss">
.supplyList {
  .btn-box {
    margin: 0px 5px;
    height: 20px;
    label {
      min-width: 20px;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
    }
  }
  // 输入框样式
  .changeInput {
    .el-input {
      width: 164px;
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
    width: 150px;
    height: 30px;
    line-height: 30px;
    .el-input__suffix {
      line-height: 30px;
      .el-input__suffix-inner {
        .el-input__icon {
          height: 30px;
          line-height: 3s1px;
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
          font-size: 13px;
        }
        .el-range-input {
          width: 70px;
          font-size: 12px;
        }
        .el-range-separator {
          font-size: 13px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>




