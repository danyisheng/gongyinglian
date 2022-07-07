<template>
  <div class="cargo-damage-list containerBox">
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
        <common-col>
          <div class="btn-box">
            <el-button size="medium" type="primary" @click="search">查询</el-button>
            <!-- <el-button size="medium">导出表格</el-button> -->
          </div>
        </common-col>
      </common-row>
    </div>
    <div class="tabs-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="item.name"
          :name="String(index)"
          v-for="(item, index) in typeList"
          :key="index"
        >
          <el-table
            :data="tableData"
            style="width: 100%"
            :height="tableHeight"
            :expand-row-keys="expends"
            :row-key="getRowKeys"
            @selection-change="handleSelectionChange" 
          >
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

            <el-table-column label="货损数" prop="sdNumber"></el-table-column>

            <el-table-column label="供应商">
              <template slot-scope="gysInfo">
                <div>{{ gysInfo.row.cityName || '' }}</div>
                <div>{{ gysInfo.row.platformSupplyName || '' }}</div>
                <div>{{ gysInfo.row.platformSupplyMobile || '' }}</div>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" prop="sdOperatorTime"></el-table-column>

            <el-table-column label="处理时间" prop="gylOperatorTime" v-if="nowType == 1"></el-table-column>

            <el-table-column label="状态">
              <template slot-scope="status">
                <div class="status-box">
                  <span class="dot" :class="status.row.gylStatus == 0 ? 'wait' : 'ready' "></span>
                  <span class="status">{{ getStatus(status.row.gylStatus) }}</span>
                </div>
                <div class="table-btn-box">
                  <el-button @click="toDetail(status)" size="medium" type="text">详情</el-button>
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
  </div>
</template>

<script>
import provinceBox from '@/common/components/provinceBox'
import provinces from '/public/static/json/zsProvince'
import cityBox from "../../common/components/cityBoxs";
import pageBox from "../../common/components/pageBox";
import qs from 'qs'
export default {
  name: "",
  data() {
    return {
      typeList: [
        // 列表类型
        { id: 0, name: "全部" },
        { id: 1, name: "待处理" },
        { id: 2, name: "已处理" }
      ],
      activeName: "0", // 当前列表类型
      cargoType: [ // 货损类型
        {
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
      nowType: '', // 当前状态
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
      tableData: [],
      pages: this.$pages(),

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
      return this.$tableHeight(250);
    }
  },
  components: { cityBox, pageBox, provinceBox },
  methods: {
    //设置table中的扩展项，展开的id，此处我需要全部展开
    getExpends() {
      var Id = this.tableData.map(item => item.id);
      this.expends = Id;
    },
    getRowKeys(row) {
      return row.id;
    },
    // 获取展开 id 结束
    // 获取多选的每一行信息
    handleSelectionChange(val) {
      console.log(val);
    },
    // 前往货损详情
    toDetail(e) {
      let obj = {
        cur: e.row.gylStatus,
        id: e.row.id,
        purchaseNumber: e.row.purchaseNumber,
        type: e.row.type,
        gylCity: e.row.cityName,
        gylName: e.row.platformSupplyName,
        gylPhone: e.row.platformSupplyMobile,
        purchaseType: e.row.purchaseSupplyType
      }
      this.$router.push({
        name: "cargoDetail",
        query: { info: qs.stringify(obj) }
      });
    },
    getCityCode(e) {
      // console.log(e)
      let arr = e.reverse()
      this.searchInfo.resCity = arr[0]
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
      // console.log(this.searchInfo);
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
        // supplierType:'300',
        code: this.searchInfo.resCity,
        damageNumber: this.searchInfo.cargoNum,
        deliveryNumber: this.searchInfo.deliverNum,
        goodsName: this.searchInfo.goodsName,
        gylStatus: this.nowType,
        pagerIndex: this.pages.currentPage,
        pagerNumber: this.pages.pageSize,
        purchaseNumber: this.searchInfo.purchaseNum,
        startCreatetime: this.searchInfo.date[0] || '',
        startGylOperatorTime: this.searchInfo.date[1] || '',
        type: this.searchInfo.cargoType,
        platformSupplyName: name,
        platformSupplyMobile: phone,
        platformSupplyRegionCode: this.searchInfo.gylProvince,
        purchaseSupplyType: this.searchInfo.purchaseType
      }
      // console.log(params)
      this.loadingWait = this.showLoading('请稍候...')
      this.$https.fetchPost('/damage/list/getDamageList', params).then(res => {
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
    getStatus(e) {
      let i = Number(e)
      switch(i) {
        case 0:
          return '待处理'
          break
        case 1:
          return '已处理'
          break
      }
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
  }
}
.tabs-box {
  /deep/ .el-table__expanded-cell {
    padding: 0 0 20px;
  }
}
// .el-table th 
.demo-table-expand {
  padding: 5px 10px;
  // height: 36px;
  font-size: 14px;
  background: #e6f7ff;
  // border: 1px solid #91d5ff;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>

<style lang="scss">
</style>




