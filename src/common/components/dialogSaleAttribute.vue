<template>
    <el-dialog
            width="1020px"
            class="dialog-box"
            :visible.sync="dialogVisible">
        <div style="text-align: center" slot="title">
            {{showTitle}}
        </div>
        <div class="form-modal-box sale-attribute">
            <common-row>
                <common-col :lot="6" :height="50">
                    <label for="">属性名称:</label>
                    <el-input v-model="searchBox.SaleAttrName" placeholder="请输入属性名称"></el-input>
                </common-col>
                <common-col  :lot="6">
                    <label for="">录入方式：</label>
                    <el-select v-model="searchBox.Mode" placeholder="请选择" clearable>
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in enterList" :key="index"></el-option>
                    </el-select>
                </common-col>
                <common-col  :lot="6">
                    <el-button  size="medium" type="primary" @click="searchBtn">查询</el-button>
                </common-col>
                <common-col :lot="8"  style="display: flex; justify-content: flex-start;margin-bottom: 10px;">
                    <label for="">已选择：</label>
                    <div class="tags-box">
                        <el-tag
                                v-for="(tag, index) in tagList"
                                :key="index"
                                @close="tagList.splice(index, 1)"
                                closable>
                            {{tag.label}}
                        </el-tag>
                    </div>
                </common-col>
            </common-row>
            <div class="dialog-attibute-box">
                <el-table
                        border
                        :data="tableData"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            label="属性名"
                            prop="SaleAttrName">
                    </el-table-column>
                    <el-table-column
                            label="值录入方式"
                            prop="RecordValueModeDesc"
                            >
                    </el-table-column>
                </el-table>
                <div class="dialog-page-box">
                    <page-box :pages="pages" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></page-box>
                </div>

            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeChecks">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: '',
        props: {
            showTitle: {
                type: String,
                default: '弹框'
            },
            categoryId:{
                type:String,
                default:''
            },
        },
        data() {
            return {
                selectTableData: [],
                tagList: [],
                enterList: [
                    {label: '全部', value: -1},
                    {label: '多选', value: 3},
                    {label: '多选可添加', value: 1},
                    {label: '单选', value: 4},
                    {label: '单选可添加', value: 2},

                ],
                searchBox: {
                    Mode: -1,
                    SaleAttrName: ''
                },
                dialogVisible: false,
                tableData:[],
                pages: this.$pages(),
            }
        },
        computed: {},
        components: {},
        methods: {
            handleSelectionChange (s) {
                this.selectTableData = s
                this.tagList = this.selectTableData.map(item => {
                    return {
                        label: item.SaleAttrName,
                        value: item.SaleAttrId
                    }
                })
            },
            changeChecks () {
                if(this.selectTableData.length > 2){
                    this.$message({
                        type: 'info',
                        message: '绑定销售属性最多2个'
                    }); 
                    return;
                }
                if (this.selectTableData.length > 0) {
                    this.dialogVisible = false
                    this.$nextTick(()=> {
                        this.$emit('change', this.selectTableData)
                    })

                } else {
                    this.$message.error('请勾选操作数据！')
                }
            },
            //分页
            handleCurrentChange(size){
                this.pages.currentPage=size
                this.getTableData()
            },
            handleSizeChange(size){
                this.pages.pageSize=size
                this.getTableData()
            },
            searchBtn(){
                this.pages.currentPage = 1
                this.getTableData ()
            },
            //发货单列表
            getTableData (id) {
                let params = {
                    pagination: {
                        PageIndex: this.pages.currentPage,
                        PageRows: this.pages.pageSize,
                        SortField: "CreateTime",
                        SortType: "desc",
                        Total: 1000
                    },
                    SaleAttrId: "",
                    SaleAttrName: this.searchBox.SaleAttrName,
                    Mode: this.searchBox.Mode,
                    CategoryId: id,                
                }
                this.$https.fetchNetPost('/api.Erp.SaleAttr.GetSaleAttrDataList', params).then(res => {
                    if (res.data.ErrorCode == 200) {                       
                        if (res.data.Data) {                            
                            this.tableData = res.data.Data
                            this.pages.totalPage = res.data.PageCount
                            this.pages.totalCount = res.data.Total
                        } else {
                            this.tableData = []
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.Msg
                        });
                    }
                })
            },
        },
        created() {
        },
        mounted() {      
        },
        watch: {}
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">
    .sale-attribute {
        .tags-box {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            .el-tag {
                margin-right: 10px;
                margin-bottom: 10px;
            }
        }
    }
</style>




