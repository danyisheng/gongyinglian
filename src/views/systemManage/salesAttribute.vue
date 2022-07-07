<template>
	<div class="supply-audit-con containerBox">
		<div class="toolbar-box">
			<common-row>
				<common-col :height="50">
					<div class="btn-box displayflex">
						<label for="">属性名称：</label>
						<el-input v-model="searchBox.SaleAttrName" placeholder="请输入属性名称" @keyup.enter.native="search"></el-input>
					</div>
				</common-col>
				<common-col :height="50">
					<div class="btn-box displayflex ">
						<label for="">录入方式：</label>
						<el-select v-model="searchBox.Mode" placeholder="请选择" clearable @change="selectAttr">
							<el-option :label="item.label" :value="item.value" v-for="(item, index) in enterList" :key="index"></el-option>
						</el-select>
					</div>
				</common-col>
			</common-row>
			<common-row>
				<common-col :lot="8">
					<div class="btn-box"><el-button size="medium" type="primary" @click="search">查询</el-button></div>
					<div class="btn-box"><el-button size="medium" @click="openDialog" class="addGoodsBtn">新增属性</el-button></div>
				</common-col>
			</common-row>
		</div>
		<div class="tabs-box">
			<el-table :height="tableHeight" :data="tableList" style="width: 100%">
				<el-table-column label="属性名" style="width: 25%">
					<template slot-scope="scope" style="width: 25%">
						<div style="margin-left: 10px">{{ scope.row.SaleAttrName }}</div>
					</template>
				</el-table-column>
				<el-table-column label="值录入方式" style="width: 25%">
					<template slot-scope="scope" style="width: 25%">
						<div style="margin-left: 10px">{{ scope.row.RecordValueModeDesc }}</div>
					</template>
				</el-table-column>
				<el-table-column label="关联商品数" style="width: 25%">
					<template slot-scope="scope" style="width: 25%">
						<div style="margin-left: 10px">{{ scope.row.ProductCount }}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope" style="width: 25%">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 新增 -->
		<el-dialog title="新增销售属性" :visible.sync="dialogFormVisible" style="width: 100%">
			<!-- 属性名 -->
			<common-row>
				<common-col :height="50" :lot="8">
					<div class="btn-box displayflex">
						<label for="" class="frontWidth">
							<span class="must">*</span>
							属性名称
						</label>
						<el-input class="inputwidth" v-model="attrName" placeholder="请输入属性名称"></el-input>
					</div>
				</common-col>
			</common-row>
			<!-- 值录入方式 -->
			<common-row>
				<!-- <common-col :height="50" :lot="8">
					<div class="btn-box displayflex">
						<label for="">
							<span class="must">*</span>
							值录入方式
						</label>
						<el-radio v-model="RecordValueMode" label="100">多选</el-radio>
						<el-radio v-model="RecordValueMode" label="200">单选</el-radio>
					</div>
				</common-col> -->
			</common-row>
			<!-- 是否可添加 -->
			<common-row>
				<common-col :height="50" :lot="8">
					<div class="btn-box displayflex">
						<label for=""></label>
						<el-checkbox v-model="IsAddCont">可添加</el-checkbox>
					</div>
				</common-col>
			</common-row>
			<!-- 不可添加显示 -->
			<template v-if="!IsAddCont">
				<!-- 可选值列表 -->
				<common-row>
					<common-col :height="50" :lot="8">
						<div class="btn-box displayflex">
							<label for="" class="frontWidth">
								<span class="must">*</span>
								可选值列表
							</label>
							<el-input v-model="AttrItemValueList" type="textarea" class="input"></el-input>
						</div>
					</common-col>
				</common-row>
			</template>
			<!-- 可添加显示 -->
			<template v-if="IsAddCont">
				<!-- 添加模板 -->
				<!-- <common-row>
					<common-col :height="50" :lot="8">
						<div class="btn-box displayflex">
							<label for="">
								<span class="must">*</span>
								添加模板
							</label>
							<el-radio v-model="Type" label="100">输入项</el-radio>
							<el-radio v-model="Type" label="200">选择项</el-radio>
							<el-button type="primary" @click="addModel">+添加</el-button>
						</div>
					</common-col>
				</common-row> -->
				<!-- 添加模板才会有-->
				<template>
					<div>
						<common-row>
							<!-- 输入项  -->
							<common-col :height="50" :lot="8">
								<div class="btn-box displayflex">
									<label for=""><el-checkbox v-model="IsAddCont" disabled>输入项</el-checkbox></label>
									<el-radio v-model="Type100Con" label="100">任意字符</el-radio>
									<el-radio v-model="Type100Con" label="200">数字</el-radio>
								</div>
							</common-col>
						</common-row>
						<common-row>
							<common-col :height="80" :lot="8">
								<div class="btn-box displayflex">
									<label for=""><el-checkbox v-model="IsSelect" @change="changeSelect">选择项</el-checkbox></label>
									<el-input v-model="AddAttrItemValueList" :disabled="!IsSelect" type="textarea" class="input"></el-input>
								</div>
							</common-col>
						</common-row>
					</div>
				</template>
			</template>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="supplyAddProperty()">确 定</el-button>
			</div>
		</el-dialog>
		<div class="pages-box"><page-box @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :pages="pages"></page-box></div>
	</div>
