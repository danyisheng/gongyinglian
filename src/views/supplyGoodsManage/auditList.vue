<template>
    <div class="supply-audit-con containerBox">
        <div class="toolbar-box">
            <common-row>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">商品名称：</label>
                        <el-input v-model="searchBox.goodsName" placeholder="请输入商品名称" clearable></el-input>
                    </div>
                </common-col>
                <!--<common-col :height="50">-->
                    <!--<div class="btn-box displayflex ">-->
                        <!--<label for="">商品价格：</label>-->
                        <!--<el-input v-model="searchBox.startPrice" style="width: 80px;" placeholder="" clearable></el-input>-->
                        <!--<span class="heng-line">——</span>-->
                        <!--<el-input v-model="searchBox.endPrice" style="width: 80px;" placeholder="" clearable></el-input>-->
                    <!--</div>-->
                <!--</common-col>-->
                <!--<common-col :height="50" v-if="activeName==='!first'">-->
                <!--<div class="btn-box displayflex ">-->
                <!--<label for="">商品销量：</label>-->
                <!--<el-input v-model="searchBox.goodsName" style="width: 80px;" placeholder="" clearable></el-input>-->
                <!--<span class="heng-line">——</span>-->
                <!--<el-input v-model="searchBox.goodsName" style="width: 80px;" placeholder="" clearable></el-input>-->
                <!--</div>-->
                <!--</common-col>-->
                <!--<common-col :height="50">-->
                    <!--<div class="btn-box displayflex ">-->
                        <!--<label for="">一级类目：</label>-->
                        <!--<el-select v-model="searchBox.CategoryId" placeholder="请选择" clearable>-->
                            <!--<el-option-->
                                    <!--v-for="item in options"-->
                                    <!--:key="item.CategoryId"-->
                                    <!--:label="item.Name"-->
                                    <!--:value="item.CategoryId">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</div>-->
                <!--</common-col>-->
            </common-row>
            <common-row>
                <common-col :lot="8">
                    <div class="btn-box">
                        <el-button size="medium" type="primary" @click="search">查询</el-button>
                    </div>
                    <div class="btn-box">
                        <el-button size="medium"  @click="cancelSupplyGoods" class="dellAllBtn">批量撤销</el-button>
                    </div>
                </common-col>
            </common-row>
        </div>
        <div class="tabs-box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="待审核" name="1000">
                    <el-table
                            @selection-change="handleSelectionChange"
                            :height="tableHeight"
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="goods" label="商品信息" width="400">
                            <template slot-scope="scope">
                                <div class="goods-box">
                                    <div class="image-box">
                                        <img :src="scope.row.Url" alt="">
                                    </div>
                                    <div class="goods-content">
                                        <p>{{scope.row.ProductName}}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="SinglePrice" label="价格"></el-table-column>
                        <el-table-column prop="InvQuantity" label="库存"></el-table-column>
                        <el-table-column prop="CreateTime" label="申请时间"></el-table-column>
                        <el-table-column prop="action" label="操作" align="center">
                            <template slot-scope="scope">
                                <div class="table-btn-box">
                                    <a href="javascript:;" @click="goodsDetail(scope.row)">详情</a>
                                </div>
                                <div class="table-btn-box">
                                    <el-button  size="medium"  class="dellAllBtn" @click="cancelSupplyGood(scope.row)">撤销申请</el-button>
                                </div>

                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="审核通过" name="2000">
                    <el-table
                            @selection-change="handleSelectionChange"
                            :height="tableHeight"
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="goods" label="商品信息" width="400">
                            <template slot-scope="scope">
                                <div class="goods-box">
                                    <div class="image-box">
                                        <img :src="scope.row.Url" alt="">
                                    </div>
                                    <div class="goods-content">
                                        <p>{{scope.row.ProductName}}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="SinglePrice" label="价格"></el-table-column>
                        <el-table-column prop="InvQuantity" label="库存"></el-table-column>
                        <el-table-column prop="CreateTime" label="申请时间"></el-table-column>
                        <el-table-column prop="StatusDate" label="审核时间"></el-table-column>
                        <el-table-column prop="ManageUserName" label="操作人"></el-table-column>
                        <!--<el-table-column prop="action" label="操作" align="center">-->
                            <!--<template slot-scope="scope">-->
                                <!--<div class="table-btn-box">-->
                                    <!--<a href="javascript:;" @click="goodsDetail(scope.row)">详情</a>-->
                                <!--</div>-->
                                <!--<div class="table-btn-box">-->
                                    <!--<el-button  size="medium"  class="dellAllBtn" @click="cancelSupplyGood(scope.row)">撤销申请</el-button>-->
                                <!--</div>-->

                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="审核拒绝" name="3000">
                    <el-table
                            @selection-change="handleSelectionChange"
                            :height="tableHeight"
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="goods" label="商品信息" width="400">
                            <template slot-scope="scope">
                                <div class="goods-box">
                                    <div class="image-box">
                                        <img :src="scope.row.Url" alt="">
                                    </div>
                                    <div class="goods-content">
                                        <p>{{scope.row.ProductName}}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="SinglePrice" label="价格"></el-table-column>
                        <el-table-column prop="InvQuantity" label="库存"></el-table-column>
                        <el-table-column prop="Remark" label="拒绝原因"></el-table-column>
                        <el-table-column prop="CreateTime" label="申请时间"></el-table-column>
                        <el-table-column prop="StatusDate" label="审核时间"></el-table-column>
                        <el-table-column prop="ManageUserName" label="操作人"></el-table-column>
                        <!--<el-table-column prop="action" label="操作" align="center">-->
                            <!--<template slot-scope="scope">-->
                                <!--<div class="table-btn-box">-->
                                    <!--<a href="javascript:;" @click="goodsDetail(scope.row)">详情</a>-->
                                <!--</div>-->
                                <!--<div class="table-btn-box">-->
                                    <!--<el-button  size="medium"  class="dellAllBtn" @click="cancelSupplyGood(scope.row)">撤销申请</el-button>-->
                                <!--</div>-->

                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="已撤销" name="4000">
                    <el-table
                            @selection-change="handleSelectionChange"
                            :height="tableHeight"
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="goods" label="商品信息" width="400">
                            <template slot-scope="scope">
                                <div class="goods-box">
                                    <div class="image-box">
                                        <img :src="scope.row.Url" alt="">
                                    </div>
                                    <div class="goods-content">
                                        <p>{{scope.row.ProductName}}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="SinglePrice" label="价格"></el-table-column>
                        <el-table-column prop="InvQuantity" label="库存"></el-table-column>
                        <el-table-column prop="Remark" label="撤销原因"></el-table-column>
                        <el-table-column prop="CreateTime" label="申请时间"></el-table-column>
                        <el-table-column prop="StatusDate" label="审核时间"></el-table-column>
                        <el-table-column prop="ManageUserName" label="操作人"></el-table-column>
                        <!--<el-table-column prop="action" label="操作" align="center">-->
                            <!--<template slot-scope="scope">-->
                                <!--<div class="table-btn-box">-->
                                    <!--<a href="javascript:;" @click="goodsDetail(scope.row)">详情</a>-->
                                <!--</div>-->
                                <!--<div class="table-btn-box">-->
                                    <!--<el-button  size="medium"  class="dellAllBtn" @click="cancelSupplyGood(scope.row)">撤销申请</el-button>-->
                                <!--</div>-->

                            <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="pages-box">
            <page-box :pages="pages" @handleCurrentChange="handleCurrentChange"
                      @handleSizeChange="handleSizeChange"></page-box>
        </div>
    </div>
