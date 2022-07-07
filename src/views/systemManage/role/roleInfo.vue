<template>
    <div class="role-info containerBoxInfo" :loading="loadingWait">
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="140px">
                <div class="content-base">
                    <h3 class="label-title">基础信息</h3>
                    <div class="content-base-box">
                        <common-row>
                            <common-col :lot="8">
                                <el-form-item label="角色名称：">
                                    <el-input v-model="form.roleName" style="width: 80%"
                                              placeholder="请输入角色名称"></el-input>
                                </el-form-item>
                            </common-col>
                            <common-col :lot="8">
                                <el-form-item label="是否启用：" prop="IsValid">
                                    <el-switch v-model="form.IsValid"></el-switch>
                                </el-form-item>
                            </common-col>
                        </common-row>
                    </div>
                    <h3 class="label-title">配置信息</h3>
                    <div class="content-base-box menu-perssion-box" style="padding-left: 40px;">
                        <div class="menu-box">
                            <div class="justify-content-between">
                                <div class="justify-content-between">
                                    <h4 style="height: 28px;line-height: 28px;margin-right: 10px;">菜单信息</h4>
                                    <!--<el-button size="medium" @click="addMenu('0')" class="saveBtn">新增主菜单</el-button>-->
                                </div>

                                <el-input placeholder="输入菜单关键字进行过滤" v-model="filterText"></el-input>
                            </div>
                            <el-tree
                                    v-loading="treeLoading"
                                    :expand-on-click-node="false"
                                    @node-click="nodeClick"
                                    class="tree-role"
                                    :filter-node-method="filterNode"
                                    :data="treeData"
                                    show-checkbox
                                    default-expand-all
                                    node-key="Id"
                                    ref="tree"
                                    highlight-current
                                    :props="defaultProps">
                            </el-tree>
                        </div>
                        <div class="permisson-box">
                            <div class="justify-content-between">
                                <h4 style="height: 28px;line-height: 28px;margin-right: 10px;">权限按钮</h4>
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
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="action-box">
            <div class="btn-box">
                <el-button size="medium" @click="$router.go(-1)" icon="el-icon-arrow-left" type="primary">返回</el-button>
            </div>
            <div class="btn-box">
                <el-button size="medium" @click="saveRole('form')" class="saveBtn">保存</el-button>
            </div>
        </div>


    </div>
</template>

