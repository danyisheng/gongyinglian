<template>
    <div class="media-module-con containerBox">
        <div class="toolbar-box">
            <common-row>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">关键字：</label>
                        <el-input v-model="searchBox.keyword" placeholder="请输入关键字" clearable></el-input>
                    </div>
                </common-col>
            </common-row>
            <common-row>
                <common-col :height="50" :lot="8">
                    <div class="btn-box">
                        <el-button @click="search" size="medium" type="primary">查询</el-button>
                    </div>
                    <div class="btn-box">
                        <el-button size="medium" @click="addMedia" class="addBtn">新增模块</el-button>
                    </div>
                    <div class="btn-box">
                        <el-button size="medium" @click="delMedia" class="dellAllBtn">批量删除</el-button>
                    </div>
                </common-col>
            </common-row>
        </div>
        <div class="table-box">
            <el-table
                    :height="tableHeight"
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="Code"
                        width="180"
                        label="模块编码">
                </el-table-column>
                <el-table-column
                        width="130"
                        prop="Name"
                        label="模块名称">
                </el-table-column>
                <el-table-column
                        width="300"
                        prop="ServerHost"
                        label="模块请求地址">
                </el-table-column>
                <el-table-column
                        width="130"
                        prop="Sequence"
                        label="排序">
                </el-table-column>
                <el-table-column
                        width="130"
                        prop="CreatorName"
                        label="创建人">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        width="100"
                        prop="CreateTime"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        prop="IsValid"
                        label="是否启用">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.IsValid"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        width="130"
                        label="操作">
                    <template slot-scope="scope">
                        <div class="btn-box">
                            <el-button @click="edit(scope.row)" size="medium" type="primary">编辑</el-button>
                        </div>
                    </template>
                </el-table-column>
                <
            </el-table>
        </div>
        <div class="pages-box">
            <page-box :pages="pages" @handleCurrentChange="handleCurrentChange"
                      @handleSizeChange="handleSizeChange"></page-box>
        </div>

        <el-dialog
                width="520"
                class="dialog-box"
                :visible.sync="dialogVisible">
            <div style="text-align: center" slot="title">
                {{showTitle}}
            </div>
            <div class="form-modal-box">
                <el-form ref="form" :model="filterCondition" :rules="rules" label-width="120px">
                    <common-row>
                        <common-col :lot="7">
                            <el-form-item label="模块编码；" prop="Code">
                                <el-input   v-model="filterCondition.Code" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="7">
                            <el-form-item label="模块名称；" prop="Name">
                                <el-input   v-model="filterCondition.Name" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="7">
                            <el-form-item label="访问链接；" prop="ServerHost">
                                <el-input v-model="filterCondition.ServerHost" placeholder="请输入"
                                           clearable></el-input>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="4">
                            <el-form-item label="是否启用：" prop="IsValid">
                                <el-switch
                                        v-model="filterCondition.IsValid">
                                </el-switch>
                            </el-form-item>
                        </common-col>
                    </common-row>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveModal('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                sexList: [{label: '男', value: 1},{label: '女', value: 0}],
                changeType: '',
                filterCondition: {
                    Code: '',
                    Name: '',
                    ServerHost: 'http://39.108.177.155:6002/',
                    IsValid: false
                },
                selectTableData: [],
                rules: {
                    Code: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                    ServerHost: [
                        {required: true, message: '请输入', trigger: 'blur'}
                    ],
                    Name: [
                        {required: true, message: '请输入', trigger: 'blur'},
                    ]
                },
                Supplieroptions: [
                    {value: 0, label: '非供应商'},
                    {value: 100, label: '普通供应商'},
                    {value: 200, label: '闪店供应商'},
                    {value: 300, label: '直营供应商'},
                ],
                dialogVisible: false,
                tableData: [],
                pages: this.$pages(),
                searchBox: {
                    roleName: '',
                    keyword: ''
                },
                roleData: [],
                options: [],
                showTitle: '',
            }
        },
        props: [],
        computed: {
            tableHeight () {
                return  this.$tableHeight(150)
            }
        },
        components: {},
        methods: {
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
            getData() {
                let params = {
                    PageIndex: this.pages.currentPage,
                    PageRows: this.pages.pageSize,
                    SortField: 'CreateTime',
                    SortType: 'desc',
                    keyword: this.searchBox.keyword,
                    condition: ''
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_MediaModule.GetDataList', params).then(res => {
                    if (res.data.ErrorCode === 200) {
                        this.loadingWait.close()
                        this.tableData = res.data.Data
                        this.pages.totalCount = res.data.Total
                        this.pages.totalPage = res.data.PageCount
                    } else {
                        this.loadingWait.close()
                        this.$message.error(res.data.msg)
                    }
                })
            },
            addMedia() {
                this.clearMedia()
                this.changeType = 'insert'
                this.showTitle = '新增信息'
                this.dialogVisible = true
            },
            edit (row) {
                this.dialogVisible = true
                this.changeType = 'updat'
                this.showTitle = '修改信息  '
                this.$nextTick(() => {
                    this.filterCondition = row

                })
            },
            delMedia() {
                if (this.selectTableData.length > 0) {
                    let list = this.selectTableData.map(item => item.Id)
                    let params = {
                        ids: list
                    }
                    this.$confirm('确定要删除, 是否继续?', '删除账号', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                        this.loadingWait = this.showLoading('请稍候...')
                        this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_MediaModule.DeleteData', params).then(res => {
                            if (res.data.ErrorCode === 200) {
                                this.loadingWait.close()
                                this.getData()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.loadingWait.close()
                                this.$message.error(res.data.Msg)
                            }
                        })

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.$message.error('请勾选操作数据')
                }

            },
            saveModal(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let params = {
                            Code: this.filterCondition.Code,
                            Name: this.filterCondition.Name,
                            ServerHost: this.filterCondition.ServerHost,
                            IsValid: this.filterCondition.IsValid,
                        }
                        if (this.changeType === 'updat') {
                            params.Id = this.filterCondition.Id
                        }
                        this.loadingWait = this.showLoading('请稍候...')
                        this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_MediaModule.SaveData', params).then(res => {
                            if (res.data.ErrorCode === 200) {
                                this.dialogVisible = false
                                this.getData()
                                this.loadingWait.close()
                                this.$message.success('操作成功')
                            } else {
                                this.$message.error(res.data.Msg)
                            }
                        })
                    } else {
                        this.$message.error('表单信息未填写完整！')
                    }
                })
            },
            clearMedia() {
                this.filterCondition = {
                    Code: '',
                    Name: '',
                    ServerHost: 'http://39.108.177.155:6002/',
                    IsValid: false
                }
            }
        },
        created() {
        },
        mounted() {
            this.getData()
        },
        watch: {}
    }
</script>

<style scoped lang="scss">
    .media-module-con {

    }
</style>

<style lang="scss">

</style>




