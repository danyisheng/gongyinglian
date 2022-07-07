<template>
    <div class="role-con containerBox">
        <div class="toolbar-box">
            <common-row>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">角色名称：</label>
                        <el-input v-model="searchBox.roleName" placeholder="请输入角色名称"></el-input>
                    </div>
                </common-col>
                <common-col :lot="8">
                    <div class="btn-box">
                        <el-button @click="search" size="medium" type="primary">查询</el-button>
                    </div>
                    <div class="btn-box">
                        <el-button @click="add" class="addBtn" size="medium"> 新增角色</el-button>
                    </div>
                    <div class="btn-box">
                        <el-button @click="delRole" size="medium" class="dellAllBtn">删除</el-button>
                    </div>
                </common-col>
            </common-row>
        </div>
        <div class="table-box">
            <el-table
                    highlight-current-row
                    :data="tableData"
                    :height="tableHeight"
                    @selection-change="handleSelectionChange"
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
                        prop="RoleName"
                        label="角色名称">
                </el-table-column>
                <el-table-column
                        prop="RoleType"
                        label="角色类型">
                </el-table-column>
                <el-table-column
                        prop="CreatorName"
                        label="创建人">
                </el-table-column>
                <el-table-column
                        prop="CreatorName"
                        label="创建人">
                </el-table-column>
                <el-table-column
                        prop="CreateTime"
                        label="时间">
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
                <el-table-column prop="address" label="操作">
                    <template slot-scope="scope">
                        <div class="table-btn-box">
                            <el-button @click="lookUpdat(scope.row)" size="medium" type="primary">查看配置</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages-box">
            <page-box :pages="pages" @handleCurrentChange="handleCurrentChange"
                      @handleSizeChange="handleSizeChange"></page-box>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: '',
        data() {
            return {
                tableData: [],
                pages: this.$pages(),
                searchBox: {
                    roleName: ''
                },
                filterCondition: {
                    RoleName: '',
                    Id: null,
                    CreateTime: '',
                    CreatorId: '',
                    CreatorName: '',
                    ModifyTime: '',
                    EditorId: '',
                    EditorName: '',
                    sValid: true,
                    actionsJson: ''
                },
                selectTableData: []
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
            add() {
                let row = {
                    showType: 'add'
                }
                this.$router.push({
                    name: 'roleInfo',
                    query: {data: qs.stringify(row)}
                })
            },
            lookUpdat(row) {
                row.showType = 'updat'
                this.$router.push({
                    name: 'roleInfo',
                    query: {data: qs.stringify(row)}
                })
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
            delRole() {
                if (this.selectTableData.length > 0) {
                    let list = this.selectTableData.map(item => item.Id)
                    let params = {
                        ids: list
                    }
                    this.$confirm('确定要删除, 是否继续?', '删除角色', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                        this.loadingWait = this.showLoading('请稍候...')
                        this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_Role.DeleteData', params).then(res => {
                            if (res.data.Success) {
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
            getData() {
                let params = {
                    PageIndex: this.pages.currentPage,
                    PageRows: this.pages.pageSize,
                    SortField: '',
                    SortType: '',
                    Total: '',
                    PageCount: '',
                    roleName: ''
                }
                this.loadingWait = this.showLoading('请稍候...')
                this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_Role.GetDataList', params).then(res => {
                    if (res.data.Success) {
                        this.loadingWait.close()
                        this.tableData = res.data.Data
                        this.pages.totalCount = res.data.Total
                        this.pages.totalPage = res.data.PageCount
                    } else {
                        this.loadingWait.close()
                        this.$message.error(res.data.Msg)
                    }
                })
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
    .role-con {

    }
</style>

<style lang="scss">

</style>