</template>

<script>
    import pageBox from '../../common/components/pageBox'
    import qs from 'qs'

    export default {
        name: '',
        data() {
            return {
                pages: this.$pages(),
                selectTableData: [],
                activeName: '1000',
                options: [],
                searchBox: {
                    goodsName: '',
                    CategoryId: '',
                    startPrice: null,
                    endPrice: null,
                    ContPsonMobileOrName: ''
                },
                tableData: []
            }
        },
        props: [],
        computed: {
            tableHeight() {
                return this.$tableHeight(150);
            }
        },
        components: {pageBox},
        methods: {
            handleClick(name) {
                this.selectTableData = []
                this.tableData = []
                this.pages = this.$pages()
                this.getData()
            },
            handleSelectionChange (s) {
                this.selectTableData = s
            },
            search() {
                this.pages = this.$pages()
                this.getData()
            },
            handleCurrentChange(size) {
                this.pages.currentPage = size
                this.getData()
            },
            handleSizeChange(size) {
                this.pages.pageSize = size
                this.getData()
            },
            groundSupplyGood (row) {
                let list = [row.Id]
                this.aferActionData(list, '2', '申请上架', '商品')
            },
            underSupplyGood (row) {
                let list = [row.Id]
                this.aferActionData(list, '3', '申请下架', '商品')
            },
            cancelSupplyGood (row) {
                let list = [row.Id]
                this.reviewActionData(list, '4000', '撤销申请', '商品', 'ManageReason')
            },
            groundSupplyGoods () {
                this.aferActionDatas('2', '申请上架', '商品')
            },
            cancelSupplyGoods () {
                this.reviewActionDatas('4000', '申请撤销', '商品', 'ManageReason')
            },
            underSupplyGoods () {
                this.aferActionDatas('3', '申请下架', '商品')
            },
            delSupplyGoods() {
                this.aferActionDatas('1', '删除', '商品')
            },
            aferActionData (list, type, actionTitle, showTitle) {
                let params = {
                    Ids: list,
                    ManageType: type
                }
                this.$actionApi.manageApiData('/api.Erp.Product.ManageProduct', params, this, actionTitle, showTitle).then(data => {
                    this.getData()
                })
            },
            reviewActionData (list, type, actionTitle, showTitle, key) {
                let params = {
                    Ids: list,
                    Status: type
                }
                this.$actionApi.reviewApiData('/api.Erp.Product.ManageProductReview', params, this, actionTitle, showTitle, key).then(data => {
                    this.getData()
                })
            },
            aferActionDatas (type, actionTitle, showTitle) {
                if (this.selectTableData.length > 0) {
                    let list = this.selectTableData.map(item => item.Id)
                    let params = {
                        Ids: list,
                        ManageType: type
                    }
                    this.$actionApi.manageApiData('/api.Erp.Product.ManageProduct', params, this, actionTitle, showTitle).then(data => {
                        this.getData()
                    })
                } else {
                    this.$message.error('请选择勾选删除的数据')
                }
            },
            reviewActionDatas (type, actionTitle, showTitle, key) {
                if (this.selectTableData.length > 0) {
                    let list = this.selectTableData.map(item => item.Id)
                    let params = {
                        Ids: list,
                        Status: type
                    }
                    this.$actionApi.reviewApiData('/api.Erp.Product.ManageProductReview', params, this, actionTitle, showTitle, key).then(data => {
                        this.getData()
                    })
                } else {
                    this.$message.error('请选择勾选删除的数据')
                }
            },
            getData() {
                let params = {
                    pagination: {
                        SortField: 'CreateTime',
                        SortType: 'desc',
                        PageIndex: this.pages.currentPage,
                        PageRows: this.pages.pageSize
                    },
                    ProductName: this.searchBox.goodsName.trim(),
                    ProductCategoryId: this.searchBox.CategoryId,
                    ContPsonMobileOrName: '',
                    ReviewStatus: this.activeName,
                }
                this.$actionApi.getApiDataV1('/api.Erp.Product.GetProductReviewList', params, this).then(data => {
                    this.tableData = data
                    console.log(this.tableData)
                })
            },
            getCategoryList () {
                let params = {
                    "IsAll": true,
                    "IsEnble": true
                }
                this.$actionApi.getApiList('/api.Erp.ProductCategory.GetProductCategoryList', params, this).then(data => {
                    this.options = data
                })
            },
            goodsDetail(row) {
                let obj = {
                    showType: 'look',
                    id: row.ProductId
                }
                this.$router.push({name: 'supplyGoodsInfo', query: {data: qs.stringify(obj)}})
            },
            supplyAddGoods() { //新增商品
                this.$router.push({name: 'supplyAddGoods'})
            }
        },
        created() {
        },
        mounted() {
            this.getData()
            this.getCategoryList()
        },
        watch: {}
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">

</style>