</template>

<script>
import pageBox from '../../common/components/pageBox';
export default {
	name: '',
	data() {
		return {
			tagList: [],
			searchBox: {
				SaleAttrName: '',
				Mode: ''
			},
			Mode: -1,
			// 录入方式
			enterList: [{ label: '多选', value: '1' }, { label: '多选可添加', value: '2' }],
			form: {},
			// 列表数据
			tableList: [],
			// 弹出框的信息
			dialogFormVisible: false, // 弹窗flag
			attrName: '', // 属性名
			// RecordValueMode: '100', // 值录入方法 单选还是多选
			IsAddCont: false, // 是否可添加
			IsSelect: false, //是否添加选择项
			//不可添加
			AttrItemValueList: '', //可选值列表
			AttrItemValueList1: '', //提交的可选值列表
			//可添加
			Type: '100', // 添加模板
			Type100Con: '100', // 输入项
			AddTemplateList: null, // 模板列表（输入和选择）
			AddAttrItemValueList: '',
			ListText: [],
			AddTemplateList1: [], // 提交的模板列表（输入和选择）
			pages: this.$pages(),
			// 区别新增和编辑的id
			SaleAttrId: '',
			// 防止2次提交
			commitFlag: false
		};
	},
	props: [],
	computed: {},
	components: { pageBox },
	computed: {
		tableHeight() {
			return this.$tableHeight(112);
		}
	},
	methods: {
		selectAttr(e) {
			console.log(e);
			if (!e) {
				this.Mode = -1;
			} else if (e == 1) {
				this.Mode = 3;
			} else {
				this.Mode = 1;
			}
			this.getList();
		},
		search() {
			this.pages.currentPage = 1;
			this.getList();
		},
		// 添加模板
		// addModel() {
		// 	this.AddTemplateList = [...this.AddTemplateList];
		// 	let Item;
		// 	if (this.Type == 100) {
		// 		Item = {
		// 			Type: 100,
		// 			Type100Con: this.Type100Con
		// 		};
		// 	} else {
		// 		Item = {
		// 			Type: 200,
		// 			Type100Con: '0',
		// 			AttrItemValueList: ''
		// 		};
		// 	}
		// 	this.AddTemplateList.push(Item);
		// 	console.log(this.AddTemplateList);
		// },
		changeSelect(e) {
			this.IsSelect = e;
		},
		// 删除模板
		// deletModel(index) {
		// 	this.AddTemplateList.remove = function(value) {
		// 		var index = this.indexOf(value);
		// 		if (index > -1) {
		// 			this.splice(index, 1);
		// 		}
		// 	};
		// 	this.AddTemplateList.remove(this.AddTemplateList[index]);
		// },
		// 打开弹出框(新增)
		openDialog() {
			this.SaleAttrId = '';
			this.attrName = '';
			// this.RecordValueMode = '100';
			this.IsAddCont = false;
			this.IsSelect = false;
			this.AttrItemValueList = '';
			this.type = '100';
			this.AddTemplateList = [];
			this.Type100Con = '100';
			this.dialogFormVisible = true;
		},
		// 翻页相关
		handleCurrentChange(size) {
			this.pages.currentPage = size;
			this.getList();
		},
		handleSizeChange(size) {
			this.pages.pageSize = size;
			this.getList();
		},
		// 获取数据/api.Erp.SaleAttr.GetSaleAttrDataList
		getList() {
			let params = {
				pagination: {
					PageIndex: this.pages.currentPage,
					PageRows: this.pages.pageSize,
					SortField: 'CreateTime',
					SortType: 'desc'
					// Total: ''
				},
				SaleAttrId: '',
				SaleAttrName: this.searchBox.SaleAttrName,
				Mode: this.Mode
			};
			this.loadingWait = this.showLoading('请稍候...');
			this.$https.fetchNetPost('/api.Erp.SaleAttr.GetSaleAttrDataList', params).then(res => {
				if (res.data.ErrorCode == 200) {
					this.loadingWait.close();
					if (res.data.Data) {
						this.tableList = res.data.Data;
						this.pages.totalPage = res.data.Total < this.pages.pageSize ? res.data.Total : Math.ceil(res.data.Total / this.pages.pageSize);
						this.pages.totalCount = res.data.Total;
					} else {
						this.tableList = [];
					}
				} else {
					this.loadingWait.close();
					this.$message.error(res.data.Msg);
				}
			});
		},
		// 新增和编辑
		supplyAddProperty() {
			if (this.commitFlag) return;
			if (!this.attrName) {
				this.$message.error('属性名不能为空');
				return;
			}
			// 可添加
			if (this.IsAddCont) {
				//有选择项
				if (this.IsSelect) {
					if (!this.AddAttrItemValueList) {
						this.$message.error('选择项不能为空');
						return;
					}
					let aa = this.AddAttrItemValueList.split(/[(\r\n)\r\n]+/);
					this.AddTemplateList1 = [
						{
							Type: 100,
							Type100Con: Number(this.Type100Con),
							AttrItemValueList: ['']
						},
						{
							Type: 200,
							Type100Con: 0,
							AttrItemValueList: aa
						}
					];
				} else {
					// 没有选择项
					this.AddTemplateList1 = [
						{
							Type: 100,
							Type100Con: Number(this.Type100Con),
							AttrItemValueList: ['']
						}
					];
				}

				// this.AddTemplateList1 = [];
				// this.AddTemplateList.map(item => {
				// 	if (item.AttrItemValueList) {
				// 		aa = item.AttrItemValueList.split(/[(\r\n)\r\n]+/);
				// 	}
				// 	this.ListText.push(item.AttrItemValueList);
				// 	this.AddTemplateList1.push({
				// 		Type: Number(item.Type),
				// 		Type100Con: Number(item.Type100Con),
				// 		AttrItemValueList: aa ? aa : ['']
				// 	});
				// 	return this.AddTemplateList1;
				// });
				// if (this.ListText.includes('')) {
				// 	this.$message.error('可选值列表不能为空');
				// 	return;
				// }
			} else {
				// 可选值
				if (!this.AttrItemValueList) {
					this.$message.error('可选值列表不能为空');
					return;
				}
				this.AttrItemValueList1 = this.AttrItemValueList.split(/[(\r\n)\r\n]+/);
			}
			this.commitFlag = true;
			let params = null;
			if (this.SaleAttrId) {
				// 编辑
				// 可添加
				if (this.IsAddCont) {
					params = {
						SaleAttrId: this.SaleAttrId,
						Name: this.attrName, //属性名
						RecordValueMode: 100, //值录入方式 100=多选 200=单选
						IsAddCont: this.IsAddCont,
						EditTemplateList: this.AddTemplateList1
					};
				} else {
					// 不可添加
					params = {
						SaleAttrId: this.SaleAttrId,
						Name: this.attrName, //属性名
						RecordValueMode: 100, //值录入方式 100=多选 200=单选
						IsAddCont: this.IsAddCont,
						AttrItemValueList: this.AttrItemValueList1
					};
				}
				// let aa = JSON.stringify(params);
				// console.log(aa);
				this.loadingWait = this.showLoading('请稍候...');
				this.$https.fetchNetPost('/api.Erp.SaleAttr.EditSaleAttr', params).then(res => {
					console.log(res);
					if (res.data.ErrorCode == 200) {
						this.loadingWait.close();
						this.commitFlag = false;
						this.dialogFormVisible = false;
						this.getList();
					} else {
						this.loadingWait.close();
						this.commitFlag = false;
						this.$message.error(res.data.Msg);
					}
				});
			} else {
				// 新增
				// 可添加
				if (this.IsAddCont) {
					params = {
						Name: this.attrName, //属性名
						RecordValueMode: 100, //值录入方式 100=多选 200=单选
						IsAddCont: this.IsAddCont,
						AddTemplateList: this.AddTemplateList1
					};
				} else {
					// 不可添加
					params = {
						Name: this.attrName, //属性名
						RecordValueMode: 100, //值录入方式 100=多选 200=单选
						IsAddCont: this.IsAddCont,
						AttrItemValueList: this.AttrItemValueList1
					};
				}
				this.loadingWait = this.showLoading('请稍候...');
				this.$https.fetchNetPost('/api.Erp.SaleAttr.AddSaleAttr', params).then(res => {
					if (res.data.ErrorCode == 200) {
						this.loadingWait.close();
						this.dialogFormVisible = false;
						this.commitFlag = false;
						this.getList();
					} else {
						this.loadingWait.close();
						this.$message.error(res.data.Msg);
						this.commitFlag = false;
					}
				});
			}
		},
		// 编辑的数据
		handleEdit(index, row) {
			this.SaleAttrId = row.SaleAttrId;
			let params = {
				SaleAttrId: row.SaleAttrId
			};
			this.loadingWait = this.showLoading('请稍候...');
			this.$https.fetchNetPost('/api.Erp.SaleAttr.GetEditData', params).then(res => {
				if (res.data.ErrorCode == 200) {
					this.loadingWait.close();
					let aa = [];
					this.attrName = res.data.Data.Name;
					// this.RecordValueMode = res.data.Data.RecordValueMode.toString();
					this.IsAddCont = res.data.Data.IsAddCont;
					// this.AttrItemValueList = res.data.Data.AttrItemValueList;
					// 可添加
					if (res.data.Data.IsAddCont) {
						this.AttrItemValueList = '';
						if (res.data.Data.EditTemplateList.length > 1) {
							this.IsSelect = true;
							if (res.data.Data.EditTemplateList[0].Type100Con == 0) {
								this.Type100Con = res.data.Data.EditTemplateList[1].Type100Con;
								this.Type100Con = this.Type100Con.toString();
								res.data.Data.EditTemplateList[0].AttrItemValueList.map(item => {
									aa.push(item.Value);
								});
								this.AddAttrItemValueList = aa.join(`\n`);
							} else {
								this.Type100Con = res.data.Data.EditTemplateList[0].Type100Con;
								this.Type100Con = this.Type100Con.toString();
								res.data.Data.EditTemplateList[1].AttrItemValueList.map(item => {
									aa.push(item.Value);
								});
								this.AddAttrItemValueList = aa.join(`\n`);
							}
						} else {
							this.AddAttrItemValueList = '';
							this.IsSelect = false;
							this.Type100Con = res.data.Data.EditTemplateList[0].Type100Con;
							this.Type100Con = this.Type100Con.toString();
						}
					} else {
						// 不可添加
						res.data.Data.EditTemplateList[0].AttrItemValueList.map(item => {
							aa.push(item.Value);
						});
						this.AttrItemValueList = aa.join(`\n`);
					}
					// res.data.Data.EditTemplateList.map(item => {
					// 	item.Type100Con = item.Type100Con.toString();
					// 	if (item.AttrItemValueList != null) {
					// 		item.AttrItemValueList.map(item1 => {
					// 			aa.push(item1.Value);
					// 		});
					// 		item.AttrItemValueList = aa.join(`\n`);
					// 		this.AttrItemValueList = aa.join(`\n`);
					// 	}
					// });
					// this.AddTemplateList = [...res.data.Data.EditTemplateList];
				} else {
					this.loadingWait.close();
					this.$message.error(res.data.Msg);
				}
			});
			this.dialogFormVisible = true;
		},
		// 删除属性
		handleDelete(index, row) {
			this.$confirm('确定要删除这个商品？ 是否继续？', '删除商品', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'error'
			})
				.then(() => {
					let params = {
						SaleAttrId: row.SaleAttrId
					};
					this.loadingWait = this.showLoading('请稍候...');
					this.$https.fetchNetPost('/api.Erp.SaleAttr.DelSaleAttr', params).then(res => {
						if (res.data.ErrorCode == 200) {
							this.loadingWait.close();
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.getList();
						} else {
							this.loadingWait.close();
							this.$message.error(res.data.Msg);
						}
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		}
	},
	created() {},
	mounted() {
		this.getList();
	},
	watch: {}
};
</script>

<style scoped lang="scss">
.checked {
	margin: 20px 0 20px 115px;
}
.inputwidth {
	width: 300px;
	margin-left: 10px;
}
.input {
	margin-left: 10px;
	width: 300px;
	height: 200px;
}
.common-row .common-col label {
	width: 100px;
	text-align: right;
}
.common-row .common-col .el-radio {
	text-align: left;
	width: 80px;
	margin-left: 10px;
}
.deleteImg {
	width: 14px;
	height: 14px;
	margin-right: 5px;
}
.must {
	color: #e02f45;
}
</style>

<style lang="scss"></style>
