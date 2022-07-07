<template>
  <div class="replace-order-list containerBox">
		<div class="toolbar-box">
      <common-row>
        <common-col :height="50">
          <div class="btn-box disFlex">
            <label for>货损单号：</label>
            <el-input v-model="searchInfo.cargoNum" placeholder="请输入货损单号" clearable @keyup.enter.native="search"></el-input>
          </div>
        </common-col>
        <common-col :height="50">
          <div class="btn-box disFlex">
            <label for>货损类型：</label>
            <el-select v-model="searchInfo.cargoType" clearable placeholder="请选择">
              <el-option
                v-for="item in cargoType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </common-col>
        <common-col :height="50">
          <div class="btn-box disFlex">
            <label for>采购单号：</label>
            <el-input v-model="searchInfo.purchaseNum" placeholder="请输入采购单号" clearable @keyup.enter.native="search"></el-input>
          </div>
        </common-col>
        <common-col :height="50">
          <div class="btn-box disFlex">
            <label for>发货单号：</label>
            <el-input v-model="searchInfo.deliverNum" placeholder="请输入发货单号" clearable @keyup.enter.native="search"></el-input>
          </div>
        </common-col>
        <common-col :height="50">
          <div class="btn-box disFlex">
            <label for>商品名称：</label>
            <el-input v-model="searchInfo.goodsName" placeholder="请输入货损单号" clearable @keyup.enter.native="search"></el-input>
          </div>
        </common-col>
        <common-col :height="50">
          <div class="btn-box disFlex resCityBox">
            <label for>收货区域：</label>
            <cityBox allCity @change="getCityCode"></cityBox>
          </div>
        </common-col>
        <common-col :height="50">
          <div class="btn-box disFlex">
            <label for>采购类型：</label>
            <el-select v-model="searchInfo.purchaseType" clearable placeholder="请选择">
              <el-option
                v-for="item in purshaseTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </common-col>
        <common-col :height="50">
          <div class="btn-box disFlex resCityBox">
            <label for style="width: 85px;">供应商省份：</label>
            <province-box 
              @provinceChangeList="provinceChangeList"
              :citys="provinceCityData"
              :multiple="true"
              :checkStrictly="true"
              provinceCity></province-box>
          </div>
        </common-col>
        <common-col :height="50">
          <div class="btn-box disFlex">
            <label for>供应商：</label>
            <el-input v-model="searchInfo.gylName" placeholder="请输入姓名/手机号" clearable @keyup.enter.native="search"></el-input>
          </div>
        </common-col>
        <common-col :height="50" :lot="7">
          <div class="btn-box disFlex">
            <label for>创建时间：</label>
            <el-date-picker
              v-model="searchInfo.date"
              clearable
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </div>
        </common-col>
      </common-row>
      <common-row>
        <common-col :lot="8">
          <div class="btn-box">
            <el-button size="medium" type="primary" @click="search">查询</el-button>
            <el-button size="medium" type="primary" @click="upShow = true">导入物流单号</el-button>
            <el-button size="medium" type="primary" @click="getGoods('even')" plain>批量确认发货</el-button>
            <el-button size="medium" type="text" @click="exportData">下载物流单模板</el-button>
          </div>
        </common-col>
      </common-row>
    </div>
		<div class="tabs-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="item.name" :name="String(index)"
          v-for="(item, index) in typeList" :key="index" >
          <el-table :data="tableData"  style="width: 100%" :height="tableHeight"
            :expand-row-keys="expends" :row-key="getRowKeys" @selection-change="handleSelectionChange" >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item>
                    <span>{{ getType(props.row.type) }}</span>
                  </el-form-item>
                  <el-form-item label="货损单号：" v-if="props.row.damageNumber">
                    <span>{{ props.row.damageNumber }}</span>
                  </el-form-item>
                  <el-form-item label="采购单号：" v-if="props.row.purchaseNumber">
                    <span>{{ props.row.purchaseNumber }}</span>
                  </el-form-item>
                  <el-form-item label="发货单号：" v-if="props.row.deliveryNumber">
                    <span>{{ props.row.deliveryNumber }}</span>
                  </el-form-item>
                  <el-form-item label="补发发货单号：" v-if="props.row.sendDeliverNumber">
                    <span>{{ props.row.sendDeliverNumber }}</span>
                  </el-form-item>
                  <el-form-item label="关联货损单号：" v-if="props.row.ParentDamageNumber">
                    <span>{{ props.row.ParentDamageNumber }}</span>
                  </el-form-item>
                  <el-form-item>
                    <span style="color: #1890FF;">{{ props.row.detailAddress }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column label="商品信息" width="600">
              <template slot-scope="info">
                <div class="goods-box">
                  <div class="image-box">
                    <img :src="info.row.image" alt />
                  </div>
                  <div class="goods-content">
                    <p>{{ info.row.goodsName }}</p>
                    <div v-for="(specs,n) in info.row.goodsSpecs" :key="n">
                      <p>{{n}}：{{specs}}</p>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="补发数量" prop="gylNumber"></el-table-column>

            <el-table-column label="供应商">
              <template slot-scope="gysInfo">
                <div>{{ gysInfo.row.cityName || '' }}</div>
                <div>{{ gysInfo.row.platformSupplyName || '' }}</div>
                <div>{{ gysInfo.row.platformSupplyMobile || '' }}</div>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" prop="gylOperatorTime"></el-table-column>

            <el-table-column label="发货时间" prop="sendTime" v-if="nowType == 1"></el-table-column>

            <el-table-column label="取消时间" prop="cancelTime" v-if="nowType == 2"></el-table-column>

            <el-table-column label="发货状态">
              <template slot-scope="status">
                <div class="status-box">
                  <span class="dot" :class="getCol(status.row.deliveryStatus)"></span>
									<el-button @click="toDetail(status.row)" size="medium" type="text">{{ getStatus(status.row.deliveryStatus) }}</el-button>
                </div>
                <div class="table-btn-box" v-if="status.row.deliveryStatus == 0">
                  <el-button @click="getGoods('odd',status.row)" size="medium" type="primary">确认发货</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="pages-box">
      <page-box :pages="pages" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></page-box>
    </div>

		<el-dialog :visible.sync="popShow" width="30%" >
      <div class="popTitle disFlex">
        <img src="../../assets/image/Warning@2x.png" alt="">
        <span>确认发货</span>
      </div>
			<span>这{{ sendArr.length }}个补发订单确定已发货吗</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="popShow = false">取 消</el-button>
				<el-button type="success" @click="replace">确 定</el-button>
			</span>
		</el-dialog>
    <el-dialog :visible.sync="upShow" width="60%" >
			<div class="components-box">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"></upload-excel-component>
        <el-table :data="tableExcelData" border highlight-current-row height="170" style="width: 100%;margin-top:20px;">
          <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
				<el-button @click="upShow = false">取 消</el-button>
				<el-button type="primary" @click="upFiles">确定导入</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
import provinceBox from '@/common/components/provinceBox'
import provinces from '/public/static/json/zsProvince'
import cityBox from "../../common/components/cityBoxs";
import pageBox from "../../common/components/pageBox";
import uploadExcelComponent from '@/common/components/UploadExcel/index.vue'
import { param } from '../../utils';
import qs from 'qs'
export default {
  name: "",
  data() {
    return {
			popShow: false, // 确认收货弹框
			typeList: [
        // 列表类型
        { id: 0, name: "全部" },
        { id: 1, name: "待发货" },
        { id: 2, name: "已发货" },
        { id: 3, name: "已取消" },
      ],
      activeName: "0", // 当前列表类型
      cargoType: [
        {
          // 货损类型
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "入库前"
        },
        {
          value: "1",
          label: "入库后"
        }
      ],
      purshaseTypeList: [ // 采购类型
        {
          value: "",
          label: "全部"
        },
        {
          value: "100",
          label: "直采"
        },
        {
          value: "200",
          label: "省营"
        },
        
      ],
      expends: [], // 默认展开的行 id 数组
			searchInfo: {
        cargoNum: "", // 货损单号
        cargoType: "", // 货损类型
        purchaseNum: "", // 采购单号
        deliverNum: "", // 发货单号
        goodsName: "", // 商品名称
        resCity: "", // 收货区域
        purchaseType: "", // 采购类型
        gylProvince: "", // 供应商省份
        gylName: "", // 供应商名字
        date: [] // 创建时间
      },
      nowType: '',
      tableData: [],
      pages: this.$pages(),
      selGoods: [],
      sendArr: [], // 发货的id组
      mouldHeader: [
        '发货单号',
        '物流单号'
      ],
      mouldData: [
        { '发货单号': '例如：FH20200101', '物流单号': '2020xxxx' }
      ],
      upShow: false,
      tableExcelData: [],
      tableHeader: [],
      upArr: [], // 导入上传的数据
		};
  },
  props: [],
  computed: {
    provinceCityData () {
      // return provinces.map(item => {
      //   return {
      //     value: item.cityCode,
      //     label: item.cityName,
      //     level: item.level,
      //     parentCode: item.parentCode
      //   }
      // })
      return provinces
    },
    tableHeight() {
      return this.$tableHeight(200);
    }
  },
  components: { cityBox, pageBox, uploadExcelComponent, provinceBox },
  methods: {
    // 导出表格
    exportData () {
      this.$excel.exportData(this.mouldHeader,this.mouldHeader,this.mouldData,'物流单模板')
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
          return true
      }

      this.$message({
          message: 'Please do not upload files larger than 1m in size.',
          type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      // console.log(results, header, '文件导入')
      let flag = true
      // 头部信息要完整，如果不完整渲染表格会报错, 建议渲染前写个判断条件
      header.map(item => {
         if (!item) flag = false
      })
      if (!flag) {
          this.$message.error('表格信息需要完整，否则渲染表格出错')
          return false
      }
      // console.log(results)
      // console.log(header)
      this.tableExcelData = results
      this.tableHeader = header
      let arr = []
      results.map((ele,i) => {
        let item = {};
        let key = 'serialNumber';
        let val = String(i + 1);
        item[key] = val;
        let data = {
          deliveryNumber: '',
          logisticsNumber: ''
        }
        for(var k in ele) {
          if(k == '发货单号') {
            data.deliveryNumber = ele[k]
          }
          if(k == '物流单号') {
            data.logisticsNumber = ele[k]
          }
        }
        let element = Object.assign(item,data)
        arr.push(element)
      })
      this.upArr = arr
    },
    upFiles() {
      let params = {
        json: this.upArr
      }
      // console.log(params)
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchPost('/sd/purchase/upload/logisticsNumber/json', params).then(res => {
        console.log(res.data)
        this.loadingWait.close()
        if(res.data.code == 200) {
          this.upShow = false;
          this.$message({ type: 'success', message: '上传成功!' });
        }else {
          this.$message({ type: 'error', message: res.data.msg });
        }
      })
    },
		//设置table中的扩展项，展开的id，此处我需要全部展开
    getExpends() {
      var Id = this.tableData.map(item => item.id);
      this.expends = Id;
    },
    getRowKeys(row) {
      return row.id;
    },
    // 获取展开 id 结束
    getCityCode(e) {
      // console.log(e)
      let arr = e.reverse()
      this.searchInfo.resCity = arr[0]
    },
		// 前往补发详情
    toDetail(e) {
      let obj = {
        cur: e.deliveryStatus,
        id: e.id,
        purchaseNumber: e.purchaseNumber,
        gylCity: e.cityName,
        gylName: e.platformSupplyName,
        gylPhone: e.platformSupplyMobile,
        purchaseType: e.purchaseSupplyType
      }
      console.log(obj)
      this.$router.push({
				name: "replaceDetail",
				query: { info: qs.stringify(obj) }
      });
    },
    provinceChangeList(val) {
      // console.log(val)
      let arr = [];
      val.map(ele => {
        let str = '';
        str = ele[0];
        arr.push(str)
      })
      // console.log(arr)
      this.searchInfo.gylProvince = arr.join()
    },
    // 搜索
    search() {
      // console.log(this.searchInfo)
      if(this.searchInfo.date == null) {
				this.searchInfo.date = []
			}
      this.pages.currentPage = 1;
      this.getList()
    },
    // 获取当前类型
    handleClick(e, event) {
			console.log(e.name);
      if(e.name == 0) {
        this.nowType = '';
      }else if(e.name == 1) {
        this.nowType = '0'
      }else if(e.name == 2) {
        this.nowType = '1'
      }else if(e.name == 3) {
        this.nowType = '2'
      }
      this.getList()
    },
    handleCurrentChange(size){
      this.pages.currentPage = size
      this.getList()
    },
    handleSizeChange(size){
      this.pages.pageSize = size
      this.getList()
    },
    getList() {
      let regPos = /^\d+$/;
      let phone = '';
      let name = '';
      if(regPos.test(this.searchInfo.gylName)) {
        phone = this.searchInfo.gylName
      }else {
        name = this.searchInfo.gylName
      }
      let params = {
        supplierId: this.$user.supplyId(),
        // supplierId: '1235383536572174123',
        supplierType:this.$user.UserInfo().SupplierType,
        code: this.searchInfo.resCity,
        damageNumber: this.searchInfo.cargoNum,
        deliveryNumber: this.searchInfo.deliverNum,
        deliveryStatus: this.nowType,
        goodsName: this.searchInfo.goodsName,
        pagerIndex: this.pages.currentPage,
        pagerNumber: this.pages.pageSize,
        purchaseNumber: this.searchInfo.purchaseNum,
        startCancelTime: this.searchInfo.date[1] || '',
        startCreatetime: this.searchInfo.date[0] || '',
        type: this.searchInfo.cargoType,
        platformSupplyName: name,
        platformSupplyMobile: phone,
        platformSupplyRegionCode: this.searchInfo.gylProvince,
        purchaseSupplyType: this.searchInfo.purchaseType
      }
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchPost('/damage/list/getSupplyAgainList', params).then(res => {
        // console.log(res.data)
        this.loadingWait.close()
        if(res.data.code == 200) {
          let tableDatas = res.data.data.list
          for(let i in tableDatas){
            if(tableDatas[i].goodsSpecs){
              tableDatas[i].goodsSpecs = JSON.parse(tableDatas[i].goodsSpecs)
            }
          }
          this.tableData = tableDatas;
          this.pages.totalPage = res.data.data.totalPage;
          this.pages.totalCount = res.data.data.totalCount;
          this.getExpends();
        }else {
          this.$message({ type: 'error', message: res.data.msg });
        }
      })
    },
    getType(e) {
      let i = Number(e)
      switch(i) {
        case 0:
          return '（入库前）'
          break
        case 1:
          return '（入库后）'
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
    getCol(e) {
      let i = Number(e)
      switch(i) {
        case 0:
          return 'wait'
          break
        case 1:
          return 'ready'
          break
        case 2:
          return 'cancel'
          break
      }
    },
    // 获取多选的每一行信息
    handleSelectionChange(val) {
      console.log(val);
      this.selGoods = val;
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
    replace() {
      let params = {
        supplierId: this.$user.supplyId(),
        // supplierId: '1235383536572174123',
        ids: this.sendArr.join(',')
      }
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchQsPost('/damage/update/supplyAgain', params).then(res => {
        // console.log(res.data)
        this.popShow = false
        this.loadingWait.close()
        if(res.data.code == 200) {
          this.$message({ type: 'success', message: '提交成功!' });
          this.getList()
        }else {
          this.$message({ type: 'error', message: res.data.msg });
        }
      })
    },

	},
  created() {
    this.getList()
  },
  mounted() {},
  watch: {}
};
</script>

<style scoped lang="scss">
.resCityBox {
  display: flex;
}
.status-box {
  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    &.wait {
      background: #52c41a;
    }
    &.ready {
      background: #1890FF;
    }
    &.cancel {
      background: #ccc;
    }
  }
}
.demo-table-expand {
  padding: 5px 10px;
  // height: 36px;
  font-size: 14px;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  .el-form-item {
    margin-bottom: 0;
  }
}
.components-box {
  padding: 20px 55px;
  box-sizing: border-box;
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
</style>

<style lang="scss">
</style>




