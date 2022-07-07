<template>
  <div class="waiShenHeDetail" :style="height">
    <el-form ref="form" :model="formData" label-width="140px" :rules="rules">
      <common-row>
        <common-col :lot="7" :height="50">
          <el-form-item label="供应商名称：" class="form_box">
            <el-input v-model="formData.Name" placeholder="请输入供应商名称" disabled></el-input>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="8" :height="50">
          <el-form-item label="供应商类型：" class="form_box">
            <el-radio-group v-model="formData.Type">
              <el-radio label="100" disabled>制造商工厂</el-radio>
              <el-radio label="200" disabled>批发商</el-radio>
              <el-radio label="300" disabled>经销商</el-radio>
              <el-radio label="400" disabled>代理商</el-radio>
            </el-radio-group>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="7" :height="50">
          <el-form-item label="联系人：" class="form_box">
            <el-input v-model="formData.ContPsonName" placeholder="请输入联系人" disabled></el-input>
          </el-form-item>
        </common-col>
        <common-col :lot="7" :height="50">
          <el-form-item label="联系电话：" class="form_box">
            <el-input v-model="formData.ContPsonMobile" placeholder="请输入联系电话" disabled></el-input>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="7" :height="50" class="form_box">
          <el-form-item label="负责人身份证号：">
            <el-input v-model="formData.ContPsonIdCardCode" placeholder="请输入身份证号" disabled></el-input>
          </el-form-item>
        </common-col>
      </common-row>

      <common-row class="shenFenZheng">
        <common-col :lot="8" :height="180">
          <div class="btn-box">
            <label for></label>
            <div class="puture">
              <img :src="this.formData.ContPsonIdCardAscMediaUrl" alt />
              <img :src="this.formData.ContPsonIdCardDscMediaUrl" alt />
            </div>
          </div>
        </common-col>
      </common-row>
      <common-row class="shenFenZheng">
        <common-col :lot="8" :height="180">
          <div class="btn-box">
            <label for>营业执照：</label>
            <div class="puture">
              <img :src="this.formData.BusinessLicenseMediaUrl" alt />
            </div>
          </div>
        </common-col>
      </common-row>
      <!-- 委托授权书： -->
      <div class="weituoShouQuan" v-if="formData.Type==300">
        <div class="left">委托授权书</div>
        <div class="right">
          <div v-for="item in weiTuoZhengShuList" :key="item.id">
            <img :src="item.MediaUrl?item.MediaUrl:''" alt />
          </div>
        </div>
      </div>
      <div class="weituoShouQuan">
        <div class="left">其它资质认证</div>
        <div class="right">
          <div v-for="item in otherList" :key="item.id">
            <img :src="item.MediaUrl?item.MediaUrl:''" alt />
          </div>
        </div>
      </div>
      <common-row>
        <common-col :lot="7" :height="50">
          <el-form-item label="供应商账号：" class="form_box">
            <el-input v-model="formData.UserName" placeholder="请输入供应商账号" disabled></el-input>
          </el-form-item>
        </common-col>
        <common-col :lot="7" :height="50">
          <el-form-item label="提交时间：" class="form_box">
            <el-input v-model="formData.SumbitTIme" placeholder="请输入提交时间" disabled></el-input>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="7" :height="50">
          <el-form-item label="审核结果：" class="form_box" prop="Status">
            <el-select v-model="formData.Status" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row></common-row>
      <common-row class="shenFenZheng" v-if="formData.Status==3000">
        <common-col :lot="8" :height="160">
          <el-form-item label="拒绝原因：" class="result" prop="StatusDesc" >
            <textarea placeholder="请输入拒绝原因" v-model="formData.StatusDesc"></textarea>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="8" :height="50">
          <div class="btn-box">
            <label for></label>
            <el-button size="medium" type="primary" @click="submit">提交</el-button>
          </div>
        </common-col>
      </common-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      
      options: [
        { label: "通过", value: 2000 },
        { label: "拒绝", value: 3000 }
      ],
      formData: {
        Name: "",
        Type: "",
        ContPsonName: "",
        ContPsonMobile: "",
        ContPsonIdCardCode: "",
        UserName: "",
        SumbitTIme: "",
        //图片
        ContPsonIdCardAscMediaUrl: "",
        ContPsonIdCardDscMediaUrl: "",
        BusinessLicenseMediaUrl: "",
        //审核的状态描述
        Status: "",
        StatusDesc: ""
      },
      rules: {
        Status: [
          { required: true, message: "请选择审核结果", trigger: "change" }
        ],
        StatusDesc: [
          { required: true, message: "请输入拒绝原因", trigger: "blur" },
        ]
      },
      //接受的状态
      getobj: {},
       //
      otherList: [],
      weiTuoZhengShuList: []
    };
  },
  props: [],
  computed: {
    height() {
      return {
        height: window.innerHeight - 100 + "px"
      };
    }
  },
  components: {},
  methods: {
    submit() {
      this.$refs.form.validate(res => {
        if (res) {
          var loading = this.showLoading("请稍候...");
          var params = {
            UserId: this.getobj.UserId,
            Erp_CertFlowId: this.getobj.Erp_CertFlowId,
            CertInfoId: this.getobj.CertInfoId,
            Status: this.formData.Status,
            RejectReason: this.formData.StatusDesc
          };
          this.$https
            .fetchNetPost(
              "/api.Erp.Base_Manage.Base_User.AuditSupplier",
              params
            )
            .then(res => {
              console.log(res);
              loading.close();
              if (res.data.Success) {
                //改变用户信息
                this.$store.dispatch("user/getInfo").then(res => {
                  this.$router.go(-1);
                });
              } else {
                this.$message.error(res.data.Msg);
              }
            });
        } else {
          this.$message.error("请完善信息");
          return false;
        }
      });
    },
    getData() {
      var loading = this.showLoading("请稍候...");
      var params = {
        UserId: this.$route.query.id
      };
      this.$https
        .fetchNetPost(
          "/api.Erp.Base_Manage.Base_User.GetSupplierAuditDetails",
          params
        )
        .then(res => {
          console.log(res.data)
          if (res.status == 200) {
            loading.close();
            this.getobj = res.data.Data;
            this.formData.Name = res.data.Data.SupplierName;
            this.formData.Type = res.data.Data.Type + "";
            this.formData.ContPsonName = res.data.Data.ContPsonName;
            this.formData.ContPsonIdCardCode = res.data.Data.ContPsonIdCardCode;
             this.formData.ContPsonMobile = res.data.Data.ContPsonMobile;
            this.formData.SumbitTIme = res.data.Data.SubmitTime;
            this.formData.AuditTime = res.data.Data.AuditTime;
            this.formData.UserName = res.data.Data.UserName;
            //图片
            this.formData.ContPsonIdCardAscMediaUrl =
              res.data.Data.ContPsonIdCardAscMediaUrl;
            this.formData.ContPsonIdCardDscMediaUrl =
              res.data.Data.ContPsonIdCardDscMediaUrl;
            this.formData.BusinessLicenseMediaUrl =
              res.data.Data.BusinessLicenseMediaUrl;
               this.otherList = res.data.Data.OtherLicenseMediaList;
            this.weiTuoZhengShuList = res.data.Data.AuthDelegationMediaList;
          } else {
            this.$message.error("获取详情失败");
            loading.close();
          }
        });
    }
  },
  created() {
    this.getData();
  },
  mounted() {},
  watch: {}
};
</script>

