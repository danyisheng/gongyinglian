<template>
  <div class="rightTop">
    <h4>待办事项</h4>
    <div class="boxContent">
      <div class="left">
        <div>供应商审核</div>
        <div>{{supplyData}}</div>
        <div @click="supplerAudit">
          <span>前往查看</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <!-- <div>待结算金额(元)</div>
        <div>2029384.8</div>
        <div>
          <span>前往结算</span>
          <i class="el-icon-arrow-right"></i>
        </div> -->
      </div>
      <div class="right">
        <div>上架审核</div>
        <div>{{shangJiaData}}</div>
        <div @click="shaJiaAudit">
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
    supplyData:{
      type:Number,
      default:0
    },
    shangJiaData:{
      type:Number,
      default:0
    },
  },
  data() {
    return {};
  },
  methods:{
    supplerAudit(){
      this.$router.push('/qualificationManage/qualificationList')
    },
    shaJiaAudit(){
      this.$router.push('/platformGoodsManage/applyList');
    }
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