<template>
    <el-dialog
            width="1080px"
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
                                    type="number"
                                    @focus="clickFocus('PlusPrice')"
                                    v-model="searchBox.PlusPrice"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="Plus会员价格（元）批量填充"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input
                                    style="width: 100%"
                                    type="number"
                                    v-model="scope.row.PlusPrice"
                                    size="mini"
                                    placeholder="Plus会员价格（元）"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    @focus="clickFocus('PlusMaxDtPrice')"
                                    type="number"
                                    v-model="searchBox.PlusMaxDtPrice"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="Plus会员最多抵扣金额批量填充"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input
                                    style="width: 100%"
                                    type="number"
                                    v-model="scope.row.PlusMaxDtPrice"
                                    size="mini"
                                    placeholder="Plus会员最多抵扣金额"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    @focus="clickFocus('Price')"
                                    type="number"
                                    v-model="searchBox.Price"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="非会员价格（元）批量填充"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input
                                    style="width: 100%"
                                    type="number"
                                    v-model="scope.row.Price"
                                    size="mini"
                                    placeholder="非会员价格（元））"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    @focus="clickFocus('NoPlusMaxDtPrice')"
                                    type="number"
                                    v-model="dialogBox.NoPlusMaxDtPrice"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="非会员最多抵扣金额 （元）批量填充"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input
                                    style="width: 100%"
                                    type="number"
                                    v-model="scope.row.NoPlusMaxDtPrice"
                                    size="mini"
                                    placeholder="非会员最多抵扣金额（元）"/>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
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
                        plusPrice: null,
                        salePrice: null,
                        changeExsalePrice: null,
                        changeExPlusPrice: null
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
                default: '售卖品价格设置弹框'
            }
        },
        data() {
            return {
                searchBox: {
                    NoPlusMaxDtPrice: null,
                    Price: null,
                    PlusPrice: null,
                    PlusMaxDtPrice: null
                },
                fileds: '',
                Index: -1,
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
                console.log(this.cityList, 'citySSSSSSS')
                this.$emit('changePrice', this.cityList)
            },
            init () {

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
                    this.init()
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">

</style>




