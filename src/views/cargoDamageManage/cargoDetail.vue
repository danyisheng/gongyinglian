<template>
  <div class="cargo-damage-detail containerBoxInfo" :style="height">
    <div class="cargoinfoBox">
      <div class="handleBox">
        <div class="handleInfo" v-if="cur == 0">
          <div class="name">待处理</div>
          <div class="smallBox">
            <div class="str">货损数：{{ goodsInfo.sdNumber }}</div>
            <div class="str">货损类型：{{ getType(goodsInfo.type) }}</div>
            <el-button @click="clickModal" type="primary">货损处理</el-button>
          </div>
        </div>
        <div class="handleInfo" v-if="cur == 1">
          <div class="name">已处理</div>
          <div class="smallBox">
            <div class="str">货损数：{{ goodsInfo.sdNumber }}</div>
            <div class="str">货损类型：{{ getType(goodsInfo.type) }}</div>
            <div class="str">补发：{{ goodsInfo.gylNumber || 0 }}</div>
            <div class="str">非货损：{{ goodsInfo.gylNonDamage || 0 }}</div>
            <div class="str">不补发：{{ goodsInfo.notReissueNumber || 0 }}</div>
            <div class="str" v-if="cargoType == 1">不补发赔偿金额：{{ goodsInfo.notReissueMoney || 0 }}</div>
            <div class="str">部分赔付：{{ goodsInfo.paidNumber || 0 }}</div>
            <div class="str">赔偿金额：{{ goodsInfo.paidMoney || 0 }}</div>
            <div class="str">发货状态：{{ getStatus(goodsInfo.deliveryStatus) }}</div>
          </div>
        </div>
        <div class="handleList">
          <div class="title">处理记录</div>
          <div class="infoItem">
            <div class="item disFlex" v-if="cur == 1">
              <img :src="goodsInfo.supplierAvatar" alt="" v-if="goodsInfo.supplierAvatar != '' ">
              <img src="../../assets/image/touxiang@2x.png" alt="" v-if="goodsInfo.supplierAvatar == '' ">
              <div class="right">
                <div class="top disFlex">
                  <div class="name">{{ goodsInfo.supplierName }}（{{ goodsInfo.mobile }}）</div>
                  <div class="date">{{ goodsInfo.gylOperatorTime }}</div>
                </div>
                <div class="msg">
                  已处理。
                  <span v-if="goodsInfo.gylOpinion">
                    原因：{{ goodsInfo.gylOpinion }}
                  </span>
                </div>
              </div>
            </div>
            <div class="item disFlex">
              <img src="../../assets/image/touxiang@2x.png" alt="">
              <div class="right">
                <div class="top disFlex">
                  <div class="name">{{ goodsInfo.sdName }}</div>
                  <div class="date">{{ goodsInfo.sdOperatorTime }}</div>
                </div>
                <div class="msg">
                  已确认。确认货损数：{{ goodsInfo.sdNumber }}
                  （申报货损数：{{ goodsInfo.damageNum }}，非货损数：{{ goodsInfo.damageNum - goodsInfo.sdNumber }}）。
                </div>
              </div>
            </div>
            <div class="item disFlex">
              <img src="../../assets/image/touxiang@2x.png" alt="">
              <div class="right">
                <div class="top disFlex">
                  <div class="name">{{ goodsInfo.userName }}（{{ goodsInfo.userPhone }}）</div>
                  <div class="date">{{ goodsInfo.createtime }}</div>
                </div>
                <div class="msg">
                  发起了货损申报，申报数量：{{ goodsInfo.damageNum }}，
                  货损类型：{{ getType(goodsInfo.type) }}，
                  申报说明：{{ goodsInfo.remarks }}
                </div>
                <div class="imgBox disFlex">
                  <el-image style="width: 100px; height: 100px" :src="item" :preview-src-list="goodsInfo.damageImgs"
                    v-for="(item, index) in goodsInfo.damageImgs" :key="index"></el-image>
                  <!-- <img :src="item" alt="" v-for="(item, index) in goodsInfo.damageImgs" :key="index"> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="infoBox">
        <div class="title">货损信息</div>
        <div class="info disFlex">
          <img :src="goodsInfo.image" alt />
          <div class="right">
            <div class="nameBox disFlex">
              <div class="name">{{ goodsInfo.goodsName }}</div>
              <div class="typeLabel">{{ getPurchaseType(purchaseType) }}</div>
            </div>
            <div class="goodsInfo" v-for="(specs,n) in goodsInfo.goodsSpecs" :key="n">
              <p>{{n}}：{{specs}}</p>
            </div>
            <div class="status">商品状态：{{ getGoodsStatus(goodsInfo.supplyStatus) }}</div>
          </div>
        </div>
        <div class="numInfo">
          <div class="item">
            <span class="str">货损单号：</span>
            <span class="num">{{ goodsInfo.damageNumber }}</span>
          </div>
          <div class="item">
            <span class="str">货损类型：</span>
            <span class="num">{{ getType(goodsInfo.type) }}</span>
          </div>
          <div class="item">
            <span class="str">申报货损数：</span>
            <span class="num">{{ goodsInfo.damageNum }}</span>
          </div>
          <div v-if="goodsInfo.type == 0">
            <div class="item">
              <span class="str">采购单号</span>
              <span class="num cursor" style="color: #1890FF;" @click="toPurch">{{ purchaseNumber }}</span>
            </div>
            <div class="item">
              <span class="str">发货单：</span>
              <span class="num">{{ goodsInfo.deliveryNumber }}</span>
            </div>
          </div>
        </div>
        <div class="numInfo" v-if="purchaseType == 200">
          <div class="item">
            <span class="str">供应商姓名：</span>
            <span class="num">{{ gysInfo.gylName }}</span>
          </div>
          <div class="item">
            <span class="str">供应商手机号：</span>
            <span class="num">{{ gysInfo.gylPhone }}</span>
          </div>
          <div class="item">
            <span class="str">供应商省份：</span>
            <span class="num">{{ gysInfo.gylCity }}</span>
          </div>
        </div>
        <div class="address disFlex" v-if="goodsInfo.detailAddress">
          <div class="name">收货地址：</div>
          <div class="adDetail">{{ goodsInfo.detailAddress }}</div>
        </div>
      </div>
    </div>

    <el-dialog width="40%" class="dialog-box" :visible.sync="showPop">
      <div style="text-align: center" slot="title">货损处理</div>
      <div class="specs">货损数量分配（需={{ goodsInfo.sdNumber }}）：</div>
      <div class="form-modal-box">
          <!-- label-width="100px" -->
        <el-form ref="form" :model="cargoDetail" :rules="rules" >
          <common-row>
            <common-col :lot="7">
              <el-form-item  prop="replacement">
                <el-tooltip effect="dark" content="承认是货损且采取补发措施，真正扣除店主的售卖库存" placement="top-start">
                  <el-button type="text" class="btn">补发<i class="el-icon-question el-icon--right"></i></el-button>
                </el-tooltip>
                <el-input type="replacement" v-model.number="cargoDetail.replacement" autocomplete="off" 
                clearable placeholder="填写补发"></el-input>
              </el-form-item>
            </common-col>
            <common-col :lot="7">
              <el-form-item  prop="noCargo">
                <el-tooltip effect="dark" content="不承认是货损，会返还至相应售卖库存进行正常售卖" placement="top-start">
                  <el-button type="text" class="btn">非货损<i class="el-icon-question el-icon--right"></i></el-button>
                </el-tooltip>
                <el-input type="noCargo" v-model.number="cargoDetail.noCargo" autocomplete="off"
                 clearable placeholder="填写非货损"></el-input>
              </el-form-item>
            </common-col>
            <common-col :lot="7">
              <el-form-item  prop="noReplacement">
                <el-tooltip effect="dark" content="承认是货损但无法补发，真正扣除店主的售卖库存" placement="top-start">
                  <el-button type="text" class="btn">不补发<i class="el-icon-question el-icon--right"></i></el-button>
                </el-tooltip>
                <el-input type="noReplacement" v-model.number="cargoDetail.noReplacement" autocomplete="off"
                 clearable placeholder="填写不补发"></el-input>
              </el-form-item>
            </common-col>
            <common-col :lot="7">
              <el-form-item  prop="partClaim">
                <el-tooltip effect="dark" content="承认有货损但属于轻量级货损，直接赔付一定金额，会返还至相应售卖库存进行正常售卖" placement="top-start">
                  <el-button type="text" class="btn">部分赔付<i class="el-icon-question el-icon--right"></i></el-button>
                </el-tooltip>
                <el-input type="partClaim" v-model.number="cargoDetail.partClaim" autocomplete="off"
                 clearable placeholder="填写部分赔付"></el-input>
              </el-form-item>
            </common-col>
            <common-col :lot="8" v-if="showClaim">
              <el-form-item  prop="claimPrice" class="noFlex">
                <label class="labelTip"><span style="color: red;">*</span>赔偿金额 (不可超过￥{{ maxClaimPrice }})：</label>
                <el-input type="claimPrice" v-model.number="cargoDetail.claimPrice" autocomplete="off"
                 clearable placeholder="填写赔偿金额"></el-input>
              </el-form-item>
            </common-col>
            <common-col :lot="8" v-if="noReplacePriceShow">
              <el-form-item  prop="claimPrice" class="noFlex">
                <label class="labelTip">不补发赔偿金额：</label>
                <el-input type="claimPrice" v-model.number="cargoDetail.noReplacePrice" disabled></el-input>
              </el-form-item>
            </common-col>
            <common-col :lot="8">
              <el-form-item  prop="message" class="noFlex">
                <label class="labelTip"><span style="color: red;">*</span>原因：</label>
                <el-input type="textarea" v-model="cargoDetail.message" autocomplete="off"
                 clearable placeholder="填写非货损或不补发原因"></el-input>
              </el-form-item>
            </common-col>
          </common-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="sendDamage">确 定</el-button>
      </div>
    </el-dialog>
    <div class="action-box">
      <div class="btn-box">
        <el-button size="medium" @click="$router.go(-1)" icon="el-icon-arrow-left" type="primary">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "",
  data() {
    var check1 = (rule, value, callback) => {
      if(value == '') {
        callback(new Error('不能为空或0'));
      }else if(value <= 0) {
        callback(new Error('请输入大于0'));
      }else if(!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      }else {
        callback();
      }
    };
    var check2 = (rule, value, callback) => {
      if(value == ''){
        callback();
      }else if(value < 0) {
        callback(new Error('请输入正确数量'));
      }else if(!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      }else {
        callback();
      }
    };
    var check3 = (rule, value, callback) => {
      this.noReplacePriceShow = false;
      if(value == ''){
        callback();
      }else if(value < 0) {
        callback(new Error('请输入正确数量'));
      }else if(!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      }else {
        if(this.cargoType == 1) {
          this.noReplacePriceShow = true;
        }
        this.cargoDetail.noReplacePrice = Number(this.cargoDetail.noReplacement) * Number(this.goodsInfo.costPrice)
        callback();
      }
    };
    var check4 = (rule, value, callback) => {
      if(0 < this.cargoDetail.noCargo || 0 < this.cargoDetail.noReplacement) {
        if(value == '') {
          callback(new Error('不能为空'));
        }else {
          callback();
        }
      }else {
        callback();
      }
    };
    var check5 = (rule, value, callback) => {
      this.showClaim = false;
      if(value < 0) {
        callback(new Error('请输入大于0'));
      }else if(value > 0){
        this.showClaim = true;
        this.maxClaimPrice = Number(this.goodsInfo.costPrice) * Number(value) * 0.5
        callback();
      }else if(value === 0) {
        callback();
      }else if(!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      }
    };
    var check6 = (rule, value, callback) => {
      if(value < 0) {
        callback(new Error('请输入大于0'));
      }else if(0 <= value){
        if(this.maxClaimPrice < value) {
          callback(new Error('不可超过￥' + this.maxClaimPrice));
        }else {
          callback();
        }
      }else if(!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      }
    }
    return {
      cur: 0,
      id: 0,
      purchaseNumber: '',
      cargoType: '',
      purchaseType: '',
      gysInfo: {},
      showPop: false,
      showClaim: false, // 是否展示赔偿金额
      noReplacePriceShow: false, // 是否展示不补发赔偿金额
      maxClaimPrice: '', // 不可超过的赔偿金额
      cargoDetail: {
        replacement: '', // 补发
        noCargo: '', // 非货损
        noReplacement: '', // 不补发
        partClaim: '', // 部分赔付 
        claimPrice: '', // 赔偿金额
        noReplacePrice: '', // 不补发赔偿金额
        message: '', // 原因
      },
      rules: {
        replacement: [ {  validator: check1, trigger: 'blur' } ],
        noCargo: [ {  validator: check2, trigger: 'blur' } ],
        noReplacement: [ {  validator: check3, trigger: 'blur' } ],
        message: [ {  validator: check4, trigger: 'blur' } ],
        partClaim: [ { validator: check5, trigger: 'blur' } ],
        claimPrice: [ { validator: check6, trigger: 'blur' } ],
      },
      goodsInfo: {},

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
    getType(e) {
      let i = Number(e)
      switch(i) {
        case 0:
          return '入库前货损'
          break
        case 1:
          return '入库后货损'
          break
      }
    },
    getStatus(e) {
      let i = Number(e)
      switch(i) {
        case 0:
          return '待发货'
          break
        case 1:
          return '已发货'
          break
        case 2:
          return '已取消'
          break
      }
    },
    getGoodsStatus(e) {
      let i = Number(e)
      switch(i) {
        case 1:
          return '上架'
          break
        case 2:
          return '下架'
          break
      }
    },
    getPurchaseType(e) {
      let i = Number(e)
      switch(i) {
        case 100:
          return '直采'
          break
        case 200:
          return '省营'
          break
      }
    },
    toPurch() {
      let obj = {
        image: this.goodsInfo.image,
        name: this.goodsInfo.goodsName,
        goodsSpecs: this.goodsInfo.goodsSpecs,
        goodsStatus: this.goodsInfo.supplyStatus,
        purchaseNumber: this.purchaseNumber,
        status: '2',
        createtime: this.goodsInfo.purchaseCreatetime,
        actiontime: this.goodsInfo.actiontime || '',
        logisticsNum: this.goodsInfo.logisticsNum,
        deliverGoodsNum: this.goodsInfo.deliverGoodsNum,
      }
      console.log(obj)
      this.$router.push({name: 'purchaseDetail',query:{detail:qs.stringify(obj)}})
    },
    clickModal() {
      this.showPop = true
    },
    close() {
      this.showPop = false
      this.cargoDetail = {
        replacement: '', // 补发
        noCargo: '', // 非货损
        noReplacement: '', // 不补发
        partClaim: '', // 部分赔付 
        claimPrice: '', // 赔偿金额
        noReplacePrice: '', // 不补发赔偿金额
        message: '', // 原因
      }
      this.showClaim = false;
      this.noReplacePriceShow = false;
    },
    // 详情
    getDamageDetail() {
      let params = {
        supplierId: this.$user.supplyId(),
        // supplierId: '1235383536572174123',
        id: this.id,
      }
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchQsPost('/damage/get/DamageDetail', params).then(res => {
        // console.log(res.data)
        this.loadingWait.close()
        if(res.data.code == 200) {
          let info = res.data.data;
          info.goodsSpecs = JSON.parse(info.goodsSpecs);
          info.damageImgs = res.data.data.damageImgs.split(',');
          info.supplierAvatar = res.data.data.supplierAvatar ? res.data.data.supplierAvatar : ''
          this.goodsInfo = info;
          console.log(this.goodsInfo)
        }else {
          this.$message({ type: 'error', message: res.data.msg })
        }
      })
    },
    // 审核
    sendDamage() {
      var regPos = /^\d+$/;
      
      if(this.cargoDetail.replacement == '') {
        this.$message.error("补发数必填");
        return
      }
      if(this.cargoDetail.partClaim === '') {
        this.$message.error("部分赔付不能为空，最低为0");
        return
      }
      if(0 < this.cargoDetail.partClaim) {
        if(this.cargoDetail.claimPrice === '') {
          this.$message.error("赔偿金额必填");
          return
        }
      }
      if(0 < this.cargoDetail.partClaim) {
        if(!regPos.test(this.cargoDetail.claimPrice) && this.cargoDetail.claimPrice !== '') {
          this.$message.error("请输入数字值");
          return
        }
      }
      if( 0 <  this.cargoDetail.noCargo || 0 < this.cargoDetail.noReplacement) {
        if(!this.cargoDetail.message) {
          this.$message.error("非货损数或者不补发数大于0时，原因必填");
          return
        }
      }
      if(this.goodsInfo.sdNumber != this.cargoDetail.replacement + (this.cargoDetail.noCargo === '' ? 0 : this.cargoDetail.noCargo) 
        + (this.cargoDetail.noReplacement === '' ? 0 : this.cargoDetail.noReplacement) + this.cargoDetail.partClaim) {
        this.$message.error("补发，非货损，不补发，部分赔付总数需等于总货损数");
        return
      }
      if(this.maxClaimPrice < this.cargoDetail.claimPrice) {
        this.$message.error("赔偿金额不可超过￥" + this.maxClaimPrice);
        return
      }
      if(this.cargoDetail.noReplacement === '') {
        this.cargoDetail.noReplacePrice = 0 * Number(this.goodsInfo.costPrice)
      }
      let params = {
        supplierId: this.$user.supplyId(),
        // supplierId: '1235383536572174123',
        id: this.id,
        type: this.goodsInfo.type,
        gylNumber: this.cargoDetail.replacement, // 补发
        gylNonDamage: this.cargoDetail.noCargo || 0, // 非货损
        notReissueNumber: this.cargoDetail.noReplacement || 0, // 不补发
        paidNumber: this.cargoDetail.partClaim || 0, // 部分赔付 
        paidMoney: this.cargoDetail.claimPrice || 0, // 赔偿金额
        notReissueMoney: this.cargoDetail.noReplacePrice, // 不补发赔偿金额
        gylOpinion: this.cargoDetail.message // 原因

      }
      // console.log(params)
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchQsPost('/damage/update/damageApply', params).then(res => {
        console.log(res.data)
        this.showPop = false;
        this.cargoDetail = {
          replacement: '', // 补发
          noCargo: '', // 非货损
          noReplacement: '', // 不补发
          partClaim: '', // 部分赔付 
          claimPrice: '', // 赔偿金额
          noReplacePrice: '', // 不补发赔偿金额
          message: '', // 原因
        }
        this.showClaim = false;
        this.noReplacePriceShow = false;
        this.loadingWait.close()
        if(res.data.code == 200) {
          this.$message({ type: 'success', message: '提交成功!' });
          this.$router.go(-1)
        }else [
          this.$message({ type: 'error', message: res.data.msg })
        ]
       })
    },
    
  },
  created() {
    this.cur = qs.parse(this.$route.query.info).cur;
    this.id = qs.parse(this.$route.query.info).id;
    this.purchaseNumber = qs.parse(this.$route.query.info).purchaseNumber;
    this.cargoType = qs.parse(this.$route.query.info).type;
    this.purchaseType = qs.parse(this.$route.query.info).purchaseType;
    this.gysInfo = {
      gylCity: qs.parse(this.$route.query.info).gylCity,
      gylName: qs.parse(this.$route.query.info).gylName,
      gylPhone: qs.parse(this.$route.query.info).gylPhone,
    }
    // console.log(this.cargoType)
    this.getDamageDetail()
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped lang="scss">
.cargo-damage-detail {
  padding: 40px 544px 55px 20px;
}
.cargoinfoBox {
  // width: 100%;
}
.form-modal-box {
  .labelTip {
    padding-left: 10px;
    text-align: left;
  }
  /deep/ .el-form-item__content {
    display: flex;
    flex-direction: column;
    margin-left: 0;
    .btn {
      width: 100px;
      color: #333;
      text-align: left;
    }
    .el-input {
      box-sizing: border-box;
      flex: 1;
      padding-left: 20px;
    }
    .el-textarea {
      box-sizing: border-box;
      flex: 1;
      padding-left: 20px;
    }
  }
}
.handleBox {
  // flex: 1;
  .handleInfo {
    .name {
      margin-bottom: 30px;
      font-size: 26px;
      font-weight: bold;
      color: #000;
    }
    .smallBox {
      padding-left: 138px;
      .str {
        margin-bottom: 10px;
        color: #000;
        font-size: 14px;
      }
    }
  }
  .handleList {
    margin-top: 60px;
    .title {
      margin-bottom: 30px;
      padding-left: 20px;
      font-size: 26px;
      font-weight: bold;
      color: #000;
    }
    .infoItem {
      padding-left: 138px;
      // padding-right: 120px;
      .item {
        padding: 20px 0;
        align-items: center;
        border-bottom: 1px solid #ccc;
        img {
          align-self: flex-start;
          margin-right: 20px;
          width: 72px;
          height: 72px;
          border-radius: 50%;
        }
        .right {
          flex: 1;
        }
        .top {
          margin-bottom: 10px;
          justify-content: space-between;
          .name {
            font-size: 14px;
            color: #000;
          }
          .date {
            color: #ccc;
            font-size: 14px;
            font-size: 14px;
          }
        }
        .msg {
          margin-bottom: 20px;
          color: #ccc;
          font-size: 14px;
          font-size: 14px;
        }
        .imgBox {
          flex-wrap: wrap;
          img {
            margin-right: 20px;
            margin-bottom: 10px;
            width: 120px;
            height: 120px;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
.infoBox {
  position: fixed;
  top: 140px;
  right: 60px;
  padding: 20px;
  width: 322px;
  border: 1px solid #ccc;
  border-radius: 4px;
  .title {
    padding-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
  }
  .info {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    img {
      margin-right: 20px;
      width: 120px;
      height: 120px;
      border-radius: 4px;
    }
    .right {
      flex: 1;
      .nameBox {
        margin-bottom: 20px;
        justify-content: space-between;
        align-items: center;
        .name {
          flex: 1;
          font-size: 18px;
          font-weight: bold;
          color: #000;
        }
        .typeLabel {
          padding: 5px 10px;
          color: #fff;
          background: #1890FF;
          border-radius: 4px;
        }
      }
      .goodsInfo {
        margin-bottom: 20px;
        font-size: 14px;
        color: #ccc;
        &:nth-last-child(1) {
          margin-bottom: 0;
        }
      }
      .imgBox {
        align-items: center;
        img {
          margin-right: 20px;
          width: 120px;
          height: 120px;
          border-radius: 4px;
        }
      }
    }
  }
  .numInfo {
    padding: 30px 0;
    border-bottom: 1px solid #ccc;
    .item {
      margin-bottom: 10px;
      span {
        font-size: 14px;
        display: inline-block;
      }
      .str {
        width: 100px;
        color: #ccc;
      }
      .cursor {
        cursor: pointer;
      }
    }
  }
  .address {
    padding-top: 30px;
    .name {
      font-size: 14px;
      width: 100px;
      color: #ccc;
    }
    .adDetail {
      flex: 1;
    }
  }
}
.specs {
  padding: 10px 0 30px;
}
</style>

<style lang="scss">
</style>




