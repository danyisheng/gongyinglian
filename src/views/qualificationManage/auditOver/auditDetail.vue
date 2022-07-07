<template>
  <div class="auditDetail">
    <common-row>
      <common-col :lot="7" :height="50">
        <div class="btn-box">
          <label for>供应商名称：</label>
          <el-input v-model="searchBox.goodsName" placeholder="请输入供应商名称" disabled></el-input>
        </div>
      </common-col>
    </common-row>
    <common-row>
      <common-col :lot="7" :height="50">
        <div class="btn-box">
          <label for>供应商类型：</label>
          <el-radio disabled v-model="radio" label="禁用">备选项</el-radio>
          <el-radio disabled v-model="radio" label="选中且禁用">备选项</el-radio>
        </div>
      </common-col>
    </common-row>
    <common-row>
      <common-col :lot="7" :height="50">
        <div class="btn-box">
          <label for>联系人：</label>
          <el-input v-model="searchBox.goodsName" placeholder="请输入供应商账号" disabled></el-input>
        </div>
      </common-col>
      <common-col :lot="7" :height="50">
        <div class="btn-box">
          <label for>联系电话：</label>
          <el-input v-model="searchBox.goodsName" placeholder="请输入供应商账号" disabled></el-input>
        </div>
      </common-col>
    </common-row>
    <common-row>
      <common-col :lot="7" :height="50">
        <div class="btn-box">
          <label for>负责人身份证号：</label>
          <el-input v-model="searchBox.goodsName" placeholder="请输入供应商名称" disabled></el-input>
        </div>
      </common-col>
    </common-row>

    <common-row class="shenFenZheng" >
      <common-col :lot="8" :height="230">
        <div class="btn-box">
          <label for></label>
          <div class="puture">
            <img src="../../../assets/404_images/404.png" alt="">
            <img src="../../../assets/404_images/404.png" alt="">
          </div>
        </div>
      </common-col>
    </common-row>
    <common-row class="shenFenZheng" >
      <common-col :lot="8" :height="230">
        <div class="btn-box">
          <label for>营业执照：</label>
          <div class="puture">
            <img src="../../../assets/404_images/404.png" alt="">
          </div>
        </div>
      </common-col>
    </common-row>
    <common-row class="shenFenZheng" >
      <common-col :lot="8" :height="230">
        <div class="btn-box">
          <label for>委托授权书：</label>
          <div class="puture">
            <img src="../../../assets/404_images/404.png" alt="">
            <img src="../../../assets/404_images/404.png" alt="">
          </div>
        </div>
      </common-col>
    </common-row>
    <common-row class="shenFenZheng" >
      <common-col :lot="8" :height="230">
        <div class="btn-box">
          <label for>其它资质认证：</label>
          <div class="puture">
            <img src="../../../assets/404_images/404.png" alt="">
          </div>
        </div>
      </common-col>
    </common-row>
    <common-row>
      <common-col :lot="7" :height="50">
        <div class="btn-box">
          <label for>供应商账号：</label>
          <el-input v-model="searchBox.goodsName" placeholder="请输入供应商账号" disabled></el-input>
        </div>
      </common-col>
      <common-col :lot="7" :height="50">
        <div class="btn-box">
          <label for>提交时间：</label>
          <el-input v-model="searchBox.goodsName" placeholder="请输入供应商账号" disabled></el-input>
        </div>
      </common-col>
    </common-row>
    <common-row>
      <common-col :lot="7" :height="50">
        <div class="btn-box">
          <label for>审核结果：</label>
          <el-input v-model="searchBox.goodsName" placeholder="请输入供应商账号" disabled></el-input>
        </div>
      </common-col>
      <common-col :lot="7" :height="50">
        <div class="btn-box">
          <label for>审核人：</label>
          <el-input v-model="searchBox.goodsName" placeholder="请输入供应商账号" disabled></el-input>
        </div>
      </common-col>
    </common-row>
     <common-row>
      <common-col :lot="7" :height="50">
        <div class="btn-box">
          <label for>审核时间：</label>
          <el-input v-model="searchBox.goodsName" placeholder="请输入供应商账号" disabled></el-input>
        </div>
      </common-col>
    </common-row>
    <common-row  >
      <common-col :lot="8" :height="50">
        <div class="btn-box">
          <label for></label>
          <el-button size="medium" type="">关闭</el-button>
        </div>
      </common-col>
    </common-row>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
        options:[],
      searchBox: {
        goodsName: "",
        cargety: ""
      },
      radio: "选中且禁用"
    };
  },
  props: [],
  computed: {},
  components: {},
  methods: {},
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style  lang="scss" scoped>
.auditDetail {
  padding: 0 0 0 50px;
  .common-row {
    .common-col {
      .label {
        min-width: 100px;
      }
    }
  }
}
</style>

<style lang="scss">
.auditDetail {
  padding: 0 0 0 50px;
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
        height: 210px;
        label {
            width: 131px !important;
        }
      .puture {
          height: 210px;
          // border: 1px solid #dcdcdc;
          width: 100%;
          img {
            width: 250px;
            height: 210px;
            margin-right: 20px;
          }
          
      }
      .result {
        padding-top: 10px;
        padding-left: 10px;
        box-sizing: border-box;

        height: 210px;
          border: 1px solid #dcdcdc;
          width: 100%;
          textarea {
            width: 100%;
            height: 180px;
          }
      }
    }
  }
}
</style>