<style  lang="scss" scoped>
</style>

<style lang="scss">
.waiShenHeDetail {
  overflow-y: scroll;
  padding: 20px 20px;
  box-sizing: border-box;
  .form_box {
    line-height: 28px;
    .el-form-item__content {
      line-height: 28px;
    }
  }
  .common-row {
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 100%;
    .common-col {
      box-sizing: border-box;
      label {
        min-width: 120px;
        display: inline-block;
        height: 28px;
        line-height: 28px;
        vertical-align: middle;
        text-align: right;
      }
      .image-box {
        height: 210px;
        width: 210px;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .shenFenZheng {
    .btn-box {
      display: flex;
      height: 150px;
      label {
        width: 121px !important;
      }
      .puture {
        height: 150px;
        width: 100%;
        display: flex;
        img {
          width: 250px;
          height: 150px;
          margin-right: 20px;
        }
      }
      //其它认证
      .other {
        display: flex;
        > div {
          width: 150px;
          height: 150px;
          margin-right: 20px;
          > img {
            width: 150px;
            height: 150px;
          }
        }
      }
    }
    .result {
      textarea {
        border: 1px solid #cccccc;
        padding-top: 10px;
        padding-left: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 120px;
        font-size: 18px;
      }
    }
  }
  //委托授权书
  .weituoShouQuan {
    display: flex;
    margin-bottom: 20px;
    .left {
      width: 131px;
      text-align: right;
      margin-right: 10px;
    }
    .right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      > div {
        width: 150px;
        height: 150px;
        margin-right: 20px;
        margin-bottom: 20px;
        > img {
          width: 150px;
          height: 150px;
        }
      }
    }
  }
}
</style>