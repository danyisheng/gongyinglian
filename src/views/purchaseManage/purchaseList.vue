<template>
    <div class="purchaseList containerBox">
        <div class="toolbar-box">
            <common-row>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">商品名称：</label>
                        <el-input v-model="searchBox.goodsName" placeholder="请输入商品名称"></el-input>
                    </div>
                </common-col>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">采购单号：</label>
                        <el-input v-model="searchBox.purchaseNumber" placeholder="请输入采购单号"></el-input>
                    </div>
                </common-col>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">采购类型：</label>
                        <el-select v-model="searchBox.purchaseType" clearable placeholder="请选择">
                            <el-option
                                v-for="item in purchType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </common-col>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">供应商省份：</label>
                        <province-box :citys="searchBox.supplyRegionCode" @provinceChangeList="changeCitys"></province-box>
                    </div>
                </common-col>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">供应商：</label>
                        <el-input v-model="searchBox.supplyName" placeholder="请输入姓名/手机号"></el-input>
                    </div>
                </common-col>

                <common-col :height="50" :lot="6">
                    <div class="btn-box displayflex time-class">
                        <label for="">创建时间：</label>
                        <el-date-picker
                            v-model="searchBox.timeValue"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy / MM / dd "
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </common-col>
            </common-row>
            <common-row>
                <common-col :lot="20">
                    <div class="btn-box">
                        <el-button  size="medium" type="primary" @click="search">查询</el-button>
                    </div>
                    <div class="btn-box">
                        <el-button  size="medium" type="primary" @click="dialogFormVisible = true">导入物流单号</el-button>
                    </div>
                    <div class="btn-box">
                        <el-button  size="medium" type="primary" plain @click="handList(1)" >批量确认发货</el-button>
                    </div>
                    <div class="btn-box">
                        <div class="load" @click="exportData">下载物流单模板</div>
                    </div>
                </common-col>
            </common-row>
        </div>
        <div class="tabs-box">
            <el-menu :default-active="searchBox.status" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="0">全部</el-menu-item>
                <el-menu-item index="1">待发货</el-menu-item>
                <el-menu-item index="2">已发货</el-menu-item>
                <el-menu-item index="3">已取消</el-menu-item>
            </el-menu>
            <el-table :height="tableHeight" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="goods" label="商品信息" width="400" >
                    <template slot-scope="scope">
                        <div class="goods-box">
                            <div class="image-box">
                                <img :src="scope.row.image" alt="">
                            </div>
                            <div class="goods-content">
                                <p class="name">{{scope.row.name}}</p>
                                <div v-for="(specs,n) in scope.row.goodsSpecs" :key="n">
                                    <p class="zj">{{n}}：{{specs}}</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="purchaseNumber" label="采购单号" width="160"></el-table-column>
                <el-table-column prop="deliverGoodsNum" label="发货总数"></el-table-column>
                <el-table-column prop="extractGoodsNum" label="已入库"></el-table-column>
                <el-table-column prop="deliverAddressNum" label="收货地点数" width="150"></el-table-column>
                <el-table-column prop="logisticsNum" label="物流单数"></el-table-column>
                <el-table-column prop="gys" label="供应商" width="160">
                    <template slot-scope="scope">
                        <div class="timer-box">
                            <div v-if="scope.row.purchaseSupplyType == 200">
                                <p v-if="scope.row.supplyRegion">({{scope.row.supplyRegion}})</p>
                                <p>{{scope.row.supplyName}}</p>
                                <p>{{scope.row.supplyPhone}}</p>
                            </div>
                            <div v-else>-</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="cgzt" label="采购状态" width="160">
                    <template slot-scope="scope">
                        <div class="timer-box">
                            <p>{{scope.row.status==1?'待发货':(scope.row.status==2?'已发货':'已取消')}}</p>
                            <a class="xq" @click="goodsDetail(scope.row)">详情</a>
                            <div class="table-btn-box" v-if="scope.row.status==1">
                                <el-button  size="medium" type="primary" @click="handList(2,scope.row.purchaseNumber)">确认发货</el-button>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="创建时间">
                    <template slot-scope="scope">
                        <div class="timer-box">
                            <p>{{scope.row.createtime}}</p>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages-box"><page-box :pages="pages" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></page-box></div>
        <el-dialog title="导入物流单号" :visible.sync="dialogFormVisible" width="400px">
            <div>
                <el-upload
                    ref="upload"
                    class="upload-demo"
                    drag
                    :action="uploadUrl"
                    :before-upload="beforeAvatarUpload"
                    :auto-upload="false"
                    accept=".xlsx,.xls"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleError"
                    :file-list="fileList">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        <span class="fontBig">点击或将文件拖拽到这里上传</span>
                    </div>
                    <div class="el-upload__text">
                        <span class="fontSmall">文件类型xlsx或xls</span>
                        <span class="fontSmall">文件大小：不超过10M</span>
                    </div>
                </el-upload>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="submitUpload">点击上传</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import pageBox from '../../common/components/pageBox'
    import uploadExcelComponent from '@/common/components/UploadExcel/index.vue'
    import provinceBox from '@/common/components/provinceBox'
    import qs from 'qs'
    export default {
        name: '',
        data() {
            return {
                uploadUrl:'/sd/purchase/upload/logisticsNumber/execl',
                activeName: 'first',
                options: [],
                searchBox: {
                    goodsName: '',
                    purchaseNumber: '',
                    status: '0',
                    timeValue:[],
                    supplyRegionCode:[],
                    supplyName:'',
                    purchaseType:''
                },
                purchType: [{label: '直采', value: 100}, {label: '省营', value: 200}],// 采购类型类型
                tableData: [],
                value1:'',
                pages: this.$pages(),
                multipleSelection:[],
                dialogFormVisible:false,
                fileList:[],
                code:'WJSC'
            }
        },
        props: [],
        computed: {
            tableHeight () {
                return this.$tableHeight(228);
            }
        },
        components: {pageBox,uploadExcelComponent,provinceBox},
        methods: {
            changeCitys(list){
                this.searchBox.supplyRegionCode = list.length > 0 ? list : []
            },
            handleSelect(tab, event){
                this.searchBox.status = tab
                this.getData()
            },
            search(){
                this.pages.currentPage=1
                this.getData()
            },
            goodsDetail (detail) {
                this.$router.push({name: 'purchaseDetail',query:{detail:qs.stringify(detail)}})
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
            //获取数据
            getData () {
                let params = {
                    supplierId: this.$user.supplyId(),
                    supplierType:this.$user.UserInfo().SupplierType,
                    goodsName: this.searchBox.goodsName,
                    purchaseNumber: this.searchBox.purchaseNumber,
                    status: this.searchBox.status=='0'?'':this.searchBox.status,
                    cTime: this.searchBox.timeValue?this.searchBox.timeValue[0]:'',
                    eTime: this.searchBox.timeValue?this.searchBox.timeValue[1]:'',
                    supplyRegionCode:this.searchBox.supplyRegionCode.length > 0 ? this.searchBox.supplyRegionCode[this.searchBox.supplyRegionCode.length - 1] : '',
                    supplyName:this.searchBox.supplyName,
                    purchaseType:this.searchBox.purchaseType,
                    pageNumber: this.pages.currentPage,
                    pageSize: this.pages.pageSize
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchQsPost('/sd/purchase/list', params).then(res => {
                    if (res.data.code === '200') {
                        if (res.data.data) {
                            this.loadingWait.close()
                            let tableDatas = res.data.data.list
                            for(let i in tableDatas){
                                if(tableDatas[i].goodsSpecs){
                                    tableDatas[i].goodsSpecs = JSON.parse(tableDatas[i].goodsSpecs)
                                }
                            }
                            this.tableData = tableDatas
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
            //获取批量
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //发货
            handList (num,purchaseNumber) {
                if(num == 1&&this.multipleSelection.length == 0){
                    this.$message({
                        type: 'info',
                        message: '请选择发货商品'
                    });
                    return
                }
                this.$confirm('这'+ (num == 1?this.multipleSelection.length:'1') +'个采购订单确定已发货？', '确定发货', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.sendOutGoods(num,purchaseNumber)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消发货'
                    });
                });
            },
            sendOutGoods(type,purchaseNumber){
                let params = {
                    purchaseNumbers:''
                }
                if(type == 2){
                    params.purchaseNumbers = purchaseNumber
                }else{
                    let idArr = ''
                    for(let i in this.multipleSelection){
                        if(i == 0){
                            idArr += this.multipleSelection[i].purchaseNumber
                        }else{
                            idArr += ','+this.multipleSelection[i].purchaseNumber
                        }
                    }
                    params.purchaseNumbers = idArr
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchQsPost('/sd/purchase/sendOutGoods', params).then(res => {
                    if (res.data.code === '200') {
                        this.loadingWait.close()
                        this.$message({
                            type: 'success',
                            message: '发货成功!'
                        });
                        this.getData ()
                    } else {
                        this.loadingWait.close()
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                })
            },
            //下载物流单模板
            exportData () {
                let tableHeader = ['发货单号','物流单号']
                let headerObj =  `采购单物流单${this.$dayjs(new Date()).format('YYYY-MM-DD')}`
                this.$excel.exportData(tableHeader,[],[], headerObj)
            },
            //导入物流单号
            beforeAvatarUpload(file) {
                const isLt = file.size / 1024 / 1024 < 10;
                if (!isLt) {
                    this.$message.error("上传头像图片大小不能超过 10MB!");
                }
                return isLt;
            },
            //自定义上传
            getUrl() {
                this.$https.fetchNetPost("/api.Erp.Base_Manage.Base_MediaModule.GetMediaModulesByArgs",{Code: this.code}).then(res => {
                    if (res.data.ErrorCode === 200) {
                        if (res.data.Data.length > 0) {
                            this.uploadUrl = res.data.Data[0].ServerHost +'/sd/purchase/upload/logisticsNumber/execl'
                            console.log(this.uploadUrl)
                        }
                    }
                })
            },
            handleAvatarSuccess(res){
                if(res.code == 200){
                    this.$message({
                        type: 'success',
                        message: '上传成功!'
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }

            },
            handleError(error){
                if(error.msg){
                    this.$message({
                        type: 'error',
                        message: error.msg
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: '请重新上传!'
                    });
                }
            },
            getBase64(file) {
                return new Promise(function(resolve, reject) {
                    let reader = new FileReader();
                    let imgResult = "";
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        imgResult = reader.result;
                    };
                    reader.onerror = function(error) {
                        reject(error);
                    };
                    reader.onloadend = function() {
                        resolve(imgResult);
                    };
                });
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
        },
        created() {
        },
        mounted() {
            this.getUrl()
            this.getData ()
        },
        watch: {}
    }
</script>

<style scoped lang="scss">
    .load{
        color:#1890FF;
        border-bottom:1px solid #1890FF;
    }
    .goods-content{
        .name{
            color:#262626;
            margin-bottom:10px;
        }
        .zj{
            color:#8C8C8C;
        }
    }
    .timer-box{
        .xq{
            color:#1890FF;
        }
    }
    .time-class {
        >>>.el-range-editor--medium.el-input__inner{
            height:30px;
        }
    }
    .el-upload__text{
        margin-bottom:10px;
    }
    .fontBig{
        color:#000;
        font-size:16px;
        margin-bottom:10px;
    }
    .fontSmall{
        color:#999;
        font-size:14px;
        margin-right:10px;
    }
</style>

<style lang="scss">

</style>




