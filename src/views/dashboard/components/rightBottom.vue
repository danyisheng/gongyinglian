<template>
  <div class="rightTop">
    <h4>{{supolyType==300?'直营商品':'商品'}}</h4>
    <div class="boxContent">
      <div class="left">
        <div>待发货采购单</div>
        <div>{{waitSendNum}}</div>
        <div @click="waitSendEt">
          <span>前往查看</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div>待发货补发单</div>
        <div>{{waitShenLose}}</div>
        <div @click="waitBFEt">
          <span>前往查看</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="right">
        <div>待审核货损</div>
        <div>{{waitSendBFNum}}</div>
        <div @click="waitSHEt">
          <span>前往查看</span>
          <i class="el-icon-arrow-right">
          </i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   props:{
    waitSendNum:{
      type:Number,
      default:0
    },
    waitShenLose:{
      type:Number,
      default:0
    },
    waitSendBFNum:{
      type:Number,
      default:0
    },
  },
  data() {
    return {
      supolyType:null
    };
  },
  created(){
    this.supolyType=this.$user.UserInfo().SupplierType
  },
  methods:{
    waitSendEt(){
      this.$router.push('/purchaseManage/purchaseList')
    },
    waitBFEt(){
      this.$router.push('/cargoDamageManage/replacementList')
    },
    waitSHEt(){
      this.$router.push('/cargoDamageManage/damageList')
    },
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.rightTop {
  padding: 20px;
  h4 {
    border-bottom:  1px solid rgba(0,0,0,0.14901960784313725);
    padding-bottom: 10px;
  }
  .boxContent {
    margin-top: 5px;
    display: flex;
    .left {
      margin-right: 40px;
      div:nth-of-type(1){
          margin-top: 5px;
          color: #999;
          font-size: 13px;
      }
      div:nth-of-type(2){
          margin-top: 10px;
          color: #333;
          font-weight: 600;
          font-size: 20px;
      }
      div:nth-of-type(3){
          margin-top: 10px;
          color: #1890FF;
          font-size: 13px;
          span:hover {
            cursor: pointer;
          }
      }
      div:nth-of-type(4){
          margin-top: 10px;
          color: #cccccc;
          font-size: 13px;
      }
      div:nth-of-type(5){
          margin-top: 10px;
          color: #333;
          font-size: 20px;
          font-weight: 600;
      }
      div:nth-of-type(6){
          margin-top: 10px;
          color: #1890FF;
          font-size: 13px;
          span:hover {
            cursor: pointer;
          }
      }
    }
    .right {
      div:nth-of-type(1){
          margin-top: 5px;
          color: #999;
          font-size: 13px;
      }
      div:nth-of-type(2){
          margin-top: 5px;
          color: #333;
          font-weight: 600;
          font-size: 20px;
      }
      div:nth-of-type(3){
          margin-top: 5px;
          color: #1890FF;
          font-size: 13px;
          span:hover {
            cursor: pointer;
          }
      }
    }
  }
}
</style>