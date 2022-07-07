<template>
	<div class="purchaseList containerBox">
		<div class="toolbar-box">
			<common-row>
				<common-col :height="50">
					<div class="btn-box displayflex ">
						<label for="">商品名称：</label>
						<el-input v-model="searchBox.goodsName" placeholder="请输入商品名称" clearable @keyup.enter.native="search"></el-input>
					</div>
				</common-col>
				<common-col :height="50">
					<div class="btn-box displayflex ">
						<label for="" v-if="cur == 0">采购单号：</label>
						<label for="" v-if="cur == 1">货损单号：</label>
						<el-input v-model="searchBox.purchaseNumber" :placeholder="cur == 0 ? '请输入采购单号' : '请输入货损单号' " clearable @keyup.enter.native="search"></el-input>
					</div>
				</common-col>
				<common-col :height="50">
					<div class="btn-box displayflex ">
						<label for="">供应商：</label>
						<el-input v-model="searchBox.gysName" placeholder="请输入姓名/联系电话" clearable @keyup.enter.native="search"></el-input>
					</div>
				</common-col>
				<common-col :height="50" :lot="6" >
					<div class="btn-box displayflex time-class">
						<label for="" v-if="cur == 0">发货时间：</label>
						<label for="" v-if="cur == 1">创建时间：</label>
						<el-date-picker
							v-model="searchBox.ftimeValue"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							format="yyyy / MM / dd "
							value-format="yyyy-MM-dd"
						></el-date-picker>
					</div>
				</common-col>
			</common-row>
			<common-row>
				<common-col :lot="20">
					<div class="btn-box"><el-button size="medium" type="primary" @click="search">查询</el-button></div>
					<div class="btn-box"><el-button size="medium" type="primary" @click="exportData">导出数据</el-button></div>
				</common-col>
			</common-row>
		</div>
		<div class="tabs-box">
			<!-- <div class="tab"> -->
			<el-menu :default-active="cur" class="el-menu-demo  tab" mode="horizontal" @select="handleSelect">
				<el-menu-item index="0">采购单</el-menu-item>
				<el-menu-item index="1">入库后赔偿</el-menu-item>
			</el-menu>

			<!-- </div> -->

			<el-table :height="tableHeight" :data="purchaseTableData" style="width: 100%" @selection-change="handleSelectionChange" v-show="cur == 0">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column label="商品信息" width="400">
					<template slot-scope="scope">
						<div class="goods-box">
							<div class="image-box"><img :src="scope.row.image" alt="" /></div>
							<div class="goods-content">
								<p class="name">{{ scope.row.goodsName }}</p>
								<div v-for="(specs, n) in scope.row.goodsSpecs" :key="n">
									<p class="zj">{{ n }}：{{ specs }}</p>
								</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="采购单号" prop="purchaseNumber"></el-table-column>
				<el-table-column label="采购状态">
					<template slot-scope="scope">
						<div class="timer-box">
							<p>{{ scope.row.deliveryStatus == 1 ? '待发货' : scope.row.deliveryStatus == 2 ? '已发货' : '已取消' }}</p>
							<a class="xq" @click="goodsDetail(scope.row)">详情</a>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="发货总数" prop="deliverGoodsNum"></el-table-column>
				<el-table-column label="已入库" prop="extractGoodsNum"></el-table-column>
				<el-table-column label="结算金额" prop="settlementAmount"></el-table-column>
				<el-table-column label="供应商">
					<template slot-scope="scope">
						<div class="timer-box">
							<p>{{ scope.row.supplierName || '' }}</p>
							<p>{{ scope.row.supplierPhone || '' }}</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="createtime"></el-table-column>
				<el-table-column label="发货时间" prop="purchaseTime"></el-table-column>
			</el-table>
			<el-table :height="tableHeight" style="width: 100%" :data="compensateTableData"  @selection-change="handleSelectionChange" v-show="cur == 1">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="goods" label="商品信息" width="400">
					<template slot-scope="scope">
						<div class="goods-box">
							<div class="image-box"><img :src="scope.row.image" alt="" /></div>
							<div class="goods-content">
								<p class="name">{{ scope.row.goodsName }}</p>
								<div v-for="(specs, n) in scope.row.goodsSpecs" :key="n">
									<p class="zj">{{ n }}：{{ specs }}</p>
								</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="货损单" prop="damageNumber"></el-table-column>
				<el-table-column label="部分赔付件数" prop="paidNumber"></el-table-column>
				<el-table-column label="部分补偿金额" prop="paidMoney"></el-table-column>
				<el-table-column label="不补发件数" prop="notReissueNumber"></el-table-column>
				<el-table-column label="不补发赔偿金额" prop="notReissueMoney"></el-table-column>
				<el-table-column label="供应商">
					<template slot-scope="scope">
						<div class="timer-box">
							<p>{{ scope.row.supplierName }}</p>
							<p>{{ scope.row.supplierPhone }}</p>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" prop="createtime"></el-table-column>
			</el-table>
		</div>
		<div class="pages-box"><page-box :pages="pages" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></page-box></div>
	</div>
