<template>
  <div class="auditOver">
    <el-table :data="tableData" style="width: 100%" :height="height">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="UserName" label="供应商账号">
      </el-table-column>
      <el-table-column prop="SupplierName" label="供应商名称"></el-table-column>
      <el-table-column prop="ContPsonName" label="联系人"></el-table-column>
      <el-table-column prop="ContPsonMobile" label="联系电话"></el-table-column>
      <el-table-column prop="Type" label="供应商类型">
        <template slot-scope="scope">
          <div>
            {{scope.row.Type?supplierType[scope.row.Type]:''}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="SubmitTime" label="提交时间">
        <template slot-scope="scope">
          <div class="timer-box">
            <p>{{scope.row.SubmitTime?$getDate.getYYYYMMDD(scope.row.SubmitTime):''}}</p>
            <p>{{scope.row.SubmitTime?$getDate.getHHMMSS(scope.row.SubmitTime):''}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="AuditTime" label="审核时间">
        <template slot-scope="scope">
          <div class="timer-box">
            <p>{{scope.row.AuditTime?$getDate.getYYYYMMDD(scope.row.AuditTime):''}}</p>
            <p>{{scope.row.AuditTime?$getDate.getHHMMSS(scope.row.AuditTime):''}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="table-btn-box">
            <el-button @click="verifyDetail(scope.row.Id)" size="medium" type="primary">查询详情</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages-box">
      <page-box :pages="pages" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></page-box>
    </div>
  </div>
</template>
<script>
import pageBox from "../../../common/components/pageBox";
import { Loading } from "element-ui";

export default {
  props:{
    two:{
      type:Boolean
    },
    searchVal: {
      type: Object,
      default: () => {
        return {
          userName: "",
          supplierName: "",
          contPsonMobile: "",
          type: '',
           startSubmitTime: "",
          endSubmitTime: "",
          startAuditTime: "",
          endAuditTime: ""
        };
      }
    }
  },
  watch:{
    two:function(newv,oldv){
      if(newv){
        this.getData()
      }
    }
  },
  data() {
    return {
      // 供应商类型
      supplierType:
        {100:'制造商/工厂',
        200:'批发商',
        300:'经销商',
        400:'代理商'
        },
      tableData: [
      ],
      //分页
      pages: this.$pages(),
      height:this.$tableHeight(160)
    };
  },
  methods: {
    //获取表格数据
    getData() {
      let loadingInstance1 = Loading.service({ fullscreen: true });
      var params = {
        pagination: {
          PageIndex: this.pages.currentPage,
          PageRows: this.pages.pageSize,
          SortField: "CreateTime",
          SortType: "desc",
          Total: 1000
        },
        userName: this.searchVal.userName,
        supplierName: this.searchVal.supplierName,
        contPsonMobile: this.searchVal.contPsonMobile,
        type: this.searchVal.type?this.searchVal.type:-1,
        Status:2000,
        startSubmitTime: this.searchVal.startSubmitTime,
        endSubmitTime: this.searchVal.endSubmitTime,
        startAuditTime: this.searchVal.startAuditTime,
        endAuditTime: this.searchVal.endAuditTime
      };
      this.$https
        .fetchNetPost(
          "/api.Erp.Base_Manage.Base_User.GetSupplierAuditDataList",
          params
        )
        .then(res => {
          console.log(res);
          if (res.data.Success) {
            loadingInstance1.close();
            this.tableData = res.data.Data;
            this.pages.totalCount = res.data.Total;
            this.pages.totalPage=res.data.PageCount
          } else {
            this.$message.error(res.data.msg);
            loadingInstance1.close();
          }
        });
    },
    //分页
    handleCurrentChange(size) {
      console.log(size);
      this.pages.currentPage = size;
      this.getData();
    },
    handleSizeChange(size) {
      console.log(size, "cahngdu");
      this.pages.pageSize = size;
      this.getData();
    },
    verifyDetail(id) {
      this.$router.push({name:'auditDetail',query:{id}});
    }
  },
  components: {
    pageBox
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="">
</style>