<script>
    import qs from 'qs'

    export default {
        name: '',
        data() {
            return {
                loadingWait: false,
                tableLoading: false,
                treeLoading: false,
                roleData: {},
                filterText: '',
                form: {
                    roleName: '',
                    IsValid: true,
                    actionsJson: [],
                    ModifyTime: '',
                },
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                btnTableData: [],
                selectBtnData: []
            }
        },
        props: [],
        computed: {
            height() {
                return window.innerHeight - 480
            }
        },
        components: {},
        methods: {
            handleSelectionChange(s) {
                this.selectBtnData = s
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            nodeClick(node) {
                if (node.Level === 2) {
                    this.getHavePermissonBtn(node.Id)
                }
            },
            addMenu(type) {
                this.afterAdd(type)
            },
            afterAdd (type) {
                this.dialogVisible = true
                this.$nextTick(() => {
                    this.filterCondition.Type = type
                    this.filterCondition.ParentId = null
                    this.filterCondition.Id = null
                })
            },
            getMenuData() {  //权限菜单
                let params = {
                    keyword: ''
                }
                this.treeLoading = true
                this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_Action.GetMenuTreeList', params).then(res => {
                    if (res.data.Success) {
                        this.treeLoading = false
                        if (res.data.Data.length > 0) {
                            this.$nextTick(() => {
                                this.treeData = res.data.Data
                                if (this.roleData.Actions) {
                                    this.$nextTick(() => {
                                        let list = Object.values(this.roleData.Actions)
                                        let listData = []
                                        let checkListData = []
                                        list.map(id => {
                                            if (this.$refs.tree.getNode(id)) {
                                                let parentId = this.$refs.tree.getNode(id).parent.data.Id
                                                if (parentId && parentId !== null) {
                                                    listData.push(parentId)
                                                }
                                            }
                                        })
                                        if (this.$distinct(listData).length > 0) {
                                            let haveList = this.$distinct(listData)
                                            list.map((item) => {
                                                if (haveList.indexOf(item) < 0) {
                                                    checkListData.push(item)
                                                }
                                            })
                                            this.$refs.tree.setCheckedKeys(checkListData)
                                        }
                                    })

                                }
                            })
                        }
                    } else {
                        this.treeLoading = false
                        this.$message.error(res.data.Msg)
                    }
                })
            },
            getHavePermissonBtn(id) { //权限按钮
                let params = {
                    parentId: id
                }
                this.tableLoading = true
                this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_Action.GetPermissionList', params).then(res => {
                    if (res.data.Success) {
                        this.tableLoading = false
                        this.$nextTick(() => {
                            if (res.data.Data.length > 0) {
                                this.btnTableData = res.data.Data
                                if (this.roleData.Actions) {
                                    this.$nextTick(() => {
                                        let list = Object.values(this.roleData.Actions)
                                        if (list.length > 0) {
                                            for (let i = this.btnTableData.length -1; i >=0; i--) {
                                                if (list.indexOf(this.btnTableData[i].Id) !== -1) {
                                                    console.log(this.btnTableData[i], '设置按钮参数')
                                                    this.$refs.multipleTable.toggleRowSelection(this.btnTableData[i])
                                                }
                                            }
                                        }
                                    })
                                }
                            } else {
                                this.btnTableData = []
                            }
                        })
                    } else {
                        this.tableLoading = false
                        this.$message.error(res.data.Msg)
                    }
                })
            },
            saveRole (name) { // 保存权限
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let listMenu = this.$refs.tree.getCheckedKeys() ? this.$refs.tree.getCheckedKeys() : []
                        let listHalfMenus = this.$refs.tree.getHalfCheckedKeys() ? this.$refs.tree.getHalfCheckedKeys() : []
                        let listBtn = this.$refs.multipleTable.selection
                        let btns = listBtn.length > 0 ? listBtn.map(item => item.Id) : []
                        let params = {
                            RoleName: this.form.roleName,
                            IsValid: this.form.IsValid,
                            actionsJson:  listMenu.concat(listHalfMenus).concat(btns)
                        }
                        if (this.roleData.showType === 'updat') {
                            params.Id = this.roleData.Id
                        }
                        console.log(params, 'params')
                        this.loadingWait = true
                        this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_Role.SaveData', params).then(res => {
                            if (res.data.Success) {
                                this.loadingWait = false
                                this.$router.go(-1)
                                this.$message.success('操作成功')
                            } else {
                                this.loadingWait = false
                                this.$message.error(res.data.Msg)
                            }
                        })
                    } else {
                        this.$message.error('表单信息未填写完整！')
                    }
                })
            },
        },
        created() {
        },
        mounted() {
            this.getMenuData()
            this.roleData = qs.parse(this.$route.query.data)
            switch (this.roleData.showType) {
                case 'add':
                    break
                case 'updat':
                    this.$nextTick(() => {
                        this.form.roleName = this.roleData.RoleName
                        if (this.roleData.IsValid === 'true') {
                            this.form.IsValid = true
                        } else {
                            this.form.IsValid = false
                        }

                    })
                    break
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">
    .role-info {
        /*padding-bottom: 54px;*/
        box-sizing: border-box;
        .menu-perssion-box {
            padding: 0px 30px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            .menu-box {
                width: 45%;
                .tree-role {
                    height: calc(100vh - 480px);
                    overflow-y: scroll;
                    margin-top: 10px;
                }
            }
            .permisson-box {
                width: 50%;
                height: calc(100vh - 500px);
            }
        }
    }
</style>




