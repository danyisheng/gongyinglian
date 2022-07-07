<template>
  <div class="user-con containerBox">
    <div class="toolbar-box">
      <common-row>
        <common-col :height="50">
          <div class="btn-box displayflex">
            <label for>账号名称：</label>
            <el-input v-model="searchBox.keyword" placeholder="请输入账号" clearable></el-input>
          </div>
        </common-col>
      </common-row>
      <common-row>
        <common-col :height="50" :lot="8">
          <div class="btn-box">
            <el-button @click="search" size="medium" type="primary">查询</el-button>
          </div>
          <div class="btn-box">
            <el-button size="medium" @click="addUser" class="addBtn">新增用户</el-button>
          </div>
          <div class="btn-box">
            <el-button size="medium" @click="delUser" class="dellAllBtn">批量删除</el-button>
          </div>
        </common-col>
      </common-row>
    </div>
    <div class="table-box">
      <el-table
        :height="tableHeight"
        highlight-current-row
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="UserName" width="130" label="账号"></el-table-column>
        <el-table-column width="130" prop="RoleNames" label="角色">
          <template slot-scope="scope">
            <span>{{scope.row.IsEnble ? scope.row.RoleNames :'' }}</span>
          </template>
        </el-table-column>
        <el-table-column width="130" prop="Mobile" label="手机号码"></el-table-column>
        <el-table-column width="130" prop="RealName" label="真实姓名"></el-table-column>
        <el-table-column prop="SexText" width="60" label="性别"></el-table-column>
        <el-table-column width="130" label="供应商类型">
          <template slot-scope="scope">
            <span>{{scope.row.SupplierType ==0 ? '非供应商' : scope.row.SupplierType == 100 ? '普通供应商' : scope.row.SupplierType == 200 ? '闪店供应商' : '直营供应商'}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" label="是否认证">
          <template slot-scope="scope">
            <span>{{scope.row.IsSupplierCertSuc ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column width="90" label="管理员">
          <template slot-scope="scope">
            <span>{{scope.row.IsAdmin ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column width="80" label="设置密码">
          <template slot-scope="scope">
            <span>{{scope.row.IsExistPwd ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column width="130" prop="CreatorName" label="创建人"></el-table-column>
        <el-table-column show-overflow-tooltip width="100" prop="CreateTime" label="创建时间"></el-table-column>
        <el-table-column prop="IsEnble" label="是否启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.IsEnble"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userEvent(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column width="130" label="操作">
          <template slot-scope="scope">
            <div class="btn-box">
              <el-button @click="edit(scope.row)" size="medium" type="primary">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pages-box">
      <page-box
        :pages="pages"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></page-box>
    </div>

    <el-dialog width="520" class="dialog-box" :visible.sync="dialogVisible" @close="dialogEvent">
      <div style="text-align: center" slot="title">{{showTitle}}</div>
      <div class="form-modal-box">
        <el-form ref="form" :model="filterCondition" :rules="rules" label-width="120px">
          <common-row>
            <common-col :lot="8">
              <el-form-item label="头像；" prop="AvatarMediaId">
                <upload-box
                  isPictureAvatar
                  :code="'ACCOUNT_HEAD'"
                  :imageUrls="filterCondition.AvatarUrl"
                  @sucessUpload="getPictureId"
                ></upload-box>
              </el-form-item>
            </common-col>
            <common-col :lot="8">
              <el-form-item label="账号名称；" prop="UserName">
                <el-input v-model="filterCondition.UserName" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </common-col>
            <common-col :lot="8">
              <el-form-item label="手机号码；" prop="Mobile">
                <el-input
                  type="number"
                  v-model="filterCondition.Mobile"
                  placeholder="请输入"
                  clearable
                ></el-input>
              </el-form-item>
            </common-col>
            <common-col :lot="8">
              <el-form-item label="真实姓名；" prop="RealName">
                <el-input v-model="filterCondition.RealName" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </common-col>
            <common-col :lot="8">
              <el-form-item label="性别：" prop="Sex">
                <el-select v-model="filterCondition.Sex" placeholder="请选择" clearable>
                  <el-option
                    v-for="(item, index) in sexList "
                    :label="item.label"
                    :key="index"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </common-col>
            <common-col :lot="8">
              <el-form-item label="生日: " prop="Birthday">
                <el-date-picker
                  v-model="filterCondition.Birthday"
                  type="date"
                  placeholder="请选择"
                ></el-date-picker>
              </el-form-item>
            </common-col>
            <common-col :lot="8" v-if="changeType!='insert'">
              <el-form-item label="供应商类型:" >
                <el-select
                  v-model="filterCondition.SupplierType"
                  filterable
                  placeholder="请选择"
                  clearabl
                  disabled
                >
                  <el-option
                    v-for="item in Supplieroptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </common-col>
            <common-col :lot="8">
              <el-form-item label="配置角色:" prop="roleIdsJson">
                <el-select
                  @change="changes"
                  value-key="value"
                  v-model="filterCondition.roleIdsJson"
                  placeholder="请选择角色"
                  multiple
                >
                  <el-option
                    v-for="(item, index) in roleData"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </common-col>
            <!--<common-col :lot="4">-->
            <!--<el-form-item label="是否发行：" prop="IsSupplierCertSuc">-->
            <!--<el-switch-->
            <!--v-model="filterCondition.IsSupplierCertSuc"-->
            <!--active-color="#13ce66"-->
            <!--inactive-color="#ff4949">-->
            <!--</el-switch>-->
            <!--</el-form-item>-->
            <!--</common-col>-->
            <common-col :lot="8">
              <el-form-item label="是否管理员：" prop="IsAdmin">
                <el-switch
                  v-model="filterCondition.IsAdmin"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </common-col>
            <common-col :lot="8">
              <el-form-item label="是否启用：" prop="IsEnble">
                <el-switch
                  v-model="filterCondition.IsEnble"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
              </el-form-item>
            </common-col>
          </common-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveModal('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import uploadBox from "@/common/components/uploadBox";
export default {
  name: "",
  data() {
    return {
      sexList: [
        { label: "男", value: 1 },
        { label: "女", value: 0 }
      ],
      changeType: "",
      filterCondition: {
        UserName: "",
        Mobile: "",
        Password: "",
        RealName: "",
        Sex: 1,
        Birthday: "",
        DepartmentId: "",
        SupplierType: 0,
        IsSupplierCertSuc: false,
        IsAdmin: false,
        CertFlowId: "",
        SupplierCertInfoId: "",
        Id: "",
        IsValid: true,
        newPwd: "",
        AvatarMediaId: "",
        AvatarUrl: "",
        roleIdsJson: []
      },
      selectTableData: [],
      rules: {
        UserName: [
          { required: true, message: "请输入账号名称", trigger: "blur" }
        ],
        Mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        RealName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        // SupplierType: [
        //   { required: true, message: "请选择供应商类型", trigger: "change" }
        // ],
        roleIdsJson: [
          {
            required: true,
            message: "请选择角色类型",
            trigger: "change",
            type: "array"
          }
        ]
      },
      Supplieroptions: [
        { value: 0, label: "非供应商" },
        { value: 100, label: "普通供应商" },
        { value: 200, label: "闪店供应商" },
        { value: 300, label: "直营供应商" }
      ],
      dialogVisible: false,
      tableData: [],
      pages: this.$pages(),
      searchBox: {
        roleName: "",
        keyword: ""
      },
      roleData: [],
      options: [],
      showTitle: ""
    };
  },
  props: [],
  computed: {
    tableHeight() {
      return this.$tableHeight(150);
    }
  },
  components: { uploadBox },
  methods: {
    getPictureId(val) {
      console.log(val, "val");
      this.filterCondition.AvatarMediaId = val.list.Id;
    },
    changes(val) {
      this.$forceUpdate();
    },
    getMediaData(id) {
      let params = { id };
      this.$https
        .fetchNetPost("/api.Erp.Base_Manage.Base_Media.GetTheData", params)
        .then(res => {});
    },
    sucessUpload(row) {
      console.log(row, "roww");
      this.filterCondition.AvatarMediaId = row.list.Id;
    },
    handleSelectionChange(s) {
      this.selectTableData = s;
    },
    search() {
      this.pages = this.$pages();
      this.getData();
    },
    handleCurrentChange(size) {
      this.pages.currentPage = size;
      this.getData();
    },
    handleSizeChange(size) {
      this.pages.pageSize = size;
      this.getData();
    },
    getData() {
      let params = {
        PageIndex: this.pages.currentPage,
        PageRows: this.pages.pageSize,
        SortField: "CreateTime",
        SortType: "desc",
        keyword: this.searchBox.keyword
      };
      this.loadingWait = this.showLoading("请稍候...");
      this.$https
        .fetchNetPost("/api.Erp.Base_Manage.Base_User.GetDataList", params)
        .then(res => {
          if (res.data.ErrorCode === 200) {
            this.loadingWait.close();
            this.tableData = res.data.Data;
            this.pages.totalCount = res.data.Total;
            this.pages.totalPage = res.data.PageCount;
          } else {
            this.loadingWait.close();
            this.$message.error(res.data.msg);
          }
        });
    },
    addUser() {
      this.clearUser();
      this.changeType = "insert";
      this.showTitle = "新增账号";
      this.dialogVisible = true;
    },
    edit(row) {
      console.log(row, "rowww");
      this.dialogVisible = true;
      this.changeType = "updat";
      this.showTitle = "修改账号  ";
      this.$nextTick(() => {
        this.filterCondition = row;
        // this.filterCondition.roleIdsJson = row.roleIdsJson || [];
        // this.getMediaData(this.filterCondition.AvatarMediaId)
        this.filterCondition.AvatarUrl = row.AvatarMediaUrl;
        this.filterCondition.roleIdsJson = row.RoleIdList;
      });
    },
    delUser() {
      if (this.selectTableData.length > 0) {
        let list = this.selectTableData.map(item => item.Id);
        let params = {
          ids: list
        };
        this.$confirm("确定要删除, 是否继续?", "删除账号", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            this.loadingWait = this.showLoading("请稍候...");
            this.$https
              .fetchNetPost("/api.Erp.Base_Manage.Base_User.DeleteData", params)
              .then(res => {
                if (res.data.ErrorCode === 200) {
                  this.loadingWait.close();
                  this.getData();
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                } else {
                  this.loadingWait.close();
                  this.$message.error(res.data.Msg);
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message.error("请勾选操作数据");
      }
    },
    saveModal(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = {
            UserName: this.filterCondition.UserName,
            Mobile: this.filterCondition.Mobile,
            RealName: this.filterCondition.RealName,
            Sex: this.filterCondition.Sex,
            Birthday: this.filterCondition.Birthday
              ? this.$getDate.getYYSS(this.filterCondition.Birthday)
              : "",
            // SupplierType: this.filterCondition.SupplierType,
            IsAdmin: this.filterCondition.IsAdmin,
            IsEnble: this.filterCondition.IsEnble,
            newPwd: "",
            AvatarMediaId: this.filterCondition.AvatarMediaId,
            roleIdsJson: this.filterCondition.roleIdsJson
          };
          if (this.changeType === "updat") {
            params.Id = this.filterCondition.Id;
             params.newPwd=""
          }else if(this.changeType=='insert'){
            params.newPwd="88888888"
          }
          this.loadingWait = this.showLoading("请稍候...");
          this.$https
            .fetchNetPost("/api.Erp.Base_Manage.Base_User.SaveData", params)
            .then(res => {
              if (res.data.Success) {
                this.dialogVisible = false;
                this.getData();
                this.loadingWait.close();
                this.$message.success("操作成功");
              } else {
                this.loadingWait.close();
                this.$message.error(res.data.Msg);
              }
            });
        } else {
          this.$message.error("表单信息未填写完整！");
        }
      });
    },
    clearUser() {
      this.filterCondition = {
        UserName: "",
        Mobile: "",
        Password: "",
        RealName: "",
        Sex: 1,
        Birthday: "",
        DepartmentId: "",
        SupplierType: 0,
        IsSupplierCertSuc: false,
        IsAdmin: false,
        CertFlowId: "",
        SupplierCertInfoId: "",
        Id: "",
        IsValid: true,
        newPwd: "",
        roleIdsJson: []
      };
    },
    getRoleData() {
      let params = {
        PageIndex: this.pages.currentPage,
        PageRows: 10000,
        SortField: "",
        SortType: "",
        Total: "",
        PageCount: "",
        roleName: ""
      };
      this.$https
        .fetchNetPost("/api.Erp.Base_Manage.Base_Role.GetDataList", params)
        .then(res => {
          if (res.data.ErrorCode === 200) {
            this.loadingWait.close();
            this.roleData = res.data.Data.map(item => {
              return {
                label: item.RoleName,
                value: item.Id
              };
            });
          } else {
            this.$message.error(res.data.Msg);
          }
        });
    },
    //是否启用
    userEvent(val) {
      console.log(val, "val");
      let params = {
        UserName: val.UserName,
        Mobile: val.Mobile,
        RealName: val.RealName,
        Sex: val.Sex,
        Birthday: val.Birthday ? this.$getDate.getYYSS(val.Birthday) : "",
        SupplierType: val.SupplierType,
        IsAdmin: val.IsAdmin,
        IsEnble: val.IsEnble,
        newPwd: "",
        AvatarMediaId: val.AvatarMediaId,
        roleIdsJson: val.roleIdsJson,
        Id: val.Id
      };
      this.loadingWait = this.showLoading("请稍候...");
      this.$https
        .fetchNetPost("/api.Erp.Base_Manage.Base_User.SaveData", params)
        .then(res => {
          if (res.data.ErrorCode === 200) {
            this.getData();
            this.loadingWait.close();
            this.$message.success("操作成功");
          } else {
            this.$message.error(res.data.Msg);
            this.loadingWait.close();
          }
        });
    },
    //关闭的回调
    dialogEvent(){
      this.filterCondition={
        UserName: "",
        Mobile: "",
        Password: "",
        RealName: "",
        Sex: 1,
        Birthday: "",
        DepartmentId: "",
        SupplierType: 0,
        IsSupplierCertSuc: false,
        IsAdmin: false,
        CertFlowId: "",
        SupplierCertInfoId: "",
        Id: "",
        IsValid: true,
        newPwd: "",
        AvatarMediaId: "",
        AvatarUrl: "",
        roleIdsJson: []
      }
    }
  },
  created() {},
  mounted() {
    this.getData();
    this.getRoleData();
  },
  watch: {}
};
</script>

<style scoped lang="scss">
.user-con {
}
</style>

<style lang="scss">
</style>




