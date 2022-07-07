<template>
    <el-dialog
            width="720px"
            class="dialog-box"
            :visible.sync="dialogVisible">
        <div style="text-align: center" slot="title">
            {{showTitle}}
        </div>
        <div class="form-modal-box dialog-box-content">
            <common-row>
                <common-col :lot="6">
                    <label for="">{{Name}}</label>
                    <span>{{guige}}</span>
                </common-col>
                <common-col :lot="6">
                    <label for="">重量（不含箱）：</label>
                    <span>{{weigth}}</span>
                </common-col>
                <common-col :lot="6" class="add-set-btn">
                    <el-button size="medium" @click="addAllPrice" type="primary">批量填充</el-button>
                </common-col>
            </common-row>
            <div class="dialog-price-box">
                <el-table
                        border
                        :data="cityList"
                        style="width: 100%">
                    <el-table-column
                            label="省份"
                            align="center"
                            prop="label">
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    @focus="clickFocus('DtPrice')"
                                    type="number"
                                    v-model="searchBox.DtPrice"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="批量填充赠品抵扣价格"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input
                                    style="width: 100%"
                                    type="number"
                                    v-model="scope.row.DtPrice"
                                    size="mini"
                                    placeholder="请输入赠品抵扣价格（元）"/>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: '',
        props: {
            Name: {
                type: String,
                default: ''
            },
            guige: {
                type: String,
                default: ''
            },
            weigth: {
                type: String,
                default: ''
            },
            dialogBoxs: {
                type: Object,
                default() {
                    return {
                        price: null
                    }
                }
            },
            cityList: {
                type: Array,
                default() {
                    return []
                }
            },
            showTitle: {
                type: String,
                default: '赠品价格设置弹框'
            }
        },
        data() {
            return {
                searchBox: {
                    DtPrice: null,
                },
                dialogVisible: false,
                dialogBox: this.dialogBoxs,
                tableData: [
                    {province: '湖北', price: 222222}
                ]
            }
        },
        computed: {},
        components: {},
        methods: {
            addAllPrice () {
                this.cityList.map(item => {
                    this.$set(item, this.fileds,  this.searchBox[this.fileds])
                })

            },
            clickFocus (fileds) {
                this.fileds = fileds
            },
            save () {
                this.dialogVisible = false
                this.$emit('changePrice', this.cityList)
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {
            cityList: { //监听的对象
                deep: true, //深度监听设置为 true
                handler: function (newV, oldV) {
                    console.log('watch中：', newV)
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">

</style>




