<template>
  <div class="qualicationApprove" :style="height">
    <el-form ref="form" :model="formData" :rules="rules" label-width="140px">
      <common-row>
        <common-col :lot="7" :height="50">
          <el-form-item label="供应商名称：" class="form_box" prop="Name">
            <el-input v-model="formData.Name" placeholder="请输入供应商名称"></el-input>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="8" :height="50">
          <el-form-item label="供应商类型：" class="form_box" prop="Type">
            <el-radio-group v-model="formData.Type">
              <el-radio label="100">制造商工厂</el-radio>
              <el-radio label="200">批发商</el-radio>
              <el-radio label="300">经销商</el-radio>
              <el-radio label="400">代理商</el-radio>
            </el-radio-group>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="7" :height="50">
          <el-form-item label="联系人：" class="form_box" prop="ContPsonName">
            <el-input v-model="formData.ContPsonName" placeholder="请输入联系人"></el-input>
          </el-form-item>
        </common-col>
        <common-col :lot="7" :height="50">
          <el-form-item label="联系电话：" class="form_box" prop="ContPsonMobile">
            <el-input v-model="formData.ContPsonMobile" placeholder="请输入联系电话"></el-input>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="7" :height="50" class="form_box">
          <el-form-item label="负责人身份证号：" prop="ContPsonIdCardCode">
            <el-input v-model="formData.ContPsonIdCardCode" placeholder="请输入身份证号"></el-input>
          </el-form-item>
        </common-col>
      </common-row>

      <common-row class="shenFenZheng">
        <common-col :lot="8" :height="230">
          <div class="btn-box">
            <label for>身份证：</label>
            <div class="puture">
              <oneimgUpload :staticUrl="1" @successUpload="getUrl" 
              :imageUrls="this.formData.ContPsonIdCardAscMediaUrl"
              code="sup_approve"></oneimgUpload>
              <oneimgUpload :staticUrl="2" @successUpload="getUrl" 
              :imageUrls="this.formData.ContPsonIdCardDscMediaUrl"
              code="sup_approve"></oneimgUpload>
            </div>
          </div>
        </common-col>
      </common-row>
      <common-row class="shenFenZheng">
        <common-col :lot="8" :height="230">
          <div class="btn-box">
            <label for>营业执照：</label>
            <oneimgUpload :staticUrl="3" @successUpload="getUrl"
            :imageUrls="this.formData.BusinessLicenseMediaUrl"
             code="sup_approve"></oneimgUpload>
          </div>
        </common-col>
      </common-row>
      <!-- 授权书 -->
      <div class="weituoShouQuan" v-if="formData.Type==300">
        <div class="left">委托授权书</div>
        <div class="right">
          <upload-box
            isPictureCards
            code="sup_approve"
            :Index="4"
            @sucessUpload="getOtherPic"
            :uploadfileCardLists="formData.weiTuoZhengShuList"
          ></upload-box>
        </div>
      </div>
      <div class="weituoShouQuan">
        <div class="left">其它资质认证</div>
        <div class="right">
          <upload-box
            isPictureCards
            code="sup_approve"
            :Index="5"
            @sucessUpload="getOtherPic"
            :uploadfileCardLists="formData.otherList"
          ></upload-box>
        </div>
      </div>
      <common-row>
        <common-col :lot="8" :height="50">
          <div class="btn-box">
            <label for></label>
            <el-button size="medium" type="primary" @click="submitMsg">提交</el-button>
          </div>
        </common-col>
      </common-row>
    </el-form>
  </div>
