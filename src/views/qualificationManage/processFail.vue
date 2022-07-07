<template>
  <div class="processFail" :style="height">
    <el-form ref="form" :model="formData" label-width="140px">
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
      <!-- 授权书 -->
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
          <el-form-item label="提交时间：" class="form_box">
            <el-input v-model="formData.SumbitTIme" placeholder="请输入提交时间" disabled></el-input>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="7" :height="50" v-if="auditType==3000">
          <el-form-item label="审核结果：" class="form_box">
            <el-input v-model="options[formData.Status]" placeholder="请输入审核结果" disabled></el-input>
          </el-form-item>
        </common-col>
        <common-col :lot="7" :height="50" v-if="auditType==3000">
          <el-form-item label="审核时间：" class="form_box">
            <el-input v-model="formData.AuditTime" placeholder="请输入审核时间" disabled></el-input>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row></common-row>
      <common-row class="shenFenZheng" v-if="auditType==3000">
        <common-col :lot="8" :height="160">
          <el-form-item label="拒绝原因：" class="result">
            <textarea placeholder="请输入拒绝原因" v-model="formData.RejectReason" disabled></textarea>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="8" :height="50">
          <div class="btn-box">
            <label for></label>
            <el-button size="medium" type v-if="auditType!=3000" @click="$router.go(-1)">关闭</el-button>
            <el-button size="medium" type="primary" v-else @click="aginSubmit">重新提交</el-button>
          </div>
        </common-col>
      </common-row>
    </el-form>
  </div>
</template>
<script>
import uploadBox from "@/common/components/uploadBox";
import oneimgUpload from "./components/oneImgUpload";
export default {
  name: "",
  data() {
    return {
      options:{1000: "待审核" , 2000: "审核通过" , 3000: "审核拒绝"},
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
        ContPsonIdCardAscMediaId:"",
        ContPsonIdCardDscMediaUrl: "",
        ContPsonIdCardDscMediaId:"",
        BusinessLicenseMediaUrl: "",
        BusinessLicenseMediaId:"",
        //审核的状态描述
        Status: "",
        StatusDesc: ""
      },
      //接受的状态
      auditType: "",
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
  components: { uploadBox, oneimgUpload },
  methods: {
    getData() {
      var userInfo = this.$user.UserInfo();
      var loading = this.showLoading("请稍候...");
      var params = {
        UserId: userInfo.Id
      };
      this.$https
        .fetchNetPost(
          "/api.Erp.Base_Manage.Base_User.GetSupplierAuditDetails",
          params
        )
        .then(res => {
          if (res.data.ErrorCode === 200) {
            loading.close();
            this.formData.Name = res.data.Data.SupplierName;
            this.formData.Type = res.data.Data.Type + "";
            this.formData.ContPsonName = res.data.Data.ContPsonName;
            this.formData.ContPsonMobile = res.data.Data.ContPsonMobile;
            this.formData.ContPsonIdCardCode = res.data.Data.ContPsonIdCardCode;
            this.formData.SumbitTIme = res.data.Data.SubmitTime;
            this.formData.AuditTime = res.data.Data.AuditTime;
            this.formData.UserName = res.data.Data.UserName;
            this.formData.Status = res.data.Data.Status;
            this.auditType = res.data.Data.Status;
            this.formData.RejectReason = res.data.Data.RejectReason;
            //图片
            this.formData.ContPsonIdCardAscMediaUrl =
              res.data.Data.ContPsonIdCardAscMediaUrl;
               this.formData.ContPsonIdCardAscMediaId =
              res.data.Data.ContPsonIdCardAscMediaId;
            this.formData.ContPsonIdCardDscMediaUrl =
              res.data.Data.ContPsonIdCardDscMediaUrl;
              this.formData.ContPsonIdCardDscMediaId =
              res.data.Data.ContPsonIdCardDscMediaId;
            this.formData.BusinessLicenseMediaUrl =
              res.data.Data.BusinessLicenseMediaUrl;
              this.formData.BusinessLicenseMediaId =
              res.data.Data.BusinessLicenseMediaId;
             
            this.otherList = res.data.Data.OtherLicenseMediaList;
            this.weiTuoZhengShuList = res.data.Data.AuthDelegationMediaList;
            //多图
            this.formData.otherList=res.data.Data.OtherLicenseMediaList;
            this.formData.weiTuoZhengShuList=res.data.Data.AuthDelegationMediaList;
          } else {
            this.$message.error("获取详情失败");
            loading.close();
          }
        });
    },
    //重新提交
    aginSubmit() {
      var val=JSON.stringify(this.formData)
      this.$router.push({name:"qualicationApprove",query:{val}});
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
.processFail {
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
        min-width: 121px;
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
        margin-right: 10px;
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
        flex-wrap: wrap;
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
