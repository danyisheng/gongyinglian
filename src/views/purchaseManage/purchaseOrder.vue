<template>
    <div class="purchaseOrder containerBox">
        <div class="purchaseTit">
            采购单
            <!-- <div class="dy">
                <el-button @click="clickPrint()">打印采购单</el-button>
            </div> -->
        </div>      
        <div class="goods">
            <div class="goodsImg">
                <img :src="goodsDetail.image">
            </div>
            <div class="goodsBox">
                <div class="goodName">{{goodsDetail.name}}</div>
                <div class="goodsInfo">
                    <div class="info" v-for="(specs,n) in goodsDetail.goodsSpecs" :key="n">
                        <div class="tit">{{n}}</div>
                        <div>{{specs}}</div>
                    </div>
                    <div class="info">
                        <div class="tit">采购单号</div>
                        <div class="green">{{goodsDetail.purchaseNumber}}</div>
                    </div>
                    <div class="info">
                        <div class="tit">采购日期</div>
                        <div class="green">{{goodsDetail.createtime}}</div>
                    </div>
                    <div class="info">
                        <div class="tit">采购总数</div>
                        <div class="green">{{goodsDetail.deliverGoodsNum}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs-box">
            <el-table height="450" :data="tableData" style="width: 100%" ref="aaa">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="deliveryNumber" label="发货单号"></el-table-column>
                <el-table-column prop="deliverGoodsNum" label="发货总数" ></el-table-column>   
                <el-table-column prop="address" label="收货地点" width="400"></el-table-column>        
            </el-table>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: '',
        data() {
            return {
                purchaseNumber:'',
                goodsDetail:'',
                pages: this.$pages(),
                tableData:[]
            }
        },
        props: [],
        computed: {
            tableHeight () {
                return  this.$tableHeight(150)
            }
        },
        methods: {
            getData () {
                let params = {
                    purchaseNumber:this.goodsDetail.purchaseNumber,
                    pageNumber: this.pages.currentPage,
                    pageSize: this.pages.pageSize
                }
                this.$https.fetchQsPost('/sd/purchase/list/deliveryNumber', params).then(res => {
                    if (res.data.code === '200') {
                        if (res.data.data) {
                            this.pages.pageSize = res.data.data.totalCount
                            this.getDataA (res.data.data.totalCount)
                        } else {
                            this.tableData = []
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
            },
            //发货单列表
            getDataA (total) {
                let params = {
                    purchaseNumber:this.goodsDetail.purchaseNumber,
                    pageNumber: this.pages.currentPage,
                    pageSize: total + 5
                }
                this.$https.fetchQsPost('/sd/purchase/list/deliveryNumber', params).then(res => {
                    if (res.data.code === '200') {
                        if (res.data.data) {
                            this.tableData = []
                            res.data.data.list.map((item, index) => {
                                this.tableData.push({
                                    orderBoxPrint: 'orderBoxPrint' + index,
                                    deliveryNumber:item.deliveryNumber,
                                    deliverGoodsNum:item.deliverGoodsNum,
                                    address:item.address
                                })
                            })
                            console.log(this.tableData)
                        } else {
                            this.tableData = []
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
            },
            clickPrint () {
                let _this  = this
                let LODOP = this.$lodop()
                if (!LODOP) return false
                this.printStyle = {
                    width: '775px'
                }
                setTimeout(() => {
                    LODOP.PRINT_INIT('')
                    LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4')
                    LODOP.SET_PRINT_MODE('PRINT_PAGE_PERCENT', 'Full-Width')
                    LODOP.SET_SHOW_MODE('NP_NO_RESULT', true)
                    this.tableData.map((item, index) => {
                        this.printModle(LODOP, item.orderBoxPrint, index)
                    })
                    LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 0, 0, '')
                    LODOP.PREVIEW()
                    window.location.reload(true)
                }, 500)
                _this.printStyle = {
                    width: '100%'
                }
            },
            printModle (LODOP, ref, index) {
                LODOP.NewPage()
                LODOP.ADD_PRINT_HTM(50, 0, '100%', 'BottomMargin:5mm', this.$refs.aaa.innerHTML)
            },
        },       
        created() {
            this.goodsDetail=qs.parse(this.$route.query.detail)  
            this.getData ()
        },
        mounted() {
        },
        watch: {}
    }
</script>

<style scoped lang="scss">
    .purchaseOrder{
        padding:30px 60px;
    }
    .purchaseTit{
        text-align:center;
        color:#000000;
        font-weight:700;
        font-size:22px;
        margin-bottom:40px;
        position:relative;
        .dy{
            position:absolute;
            right:0;
            top:0;
        }
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
                        color:#666;
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
</style>

<style lang="scss">

</style>