</template>
<script>
import uploadBox from "@/common/components/uploadBox";
import oneimgUpload from "./components/oneImgUpload";
import { Loading } from "element-ui";
export default {
  name: "",
  data() {
    var idCard = (rule, value, callback) => {
      var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (reg.test(value)) {
        return callback();
      }
      return callback("身份证号错误");
    };
    var contentMobile = (rule, value, callback) => {
      var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
      if (reg.test(value)) {
        return callback();
      }
      return callback("号码不正确");
    };
    return {
      formData: {
        Name: "",
        Type: "",
        ContPsonName: "",
        ContPsonMobile: "",
        ContPsonIdCardCode: "",
        IsAgainSubmit: false,
        ContPsonIdCardAscMediaId: "",
        ContPsonIdCardAscMediaUrl: "",
        ContPsonIdCardDscMediaId: "",
        ContPsonIdCardDscMediaUrl: "",
        BusinessLicenseCode: "",
        BusinessLicenseMediaId: "",
        BusinessLicenseMediaUrl: "",
        //图片多张
        AuthDelegationMediaIds: [],
        OtherLicenseMediaIds: [],
        //图片单
        cardOne: [],
        cardTwo: [],
        cardThree: []
      },

      rules: {
        Name: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
          { max: 32, message: "长度不超过32位", trigger: "blur" }
        ],
        Type: [
          { required: true, message: "请选择供应商类型", trigger: "change" }
        ],
        ContPsonName: [
          { required: true, message: "请输入联系人", trigger: "blur" },
          { max: 10, message: "长度不超过10位", trigger: "blur" }
        ],
        ContPsonMobile: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
          ,{ validator: contentMobile, trigger: 'blur' }
        ],
        ContPsonIdCardCode: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
          ,{ validator: idCard, trigger: 'blur' }
        ]
      }
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
    submitMsg() {
      this.$refs.form.validate(res => {
        if (res) {
          // if (
          //   !this.formData.ContPsonIdCardAscMediaId ||
          //   !this.formData.ContPsonIdCardDscMediaId ||
          //   !this.formData.BusinessLicenseMediaId
          // ) {
          //   this.$message.error("请上传身份证营业执照");
          //   return;
          // }
          var loadingInstance1 = Loading.service({ fullscreen: true });

          var params = {
            Name: this.formData.Name,
            Type: parseInt(this.formData.Type),
            ContPsonName: this.formData.ContPsonName,
            ContPsonMobile: this.formData.ContPsonMobile,
            ContPsonIdCardCode: this.formData.ContPsonIdCardCode,
            IsAgainSubmit: this.formData.IsAgainSubmit,
            ContPsonIdCardAscMediaId: this.formData.ContPsonIdCardAscMediaId,
            ContPsonIdCardDscMediaId: this.formData.ContPsonIdCardDscMediaId,
            BusinessLicenseCode: this.formData.BusinessLicenseCode,
            BusinessLicenseMediaId: this.formData.BusinessLicenseMediaId,
            AuthDelegationMediaIds: this.formData.AuthDelegationMediaIds
              ? this.formData.AuthDelegationMediaIds
              : [],
            OtherLicenseMediaIds: this.formData.OtherLicenseMediaIds
              ? this.formData.OtherLicenseMediaIds
              : []
          };
          this.$https
            .fetchNetPost(
              "/api.Erp.SupplierCertInfo.AddSupplierCertInfo",
              params
            )
            .then(res => {
              console.log(res);
              if (res.data.Success) {
                //改变用户信息
                this.$store.dispatch("user/getInfo").then(res => {
                  this.$router.push("/");
                  loadingInstance1.close();
                });
              } else {
                this.$message.error(res.data.Msg);
                loadingInstance1.close();
              }
            });
        } else {
          this.$message.error("请完善信息");
        }
      });
    },
    //
    getUrl(val) {
      console.log(val);
      if (val.index == 1) {
        this.formData.ContPsonIdCardAscMediaId = val.list.Id;
      } else if (val.index == 2) {
        this.formData.ContPsonIdCardDscMediaId = val.list.Id;
      } else if (val.index == 3) {
        this.formData.BusinessLicenseMediaId = val.list.Id;
      }
    },
    getOtherPic(val) {
      console.log(val, "22");
      if (val.Index == 4) {
        var arr = [];
        val.list.forEach(item => {
          arr.push(item.Id);
        });
        this.formData.AuthDelegationMediaIds = arr;
        console.log(this.formData.AuthDelegationMediaIds);
      } else if (val.Index == 5) {
        var arr = [];
        val.list.forEach(item => {
          arr.push(item.Id);
        });
        this.formData.OtherLicenseMediaIds = arr;
        console.log(this.formData.OtherLicenseMediaIds);
      }
    }
  },
  created() {
    var val =this.$route.query.val? JSON.parse(this.$route.query.val):'';
    if (val) {
      console.log(val, "333");
      this.formData = val;
      this.formData.IsAgainSubmit = true;
      //其他
      var otherList = [];
      var submitotherList=[];
       
      this.formData.otherList.forEach((item, i) => {
        var obj = {};
        let index = item.MediaUrl.lastIndexOf(".");
        let str = item.MediaUrl.substring(index + 1, item.MediaUrl.length);
        obj.name = i + "." + str;
        obj.url = item.MediaUrl;
        obj.Id = item.MediaId;
        otherList.push(obj);
        submitotherList.push(item.MediaId)
      });
      this.formData.otherList = otherList;
      //委托
      var weiTuoZhengShuList = [];
      var submitweiTuoZhengShuList = [];
      this.formData.weiTuoZhengShuList.forEach((item, i) => {
        var obj = {};
        let index = item.MediaUrl.lastIndexOf(".");
        let str = item.MediaUrl.substring(index + 1, item.MediaUrl.length);
        obj.name = i + "." + str;
        obj.url = item.MediaUrl;
        obj.Id = item.MediaId;
        weiTuoZhengShuList.push(obj);
        submitweiTuoZhengShuList.push(item.MediaId)
      });
      this.formData.weiTuoZhengShuList = weiTuoZhengShuList;
      //多图上传
       this.formData.OtherLicenseMediaIds = submitotherList;
      this.formData.AuthDelegationMediaIds = submitweiTuoZhengShuList;
      //单张图片id
      this.formData.ContPsonIdCardAscMediaId = val.ContPsonIdCardAscMediaId;
      this.formData.ContPsonIdCardAscMediaUrl = val.ContPsonIdCardAscMediaUrl;
      this.formData.ContPsonIdCardDscMediaId = val.ContPsonIdCardDscMediaId;
      this.formData.ContPsonIdCardDscMediaUrl = val.ContPsonIdCardDscMediaUrl;
      this.formData.BusinessLicenseMediaId = val.BusinessLicenseMediaId;
      this.formData.BusinessLicenseMediaUrl = val.BusinessLicenseMediaUrl;
    } else {
      this.formData.IsAgainSubmit = false;
    }
  },
  mounted() {},
  watch: {}
};
</script>

<style  lang="scss" scoped>
</style>

<style lang="scss">
.qualicationApprove {
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
      .result {
        padding-top: 10px;
        padding-left: 10px;
        box-sizing: border-box;
        height: 140px;
        border: 1px solid #dcdcdc;
        width: 100%;
        textarea {
          width: 100%;
          height: 120px;
          font-size: 18px;
        }
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
    }
  }
}
</style>