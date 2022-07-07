<template>
    <div class="supply-goods-con containerBox">
        <div class="toolbar-box">
            <common-row>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">商品名称：</label>
                        <el-input v-model="searchBox.goodsName" placeholder="请输入商品名称" clearable></el-input>
                    </div>
                </common-col>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">商品价格：</label>
                        <el-input v-model="searchBox.startPrice" style="width: 80px;" placeholder="起始" clearable></el-input>
                        <span class="heng-line">——</span>
                        <el-input v-model="searchBox.endPrice" style="width: 80px;" placeholder="截止" clearable></el-input>
                    </div>
                </common-col>
                <!--<common-col :height="50" v-if="activeName==='!first'">-->
                    <!--<div class="btn-box displayflex ">-->
                        <!--<label for="">商品销量：</label>-->
                        <!--<el-input v-model="searchBox.goodsName" style="width: 80px;" placeholder="" clearable></el-input>-->
                        <!--<span class="heng-line">——</span>-->
                        <!--<el-input v-model="searchBox.goodsName" style="width: 80px;" placeholder="" clearable></el-input>-->
                    <!--</div>-->
                <!--</common-col>-->
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">一级类目：</label>
                        <el-select v-model="searchBox.CategoryId" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options"
                                    :key="item.CategoryId"
                                    :label="item.Name"
                                    :value="item.CategoryId">
                            </el-option>
                        </el-select>
                    </div>
                </common-col>
            </common-row>
            <common-row>
                <common-col :lot="8">
                    <div class="btn-box">
                        <el-button size="medium" type="primary" @click="search">查询</el-button>
                    </div>
                    <div class="btn-box">
                        <el-button size="medium" @click="supplyAddGoods" class="addBtn">新增商品</el-button>
                    </div>
                    <div class="btn-box" v-if="activeName === '1'">
                        <el-button size="medium" @click="underSupplyGoods" class="dellAllBtn">批量下架</el-button>
                    </div>
                    <div class="btn-box" v-if="activeName === '2'">
                        <el-button size="medium" @click="groundSupplyGoods" class="dellAllBtn">批量上架</el-button>
                    </div>
                    <div class="btn-box">
                        <el-button size="medium"  @click="delSupplyGoods" class="dellAllBtn">批量删除</el-button>
                    </div>
                </common-col>
            </common-row>
        </div>
        <div class="tabs-box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="0">
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
                                        <p>{{scope.row.Name}}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="SinglePrice" label="价格"></el-table-column>
                        <el-table-column prop="Quantity" label="库存"></el-table-column>
                        <!-- <el-table-column prop="WaitQuantity" label="待发货"></el-table-column>
                        <el-table-column prop="WaitQuantity" label="已发货"></el-table-column> -->
                        <el-table-column prop="date" label="创建时间">
                            <template slot-scope="scope">
                                <div class="timer-box">
                                    <p>{{$getDate.getYYYYMMDD(scope.row.CreateTime)}}</p>
                                    <p>{{$getDate.getHHMMSS(scope.row.CreateTime)}}</p>
                                    <p>{{scope.row.Status === 1 ? '出售中' : scope.row.Status === 2 ? '仓库中' : scope.row.Status === 3 ? '上架审核中' : ''}}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="CreatorName" label="创建人"></el-table-column>
                        <el-table-column prop="action" label="操作" align="center">
                            <template slot-scope="scope">
                                <div class="table-btn-box">
                                    <el-button @click="goodsDetail(scope.row, 'updat')" size="medium" type="primary">管理</el-button>
                                </div>
                                <div class="table-btn-box" v-if="scope.row.Status === 2">
                                    <el-button @click="goodsDetail(scope.row, 'edit')" size="medium" type="primary">编辑</el-button>
                                </div>
                                <div class="table-btn-box" v-if="scope.row.Status === 2">
                                    <a href="javascript:;" @click="groundSupplyGood(scope.row)">申请上架</a>
                                </div>
                                <div class="table-btn-box" v-if="scope.row.Status === 1">
                                    <a href="javascript:;" @click="underSupplyGood(scope.row)" >立即下架</a>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="出售中" name="1">
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
                                        <p>{{scope.row.Name}}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="SinglePrice" label="价格"></el-table-column>
                        <el-table-column prop="Quantity" label="库存"></el-table-column>
                        <!-- <el-table-column prop="WaitQuantity" label="待发货"></el-table-column>
                        <el-table-column prop="WaitQuantity" label="已发货"></el-table-column> -->
                        <el-table-column prop="date" label="创建时间">
                            <template slot-scope="scope">
                                <div class="timer-box">
                                    <p>{{$getDate.getYYYYMMDD(scope.row.CreateTime)}}</p>
                                    <p>{{$getDate.getHHMMSS(scope.row.CreateTime)}}</p>
                                    <p>{{scope.row.Status === 1 ? '出售中' : scope.row.Status === 2 ? '仓库中' : scope.row.Status === 3 ? '上架审核中' : ''}}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="CreatorName" label="创建人"></el-table-column>
                        <el-table-column prop="date" label="上架时间">
                            <template slot-scope="scope">
                                <div class="timer-box">
                                    <p>{{$getDate.getYYYYMMDD(scope.row.ShelfStatusDate)}}</p>
                                    <p>{{$getDate.getHHMMSS(scope.row.ShelfStatusDate)}}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="action" label="操作" align="center">
                            <template slot-scope="scope">
                                <div class="table-btn-box">
                                    <el-button @click="goodsDetail(scope.row, 'updat')" size="medium" type="primary">管理</el-button>
                                </div>
                                <div class="table-btn-box" v-if="scope.row.Status === 2">
                                    <el-button @click="goodsDetail(scope.row, 'edit')" size="medium" type="primary">编辑</el-button>
                                </div>
                                <div class="table-btn-box" v-if="scope.row.Status === 2">
                                    <a href="javascript:;" @click="groundSupplyGood(scope.row)">申请上架</a>
                                </div>
                                <div class="table-btn-box" v-if="scope.row.Status === 1">
                                    <a href="javascript:;" @click="underSupplyGood(scope.row)" >立即下架</a>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="仓库中" name="2">
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
                                        <p>{{scope.row.Name}}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="SinglePrice" label="价格"></el-table-column>
                        <el-table-column prop="Quantity" label="库存"></el-table-column>
                        <!-- <el-table-column prop="WaitQuantity" label="待发货"></el-table-column>
                        <el-table-column prop="WaitQuantity" label="已发货"></el-table-column> -->
                        <el-table-column prop="date" label="创建时间">
                            <template slot-scope="scope">
                                <div class="timer-box">
                                    <p>{{$getDate.getYYYYMMDD(scope.row.CreateTime)}}</p>
                                    <p>{{$getDate.getHHMMSS(scope.row.CreateTime)}}</p>
                                    <p>{{scope.row.Status === 1 ? '出售中' : scope.row.Status === 2 ? '仓库中' : scope.row.Status === 3 ? '上架审核中' : ''}}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="CreatorName" label="创建人"></el-table-column>
                         <el-table-column prop="date" label="下架时间">
                            <template slot-scope="scope">
                                <div class="timer-box">
                                    <p>{{$getDate.getYYYYMMDD(scope.row.ShelfStatusDate)}}</p>
                                    <p>{{$getDate.getHHMMSS(scope.row.ShelfStatusDate)}}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="action" label="操作" align="center">
                            <template slot-scope="scope">
                                <div class="table-btn-box">
                                    <el-button @click="goodsDetail(scope.row, 'updat')" size="medium" type="primary">管理</el-button>
                                </div>
                                <div class="table-btn-box" v-if="scope.row.Status === 2">
                                    <el-button @click="goodsDetail(scope.row, 'edit')" size="medium" type="primary">编辑</el-button>
                                </div>
                                <div class="table-btn-box" v-if="scope.row.Status === 2">
                                    <a href="javascript:;" @click="groundSupplyGood(scope.row)">申请上架</a>
                                </div>
                                <div class="table-btn-box" v-if="scope.row.Status === 1">
                                    <a href="javascript:;" @click="underSupplyGood(scope.row)" >立即下架</a>
                                </div>
                            </template>
                        </el-table-column>
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
                activeName: '0',
                options: [],
                searchBox: {
                    goodsName: '',
                    CategoryId: '',
                    startPrice: '',
                    endPrice: '',
                    ContPsonMobileOrName: '',
                },
                SinglePrice: [],
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
                this.SinglePrice = []
                if(this.searchBox.startPrice != '' && this.searchBox.endPrice == '') {
                    this.$message.error('必须填写起止价格')
                    return
                }else if(this.searchBox.startPrice == '' && this.searchBox.endPrice != ''){
                    this.$message.error('必须填写起止价格')
                    return
                }else if(this.searchBox.startPrice != '' && this.searchBox.endPrice != '') {
                    if(Number(this.searchBox.startPrice) > Number(this.searchBox.endPrice)) {
                        this.$message.error('起始价格必须小于截止价格')
                        return
                    }
                    this.SinglePrice.push(this.searchBox.startPrice, this.searchBox.endPrice)
                }else if(this.searchBox.startPrice == '' && this.searchBox.endPrice == '') {
                    this.SinglePrice = []
                }
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
            groundSupplyGoods () {
                this.aferActionDatas('2', '申请上架', '商品')
            },
            underSupplyGoods () {
                this.aferActionDatas('3', '申请下架', '商品')
            },
            delSupplyGoods() {
                this.aferActionDatas('1', '删除', '商品')
            },
            aferActionData (list, type, actionTitle, showTitle) {
                console.log(1111)
                let params = {
                    Ids: list,
                    ManageType: type
                }
                this.$actionApi.manageApiData('/api.Erp.Product.ManageProduct', params, this, actionTitle, showTitle).then(data => {
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
            getData() {
                let params = {
                    pagination: {
                        SortField: 'CreateTime',
                        SortType: 'desc',
                        PageIndex: this.pages.currentPage,
                        PageRows: this.pages.pageSize
                    },
                    Name: this.searchBox.goodsName,
                    SinglePrice: this.SinglePrice,
                    ProductCategoryId: this.searchBox.CategoryId,
                    ContPsonMobileOrName: '',
                    Type: this.activeName,
                    ProductType: '1'
                }
                this.$actionApi.getApiDataV1('/api.Erp.Product.GetProductList', params, this).then(data => {
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
            goodsDetail(row, type) {
                let obj = {
                    showType: type,
                    id: row.Id,
                    Status: row.Status
                }
                this.$router.push({name: 'supplyGoodsInfo', query: {data: qs.stringify(obj)}})
            },
            supplyAddGoods() { //新增商品
                if(this.$user.UserInfo().IsSupplierCertSuc){
                    this.$router.push({name: 'supplyAddGoods'})
                }else{
                    this.$message({
                        type: 'info',
                        message: '请先通过认证'
                    });
                }
            },
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
    .supply-goods-con {
    }
</style>

<style lang="scss">

</style>




