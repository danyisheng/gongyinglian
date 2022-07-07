<template>
  <div class="supplyManage">
    <el-table :data="tableData" style="width: 100%" :height="height">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="UserName" label="供应商账号"></el-table-column>
      <el-table-column prop="SupplierName" label="供应商名称"></el-table-column>
      <el-table-column label="联系人/联系电话">
        <template slot-scope="scope">
          <div>{{scope.row.ContPsonName}}/{{scope.row.ContPsonMobile}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="StatusDesc" label="认证状态">
        <!-- <template slot-scope="scope">
            <div>{{scope.row.IsSupplierCertSuc?'通过':'拒绝'}}</div>
        </template>-->
      </el-table-column>
      <!-- </el-table-column> -->
      <el-table-column prop="ProductCount" label="商品数"></el-table-column>
      <el-table-column label="是否分公司">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.IsSubCompany"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="userEvent(scope.row.IsSubCompany)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="CreateTime" label="注册时间"></el-table-column>
    </el-table>
    <div class="pages-box">
      <page-box
        :pages="pages"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></page-box>
    </div>
  </div>
</template>
<script>
import pageBox from "@/common/components/pageBox";

export default {
  data() {
    return {
      tableData: [],
      //分页
      pages: this.$pages(),
      //高度
      height: this.$tableHeight(180)
    };
  },
  props: {
    searchBox: {
      type: Object
    },
    val1:{
      type:Boolean
    }
  },
  components: { pageBox },
  methods: {
    getData() {
      if (this.searchBox.renStatus == "") {
        this.searchBox.IsCertSucAll = true;
        this.searchBox.IsSupplierCertSuc = false;
      } else if (this.searchBox.renStatus == 1) {
        this.searchBox.IsSupplierCertSuc = true;
        this.searchBox.IsCertSucAll = false;
      } else if (this.searchBox.renStatus == 2) {
        this.searchBox.IsCertSucAll = false;
        this.searchBox.IsSupplierCertSuc = false;
      }
      let loadingInstance1 = this.showLoading();
      var params = {
        pagination: {
          PageIndex: this.pages.currentPage,
          PageRows: this.pages.pageSize,
          SortField: "CreateTime",
          SortType: "desc",
          Total: 1000
        },
        userName: this.searchBox.userName,
        supplierName: this.searchBox.supplierName,
        contPsonMobile: this.searchBox.contPsonMobile,
        productCountMin: this.searchBox.productCountMin,
        productCountMax: this.searchBox.productCountMax,
        IsCertSucAll: this.searchBox.IsCertSucAll,
        IsSupplierCertSuc: this.searchBox.IsSupplierCertSuc,
        startTime: this.searchBox.startTime,
        endTime: this.searchBox.endTime
      };
      this.$https
        .fetchNetPost(
          "/api.Erp.Base_Manage.Base_User.GetUserSupplierDataList",
          params
        )
        .then(res => {
          console.log(res);
          if (res.data.Success) {
            loadingInstance1.close();
            this.tableData = res.data.Data;
            this.pages.totalCount = res.data.Total;
            this.pages.totalPage = res.data.PageCount;
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
    //切换分公司
    userEvent(val) {
      console.log(val);
      let loadingInstance1 = this.showLoading();
      console.log(this.$user.UserInfo());
      var params = {
        UserId: this.$user.UserInfo().Id,
        IsSubCompany: val
      };
      this.$https
        .fetchNetPost(
          "/api.Erp.Base_Manage.Base_User.UpdateSubCompanyInfo",
          params
        )
        .then(res => {
          console.log(res);
          if (res.data.Success) {
            loadingInstance1.close();
          } else {
            this.$message.error(res.data.msg);
            loadingInstance1.close();
          }
        });
    },
     //导出数据
    exportDataEvent() {
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
      if (this.searchBox.renStatus == "") {
        this.searchBox.IsCertSucAll = true;
        this.searchBox.IsSupplierCertSuc = false;
      } else if (this.searchBox.renStatus == 1) {
        this.searchBox.IsSupplierCertSuc = true;
        this.searchBox.IsCertSucAll = false;
      } else if (this.searchBox.renStatus == 2) {
        this.searchBox.IsCertSucAll = false;
        this.searchBox.IsSupplierCertSuc = false;
      }
      let loadingInstance1 = this.showLoading();
      var params = {
        pagination: {
          PageIndex: this.pages.currentPage,
          PageRows: this.pages.totalCount,
          SortField: "CreateTime",
          SortType: "desc",
          Total: 1000
        },
        userName: this.searchBox.userName,
        supplierName: this.searchBox.supplierName,
        contPsonMobile: this.searchBox.contPsonMobile,
        productCountMin: this.searchBox.productCountMin,
        productCountMax: this.searchBox.productCountMax,
        IsCertSucAll: this.searchBox.IsCertSucAll,
        IsSupplierCertSuc: this.searchBox.IsSupplierCertSuc,
        startTime: this.searchBox.startTime,
        endTime: this.searchBox.endTime
      };
      this.$https
        .fetchNetPost(
          "/api.Erp.Base_Manage.Base_User.GetUserSupplierDataList",
          params
        )
        .then(res => {
          console.log(res);
          if (res.data.Success) {
            //表内容数据
            let arr = [];
            res.data.Data.forEach(ele => {
              let item = {};
              item.supplierNum = ele.UserName ? ele.UserName : "";
              item.SupplierName = ele.SupplierName;
              item.recommendMsg = ele.ContPsonName + "/" + ele.ContPsonMobile;
              item.approveStatus = ele.IsSupplierCertSuc ? "通过" : "拒绝";
              item.goodsNum = ele.ProductCount;
              item.registTime = ele.CreateTime;
              arr.push(item);
            });

            let tableHeader = [
              "供应商账号",
              "供应商名称",
              "联系人/联系人电话",
              "认证状态",
              "商品数",
              "注册时间"
            ];
            let headerObj = `导出供应商模板${this.$dayjs(new Date()).format(
              "YYYY-MM-DD"
            )}`;
            let filterVal = [
              "supplierNum",
              "SupplierName",
              "recommendMsg",
              "approveStatus",
              "goodsNum",
              "registTime"
            ];
            this.$excel.exportData(tableHeader, filterVal, arr);
            loadingInstance1.close();
          } else {
            this.$message.error(res.data.msg);
            loadingInstance1.close();
          }
        });
    },
  },
  mounted() {
    this.getData();
  },
  watch:{
    val1:function(newv,oldv){
      if(newv){
        this.pages=this.$pages()
        this.getData()
      }
    }
  }
};
</script>