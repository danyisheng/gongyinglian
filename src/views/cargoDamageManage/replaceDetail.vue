<template>
  <div class="replace-detail containerBoxInfo" :style="height">
    <div class="replaceInfoBox">
      <div class="titleBox disFlex">
        <img :src="info.image" alt="">
        <div class="detailBox">
          <div class="nameBox disFlex">
            <div class="name">{{ info.goodsName }}</div>
            <div class="typeLabel">{{ getPurchaseType(purchaseType) }}</div>
          </div>
          <div class="disFlex">
            <div class="item" v-for="(ele, i) in info.goodsSpecs" :key="i">
              <div class="str">{{ i }}</div>
              <div class="num">{{ ele }}</div>
            </div>
            <div class="item">
              <div class="str">商品状态</div>
              <div class="num">{{ getSupStatus(info.supplyStatus) }}</div>
            </div>
            <div class="item" v-if="cur == 0 || cur == 2">
              <div class="str">采购单号</div>
              <div class="num">{{ purchaseNumber }}</div>
            </div>
            <div class="item" v-if="cur == 0 || cur == 2">
              <div class="str">发货单号</div>
              <div class="num">{{ info.deliveryNumber }}</div>
            </div>
            <div class="item" v-if="purchaseType == 200">
              <div class="str">供应商姓名</div>
              <div class="num">{{ gysInfo.gylName }}</div>
            </div>
            <div class="item" v-if="purchaseType == 200">
              <div class="str">供应商手机号</div>
              <div class="num">{{ gysInfo.gylPhone }}</div>
            </div>
            <div class="item" v-if="purchaseType == 200">
              <div class="str">供应商省份</div>
              <div class="num">{{ gysInfo.gylCity }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tipBox" v-if="cur == 0 && 1 < info.sendLevel">
        本次补发为第{{ info.sendLevel }}次补发，关联货损单号：{{ info.ParentDamageNumber }}
      </div>
      <div class="orderBox">
        <div class="title">补发订单信息</div>
        <common-row>
          <common-col :height="40" :lot="6">
            <label for>货损单号：</label>
            <span class="damage" @click="toCargoDetial">{{ info.damageNumber }}</span>
          </common-col>
          <common-col :height="40" :lot="6">
            <label for>货损类型：</label>
            <span>{{ getType(info.type) }}</span>
          </common-col>
          <common-col :height="40" :lot="6">
            <label for>补发数量：</label>
            <span>{{ info.gylNumber }}</span>
          </common-col>
          <common-col :height="40" :lot="6">
            <label for>创建时间：</label>
            <span>{{ info.createtime }}</span>
          </common-col>
          <common-col :height="40" :lot="6">
            <label for>发货状态：</label>
            <span>{{ getStatus(cur) }}</span>
            <div class="btn-box" v-if="cur == 0">
              <el-button size="medium" type="primary" @click="sendShow = true">确认发货</el-button>
              <el-button size="medium" type="danger" @click="cancelShow = true">取消发货</el-button>
            </div>
          </common-col>
          <common-col :height="40" :lot="6" v-if="cur == 1">
            <label for>补发发货单号：</label>
            <span>{{ info.sendDeliverNumber }}</span>
          </common-col>
          <common-col :height="40" :lot="6" v-if="cur == 1">
            <label for>发货时间：</label>
            <span>{{ info.sendTime }}</span>
          </common-col>
          <common-col :height="40" :lot="6" v-if="cur == 2">
            <label for>取消原因：</label>
            <span>{{ info.cancelOpinion }}</span>
          </common-col>
          <common-col :height="40" :lot="6" v-if="cur == 2">
            <label for>取消时间：</label>
            <span>{{ info.cancelTime }}</span>
          </common-col>
          <common-col :height="40" :lot="6">
            <label for>收货人：</label>
            <span>{{ info.shopName }}</span>
          </common-col>
          <common-col :height="40" :lot="6">
            <label for>收货人电话：</label>
            <span>{{ info.shopPhone }}</span>
          </common-col>
          <common-col :height="40" :lot="6">
            <label for>收货地址：</label>
            <span>{{ info.detailAddress }}</span>
          </common-col>
        </common-row>
      </div>
      <common-row style="padding: 20px 0 15px;" v-if="cur == 1">
        <common-col :height="40" :lot="6">
          <label for>物流单号：</label>
          <el-input v-model="logisticsNum" placeholder="请输入物流单号" clearable @keyup.enter.native="search"></el-input>
        </common-col>
      </common-row>
      <div class="btn-box" style="padding-bottom: 30px;" v-if="cur == 1">
        <el-button size="medium" type="primary" @click="search">查询</el-button>
        <el-button size="medium" type="danger" @click="getGoods('even')">批量删除</el-button>
      </div>
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" :height="400" @selection-change="getSelList"  v-if="cur == 1">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="物流单号">
          <template slot-scope="scope">{{ scope.row.logisticsNumber }}</template>
        </el-table-column>
        <el-table-column prop="createtime" label="导入时间">
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="status">
            <div class="table-btn-box">
              <el-button size="medium" type="text" @click="showChange(status.row)">修改物流单号</el-button>
              <el-button size="medium" type="danger" @click="getGoods('odd',status.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pages-box" v-if="cur == 1">
        <page-box :pages="pages" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></page-box>
      </div>

    </div>

    <el-dialog  :visible.sync="sendShow" width="30%" >
      <div class="popTitle disFlex">
        <img src="../../assets/image/Warning@2x.png" alt="">
        <span>确认发货</span>
      </div>
			<span>这个补发订单确定已发货吗</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="sendShow = false">取 消</el-button>
				<el-button type="success" @click="sendGoods">确 定</el-button>
			</span>
		</el-dialog>
    <el-dialog  :visible.sync="cancelShow" width="30%" >
      <div class="popTitle disFlex">
        <img src="../../assets/image/tixing@2x.png" alt="">
        <span>取消补发</span>
      </div>
			<div class="tip">这个补发订单确定取消吗</div>
      <el-input type="textarea" :rows="2" placeholder="必填，请输入原因" v-model="msg"></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancelClose">取 消</el-button>
				<el-button type="danger" @click="cancelGoods">确 定</el-button>
			</span>
		</el-dialog>
    <el-dialog :visible.sync="popShow" width="30%" >
      <div class="popTitle disFlex">
        <img src="../../assets/image/tixing@2x.png" alt="">
        <span>确认删除</span>
      </div>
			<span>这{{ sendArr.length }}个补发订单确定已发货吗</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="popShow = false">取 消</el-button>
				<el-button type="danger" @click="deleteLog">确 定</el-button>
			</span>
		</el-dialog>
    <el-dialog :visible.sync="changeShow" width="30%" >
      <div class="popTitle disFlex">
        <img src="../../assets/image/Warning@2x.png" alt="">
        <span>编辑物流单号</span>
      </div>
      <el-input v-model="changeNum" placeholder="请输入新的物流单号" clearable></el-input>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeChange">取 消</el-button>
				<el-button type="success" @click="changeLog">确 定</el-button>
			</span>
		</el-dialog>

  </div>
</template>

<script>
import pageBox from "../../common/components/pageBox";
import qs from 'qs'
export default {
  name: "",
  data() {
    return {
      info: {},
      tableData: [],
      selGoods: [],
      sendArr: [],
      popShow: false, // 删除物流框
      id: '',
      cur: '',
      purchaseNumber: '',
      purchaseType: '',
      gysInfo: {},
      sendShow: false, // 补发框
      cancelShow: false, // 取消补发框
      msg: '',
      pages: this.$pages(),
      logisticsNum: '', // 物流单号
      changeShow: false, // 修改物流框
      changeNum: '', // 更改的物流单号
      changeIdL: '', // 更改的物流单ID
    };
  },
  props: [],
  computed: {
    height() {
      return {
        height: window.innerHeight - 100 + "px"
      };
    },
    tableHeight() {
      return this.$tableHeight(493);
    }
  },
  components: { pageBox },
  methods: {
    getSelList(val) {
      this.selGoods = val;
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
    getSupStatus(e) {
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
    handleCurrentChange(size){
      this.pages.currentPage = size
      this.getSupList()
    },
    handleSizeChange(size){
      this.pages.pageSize = size
      this.getSupList()
    },
    toCargoDetial() {
      let obj = {
        cur: '1',
        id: this.id,
        purchaseNumber: this.purchaseNumber
      }
      this.$router.push({
        name: "cargoDetail",
        query: { info: qs.stringify(obj) }
      });
    },
    // 商品详情
    getInfo() {
      let params = {
        supplierId: this.$user.supplyId(),
        // supplierId: '1235383536572174123',
        id: this.id
      }
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchQsPost('/damage/get/SupplyAgainOrderDetail',params).then(res => {
        // console.log(res.data)
        this.loadingWait.close()
        if(res.data.code == 200) {
          let obj = res.data.data;
          obj.goodsSpecs = JSON.parse(res.data.data.goodsSpecs)
          this.info = obj
        }else {
          this.$message({ type: 'error', message: res.data.msg });
        }
      })
    },
    // 补发
    sendGoods() {
      let params = {
        supplierId: this.$user.supplyId(),
        // supplierId: '1235383536572174123',
        ids: this.id
      }
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchQsPost('/damage/update/supplyAgain', params).then(res => {
        console.log(res.data)
        this.sendShow = false
        this.loadingWait.close()
        if(res.data.code == 200) {
          this.$message({ type: 'success', message: '提交成功!' });
          this.$router.go(-1)
        }else {
          this.$message({ type: 'error', message: res.data.msg });
        }
      })
    },
    cancelClose() {
      this.msg = '';
      this.cancelShow = false
    },
    // 取消补发
    cancelGoods() {
      if(this.msg == '') {
        this.$message.error("请填写原因");
        return
      }
      let params = {
        supplierId: this.$user.supplyId(),
        // supplierId: '1235383536572174123',
        id: this.id,
        cancelOpinion: this.msg
      }
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchQsPost('/damage/update/cancelSupplyAgain', params).then(res => {
        console.log(res.data)
        this.cancelShow = false
        this.loadingWait.close()
        this.msg = '';
        if(res.data.code == 200) {
          this.$message({ type: 'success', message: '提交成功!' });
          this.$router.go(-1)
        }else {
          this.$message({ type: 'error', message: res.data.msg });
        }
      })
    },
    // 获取物流列表
    getSupList() {
      let params = {
        id: this.id,
        pagerIndex: this.pages.currentPage,
        pagerNumber: this.pages.pageSize
      }
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchQsPost('/damage/get/logisticsList', params).then(res => {
        // console.log(res.data)
        this.loadingWait.close()
        if(res.data.code == 200) {
          this.tableData = res.data.data;
          this.pages.totalPage = res.data.data.totalPage;
          this.pages.totalCount = res.data.data.totalCount;
        }else {
          this.$message({ type: 'error', message: res.data.msg });
        }
      })
    },
    search() {
      if(this.logisticsNum == '') {
        this.getSupList()
      }else {
        this.searchSup()
      }
    },
    // 查询物流单号
    searchSup() {
      // if(this.logisticsNum == '') {
      //   this.$message({ type: 'error', message: '请输入物流单号' });
      //   return
      // }
      let params = {
        deliveryNumber: this.info.sendDeliverNumber,
        logisticsNum: this.logisticsNum
      }
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchQsPost('/damage/get/logistics', params).then(res => {
        // console.log(res.data)
        this.loadingWait.close()
        if(res.data.code == 200) {
          this.tableData = res.data.data;
          this.pages.totalPage = res.data.data.totalPage;
          this.pages.totalCount = res.data.data.totalCount;
        }else {
          this.$message({ type: 'error', message: res.data.msg });
        }
      })
    },
    getGoods(e, item) {
      this.sendArr = [];
      if(e === 'odd') {
        this.sendArr.push(item.id)
      }else if(e == 'even') {
        this.selGoods.map(ele => {
          this.sendArr.push(ele.id);
        })
        if(this.sendArr.length == 0) {
          this.$message.error("请选择商品");
          return
        }
      }
      this.popShow = true
    },
    // 删除物流
    deleteLog() {
      let params ={
        ids: this.sendArr.join(',')
      }
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchQsPost('/sd/purchase/del/logisticsNumber', params).then(res => {
        // console.log(res.data)
        this.loadingWait.close()
        this.popShow = false;
        if(res.data.code == 200) {
          this.$message({ type: 'success', message: '删除成功!' });
          this.getSupList()
        }else {
          this.$message({ type: 'error', message: res.data.msg });
        }
      })
    },
    closeChange() {
      this.changeNum = '';
      this.changeShow = false;
    },
    showChange(item) {
      this.changeId = item.id;
      this.changeShow = true;
    },
    // 修改物流
    changeLog() {
      if(this.changeNum == '') {
        this.$message({ type: 'error', message: '请输入新的物流单号' });
        return
      }
      let params = {
        id: this.changeId,
        logisticsNumber: this.changeNum
      }
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchQsPost('/sd/purchase/update/logisticsNumber', params).then(res => {
        // console.log(res.data)
        this.loadingWait.close()
        this.changeShow = false;
        if(res.data.code == 200) {
          this.$message({ type: 'success', message: '更改成功!' });
          this.getSupList()
        }else {
          this.$message({ type: 'error', message: res.data.msg });
        }
      })
    }

  },
  created() {
    this.cur = qs.parse(this.$route.query.info).cur;
    this.id = qs.parse(this.$route.query.info).id;
    this.purchaseNumber = qs.parse(this.$route.query.info).purchaseNumber;
    this.purchaseType = qs.parse(this.$route.query.info).purchaseType;
    this.gysInfo = {
      gylCity: qs.parse(this.$route.query.info).gylCity,
      gylName: qs.parse(this.$route.query.info).gylName,
      gylPhone: qs.parse(this.$route.query.info).gylPhone,
    }
    this.getInfo();
    if(qs.parse(this.$route.query.info).cur == 1) {
      // 获取物流列表
      this.getSupList()
    }
  },
  mounted() {
    
  },
  watch: {}
};
</script>

<style scoped lang="scss">
.replace-detail {
  padding: 40px 120px 55px;
}
.damage {
  color: #1890FF;
  cursor: pointer;
}
.common-row {
  .common-col {
    label {
      text-align: left;
    }
  }
}
.titleBox {
  img {
    margin-right: 30px;
    width: 160px;
    height: 160px;
    border-radius: 4px;
  }
  .detailBox {
    flex: 1;
    margin-bottom: 60px;
    .nameBox {
      margin-bottom: 50px;
      // justify-content: space-between;
      align-items: center;
      .name {
        font-size: 24px;
        font-weight: bold;
      }
      .typeLabel {
        margin-left: 30px;
        padding: 5px 10px;
        color: #fff;
        background: #1890FF;
        border-radius: 4px;
      }
    }
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      border-right: 1px solid #ccc;
      &:nth-last-child(1) {
        border-right: none;
      }
      .str {
        margin-bottom: 10px;
        font-size: 16px;
        color: #ccc;
      }
      .num {
        font-size: 14px;
        color: #000;
      }
    }
  }
}
.tipBox {
  margin-bottom: 40px;
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  color: #1890FF;
  font-size: 14px;
  border: 1px solid #91D5FF;
  background: #E6F7FF;
}
.orderBox {
  .title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #000;
  }
}
.pages-box {
  z-index: 9999;
  background: #fff;
}
.tip {
  margin-bottom: 20px;
}
.popTitle {
  align-items: center;
  margin-bottom: 30px;
  img {
    width: 22px;
    height: 22px;
    margin-right: 16px;
  }
  span {
    font-size: 16px;
    font-weight: bold;
  }
}
.pages-box {
  position: relative;
}
</style>

<style lang="scss">
</style>