</template>

<script>
import pageBox from '../../common/components/pageBox';
import qs from 'qs';
import cityBox from '../../common/components/cityBoxs';
export default {
	name: '',
	data() {
		return {
			cur: '0',
			searchBox: {
				goodsName: '',
				purchaseNumber: '',
				// 采购单发货时间
				ftimeValue: [],
				gysName: '',
			},
			selPurchaseList: [],
			selCompensateList: [],
			// 采购单数据
			purchaseTableData: [],
			// 入库后赔偿数据
			compensateTableData: [],
			
			pages: this.$pages()
		};
	},
	props: [],
	computed: {
		tableHeight() {
			return this.$tableHeight(220);
		}
	},
	components: { pageBox, cityBox },
	methods: {
		// 查询
		search() {
			this.pages.currentPage = 1;
			if(this.searchBox.ftimeValue == null) {
				this.searchBox.ftimeValue = []
			}
			if(this.cur == 0) {
				this.getPurchaseList();
			}else if(this.cur == 1) {
				this.getCompensateList()
			}
		},
		// 导出数据
		exportData() {
			let date = new Date();
      let year = date.getFullYear();
      let mon = date.getMonth()+1;
      let da = date.getDate();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let month = '';
      let day = '';
      if(mon < 10) month = '0' + mon;else month = mon;
      if(da < 10) day = '0' + da;else day = da;
      let excelName = '';
			if(this.cur == 0) {
				if(this.selPurchaseList.length == 0) {
					this.$message.error('请选择导出的数据')
					return;
				}
				excelName = '采购单' + year + month + day + hour + minutes + seconds;
				let purchaseExcelHeader = ['商品信息','采购单号','发货状态','供应商姓名','供应商电话','发货总数','采购运输中','已入库','不补发','取消补发','待补发','补发运输中','平台货损审核中','供应商货损审核中','采购单总金额','不补发金额','取消补发金额','赔偿金额','结算金额','创建时间','发货时间'];
				let purchaseMatchingHeader = ['goodsName','purchaseNumber','deliveryStatus','supplierName','supplierPhone','deliverGoodsNum','purchaseIngNum','extractGoodsNum','notReissueNumber','cancelNumber','waitReplacementNum','reissueIngNum','sdAuditNum','gylAuditNum','totalMoney','notReissueMoney','cancelMoney','paidMoney','settlementAmount','createtime','purchaseTime'];
				let purchaseList = [];
				this.selPurchaseList.map(ele => {
					let item = {}
					ele.deliveryStatus == 1 ? item.deliveryStatus = '待发货' : ele.deliveryStatus == 2 ? item.deliveryStatus = '已发货' : item.deliveryStatus = '已取消';
					item.totalMoney = '￥' + ele.totalMoney;
					item.notReissueMoney = '￥' + ele.notReissueMoney;
					item.cancelMoney = '￥' + ele.cancelMoney;
					item.paidMoney = '￥' + ele.paidMoney;
					item.settlementAmount = '￥' + ele.settlementAmount;
					let str = '';
					for(let k in ele.goodsSpecs) {
						str +=  k + ':' + ele.goodsSpecs[k] + ' '
					}
					item.goodsName = ele.goodsName + '( ' + str + ')';
					item.purchaseNumber = ele.purchaseNumber;
					item.supplierName = ele.supplierName;
					item.supplierPhone = ele.supplierPhone;
					item.deliverGoodsNum = ele.deliverGoodsNum;
					item.purchaseIngNum = ele.purchaseIngNum;
					item.extractGoodsNum = ele.extractGoodsNum;
					item.notReissueNumber = ele.notReissueNumber;
					item.cancelNumber = ele.cancelNumber;
					item.waitReplacementNum = ele.waitReplacementNum;
					item.reissueIngNum = ele.reissueIngNum;
					item.sdAuditNum = ele.sdAuditNum;
					item.gylAuditNum = ele.gylAuditNum;
					item.createtime = ele.createtime;
					item.purchaseTime = ele.purchaseTime;
					purchaseList.push(item)
				})
				this.$excel.exportData(purchaseExcelHeader,purchaseMatchingHeader,purchaseList, excelName)
			}else if(this.cur == 1) {
				if(this.selCompensateList.length == 0) {
					this.$message.error('请选择导出的数据')
					return;
				}
				excelName = '入库赔偿单' + year + month + day + hour + minutes + seconds;
				let compensateExcelHeader = ['商品信息','货损单号','供应商姓名','供应商电话','不补发件数','不补发赔偿金额','部分赔付件数','部分赔偿金额','创建时间'];
				let compensateMatchingHeader = ['goodsName','damageNumber','supplierName','supplierPhone','notReissueNumber','notReissueMoney','paidNumber','paidMoney','createtime'];
				let compensateList = [];
				this.selCompensateList.map(ele => {
					let item = {}
					let str = '';
					for(let k in ele.goodsSpecs) {
						str +=  k + ':' + ele.goodsSpecs[k] + ' '
					}
					item.goodsName = ele.goodsName + '( ' + str + ')';
					item.notReissueMoney = '￥' + ele.notReissueMoney;
					item.paidMoney = '￥' + ele.paidMoney;
					item.damageNumber = ele.damageNumber;
					item.supplierName = ele.supplierName;
					item.supplierPhone = ele.supplierPhone;
					item.notReissueNumber = ele.notReissueNumber;
					item.paidNumber = ele.paidNumber;
					item.createtime = ele.createtime;
					compensateList.push(item)
				})
				this.$excel.exportData(compensateExcelHeader,compensateMatchingHeader,compensateList, excelName)
			}
		},
		// 切换导航
		handleSelect(tab, event) {
			this.cur = tab;
			if(this.cur == 0) {
				this.getPurchaseList();
			}else if(this.cur == 1) {
				this.getCompensateList()
			}
		},
		//获取批量
		handleSelectionChange(val) {
			if(this.cur == 0) {
				this.selPurchaseList = val;
			}else if(this.cur == 1) {
				this.selCompensateList = val;
			}
		},
		//分页
		handleCurrentChange(size) {
			this.pages.currentPage = size;
			if(this.cur == 0) {
				this.getPurchaseList();
			}else if(this.cur == 1) {
				this.getCompensateList()
			}
		},
		handleSizeChange(size) {
			this.pages.pageSize = size;
			if(this.cur == 0) {
				this.getPurchaseList();
			}else if(this.cur == 1) {
				this.getCompensateList()
			}
		},
		// 去到详情页
		goodsDetail(detail) {
			this.$router.push({ name: 'settlementList', query: { detail: qs.stringify(detail) } });
		},

		// 采购数据
		getPurchaseList() {
			let regPos = /^\d+$/;
      let phone = '';
      let name = '';
      if(regPos.test(this.searchBox.gysName)) {
        phone = this.searchBox.gysName
      }else {
        name = this.searchBox.gysName
      }
			let params = {
				// supplierId: this.$user.supplyId(),
        supplierId: '1235383536572174123',
        // supplierType: this.$user.UserInfo().SupplierType,
        supplierType: '300',
				pagerIndex: this.pages.currentPage,
        pagerNumber: this.pages.pageSize,
				goodsName: this.searchBox.goodsName,
				purchaseNumber: this.searchBox.purchaseNumber,
				supplierName: name,
				supplierPhone: phone,
				ctime: this.searchBox.ftimeValue[0] || '',
				etime: this.searchBox.ftimeValue[1] || '',
				reconciliationType: '1',
			}
			// console.log(params)
			this.loadingWait = this.showLoading('请稍候...')
			this.$https.fetchPost('/damage/get/purchaseList', params).then(res => {
				// console.log(res.data)
				this.loadingWait.close()
				if(res.data.code == 200) {
					let info = res.data.data.list;
					for(let i in info) {
						if(info[i].goodsSpecs){
              info[i].goodsSpecs = JSON.parse(info[i].goodsSpecs)
            }
					}
					this.purchaseTableData = info;
					this.pages.totalPage = res.data.data.totalPage;
          this.pages.totalCount = res.data.data.totalCount;
				}else {
					this.$message.error(res.data.msg);
				}
			})
		},
		// 获取补偿数据
		getCompensateList() {
			let regPos = /^\d+$/;
      let phone = '';
      let name = '';
      if(regPos.test(this.searchBox.gysName)) {
        phone = this.searchBox.gysName
      }else {
        name = this.searchBox.gysName
      }
			let params = {
				// supplierId: this.$user.supplyId(),
        supplierId: '1235383536572174123',
        // supplierType: this.$user.UserInfo().SupplierType,
        supplierType: '300',
				pagerIndex: this.pages.currentPage,
        pagerNumber: this.pages.pageSize,
				goodsName: this.searchBox.goodsName,
				damageNumber: this.searchBox.purchaseNumber,
				supplierName: name,
				supplierPhone: phone,
				ctime: this.searchBox.ftimeValue[0] || '',
				etime: this.searchBox.ftimeValue[1] || '',
				reconciliationType: '1',
			}
			// console.log(params)
			this.loadingWait = this.showLoading('请稍候...')
			this.$https.fetchPost('/damage/get/compensateList', params).then(res => {
				// console.log(res.data)
				this.loadingWait.close()
				if(res.data.code == 200) {
					let info = res.data.data.list;
					for(let i in info) {
						if(info[i].goodsSpecs){
              info[i].goodsSpecs = JSON.parse(info[i].goodsSpecs)
            }
					}
					this.compensateTableData = info;
					this.pages.totalPage = res.data.data.totalPage;
          this.pages.totalCount = res.data.data.totalCount;
				}else {
					this.$message.error(res.data.msg);
				}
			})
		},

	},
	created() {
		if(this.cur == 0) {
			this.getPurchaseList();
		}else if(this.cur == 1) {
			this.getCompensateList()
		}
	},
	mounted() {},
	watch: {}
};
</script>

<style scoped lang="scss">
.resCityBox {
	display: flex;
}
.tab {
	// width: 100%;
	display: flex;
	// justify-content: space-between;
	align-items: center;
	padding-right: 32.5px;
	box-sizing: border-box;
	div {
		width: 100%;
		text-align: right;
		color: rgba(0, 0, 0, 0.45);
		span {
			font-size: 16px;
			font-weight: 500;
			color: rgba(0, 0, 0, 1);
		}
	}
}
.xq {
	color: #1890ff;
}
</style>

<style lang="scss"></style>
