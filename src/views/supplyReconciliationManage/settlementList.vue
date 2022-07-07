<template>
	<div class="purchaseDetail containerBoxInfo" :style="height">
		<div class="justify-content-between">
			<div class="goods">
				<div class="goodsImg"><img :src="goodsDetail.image"></div>
				<div class="goodsBox">
					<div class="goodName">{{ goodsDetail.goodsName }}</div>
					<div class="goodsInfo">
						<div class="info" v-for="(specs, n) in goodsDetail.goodsSpecs" :key="n">
							<div class="tit">{{ n }}</div>
							<div>{{ specs }}</div>
						</div>
						<div class="info">
							<div class="tit">商品状态</div>
							<div class="green">{{ goodsDetail.status == 1 ? '售卖中' : '下架' }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="purchaseBox">
			<div class="topTitle">采购信息</div>
			<common-row>
				<common-col :lot="6" class="mb">采购订单: {{ goodsDetail.purchaseNumber }}</common-col>
				<common-col :lot="6" class="mb">
					采购状态：
					<span class="blue">{{ goodsDetail.deliveryStatus == 1 ? '待发货' : goodsDetail.deliveryStatus == 2 ? '已发货' : '已取消' }}</span>
				</common-col>
				<common-col :lot="6" class="mb">创建时间：{{ goodsDetail.createtime }}</common-col>
				<common-col :lot="6" class="mb">发货时间：{{ goodsDetail.purchaseTime }}</common-col>
			</common-row>
		</div>
		<div class="purchaseBox">
			<common-row>
				<common-col :lot="4" :height="100" class="smallBox">
					<img src="../../assets/image/fahuo@2x.png" class="boxImg" />
					<div class="rightBox">
						<div class="rightTit">发货总数</div>
						<div class="rightNum">{{ goodsDetail.deliverGoodsNum }}</div>
					</div>
				</common-col>
				<common-col :lot="4" :height="100" class="smallBox">
					<img src="../../assets/image/yunshu@2x.png" class="boxImg" />
					<div class="rightBox">
						<div class="rightTit">采购运输中</div>
						<div class="rightNum">{{ goodsDetail.purchaseIngNum }}</div>
					</div>
				</common-col>
				<common-col :lot="4" :height="100" class="smallBox">
					<img src="../../assets/image/yiruku@2x.png" class="boxImg" />
					<div class="rightBox">
						<div class="rightTit">已入库</div>
						<div class="rightNum">{{ goodsDetail.extractGoodsNum }}</div>
					</div>
				</common-col>
				<common-col :lot="4" :height="100" class="smallBox">
					<img src="../../assets/image/bubufa@2x.png" class="boxImg" />
					<div class="rightBox">
						<div class="rightTit">不补发</div>
						<div class="rightNum">{{ goodsDetail.notReissueNumber }}</div>
					</div>
				</common-col>
				<common-col :lot="4" :height="100" class="smallBox">
					<img src="../../assets/image/quxiao@2x.png" class="boxImg" />
					<div class="rightBox">
						<div class="rightTit">取消补发</div>
						<div class="rightNum">{{ goodsDetail.cancelNumber }}</div>
					</div>
				</common-col>
				<common-col :lot="4" :height="100" class="smallBox">
					<img src="../../assets/image/bufa@2x.png" class="boxImg" />
					<div class="rightBox">
						<div class="rightTit">待补发</div>
						<div class="rightNum">{{ goodsDetail.waitReplacementNum }}</div>
					</div>
				</common-col>
				<common-col :lot="4" :height="100" class="smallBox">
					<img src="../../assets/image/yibufa@2x.png" class="boxImg" />
					<div class="rightBox">
						<div class="rightTit">补发运输中</div>
						<div class="rightNum">{{ goodsDetail.reissueIngNum }}</div>
					</div>
				</common-col>
				<common-col :lot="4" :height="100" class="smallBox">
					<img src="../../assets/image/pingtaihuosun@2x.png" class="boxImg" />
					<div class="rightBox">
						<div class="rightTit">平台货损审核中</div>
						<div class="rightNum">{{ goodsDetail.sdAuditNum }}</div>
					</div>
				</common-col>
				<common-col :lot="4" :height="100" class="smallBox">
					<img src="../../assets/image/gongyingshang@2x.png" class="boxImg" />
					<div class="rightBox">
						<div class="rightTit">供应商货损审核中</div>
						<div class="rightNum">{{ goodsDetail.gylAuditNum }}</div>
					</div>
				</common-col>
			</common-row>
		</div>
		<div class="settleBox">
			<div class="settleAccounts">
				<div class="one">
					<div>结算金额</div>
					<div>￥{{ goodsDetail.settlementAmount }}</div>
				</div>
				<div class="four">
					<div class="item">
						<div class="Tit">发货总数</div>
						<div class="money">+￥{{ goodsDetail.totalMoney }}</div>
					</div>
					<div class="item">
						<div class="Tit">不补发</div>
						<div class="money">-￥{{ goodsDetail.notReissueMoney }}</div>
					</div>
					<div class="item">
						<div class="Tit">取消补发</div>
						<div class="money">-￥{{ goodsDetail.cancelMoney }}</div>
					</div>
					<div class="item">
						<div class="Tit">赔偿金额</div>
						<div class="money">-￥{{ goodsDetail.paidMoney }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="purchaseRadio">
			<el-radio-group v-model="tabFlag" @change="changeRadio">
				<el-radio-button :label="1">入库明细</el-radio-button>
				<el-radio-button :label="2">赔偿记录</el-radio-button>
			</el-radio-group>
		</div>
		<div class="tabs-box" v-show="tabFlag == 1">
			<common-row>
				<common-col :height="50">
					<div class="btn-box displayflex ">
						<label for="">发货单号：</label>
						<el-input v-model="searchBox.deliveryNumber" placeholder="请输入发货单号" clearable @keyup.enter.native="search"></el-input>
					</div>
				</common-col>
				<!-- <common-col :height="50">
					<div class="btn-box displayflex resCityBox">
						<label for="">收货区域：</label>
						<cityBox allCity v-model="searchBox.cityCode" @change="changeCity" multiple collapseTags></cityBox>
					</div>
				</common-col> -->
			</common-row>
			<div class="justify-content-between">
				<div class="mb">
					<el-button type="primary" @click="search">查询</el-button>
					<!-- <el-button type="primary" @click="exportData">导出发货单</el-button> -->
				</div>
			</div>
			<el-table height="450" :data="putInData" style="width: 100%" :expand-row-keys="expends" :row-key="getRowKeys">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
							<el-form-item label="发货单号："><span>{{ props.row.deliveryNumber }}</span></el-form-item>
							<el-form-item label="供货价："><span>￥{{ props.row.costPrice }}</span></el-form-item>
							<el-form-item class="address">
								<img src="../../assets/image/didian@2x.png" />
								<span style="color: #1890FF;">{{ props.row.detailAddress }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="totalNum" label="发货总数"></el-table-column>
				<el-table-column prop="purchaseTransitNum" label="采购运输中"></el-table-column>
				<el-table-column prop="extractNum" label="已入库"></el-table-column>
				<el-table-column prop="platformDamageExamineNum" label="平台审核中"></el-table-column>
				<el-table-column prop="supplierDamageExamineNum" label="供应商货损审核中"></el-table-column>
				<el-table-column prop="waitReissueNumber" label="待补发"></el-table-column>
				<el-table-column prop="reissueTransitNum" label="补发运输中"></el-table-column>
				<el-table-column prop="notReissueNum" label="不补发"></el-table-column>
				<el-table-column prop="cancelNum" label="取消补发"></el-table-column>
				<el-table-column prop="settlementAmount" label="结算金额"></el-table-column>
			</el-table>
			<div class="pages-box"><page-box :pages="pages" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></page-box></div>
		</div>
		<!-- 赔偿记录 -->
		<div class="tabs-box" v-show="tabFlag == 2">
			<el-table height="450" :data="compensationData" style="width: 100%">
				<el-table-column prop="damageNumber" label="货损单"></el-table-column>
				<el-table-column prop="paidNumber" label="赔偿关联件数"></el-table-column>
				<el-table-column prop="paidMoney" label="补偿金额"></el-table-column>
				<el-table-column prop="gylOperatorTime" label="创建时间"></el-table-column>
			</el-table>
			<div class="pages-box"><page-box :pages="pagesD" @handleCurrentChange="handleCurrentChangeD" @handleSizeChange="handleSizeChangeD"></page-box></div>
		</div>
	</div>
</template>

<script>
import cityBox from '../../common/components/cityBoxs';
import pageBox from '../../common/components/pageBox';
import qs from 'qs';
export default {
	name: '',
	data() {
		return {
			// 上个页面带过来的数据
			goodsDetail: {},
			// 查询
			searchBox: {
				deliveryNumber: '',
				// cityCode: ''
			},
			// 入库明细
			putInData: [],
			expends: [], // 默认展开的行 id 数组
			// 赔偿记录
			compensationData: [],
			// 切换的标识
			tabFlag: 1,
			pages: this.$pages(),
			pagesD: this.$pages()
		};
	},
	props: [],
	computed: {
		height() {
			return {
				height: window.innerHeight - 100 + 'px'
			};
		}
	},
	components: { cityBox, pageBox },
	methods: {
		//设置table中的扩展项，展开的id，此处我需要全部展开
		getExpends() {
			var Id = this.putInData.map(item => item.id);
			this.expends = Id;
		},
		getRowKeys(row) {
			return row.id;
		},
		// 切换城市
		changeCity(city) {
			this.searchBox.cityCode = city[city.length - 1];
		},
		//切换入库明细和赔偿记录
		changeRadio(e) {
			if (e == 1) {
				this.getDeliveryList()
			} else if (e == 2) {
				this.getCompensateList()
			}
		},
		search() {
			this.pages.currentPage = 1;
			this.getDeliveryList()
		},
		// 入库明细翻页
		handleCurrentChange(size) {
			this.pages.currentPage = size;
			this.getDeliveryList()
		},
		handleSizeChange(size) {
			this.pages.pageSize = size;
			this.getDeliveryList()
		},
		// 赔偿记录翻页
		handleCurrentChangeD(size) {
			this.pagesD.currentPage = size;
			this.getCompensateList()
		},
		handleSizeChangeD(size) {
			this.pagesD.pageSize = size;
			this.getCompensateList()
		},
		// 入库明细
		getDeliveryList() {
			let params = {
				purchaseNumber: this.goodsDetail.purchaseNumber,
				deliveryNumber: this.searchBox.deliveryNumber,
				// cityCode: this.searchBox.cityCode,
				pagerIndex: this.pages.currentPage,
				pagerNumber: this.pages.pageSize,
			}
			this.loadingWait = this.showLoading('请稍候...')
			this.$https.fetchQsPost('/damage/get/deliveryList', params).then(res => {
				this.loadingWait.close()
				if(res.data.code == 200) {
					this.putInData = res.data.data.list;
					this.pages.totalPage = res.data.data.totalPage;
					this.pages.totalCount = res.data.data.totalCount;
					this.getExpends();
				}else {
					this.$message.error(res.data.msg);
				}
			})
		},
		// 赔偿记录
		getCompensateList() {
			let params = {
				purchaseNumber: this.goodsDetail.purchaseNumber,
				pagerIndex: this.pagesD.currentPage,
				pagerNumber: this.pagesD.pageSize,
			}
			this.loadingWait = this.showLoading('请稍候...')
			this.$https.fetchQsPost('/damage/get/purchaseCompensateList', params).then(res => {
				this.loadingWait.close()
				if(res.data.code == 200) {
					this.compensationData = res.data.data.list;
					this.pagesD.totalPage = res.data.data.totalPage;
					this.pagesD.totalCount = res.data.data.totalCount;
					this.getExpends();
				}else {
					this.$message.error(res.data.msg);
				}
			})
		},
		// 导出
		exportData() {}

	},
	created() {
		this.goodsDetail = qs.parse(this.$route.query.detail)
		console.log(this.goodsDetail)
		if(this.tabFlag == 1) {
			this.getDeliveryList()
		}else if(this.tabFlag == 2) {
			this.getCompensateList()
		}
	},
	mounted() {},
	watch: {}
};
</script>

<style scoped lang="scss">
.tabs-box {
  /deep/ .el-table__expanded-cell {
    padding: 0 0 20px;
  }
}
.resCityBox {
	display: flex;
}
.load {
	color: #1890ff;
	border-bottom: 1px solid #1890ff;
}
.goods-content {
	.name {
		color: #262626;
	}
	.zj {
		color: #8c8c8c;
		margin-top: 10px;
	}
	.dw {
		color: #8c8c8c;
	}
}
.timer-box {
	.xq {
		color: #1890ff;
	}
}
.smallBox {
	display: flex;
	flex-direction: row;
	.boxImg {
		width: 98px;
		heigth: 98px;
	}
	.rightBox {
		margin-left: 6px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.rightTit {
			color: #000000;
		}
		.rightNum {
			color: #000000;
			margin-top: 10px;
		}
	}
}
.blue {
	color: #1890ff;
}
.green {
	color: #36c626;
}
.purchaseBox {
	margin-top: 20px;
	font-size: 14px;
	margin-left: 10px;
}
.topTitle {
	color: #000000;
	font-size: 18px;
	margin-bottom: 14px;
}
.goods {
	margin: 20px 10px;
	display: flex;
	flex-direction: row;
	.goodsImg {
		width: 160px;
		height: 160px;
		margin-right: 20px;
		img {
			width: 160px;
			height: 160px;
			border-radius: 4px;
		}
	}
	.goodsBox {
		.goodName {
			color: #000000;
			font-size: 20px;
			margin: 20px 0 50px 0;
		}
		.goodsInfo {
			display: flex;
			flex-direction: row;
			.info {
				padding: 0 40px;
				border-right: 1px solid #e9e9e9;
				.tit {
					color: #333;
					margin-bottom: 10px;
				}
				&:first-child {
					padding-left: 0px;
				}
				&:last-child {
					border-right: none;
				}
			}
		}
	}
}
.dy {
	margin: 20px 30px;
}
.purchaseDetail {
	.pages-box {
		position: relative;
	}
}
.mb {
	margin-bottom: 10px;
}
.totleT {
	color: #666;
	margin-bottom: 10px;
	font-size: 14px;
}
.totleN {
	color: #000000;
	font-size: 16px;
	text-align: right;
}
.settleBox {
	width: 100%;
	padding: 45px 15px;
	box-sizing: border-box;
	.settleAccounts {
		padding: 30px 40px;
		width: 100%;
		background: rgba(0, 0, 0, 0.02);
		border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
		opacity: 1;
		border-radius: 10px;
		box-sizing: border-box;
		.one {
			font-size: 16px;
			font-weight: 500;
			color: rgba(0, 0, 0, 1);
			div {
				margin-bottom: 5px;
			}
		}
		.four {
			display: flex;
			margin-top: 50px;
			.item {
				margin-right: 100px;
				.Tit {
					font-size: 16px;
					color: #666666;
				}
				.money {
					font-size: 12px;
					color: #666666;
					margin-top: 15px;
				}
			}
		}
	}
}
.purchaseRadio {
	margin: 20px 0;
}
.blue {
	color: #1890ff;
	margin: 0 10px;
	img {
		width: 20px;
		height: 20px;
	}
}
.red {
	color: #f5222d;
	margin: 0 10px;
}
.demo-table-expand {
	padding: 5px 10px;
	// height: 36px;
	font-size: 14px;
	background: #e6f7ff;
	// border: 1px solid #91d5ff;
	.el-form-item {
		margin-bottom: .0;
		img {
			width: 25px;
			height: 25px;
		}
	}
}
</style>

<style lang="scss"></style>
