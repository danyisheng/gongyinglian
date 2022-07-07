<template>
  <div class="processFail" :style="height">
    <el-form ref="form" :model="formData" label-width="140px">
      <common-row>
        <common-col :lot="7" :height="50">
          <el-form-item label="供应商名称："  class="form_box">
            <el-input v-model="formData.Name" placeholder="请输入供应商名称" disabled></el-input>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="8" :height="50">
          <el-form-item label="供应商类型："  class="form_box">
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
          <el-form-item label="联系人："  class="form_box">
            <el-input v-model="formData.ContPsonName" placeholder="请输入供应商账号" disabled></el-input>
          </el-form-item>
        </common-col>
        <common-col :lot="7" :height="50">
          <el-form-item label="联系电话："  class="form_box">
            <el-input v-model="formData.ContPsonMobile" placeholder="请输入供应商账号" disabled></el-input>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="7" :height="50" class="form_box">
          <el-form-item label="负责人身份证号：" >
            <el-input v-model="formData.ContPsonIdCardCode" placeholder="请输入供应商名称" disabled></el-input>
          </el-form-item>
        </common-col>
      </common-row>

      <common-row class="shenFenZheng">
        <common-col :lot="8" :height="230">
          <div class="btn-box">
            <label for></label>
            <div class="puture">
              <oneimgUpload :staticUrl="1"></oneimgUpload>
              <oneimgUpload :staticUrl="2"></oneimgUpload>
            </div>
          </div>
        </common-col>
      </common-row>
      <common-row class="shenFenZheng">
        <common-col :lot="8" :height="230">
          <div class="btn-box">
            <label for>营业执照：</label>
              <oneimgUpload :staticUrl="3"></oneimgUpload>
          </div>
        </common-col>
      </common-row>
      <common-row class="shenFenZheng">
        <common-col :lot="8" :height="230">
          <div class="btn-box">
            <label for>委托授权书：</label>
            <div class="puture">
                            <upload-box isPictureCards></upload-box>

            </div>
          </div>
        </common-col>
      </common-row>
      <common-row class="shenFenZheng">
        <common-col :lot="8" :height="230">
          <div class="btn-box">
            <label for>其它资质认证：</label>
            <div class="puture">
              <upload-box isPictureCards></upload-box>
            </div>
          </div>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="7" :height="50">
          <el-form-item label="提交时间：" class="form_box">
            <el-input v-model="formData.SumbitTIme" placeholder="请输入供应商账号" disabled></el-input>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="7" :height="50">
          <el-form-item label="审核结果：" class="form_box">
            <el-input v-model="formData.AuditResult" placeholder="请输入供应商账号" disabled></el-input>
          </el-form-item>
        </common-col>
        <common-col :lot="7" :height="50">
          <el-form-item label="审核时间：" class="form_box">
            <el-input v-model="formData.AuditTime" placeholder="请输入供应商账号" disabled></el-input>
          </el-form-item>
        </common-col>
      </common-row>
      <common-row class="shenFenZheng">
        <common-col :lot="8" :height="160">
          <div class="btn-box">
            <label for>拒绝原因：</label>
            <div class="result">
              <textarea placeholder="请输入拒绝原因" v-model="formData.Result" disabled></textarea>
            </div>
          </div>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="8" :height="50">
          <div class="btn-box">
            <label for></label>
            <el-button size="medium" type="primary">提交</el-button>
          </div>
        </common-col>
      </common-row>
    </el-form>
  </div>
</template>
<script>
    import uploadBox from '@/common/components/uploadBox'
    import oneimgUpload from './components/oneImgUpload';
export default {
  name: "",
  data() {
    return {
      options: [],
      formData: {
        Name: "",
        Type: "",
        ContPsonName: "",
        ContPsonMobile: "",
        ContPsonIdCardCode: "",
        ContPsonIdCardAscMediaId: "3",
        ContPsonIdCardDscMediaId: "4",
        BusinessLicenseCode: "",
        BusinessLicenseMediaId: "5",
        AuthDelegationMediaIds: ["3"],
        OtherLicenseMediaIds: ["4"],
        //
        SumbitTIme:'',
        AuditResult:'',
        AuditTime:'',
        Result:''
      },
      //接受的状态
      certificationStatus:this.$route.query.status,
      certificationArr:[
        {0:'未认证'},
        {100:'待审核'},
        {200:'审核通过'},
        {300:'审核不通过'},
      ]
    };
  },
  props: [],
  computed: {
    height(){
      return {
        height:window.innerHeight-100+'px'
      }
    }
  },
  components: {uploadBox,oneimgUpload},
  methods: {},
  created() {
    console.log(this.$route.query.status)
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
        min-width: 110px;
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
        width: 131px !important;
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
        width: 100%;
        textarea {
            padding-top: 10px;
        padding-left: 10px;
        box-sizing: border-box;
          width: 100%;
          height: 120px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>