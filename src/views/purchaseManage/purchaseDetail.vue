<template>
    <div class="purchaseDetail containerBoxInfo" :style="height">
        <div class="justify-content-between">
            <div class="goods">
                <div class="goodsImg">
                    <img :src="goodsDetail.image">
                </div>
                <div class="goodsBox">
                    <div class="goodName">
                        {{goodsDetail.name}} 
                        <img class="zy-img" v-if="goodsDetail.purchaseSupplyType == 100" src="../../assets/image/zhic.png"/>
                        <img class="zy-img" v-if="goodsDetail.purchaseSupplyType == 200" src="../../assets/image/shengy.png"/>
                    </div>
                    <div class="goodsInfo">
                        <div class="info" v-for="(specs,n) in goodsDetail.goodsSpecs" :key="n">
                            <div class="tit">{{n}}</div>
                            <div>{{specs}}</div>
                        </div>
                        <div class="info">
                            <div class="tit">商品状态</div>
                            <div class="green">{{goodsDetail.goodsStatus == 1?'上架':'下架'}}</div>
                        </div>
                        <div class="info" v-if="goodsDetail.purchaseSupplyType == 200">
                            <div class="tit">供应商姓名</div>
                            <div>{{goodsDetail.supplyName}}</div>
                        </div>
                        <div class="info" v-if="goodsDetail.purchaseSupplyType == 200">
                            <div class="tit">供应商手机号</div>
                            <div>{{goodsDetail.supplyPhone}}</div>
                        </div>
                        <div class="info" v-if="goodsDetail.purchaseSupplyType == 200">
                            <div class="tit">供应商省份</div>
                            <div>{{goodsDetail.supplyRegion}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dy">
                <el-button @click="toOrder()">打印采购单</el-button>
            </div>
        </div>
        <div class="purchaseBox">
            <div class="topTitle">采购信息</div>
            <common-row>
                <common-col :lot="6" class="mb">
                    采购订单: {{goodsDetail.purchaseNumber}}
                </common-col>
                <common-col :lot="6" class="mb">
                    采购状态：
                    <span class="blue">{{goodsDetail.status==1?'待发货':(goodsDetail.status==2?'已发货':'已取消')}}</span>
                    <el-button v-if="goodsDetail.status==1" size="medium" type="primary" @click="sendOutGoods" plain>确认发货</el-button>
                    <el-button v-if="goodsDetail.status==1" size="medium" type="danger" @click="deliverGoods" plain>取消发货</el-button>
                </common-col>
                <common-col :lot="6" class="mb">
                    创建时间：{{goodsDetail.createtime}}
                </common-col>
                <common-col :lot="6" class="mb" v-if="goodsDetail.actiontime">
                    发货时间：{{goodsDetail.actiontime}}
                </common-col>
            </common-row>
        </div>
        <div class="purchaseBox">
            <common-row>
                <common-col :lot="4" :height="100" class="smallBox">
                    <img src="../../assets/image/fahuo@2x.png" class="boxImg">
                    <div class="rightBox">
                        <div class="rightTit">发货总数</div>
                        <div class="rightNum">{{purchaseList.deliverGoodsNum}}</div>
                    </div>
                </common-col>
                <common-col :lot="4" :height="100" class="smallBox">
                    <img src="../../assets/image/yunshu@2x.png" class="boxImg">
                    <div class="rightBox">
                        <div class="rightTit">运输中</div>
                        <div class="rightNum">{{purchaseList.transitNum}}</div>
                    </div>
                </common-col>
                <common-col :lot="4" :height="100" class="smallBox">
                    <img src="../../assets/image/yiruku@2x.png" class="boxImg">
                    <div class="rightBox">
                        <div class="rightTit">已入库</div>
                        <div class="rightNum">{{purchaseList.receiveNum}}</div>
                    </div>
                </common-col>
                <common-col :lot="4" :height="100" class="smallBox">
                    <img src="../../assets/image/bubufa@2x.png" class="boxImg">
                    <div class="rightBox">
                        <div class="rightTit">不补发</div>
                        <div class="rightNum">{{purchaseList.notReplacementNum}}</div>
                    </div>
                </common-col>
                <common-col :lot="4" :height="100" class="smallBox">
                    <img src="../../assets/image/quxiao@2x.png" class="boxImg">
                    <div class="rightBox">
                        <div class="rightTit">取消补发</div>
                        <div class="rightNum">{{purchaseList.cancelReplacementNum}}</div>
                    </div>
                </common-col>
                <common-col :lot="4" :height="100" class="smallBox">
                    <img src="../../assets/image/bufa@2x.png" class="boxImg">
                    <div class="rightBox">
                        <div class="rightTit">待补发</div>
                        <div class="rightNum">{{purchaseList.waitReplacementNum}}</div>
                    </div>
                </common-col>
                <common-col :lot="4" :height="100" class="smallBox">
                    <img src="../../assets/image/yibufa@2x.png" class="boxImg">
                    <div class="rightBox">
                        <div class="rightTit">已补发</div>
                        <div class="rightNum">{{purchaseList.alreadyReplacementNum}}</div>
                    </div>
                </common-col>
                <common-col :lot="4" :height="100" class="smallBox">
                    <img src="../../assets/image/pingtaihuosun@2x.png" class="boxImg">
                    <div class="rightBox">
                        <div class="rightTit">平台货损审核中</div>
                        <div class="rightNum">{{purchaseList.platformDamageExamineNum}}</div>
                    </div>
                </common-col>
                <common-col :lot="4" :height="100" class="smallBox">
                    <img src="../../assets/image/gongyingshang@2x.png" class="boxImg">
                    <div class="rightBox">
                        <div class="rightTit">供应商货损审核中</div>
                        <div class="rightNum">{{purchaseList.supplierDamageExamineNum}}</div>
                    </div>
                </common-col>
            </common-row>
        </div>
        <div class="purchaseRadio">
            <el-radio-group v-model="purchaseFlag" @change="changeRadio" v-if="purchaseFlag != 3">
                <el-radio-button :label="1">发货单</el-radio-button>
                <el-radio-button :label="4">物流</el-radio-button>
            </el-radio-group>
        </div>
        <div class="tabs-box" v-show="purchaseFlag == 1">
            <common-row>
                <common-col  :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">发货单号：</label>
                        <el-input v-model="searchBox.deliveryNumber" placeholder="请输入发货单号"></el-input>
                    </div>
                </common-col>
                <common-col :height="50">
                    <div class="btn-box displayflex resCityBox">
                        <label for="">收货区域：</label>
                        <cityBox allCity v-model="searchBox.cityCode" @change="aaa"></cityBox>
                    </div>
                </common-col>
            </common-row>
            <div class="justify-content-between">
                <div class="mb">
                    <el-button type="primary" @click="search(1)">查询</el-button>
                    <el-button type="primary" @click="exportData">导出发货单</el-button>
                </div>
                <div>
                    <div class="totleT">物流总单数</div>
                    <div class="totleN">{{goodsDetail.logisticsNum}}</div>
                </div>
            </div>
            <el-table height="450" :data="tableData" style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="deliveryNumber" label="发货单号"></el-table-column>
                <el-table-column prop="phone" label="收货人">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.name}}</div>
                            <div>{{scope.row.phone}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="收货地点" width="400"></el-table-column>
                <el-table-column prop="deliverGoodsNum" label="发货总数" ></el-table-column>
                <el-table-column prop="extractGoodsNum" label="已入库" ></el-table-column>
                <el-table-column prop="logisticsNum" label="物流单数" ></el-table-column>            
                <el-table-column prop="hand" label="操作" >
                    <template slot-scope="scope">
                        <div>
                            <el-button  @click="toDetail(scope.row)" size="medium" type="primary">查看详情</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pages-box"><page-box :pages="pages" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></page-box></div>
        </div>      
        <div class="tabs-box" v-if="purchaseFlag == 4">
            <common-row>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">发货单号：</label>
                        <el-input v-model="searchBoxD.deliveryNumber" placeholder="请输入发货单号"></el-input>
                    </div>
                </common-col>
                <common-col :height="50">
                    <div class="btn-box displayflex">
                        <label for="">物流单号：</label>
                        <el-input v-model="searchBoxD.logisticsNumber" placeholder="请输入发货单号"></el-input>
                    </div>
                </common-col>
            </common-row>
            <div class="mb">
                <el-button type="primary" @click="search(4)">查询</el-button>
                <el-button type="danger" plain @click="remove(multipleSelectionD)">批量删除</el-button>
            </div>
            <el-table height="450" :data="tableDataD" style="width: 100%" @selection-change="handleSelectionChangeD">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="logisticsNumber" label="物流单号"  width="200"></el-table-column>
                <el-table-column prop="deliveryNumber" label="发货单号" ></el-table-column>
                <el-table-column prop="address" label="收货地址" ></el-table-column>
                <el-table-column prop="createTime" width="200" label="导入时间" ></el-table-column>         
                <el-table-column prop="hand" label="操作" >
                    <template slot-scope="scope">
                        <div>
                            <span class="blue" @click="editName(scope.row.id,scope.row.logisticsNumber)"><img src="../../assets/image/group@2x.png">修改物流单号</span>
                            <span class="red" @click="remove(scope.row.id)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pages-box"><page-box :pages="pagesD" @handleCurrentChange="handleCurrentChangeD" @handleSizeChange="handleSizeChangeD"></page-box></div>
        </div>

    </div>
</template>

<script>
    import cityBox from "../../common/components/cityBoxs";
    import pageBox from '../../common/components/pageBox';
    import qs from 'qs'
    export default {
        name: '',
        data() {
            return {
                goodsDetail:{},
                searchBox: {
                    deliveryNumber: '',
                    cityCode: '',
                },
                tableData: [],
                tableDataD: [],
                searchBoxD:{
                    deliveryNumber:'',
                    logisticsNumber:''
                },
                purchaseList:{},
                pages: this.$pages(),
                pagesD: this.$pages(),
                purchaseFlag:1,
                multipleSelectionD:''
            }
        },
        props: [],
        computed: {
            height() {
                return {
                    height: window.innerHeight - 100 + 'px'
                }
            }
        },
        components: {cityBox,pageBox},
        methods: {
            aaa(city){
                this.searchBox.cityCode = city[city.length - 1]
            },
            toOrder(){
                this.$router.push({name: 'purchaseOrder',query:{detail:qs.stringify(this.goodsDetail)}})
            },
            //切换发货单和物流
            changeRadio(e){
                if(e == 1){
                    this.getData()
                }else if(e == 4){
                    this.logisticsNumberB()
                }
            },
            search(num){
                if(num == 1){
                    this.pages.currentPage=1
                    this.getData()
                }else if(num == 4){
                    this.pagesD.currentPage=1
                    this.logisticsNumberB()
                }
            },
            //取消发货
            deliverGoods(){
                let params = {
                    purchaseNumber:this.goodsDetail.purchaseNumber
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchQsPost('/sd/purchase/cancel/deliverGoods', params).then(res => {
                    if (res.data.code === '200') {
                        this.loadingWait.close()
                        this.$message({
                            type: 'success',
                            message: '取消发货成功!'
                        });
                        this.goodsDetail.status = 3
                    } else {
                        this.loadingWait.close()
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
            },
            //确认发货
            sendOutGoods(){
                let params = {
                    purchaseNumbers:this.goodsDetail.purchaseNumber
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchQsPost('/sd/purchase/sendOutGoods', params).then(res => {
                    if (res.data.code === '200') {
                        this.loadingWait.close()
                        this.$message({
                            type: 'success',
                            message: '发货成功!'
                        });
                        this.goodsDetail.status = 2
                    } else {
                        this.loadingWait.close()
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
            },
            //采购订单统计数据
            statistics(deliveryNumber){
                let params = {
                    purchaseNumber:this.goodsDetail.purchaseNumber,
                    deliveryNumber:deliveryNumber?deliveryNumber:''
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchQsPost('/sd/purchase/statistics/purchaseNumber', params).then(res => {
                    if (res.data.code === '200') {
                        this.loadingWait.close()
                        this.purchaseList = res.data.data
                    } else {
                        this.loadingWait.close()
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
            },
            //分页
            handleCurrentChange(size){
                this.pages.currentPage=size
                this.getData()
            },
            handleSizeChange(size){
                this.pages.pageSize=size
                this.getData()
            },          
            handleCurrentChangeD(size){
                this.pagesD.currentPage=size
                this.logisticsNumberB()
            },
            handleSizeChangeD(size){
                this.pagesD.pageSize=size
                this.logisticsNumberB()
            },
            //发货单列表
            getData () {
                let params = {
                    purchaseNumber:this.goodsDetail.purchaseNumber,
                    deliveryNumber:this.searchBox.deliveryNumber,
                    cityCode:this.searchBox.cityCode,
                    pageNumber: this.pages.currentPage,
                    pageSize: this.pages.pageSize
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchQsPost('/sd/purchase/list/deliveryNumber', params).then(res => {
                    if (res.data.code === '200') {
                        if (res.data.data) {
                            this.loadingWait.close()
                            this.tableData = res.data.data.list
                            this.pages.totalPage = res.data.data.totalPage
                            this.pages.totalCount = res.data.data.totalCount
                        } else {
                            this.tableData = []
                        }
                    } else {
                        this.loadingWait.close()
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
            },
            //采购详情-物流单
            logisticsNumberB () {
                let params = {
                    purchaseNumber:this.goodsDetail.purchaseNumber,
                    deliveryNumber:this.searchBoxD.deliveryNumber,
                    logisticsNumber:this.searchBoxD.logisticsNumber,
                    pageNumber: this.pagesD.currentPage,
                    pageSize: this.pagesD.pageSize
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchQsPost('/sd/purchase/list/logisticsNumber', params).then(res => {
                    if (res.data.code === '200') {
                        if (res.data.data) {
                            this.loadingWait.close()
                            this.tableDataD = res.data.data.list
                            this.pagesD.totalPage = res.data.data.totalPage
                            this.pagesD.totalCount = res.data.data.totalCount
                        } else {
                            this.tableDataD = []
                        }
                    } else {
                        this.loadingWait.close()
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
            },
            //重命名
            editName (id,logisticsNumber) {
                this.$prompt('物流单号修改',  {
                    inputPlaceholder: '请输入物流单号',
                    inputPattern: /\S/,
                    inputValue: logisticsNumber,
                    inputErrorMessage: '物流单号未填写',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({value}) => {
                    this.updateNum(value,id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    })
                })
            },
            // 修改物流单号
            updateNum(value,id){
                let params = {
                    id:id,
                    logisticsNumber:value
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchQsPost('/sd/purchase/update/logisticsNumber', params).then(res => {
                    if (res.data.code === '200') {
                        this.$message({
                            type: 'success',
                            message: '修改物流单号成功'
                        });
                        this.loadingWait.close()
                        this.logisticsNumberB()
                    } else {
                        this.loadingWait.close()
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
            },
            //批量选择
            handleSelectionChangeD(val) {
                let idArr = ''
                for(let i in val){
                    if(i == 0){
                        idArr += val[i].id
                    }else{
                        idArr += ','+ val[i].id
                    }
                }
                this.multipleSelectionD = idArr;
            },
            //删除物流单号
            remove (id) {
                if(!id){
                    this.$message({
                        type: 'info',
                        message: '请选择物流单号'
                    });
                    return
                }
                this.$confirm('是否删除此物流单号?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.removeNum(id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            removeNum (id) {
                let params = {
                    ids:id
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchQsPost('/sd/purchase/del/logisticsNumber', params).then(res => {
                    if(res.data.code == 200){
                        this.loadingWait.close()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.logisticsNumberB()
                    }else{
                        this.loadingWait.close()
                        this.$message({
                            type: 'error',
                            message: res.data.Msg
                        });
                    }
                })
            },
            toDetail (delivery) {
                this.$router.push({name: 'logistics',query:{delivery:qs.stringify(delivery),detail:qs.stringify(this.goodsDetail)}})
            },
             //导出数据
            exportData () {
                let params = {
                    purchaseNumber:this.goodsDetail.purchaseNumber,
                    deliveryNumber:this.searchBox.deliveryNumber,
                    cityCode:this.searchBox.cityCode,
                    pageNumber: this.pages.currentPage,
                    pageSize: this.pages.totalCount+5
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchQsPost('/sd/purchase/list/deliveryNumber', params).then(res => {
                    if (res.data.code === '200') {
                        if (res.data.data) {
                            this.loadingWait.close()
                            let tableHeader = ['发货单号','收货地点','收货人姓名','收货人手机号','发货总数','运输中','已入库','不补发','取消补发','待补发','已补发','平台货损审核中','供应商货损审核中','物流单数']
                            let headerObj =  `导出发货单模板${this.$dayjs(new Date()).format('YYYY-MM-DD')}`
                            let title = ['采购单号:'+this.goodsDetail.purchaseNumber+' 商品名称:'+this.goodsDetail.name+' 发货总数:'+this.purchaseList.deliverGoodsNum+' 物流单数:'+this.goodsDetail.logisticsNum+ ' 导出时间:'+`${this.$dayjs(new Date()).format('YYYY-MM-DD HH-mm-ss')}`]
                            let filterVal = ['deliveryNumber','address','name','phone','deliverGoodsNum','transitNum','extractGoodsNum','notReplacementNum','cancelReplacementNum','waitReplacementNum','alreadyReplacementNum','platformDamageExamineNum','supplierDamageExamineNum','logisticsNum']
                            let list = res.data.data.list
                            this.$excel.exportData(tableHeader,filterVal, list, headerObj, title,['A1:L1'])
                        }
                    } else {
                        this.loadingWait.close()
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })                
            },

        },
        created() {

        },
        mounted() {
            this.goodsDetail=qs.parse(this.$route.query.detail)
            this.statistics()
            this.getData()

        },
        watch: {}
    }
</script>

<style scoped lang="scss">
    .zy-img{
        width:46px;
        height:20px;
    }
    .resCityBox {
        display: flex;
    }
    .load{
        color:#1890FF;
        border-bottom:1px solid #1890FF;
    }
    .goods-content{
        .name{
            color:#262626;
        }
        .zj{
            color:#8C8C8C;
            margin-top:10px;
        }
        .dw{
            color:#8C8C8C;
        }
    }
    .timer-box{
        .xq{
            color:#1890FF;
        }
    }
    .smallBox{
        display:flex;
	    flex-direction:row;
        .boxImg{
            width:98px;
            heigth:98px;
        }
        .rightBox{
            margin-left:6px;
            display:flex;
            flex-direction:column;
            justify-content:center;
            .rightTit{
                color:#000000;
            }
            .rightNum{
                color:#000000;
                margin-top:10px;
            }
        }
    }
    .blue{
        color:#1890FF;
    }
    .green{
        color:#36C626;
    }
    .purchaseBox{
        margin-top:20px;
        font-size:14px;
        margin-left:10px;
    }
    .topTitle{
        color:#000000;
        font-size:18px;
        margin-bottom:14px;
    }
    .goods{
        margin:20px 10px;
        display:flex;
	    flex-direction:row;
        .goodsImg{
            width:160px;
            height:160px;
            margin-right:20px;
            img{
                width:160px;
                height:160px;
                border-radius:4px;
            }
        }
        .goodsBox{
            .goodName{
                color:#000000;
                font-size:20px;
                margin:20px 0 50px 0;
            }
            .goodsInfo{
                display:flex;
	            flex-direction:row;
                .info{
                    padding:0 40px;
                    border-right:1px solid #E9E9E9;
                    .tit{
                        color:#333;
                        margin-bottom:10px;
                    }
                    &:first-child{
                        padding-left:0px;
                    }
                    &:last-child{
                        border-right:none;
                    }
                }
            }
        }

    }
    .dy{
        margin:20px 30px;
    }
    .purchaseDetail{
        .pages-box{
            position:relative;
        }        
    }
    .mb{
        margin-bottom:10px;
    }
    .totleT{
        color:#666;
        margin-bottom:10px;
        font-size:14px;
    }
    .totleN{
        color:#000000;
        font-size:16px;
        text-align:right;
    }
    .purchaseRadio{
        margin:20px 0;
    }
    .blue{
        color: #1890FF;
        margin:0 10px;
        img{
            width:20px;
            height:20px;
        }
    }
    .red{
        color:#F5222D;
        margin:0 10px;
    }
</style>

<style lang="scss">

</style>




