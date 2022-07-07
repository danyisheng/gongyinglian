<template>
    <div class="menu-content-box  containerBox" v-loading="containerLoading">
        <div class="toolbar-box">
            <common-row>
                <common-col :height="50">
                    <div class="btn-box displayflex ">
                        <label for="">菜单名称：</label>
                        <el-input v-model="searchBox.keyword" placeholder="请输入菜单名称"></el-input>
                    </div>
                </common-col>
                <common-col :lot="8">
                    <common-col :height="50">
                        <div class="btn-box">
                            <el-button @click="search" size="medium" type="primary">查询</el-button>
                        </div>
                        <div class="btn-box">
                            <el-button size="medium" @click="addMenu('0')" class="saveBtn">新增主菜单</el-button>
                        </div>
                    </common-col>
                </common-col>
            </common-row>
        </div>
        <div class="menu-perssion-content-box justify-content-between">
            <div class="menu-box">
                <div class="justify-content-between" style="padding: 0px 30px">
                    <div style="display: flex;justify-content: flex-start">
                        <h4 style="height: 28px;line-height: 28px;margin-right: 10px;">菜单信息</h4>
                    </div>
                    <el-button @click="delMenus" size="medium" class="saveBtn">删除菜单</el-button>
                </div>
                <div class="tree-box" v-loading="treeLoading">
                    <el-tree
                            :expand-on-click-node="false"
                            @node-click="nodeClick"
                            class="tree-menu"
                            :filter-node-method="filterNode"
                            :data="treeTableData"
                            show-checkbox
                            default-expand-all
                            node-key="Id"
                            ref="tree"
                            highlight-current
                            :props="defaultProps">
                         <span class="custom-tree-node-box" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                            <span>
                                 <el-switch v-if="node.level === 2" v-model="node.data.IsEnble"
                                            @change="switchChange(node, data)"></el-switch>
                                <el-button type="text" size="small" @click="() => append(node, data)"
                                           icon="el-icon-plus"></el-button>
                                <el-button type="text" size="small" @click="() => edit(node, data)"
                                           icon="el-icon-edit"></el-button>
                                <el-button type="text" size="small" @click="() => remove(node, data)"
                                           icon="el-icon-delete"></el-button>
                            </span>

                         </span>

                    </el-tree>
                </div>
            </div>
            <div class="permisson-box">
                <div class="justify-content-between" style="padding: 0px 30px">
                    <h4 style="height: 28px;line-height: 28px;margin-right: 10px;">权限按钮</h4>
                    <el-button size="medium" @click="delBtns" class="saveBtn">按钮删除</el-button>
                </div>
                <div class="table-box" v-loading="tableLoading">
                    <el-table
                            ref="multipleTable"
                            :data="btnTableData"
                            :height="height"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="Name"
                                label="权限名称">
                        </el-table-column>
                        <el-table-column
                                prop="Value"
                                label="权限编码"
                                show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                                label="分配菜单状态"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-switch @change="changeBtn" v-model="scope.row.IsNeedAction"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <div class="table-action">
                                    <el-button size="medium" @click="edit(scope.row)" class="saveBtn">编辑</el-button>
                                    <el-button size="medium" @click="delBtn(scope.row)" class="saveBtn">删除</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <el-dialog
                width="720"
                class="dialog-box"
                :visible.sync="dialogVisible">
            <div style="text-align: center" slot="title">
                {{showTitle}}
            </div>
            <div class="form-modal-box">
                <el-form ref="form" :model="filterCondition" :rules="rules" label-width="120px">
                    <common-row>
                        <common-col :lot="8">
                            <el-form-item label="菜单名称；" prop="Name">
                                <el-input v-model="filterCondition.Name" placeholder="请输入名称" clearable></el-input>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="8">
                            <el-form-item label="菜单类型：" prop="Type">
                                <el-select v-model="filterCondition.Type" disabled placeholder="请选择" clearable>
                                    <el-option label="主菜单" value="0"></el-option>
                                    <el-option label="功能菜单" value="1"></el-option>
                                    <el-option label="权限按扭" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="8" v-if="filterCondition.Type !== '2'">
                            <el-form-item label="菜单路径" prop="Url">
                                <el-input v-model="filterCondition.Url" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="8" v-if="filterCondition.Type === '2'">
                            <el-form-item label="权限编码:" prop="Value">
                                <el-input v-model="filterCondition.Value" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="8" v-if="filterCondition.Type !== '2'">
                            <el-form-item label="菜单编码:" prop="Value">
                                <el-input v-model="filterCondition.Value" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="8">
                            <el-form-item label="图标:">
                                <el-input v-model="filterCondition.Icon" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="8">
                            <el-form-item label="排序:">
                                <el-input type="number" v-model="filterCondition.Sequence" placeholder="请输入" clearable></el-input>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="8">
                            <el-form-item label="显示侧边栏菜单:">
                                <el-switch v-model="filterCondition.IsEnble"></el-switch>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="8">
                            <el-form-item label="分配菜单权限:">
                                <el-switch v-model="filterCondition.IsNeedAction"></el-switch>
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
                rowId: null,
                disabledd: false,
                selectTableData: [],
                selectTreeData: [],
                containerLoading: false,
                treeLoading: false,
                tableLoading: false,
                rules: {
                    Name: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'}
                    ],
                    Type: [
                        {required: true, message: '请至少选择一个类型', trigger: 'change'}
                    ],
                    Url: [
                        {required: true, message: '请输入功能菜单路径', trigger: 'blur'},
                    ],
                    Value: [
                        {required: true, message: '请输入功能菜单编码', trigger: 'blur'},
                    ]
                },
                filterCondition: {
                    Id: '',
                    ParentId: '',
                    Name: '',
                    Type: '0',
                    Url: '',
                    Value: '',
                    IsNeedAction: false,
                    Icon: '',
                    Sequence: 1,
                    IsValid: true,
                    IsEnble: true,
                    permissionListJson: []
                },
                dialogVisible: false,
                showTitle: '新增菜单',
                treeTableData: [],
                filterText: '',
                form: {
                    roleName: '',
                    IsValid: true,
                    actionsJson: '',
                    ModifyTime: '',
                },
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                btnTableData: [],
                searchBox: {
                    keyword: ''
                }
            }
        },
        props: [],
        computed: {
            height() {
                return window.innerHeight - 300
            }
        },
        components: {},
        methods: {
            backendMenusToRouters(menus) {
                let routers = []
                menus.map(menu => {
                    // 将后端数据转换成路由数据
                    let route = this.backendMenuToRoute(menu) // 传p 代表父级
                    // 如果后端数据有下级，则递归处理下级
                    if (menu.children && menu.children.length !== 0) {
                        route.children = this.backendMenusToRouters(menu.children)
                    }
                    routers.push(route)
                })
                return routers
            },
            backendMenuToRoute(menu) {
                let route = Object.assign({}, menu)
                route.label = menu.title
                return route
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            search() {

            },
            handleSelectionChange(s) {
                this.selectTableData = s
            },
            addMenu(type) {
                this.clearForm()
                this.showTitle = '新增主菜单'
                this.filterCondition.Type = '0'
                this.afterAdd(type)
            },
            append(row) {
                this.clearForm()
                this.dialogVisible = true
                if (row.level === 1) {
                    this.$nextTick(() => {
                        this.filterCondition.Type = '1'
                        this.filterCondition.ParentId = row.data.Id
                        this.showTitle = '新增功能菜单'
                    })
                } else if (row.level === 2) {
                    this.$nextTick(() => {
                        this.filterCondition.Type = '2'
                        this.filterCondition.ParentId = row.data.Id
                        this.showTitle = '新增按钮'
                    })
                }
            },
            edit(row) {
                console.log(row, 'row对象')
                this.dialogVisible = true
                this.$nextTick(() => {
                    if (row.level === 1 || row.level === 2) {
                        this.rowId = row.data.Id
                        this.filterCondition.Id = row.data.Id
                        this.filterCondition.Type = row.data.Type
                        this.filterCondition.Url = row.data.Url
                        this.filterCondition.Name = row.data.title
                        this.filterCondition.Icon = row.data.icon
                        this.filterCondition.Value = row.data.Value
                        this.filterCondition.IsNeedAction = row.data.IsNeedAction
                        this.filterCondition.IsEnble = row.data.IsEnble
                        this.filterCondition.Sequence = row.data.Sequence
                        if (row.level === 1) {
                            this.showTitle = '编辑主菜单'
                            this.filterCondition.Type = '0'
                        } else if (row.level === 2) {
                            this.filterCondition.Type = '1'
                            this.filterCondition.ParentId = row.data.ParentId
                            this.showTitle = '编辑功能菜单'
                        }
                    } else {
                        this.rowId = row.Id
                        this.filterCondition.Id = row.Id
                        this.filterCondition.Type = row.Type
                        this.filterCondition.Url = row.Url
                        this.filterCondition.Name = row.Name
                        this.filterCondition.Icon = row.icon
                        this.filterCondition.Value = row.Value
                        this.filterCondition.IsNeedAction = row.IsNeedAction
                        this.filterCondition.IsEnble = row.IsEnble
                        this.filterCondition.Sequence = row.Sequence
                        this.filterCondition.ParentId = row.ParentId
                        this.filterCondition.Type = '2'
                        this.showTitle = '编辑按钮菜单'
                    }
                })
            },
            remove(row) {
                this.rowId = row.data.Id
                let list = [row.data.Id]
                this.afterDels(list)
            },
            delMenus() {
                let list = this.$refs.tree.getCheckedKeys()
                if (list.length > 0) {
                    this.afterDels(list)
                } else {
                    this.$message.error('请勾选操作数据！')
                }
            },
            delBtn(row) {
                let list = [row.Id]
                this.afterDels(list)
            },
            delBtns() {
                if (this.selectTableData.length > 0) {
                    let ids = this.selectTableData.map(item => item.Id)
                    this.afterDels(ids)
                } else {
                    this.$message.error('请勾选操作数据删除')
                }
            },
            afterDels(ids) {
                let params = {ids}
                this.$confirm('确定要删除吗！', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    this.loadingWait = this.showLoading('请稍候...')
                    this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_Action.DeleteData', params).then(res => {
                        if (res.data.Success) {
                            this.loadingWait.close()
                            this.getMenuData()
                            this.getPermissonBtn(this.rowId)
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
            },
            changeBtn () {},
            switchChange(node, data) {
                let title = node.data.IsEnble === true ? '打开' : '关闭'
                this.$confirm('确定要' + title + '侧边栏菜单显示吗？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    let params = {
                        ids: [node.data.Id],
                        isEnble: node.data.IsEnble
                    }
                    this.loadingWait = this.showLoading('请稍候...')
                    this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_Action.ModifyEnble', params).then(res => {
                        if (res.data.Success) {
                            this.loadingWait.close()
                            this.getMenuData()
                            this.getPermissonBtn(this.rowId)
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                        } else {
                            this.loadingWait.close()
                            this.$message.error(res.data.Msg)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            afterAdd(type) {
                this.dialogVisible = true
                this.$nextTick(() => {
                    this.filterCondition.Type = type
                })
            },
            saveModal(name) {
                let data = {
                    "ParentId": this.filterCondition.ParentId,
                    "Type": this.filterCondition.Type,
                    "Name": this.filterCondition.Name,
                    "Url": this.filterCondition.Url,
                    "Icon": this.filterCondition.Icon,
                    "Id": this.filterCondition.Id,
                    "CreateTime": this.$getDate.getYYYYMMDD(new Date()),
                    "CreatorId": this.$user.UserInfo().CreatorId,
                    "CreatorName": this.$user.UserInfo().CreatorName,
                    "ModifyTime": this.$getDate.getYYYYMMDD(new Date()),
                    "EditorId": this.$user.UserInfo().EditorId,
                    "EditorName": this.$user.UserInfo().EditorName,
                    "IsEnble": this.filterCondition.IsEnble,
                    "IsNeedAction": this.filterCondition.IsNeedAction,
                    "Sequence": Number(this.filterCondition.Sequence),
                    "IsValid": true,
                    permissionListJson: this.filterCondition.permissionListJson

                }
                data.Value = this.filterCondition.Value
                let wait = this.showLoading('请稍候...')
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_Action.SaveData', data).then(res => {
                            if (res.data.ErrorCode === 200) {
                                this.dialogVisible = false
                                this.getMenuData()
                                if (this.rowId) {
                                    this.getPermissonBtn(this.rowId)
                                }
                                this.$message.success('操作成功！')
                                wait.close()
                            } else {
                                wait.close()
                                this.$message.error(res.data.Msg)
                            }
                        })
                    } else {
                        this.$message.error('表单信息未填写完整！')
                        return false;
                    }
                });
            },
            getMenuData() {
                let params = {
                    keyword: ''
                }
                this.containerLoading = true
                this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_Action.GetMenuTreeList', params).then(res => {
                    if (res.data.Success) {
                        this.containerLoading = false
                        if (res.data.Data.length > 0) {
                            this.treeTableData = res.data.Data
                        }
                    } else {
                        this.containerLoading = false
                        this.$message.error(res.data.Msg)
                    }
                })
            },
            nodeClick(row) {
                console.log(row)
                if (row.Level === 2) {
                    this.rowId = row.Id
                    this.getPermissonBtn(row.Id)
                }
            },
            getPermissonBtn(id) {
                this.tableLoading = true
                this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_Action.GetAllActionList').then(res => {
                    if (res.data.Success) {
                        this.tableLoading = false
                        if (res.data.Data.length > 0) {
                            this.btnTableData = res.data.Data.filter(item => item.ParentId === id)
                        }
                    } else {
                        this.tableLoading = false
                        this.$message.error(res.data.Msg)
                    }
                })
            },
            clearForm() {
                this.filterCondition = {
                    Id: '',
                    ParentId: '',
                    Name: '',
                    Type: '0',
                    Url: '',
                    Value: '',
                    IsNeedAction: false,
                    Icon: '',
                    Sequence: 1,
                    IsValid: true,
                    IsEnble: true,
                    permissionListJson: []
                }
            }
        },
        created() {
        },
        mounted() {
            this.getMenuData()
        },
        watch: {}
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">
    .menu-content-box {
        .menu-perssion-content-box {
            .menu-box {
                width: 50%;
                .tree-menu {
                    padding: 20px;
                    box-sizing: border-box;
                    height: calc(100vh - 280px);
                    overflow-y: scroll;
                    .custom-tree-node-box {
                        width: 100%;
                        line-height: 24px;
                        display: flex;
                        justify-content: space-between;
                        .el-button--text {
                            font-size: 16px;
                        }
                    }
                }

            }
            .permisson-box {
                width: 45%;
                .table-box {
                    padding: 20px;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>




