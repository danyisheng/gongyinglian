<template>
    <!--赠品信息-->
<div class="price-box">
    <common-row>
        <common-col :lot="8" class="price-btn">
            <el-button  @click="addComit" size="medium" type="primary">批量填充</el-button>
        </common-col>
    </common-row>
    <div class="city-type-box">
        <el-table
                border
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="省份"
                    align="center"
                    prop="label">
            </el-table-column>
            <el-table-column width="220">
                <template slot="header" slot-scope="scope">
                    <div class="red-gots">
                        <p>售卖方式</p>
                    </div>
                    <el-select v-model="searchBox.SellingMode" placeholder="请选择"   clearable style="width: 80%;"
                               @change="clickFocus('SellingMode')">
                        <el-option :label="item.label" :value="item.value"
                                   v-for="(item, index) in sellingModeList" :key="index"></el-option>
                    </el-select>
                </template>
                <template slot-scope="scope">
                    <el-select v-model="scope.row.SellingMode" placeholder="请选择" clearable style="width: 80%;">
                        <el-option :label="item.label" :value="item.value"
                                   v-for="(item, index) in sellingModeList" :key="index"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <div class="red-gots">
                        <p>赠品抵扣价格</p>
                    </div>>
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
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <div class="red-gots">
                        <p>市场价</p>
                    </div>>
                    <el-input
                            @focus="clickFocus('MarketPrice')"
                            type="number"
                            v-model="searchBox.MarketPrice"
                            size="mini"
                            style="width: 100%"
                            placeholder="请输入市场价"/>
                </template>
                <template slot-scope="scope">
                    <el-input
                            style="width: 100%"
                            type="number"
                            v-model="scope.row.MarketPrice"
                            size="mini"
                            placeholder="请输入市场价（元）"/>
                </template>
            </el-table-column>
            <el-table-column width="180">
                <template slot="header" slot-scope="scope">
                    <div class="red-gots">
                        <p>供货价</p>
                    </div>
                    <el-input
                            @focus="clickFocus('SupplyPrice')"
                            clearable
                            type="number"
                            v-model="searchBox.SupplyPrice"
                            size="mini"
                            style="width: 100%"
                            placeholder="请输入供货价"/>
                </template>
                <template slot-scope="scope">
                    <el-input clearable style="width: 100%" type="number" v-model="scope.row.SupplyPrice"
                              placeholder="请输入供货价"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </div>
</div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                searchBox: {
                    DtPrice: '',
                    MarketPrice:'',
                    SupplyPrice: null,
                    SellingMode: 0
                },
                fields: '',
                tableData: [
                    {province: '湖北', price: 222222}
                ],
                sellingModeList: [
                    {label: '仅现货 ', value: 100},
                    {label: '仅预售', value: 200},
                    {label: '现货+预售', value: 300}
                ]
            }
        },
        props: ['cityDataDesc'],
        computed: {},
        components: {},
        methods: {
            init () {
                let list = this.cityDataDesc || this.$store.state.app.checkCityData
                if (list.length > 0) {
                    this.tableData = list.map(item => {
                        return {
                            label: item.label,
                            value: item.value,
                            DtPrice: item.DtPrice,
                            MarketPrice:item.MarketPrice,
                            SupplyPrice: item.SupplyPrice,
                            SellingMode: ''
                        }
                    })
                }
            },
            addComit () {
                this.tableData.map(item => {
                    this.$set(item, this.fields, this.searchBox[this.fields])
                })
                this.searchBox = {
                    DtPrice: null,
                    SupplyPrice: null,
                    SellingMode: null
                }
            },
            clickFocus (fields) {
                this.fields = fields
            },
            getTableData () {
                return this.tableData.map((item, index) => {
                    return {
                        ProductSaleSpecId: item.ProductSaleSpecId ? item.ProductSaleSpecId : '',
                        SaleRegionCode: item.value ? item.value : '',
                        DtPrice: item.DtPrice ? Number(item.DtPrice) : 0,
                        MarketPrice: item.MarketPrice ? parseFloat(item.MarketPrice) : 0,
                        Sequence: item.Sequence ? item.Sequence : index + 1,
                        ItemSaleSpecs: item.ItemSaleSpecs ? item.ItemSaleSpecs : [],
                        SupplyPrice: item.SupplyPrice ? Number(item.SupplyPrice) : 0,
                        SellingMode: item.SellingMode ? item.SellingMode : 0
                    }
                })

            }
        },
        created() {
        },
        mounted() {
            this.init()
        },
        watch: {
            'cityDataDesc': {
                deep: true, //深度监听设置为 true
                handler: function (newV, oldV) {
                    if (newV.length > 0) {
                        this.init()
                    } else {
                        this.tableData = []
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.price-box {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #FCF9FC;
    border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
    opacity: 1;
    border-radius: 10px;
    .price-btn {
        text-align: right;
    }
    .city-type-box {
        margin-top: 10px;
    }
    .red-gots p:before {
        content: '*';
        color: #ff4949;
        margin-right: 4px;
        vertical-align: middle;
    }
}
</style>

<style lang="scss">

</style>




