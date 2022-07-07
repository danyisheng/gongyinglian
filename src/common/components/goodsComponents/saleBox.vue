<template>
    <div class="sale-box">
        <common-row>
            <common-col :lot="8" class="price-btn" :height="50">
                <el-button size="medium" @click="addSaleData(isSaleAttribute)" type="primary">批量填充</el-button>
            </common-col>
        </common-row>
        <div class="check-price-box">
            <!--供货价-->
            <div class="change-table-box" v-if="isSaleAttribute === 'price'">
                <div class="select-guige-box">
                    <div class="select-box" v-for="(item, index) in selectDataList" :key="index"
                         v-if="item.data.length > 0">
                        <label style="width: auto">{{item.name}}：</label>
                        <el-select v-model="item.selectVal" placeholder="请选择" @change="$forceUpdate()" clearable
                                   style="width: 100px;">
                            <el-option v-for="(r, d) in item.data"
                                       :label="r.CateSaleAttrContValues"
                                       :value="r.CategorySaleAttrItemId"
                                       :key="d">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <el-table :data="tableData" highlight-current-row max-height="420">
                    <el-table-column  fixed  width="110"  v-for="(leftTitle, index) in tableLeftTitles" :key="index"
                                     :label="leftTitle" show-overflow-tooltip >
                        <template slot-scope="scope">
                            {{tableLeftTitles .length > 1 ? scope.row.properties[index] : scope.row.properties}}
                        </template>
                    </el-table-column>
                    <el-table-column type="index" width="50" label="序号" fixed></el-table-column>
                    <el-table-column width="220">
                        <template slot="header" slot-scope="scope">
                            <div class="red-gots">
                                <p>售卖方式</p>
                            </div>
                            <el-select v-model="saleBox.SellingMode" placeholder="请选择" clearable style="width: 80%;"
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
                    <el-table-column width="180" v-if="goodsType === 200  && platformType === 'pt'">
                        <template slot="header" slot-scope="scope">
                            <div class="red-gots">
                                <p>赠品抵扣价格</p>
                            </div>
                            <el-input
                                    @focus="clickFocus('DtPrice')"
                                    type="number"
                                    v-model="saleBox.DtPrice"
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
                    <el-table-column width="180" v-if="goodsType === 100  && platformType === 'pt'">
                        <template slot="header" slot-scope="scope">
                            <div class="red-gots">
                                <p>Plus会员价格</p>
                            </div>
                            <el-input
                                    type="number"
                                    @focus="clickFocus('PlusPrice')"
                                    v-model="saleBox.PlusPrice"
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
                    <el-table-column v-if="goodsType === 100 && platformType === 'pt'" width="180">
                        <template slot="header" slot-scope="scope">
                            <div class="red-gots">
                                <p>Plus会员抵扣金额</p>
                            </div>
                            <el-input
                                    @focus="clickFocus('PlusMaxDtPrice')"
                                    type="number"
                                    v-model="saleBox.PlusMaxDtPrice"
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
                    <el-table-column width="180" v-if="goodsType === 100&&platformType === 'pt'">
                        <template slot="header" slot-scope="scope">
                            <div class="red-gots">
                                <p>非会员价格（元）</p>
                            </div>
                            <el-input
                                    @focus="clickFocus('Price')"
                                    type="number"
                                    v-model="saleBox.Price"
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
                                    placeholder="非会员价格（元）"/>
                        </template>
                    </el-table-column>
                    <el-table-column width="180" v-if="goodsType === 100&&platformType !== 'pt'">
                        <template slot="header" slot-scope="scope">
                            <div  class="red-gots">
                                <p>供货价（元）</p>
                            </div>
                            <el-input
                                    @focus="clickFocus('Price')"
                                    type="number"
                                    v-model="saleBox.Price"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="供货价（元）批量填充"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input
                                    style="width: 100%"
                                    type="number"
                                    v-model="scope.row.Price"
                                    size="mini"
                                    placeholder="供货价（元））"/>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="goodsType === 100 &&  platformType === 'pt'" width="180">
                        <template slot="header" slot-scope="scope">
                            <div  class="red-gots">
                                <p>非会员最多抵扣金额</p>
                            </div>
                            <el-input
                                    @focus="clickFocus('NoPlusMaxDtPrice')"
                                    type="number"
                                    v-model="saleBox.NoPlusMaxDtPrice"
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
                    <el-table-column width="180">
                        <template slot="header" slot-scope="scope">
                            <div class="red-gots">
                                <p>市场价</p>
                            </div>
                            <el-input
                                    @focus="clickFocus('MarketPrice')"
                                    clearable
                                    type="number"
                                    v-model="saleBox.MarketPrice"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="请输入市场价"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input clearable style="width: 100%" type="number" v-model="scope.row.MarketPrice"
                                      placeholder="请输入市场价"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column width="180" v-if="platformType == 'pt'">
                        <template slot="header" slot-scope="scope">
                            <div class="red-gots">
                                <p>供货价</p>
                            </div>
                            <el-input
                                    @focus="clickFocus('SupplyPrice')"
                                    clearable
                                    type="number"
                                    v-model="saleBox.SupplyPrice"
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
            <!--商品销售规格-->
            <div class="change-table-box" v-if="isSaleAttribute === 'attribute'">
                <div class="select-guige-box">
                    <div class="select-box" v-for="(item, index) in selectDataList" :key="index"
                         v-if="item.data.length > 0">
                        <label style="width: auto">{{item.name}}：</label>
                        <el-select v-model="item.selectVal" placeholder="请选择" @change="$forceUpdate()" clearable
                                   style="width: 100px;">
                            <el-option v-for="(r, d) in item.data"
                                       :label="r.CateSaleAttrContValues"
                                       :value="r.CategorySaleAttrItemId"
                                       :key="d">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <el-table :data="specificationData" highlight-current-row max-height="420">
                    <el-table-column fixed width="110" v-for="(leftTitle, index) in tableLeftTitles" :key="index"
                                     :label="leftTitle" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{tableLeftTitles .length > 1 ? scope.row.properties[index] : scope.row.properties}}
                        </template>
                    </el-table-column>
                    <el-table-column fixed type="index" width="50" label="序号"></el-table-column>
                    <el-table-column width="180">
                        <template slot="header" slot-scope="scope">
                            <div class="red-gots">
                                <p>数量:</p>
                            </div>
                            <el-input
                                    @focus="clickFocus('Quantity')"
                                    clearable
                                    type="number"
                                    v-model="saleBox.Quantity"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="请输入数量（件）"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input clearable @blur="changeBlur('Quantity')" style="width: 100%" type="number"
                                      v-model="scope.row.Quantity"
                                      placeholder="请输入数量（件）"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column width="180">
                        <template slot="header" slot-scope="scope">
                            <p>商家编码:</p>
                            <el-input
                                    @focus="clickFocus('Code')"
                                    clearable
                                    v-model="saleBox.Code"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="请输入商家编码"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input clearable style="width: 100%" v-model="scope.row.Code" clearable
                                      placeholder="请输入商家编码"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column width="180">
                        <template slot="header" slot-scope="scope">
                            <div class="red-gots">
                                <p>发货倍数:</p>
                            </div>
                            <el-input
                                    @focus="clickFocus('ShipTimesNum')"
                                    clearable
                                    type="number"
                                    v-model="saleBox.ShipTimesNum"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="请输入发货倍数"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input clearable style="width: 100%" type="number" v-model="scope.row.ShipTimesNum"
                                      placeholder="请输入倍数"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column width="180">
                        <template slot="header" slot-scope="scope">
                            <div class="red-gots">
                                <p>单次最大发货量:</p>
                            </div>
                            <el-input
                                    @focus="clickFocus('MaximumShipment')"
                                    clearable
                                    type="number"
                                    v-model="saleBox.MaximumShipment"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="请输入单次最大发货量"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input clearable style="width: 100%" type="number" v-model="scope.row.MaximumShipment"
                                      placeholder="请输入单次最大发货量"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <dialog-zp-box :cityList="cityDataList" @changePrice="changePrice" ref="dialogZpBox"></dialog-zp-box>
        <dialog-smp-box :cityList="cityDataList" @changePrice="changePrice" ref="dialogSmpBox"></dialog-smp-box>
    </div>
</template>

<script>
    import dialogZpBox from './dialogZpBox'
    import dialogSmpBox from './dialogSmpBox'
    import provinces from '/public/static/json/zsProvince'

    export default {
        name: '',
        data() {
            return {
                saleBox: {
                    DtPrice: null,
                    NoPlusMaxDtPrice: null,
                    Price: null,
                    PlusPrice: null,
                    PlusMaxDtPrice: null,
                    Code: null,
                    bigSmall: null,
                    shopCode: '',
                    num: null,
                    weight: null,
                    salePrice: null,
                    ShipTimesNum: null,
                    Quantity: null,
                    MarketPrice: null,
                    SupplyPrice: null,
                    MaximumShipment: null,
                    SellingMode: ''
                },
                sellingModeList: [
                    {label: '仅现货 ', value: 100},
                    {label: '仅预售', value: 200},
                    {label: '现货+预售', value: 300}
                ],
                cityDatas: [],
                goodsTypeVal: '',
                // options: this.optionData,
                options: [
                    {gName: '30mm-60mm', gid: '1'},
                    {gName: '60mm-80mm', gid: '2'},
                    {gName: '100mm以上', gid: '3'}
                ],
                weights: [
                    {wName: '10斤', wid: '1'},
                    {wName: '20斤', wid: '2'},
                    {wName: '30斤', wid: '3'},
                    {wName: '40斤', wid: '4'},
                    {wName: '50斤', wid: '5'},
                    {wName: '60斤', wid: '6'}

                ],
                flag: true,
                priceList: [],
                guiGeVal: '',
                amount1Val: '',
                fileds: '',
                model: {
                    tableData: []
                },
                tableData: [],
                cityDataList: [],
                changePriceInndex: -1,
                saleAttrsDataList: [],
                showList: [],
                saleAttrsDataV1: [],
                tableDataV1: [],
                newData: [],
                defalutSku: {},
                tableLeftTitles: [],
                specificationData: [],
                selectDataList: []
            }
        },
        props: {
            cityDataDesc: {
                type: Array,
                default() {
                    return []
                },
            },
            isSaleAttribute: {
                type: String,
                default: ''
            },
            onSuccess: Function,
            labelTitle: {
                type: String,
                default: '苹果果径'
            },
            showTitle: {
                type: String,
                default: '弹框'
            },
            optionData: {
                type: Array,
                default() {
                    return []
                }
            },
            weightsData: {
                type: Array,
                default() {
                    return []
                }
            },
            goodsType: {
                type: Number,
                default: 100
            },
            dataList: {
                type: Array,
                default() {
                    return []
                }
            },
            SpecificationValues: {
                type: Array,
                default() {
                    return []
                }
            },
            platformType: {
                type: String,
                default: ''
            }
        },
        computed: {
            citys: {
                get() {
                    return this.$store.state.app.checkCityData
                },
                set(val) {
                    this.cityDataList = val
                }
            },
            saleAttrsData() {
                return this.$store.state.goods.SaleAttrsData
            }
        },
        components: {dialogZpBox, dialogSmpBox},
        methods: {
            getDesc(row) {
                if (row.length === 6) {
                    let list = provinces.filter(item => item.cityCode === row)
                    if (list.length > 0) {
                        return list[0].cityName
                    } else {
                        return row
                    }
                } else {
                    return row
                }

            },
            changeBlur(type) {
                let num = 0
                if (type === 'Quantity') {
                    this.specificationData.map(item => {
                        num = num + Number(item.Quantity)
                    })
                }
                this.$emit('changeQuantity', num)
            },
            clickFocus(fileds) {
                this.fileds = fileds

            },
            trimSpace (array) { //数组去空
                if (array.length > 0) {
                    for(let i = array.length; i >= 0; i--) {
                        if(array[i] === '' || array[i] === null || typeof(array[i]) === 'undefined') {
                            array.splice(i,1);
                        }
                    }
                }
                return array;
            },
            filterList (list, ci) {
                let arr = []
                var m = new Map()
                for (var i = 0; i < list.length; i++) {
                    if (m.has(list[i])) {
                        m.set(list[i], m.get(list[i]) + 1)
                    } else {
                        m.set(list[i], 1)
                    }
                }

                for (let [key, value] of m.entries()) {
                    if(ci === value){
                        arr.push(key)
                    }
                }
                return arr

            },
            addSaleData(type) {
                this.cityDataList = this.cityDataDesc || this.$store.state.app.checkCityData
                if (this.cityDataList.length === 0) {
                    this.$message.error('请选择售卖区域批量填充！')
                    return false
                }
                let _list = this.selectDataList.filter(item => item.selectVal)
                console.log(_list, '选择设置数据')
                let _listData = []
                if (_list.length > 0) {
                    let list = this.trimSpace(_list.map(item => item.selectVal))
                    console.log(list, '选择设置数据2')
                    if (list.length > 0) {
                        if (type === 'price') {
                            console.log(this.tableLeftTitles);
                            if (this.tableLeftTitles.length === 1) {
                                for (let i = this.tableData.length -1; i >= 0; i--) {
                                    if (list.indexOf(this.tableData[i].skuIds) !== -1) {
                                        this.$set(this.tableData[i], this.fileds, this.saleBox[this.fileds])
                                    }
                                }
                            } else {
                                console.log(this.tableData, 'DDFFFFF');
                                for (let i = this.tableData.length -1; i >= 0; i--) {
                                    this.tableData[i].listData = []
                                    this.tableData[i]._data = this.tableData[i].skuIds ? this.trimSpace(this.tableData[i].skuIds) : []
                                    for (let j = this.tableData[i]._data.length -1; j >= 0; j--) {
                                        if (list.indexOf(this.tableData[i]._data[j]) !== -1) {
                                            _listData.push(i)
                                        }
                                    }
                                }
                                if (list.length > 1) { //大于1的选择要逻辑判断
                                    _listData = this.filterList(_listData,list.length)
                                }
                                console.log(_listData, '设置索引');
                                _listData.map(index => {
                                    this.$set(this.tableData[index], this.fileds, this.saleBox[this.fileds])
                                })
                            }
                        } else {
                            if (this.tableLeftTitles.length === 1) {
                                for (let i = this.specificationData.length -1; i >= 0; i--) {
                                    if (list.indexOf(this.specificationData[i].skuIds) !== -1) {
                                        this.$set(this.specificationData[i], this.fileds, this.saleBox[this.fileds])
                                    }
                                }
                            } else {
                                for (let i = this.specificationData.length -1; i >= 0; i--) {
                                    this.specificationData[i].listData = []
                                    this.specificationData[i]._data = this.specificationData[i].skuIds ? this.trimSpace(this.specificationData[i].skuIds) : []
                                    for (let j = this.specificationData[i]._data.length -1; j >= 0; j--) {
                                        if (list.indexOf(this.specificationData[i]._data[j]) !== -1) {
                                            _listData.push(i)
                                        }
                                    }
                                }
                                if (list.length > 1) { //大于1的选择要逻辑判断
                                    _listData = this.filterList(_listData,list.length)
                                }
                                _listData.map(index => {
                                    this.$set(this.specificationData[index], this.fileds, this.saleBox[this.fileds])
                                })
                            }
                        }
                    }
                } else {
                    if (type === 'price') {
                        this.tableData.map(item => {
                            this.$set(item, this.fileds, this.saleBox[this.fileds])
                        })
                    } else {
                        this.specificationData.map(item => {
                            this.$set(item, this.fileds, this.saleBox[this.fileds])
                        })
                        if (this.fileds === 'Quantity') {
                            this.$emit('changeQuantity', this.saleBox.Quantity * this.specificationData.length)
                        }
                    }
                }
                this.saleBox = {
                    DtPrice: null,
                    NoPlusMaxDtPrice: null,
                    Price: null,
                    PlusPrice: null,
                    PlusMaxDtPrice: null,
                    Code: null,
                    bigSmall: null,
                    shopCode: '',
                    num: null,
                    weight: null,
                    salePrice: null,
                    ShipTimesNum: null,
                    Quantity: null,
                    SupplyPrice: null,
                }
                this.$message.success('设置成功')
            },
            addPriceModal(row, index) {
                this.changePriceInndex = index
                if (this.cityDataList.length === 0) {
                    this.$message.error('请选择售卖区域！')
                    return false
                }
                if (this.goodsType === 100) {
                    this.$refs.dialogSmpBox.dialogVisible = true

                } else if (this.goodsType === 200) {
                    this.$refs.dialogZpBox.dialogVisible = true
                }
            },
            getSaleCode(row) {
                if (row.skuIds.length > 0 && (typeof row.skuIds === 'object')) {
                    return row.skuIds[row.skuIds.length - 1]
                } else {
                    return row.skuIds
                }
            },
            getSaleBoxData() {
                return this.tableData.map((item, index) => {
                    return {
                        ProductSaleSpecId: item.ProductSaleSpecId ? item.ProductSaleSpecId : '',
                        SaleRegionCode: this.getSaleCode(item),
                        Price: item.Price ? Number(item.Price) : 0,
                        NoPlusMaxDtPrice: item.NoPlusMaxDtPrice ? Number(item.NoPlusMaxDtPrice) : 0,
                        PlusPrice: item.PlusPrice ? Number(item.PlusPrice) : 0,
                        PlusMaxDtPrice: item.PlusMaxDtPrice ? Number(item.PlusMaxDtPrice) : 0,
                        DtPrice: item.DtPrice ? Number(item.DtPrice) : 0,
                        MarketPrice: item.MarketPrice ? parseFloat(item.MarketPrice) : 0,
                        SupplyPrice: item.SupplyPrice ? Number(item.SupplyPrice) : 0,
                        Sequence: index + 1,
                        SellingMode: item.SellingMode ? item.SellingMode : 0,
                        ItemSaleSpecs: []

                    }
                })
            },
            getSpecificationData() {
                return this.specificationData.map((item, index) => {
                    return {
                        Code: item.Code ? item.Code : '',
                        Quantity: item.Quantity ? Number(item.Quantity) : 0,
                        ShipTimesNum: item.ShipTimesNum ? Number(item.ShipTimesNum) : 0,
                        MaximumShipment: item.MaximumShipment ? Number(item.MaximumShipment) : 0,
                        Sequence: index + 1,

                    }
                })
            },
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                let num = 1
                this.saleAttrsDataV1.map(item => {
                    if (item.data.length > 0) {
                        num = num * item.data.length
                    }
                })
                this.saleAttrsDataV1.map((item, index) => {
                    if (item.data.length > 0) {
                        if (columnIndex === index) {
                            if (rowIndex % (num / item.data.length) === 0) {
                                return {
                                    rowspan: num / item.data.length,
                                    colspan: 1
                                };
                            } else {
                                return {
                                    rowspan: 0,
                                    colspan: 0
                                };
                            }
                        }
                    }
                })
            },
            getForData(obj) {
                if (obj) {
                    let Index = this.$store.state.goods.Index
                    obj['CateSaleAttrContValues' + Index] = obj.CateSaleAttrContValues
                }
                return obj
            },
            changePrice(list) {
                this.priceList = list
                if (this.goodsType === 100) {
                    let min = Math.min.apply(Math, list.map(item => {
                        return Number(item.PlusPrice)
                    }))
                    let max = Math.max.apply(Math, list.map(item => {
                        return Number(item.PlusPrice)
                    }))
                    if (min === max) {
                        this.tableData[this.changePriceInndex].Price = min || max
                    } else {
                        this.tableData[this.changePriceInndex].Price = min + '~' + max
                    }
                } else if (this.goodsType === 200) {
                    let min = Math.min.apply(Math, list.map(item => {
                        return Number(item.DtPrice)
                    }))
                    let max = Math.max.apply(Math, list.map(item => {
                        return Number(item.DtPrice)
                    }))
                    if (min === max) {
                        this.tableData[index].Price = min || max
                    } else {
                        this.tableData[index].Price = min + '~' + max
                    }
                }
            },
            initV1() { // 进入页面初始化生成sku
                let list = []
                let _list = []
                let cityList = []
                this.optionData.map(item => {
                    if (item.IsAddCont) {
                        list.push({
                            name: item.Name,
                            data: this.getCheckTrue(item.CategorySaleAttrContsDatas.CustomizeSaleAttrItems || [])
                        })
                    } else {
                        list.push({
                            name: item.Name,
                            data: this.getCheckTrue(item.CategorySaleAttrContsDatas.CategorySaleAttrConts[0].CategorySaleAttrItems || [])
                        })
                    }
                })
                this.saleAttrsDataV1 = list
                if (this.weightsData.length > 0 && (this.isSaleAttribute === 'price')) {
                    provinces.map(item => {
                        if (this.weightsData.indexOf(item.cityCode) !== -1) {
                            cityList.push({
                                label: item.cityName,
                                value: item.cityCode,
                                CateSaleAttrContValues: item.cityName,
                                SaleRegionCode: item.cityCode,
                                CategorySaleAttrItemId: item.cityCode
                            })
                        }
                    })
                }
                if (list.length > 0) {
                    _list = list.map(item => {
                        return {
                            name: item.name,
                            data: item.data
                        }
                    })
                    for (let i = _list.length - 1; i >= 0; i--) {
                        if (_list[i].data.length === 0) {
                            _list.splice(i, 1)
                        }
                    }
                    this.getAllSkuList(_list, true, cityList)
                }
            },
            init() { //添加属性变更sku
                let _list = []
                let list = []
                let listIds = []
                console.log(this.saleAttrsDataV1, '属性数据');
                if (this.saleAttrsDataV1.length > 0) {
                    _list = this.saleAttrsDataV1.map(item => {
                        return {
                            name: item.name,
                            data: item.data
                        }
                    })
                    this.getAllSkuList(_list)
                } else {
                    if ((this.isSaleAttribute === 'price') && this.cityDataDesc.length > 0) {
                        _list.push({
                            name: '省份',
                            data: this.cityDataDesc.map(item => {
                                return {
                                    CateSaleAttrContValues: item.CateSaleAttrContValues,
                                    SaleRegionCode: item.SaleRegionCode,
                                    label: item.label,
                                    value: item.value,
                                    CategorySaleAttrItemId: item.value
                                }
                            })
                        })
                    }
                    list= this.cityDataDesc.map(item => item.CateSaleAttrContValues)
                    listIds = this.cityDataDesc.map(item => item.CategorySaleAttrItemId ?  item.CategorySaleAttrItemId : item.value)
                    this.selectDataList = _list
                    console.log(this.selectDataList, '选择数据');
                    this.tableLeftTitles = this.getTableLeftTitles(_list)
                    this.getAreaSkuList(list, listIds)
                }
            },
            getAllSkuList (_list, flag, citylist) {
                let list = _list.map(item => {
                    return item.data.length > 0 ?  item.data.map(o => o.CateSaleAttrContValues) : []
                })
                let listIds = _list.map(item => {
                    return item.data.length > 0 ?  item.data.map(o => o.CategorySaleAttrItemId ? o.CategorySaleAttrItemId : this.created32Guid()) : []
                })
                if ((this.isSaleAttribute === 'price') && this.cityDataDesc.length > 0) {
                    if (flag) {
                        _list.push({
                            name: '省份',
                            data: citylist
                        })
                        list.push(citylist.map(item => item.CateSaleAttrContValues))
                        listIds.push(citylist.map(item => item.CategorySaleAttrItemId ?  item.CategorySaleAttrItemId : item.value))
                    } else {
                        _list.push({
                            name: '省份',
                            data: this.cityDataDesc.map(item => {
                                return {
                                    CateSaleAttrContValues: item.CateSaleAttrContValues,
                                    SaleRegionCode: item.SaleRegionCode,
                                    label: item.label,
                                    value: item.value,
                                    CategorySaleAttrItemId: item.value
                                }
                            })
                        })
                        list.push(this.cityDataDesc.map(item => item.CateSaleAttrContValues))
                        listIds.push(this.cityDataDesc.map(item => item.CategorySaleAttrItemId ?  item.CategorySaleAttrItemId : item.value))
                    }
                }
                this.selectDataList = _list
                this.tableLeftTitles = this.getTableLeftTitles(_list)
                this.getSkuList(list, listIds, flag)
                console.log(list, listIds, '11111111111111111111111111111')
            },
            getSkuList (list, listIds, flag) {
                let skuData = []
                if (list.length > 1 || listIds.length > 1) {
                    let _listData = this.descartes(list)
                    let _listDataIds = this.descartes(listIds)
                    console.log(_listDataIds, '455555666');
                    _listData.map((item, index) => {
                        skuData.push({
                            properties: item,
                            skuIds: _listDataIds[index]
                        })
                    })
                } else {
                    list[0].map((item, index) => {
                        skuData.push({
                            properties: item,
                            skuIds: listIds[0][index]
                        })
                    })
                }
                if (flag) {
                    console.log(skuData, 'EDOTTTT');
                    if (this.isSaleAttribute === 'price') {
                        skuData.map((item, index) => {
                            this.tableData.push(Object.assign({}, item, this.dataList[index]))
                        })
                    } else {
                        skuData.map((item, index) => {
                            this.specificationData.push(Object.assign({}, item, this.SpecificationValues[index]))
                        })
                    }
                } else {
                    this.tableData = skuData.length > 0 ? skuData : []
                    this.specificationData = skuData.length > 0 ? skuData : []
                }

            },
            getAreaSkuList (list, listIds) {
                let skuData = []
                if ((this.isSaleAttribute === 'price') && (list.length > 0  ||  listIds.length > 0 )) {
                    list.map((item, index) => {
                        skuData.push({
                            properties: item,
                            skuIds: listIds[index]
                        })
                    })
                }
                this.tableData = skuData
                this.specificationData = skuData
            },
            skulistData(list, flag) {
                let skuList = []
                let tempSkuList = []
                list.forEach((tag, tagIndex) => {
                    if (skuList.length === 0) {
                        tag.data.forEach((tagItem, index) => {
                            let sku = Object.assign({}, this.defalutSku)
                            sku.properties = `${tag.name}:${tagItem.CateSaleAttrContValues}` // 销售属性组合字符串
                            sku.propertiesIds = `${tag.name}:${tagItem.CategorySaleAttrItemId}`
                            skuList.push(sku)
                        })
                    } else {
                        tempSkuList = []
                        tag.data.forEach((tagItem, tagIndexs) => {
                            skuList.forEach((sku, index) => {
                                let newSku = Object.assign({}, sku)
                                newSku.properties = `${sku.properties};${tag.name}:${tagItem.CateSaleAttrContValues}`
                                newSku.propertiesIds = `${sku.propertiesIds};${tag.name}:${tagItem.CategorySaleAttrItemId}`
                                newSku.sortIds = index
                                tempSkuList.push(newSku)
                            })
                        })
                        skuList = tempSkuList
                    }
                })
                if (!skuList.length) {
                    skuList.push(Object.assign({}, this.defalutSku))
                }
                this.skuTagChangeSkuHandler(skuList, flag)
            },
            skuTagChangeSkuHandler(skuList, flag) {
                skuList.forEach(sku => {
                    if (sku.properties) {
                        sku.skuName = ''
                        sku.skuIds = ''
                        let properties = sku.properties.split(';')
                        let propertiesIds = sku.propertiesIds.split(';')
                        for (const propertiesKey in properties) {
                            sku.skuName += properties[propertiesKey].split(':')[1] + ' '
                        }
                        for (const propertiesIdKey in propertiesIds) {
                            sku.skuIds += propertiesIds[propertiesIdKey].split(':')[1] + ' '
                        }
                    }
                })
                let len = skuList[0].skuIds ? skuList[0].skuIds.split(' ') : []
                let _skuList = []
                len.map((item, index) => {
                   _skuList.push(...skuList.filter(item => item.sortIds === index))
                })
                if (flag) {
                    for (let key in skuList) {
                        for (let k in this.dataList) {
                            this.tableData.push(Object.assign({}, skuList[key], this.dataList[k]))
                        }
                    }
                    for (let key in skuList) {
                        for (let k in this.SpecificationValues) {
                            this.specificationData.push(Object.assign({}, skuList[key], this.SpecificationValues[k]))
                        }
                    }
                } else {
                    // this.tableData = skuList
                    // this.specificationData = skuList
                }
            },
            getCheckTrue(list) {
                let _list  =  list.length > 0 ? list.filter(item => item.IsCheck) : []
                return _list.map(item => {
                    return {
                        CateSaleAttrContIds: item.CateSaleAttrContIds,
                        CateSaleAttrContValues: item.CateSaleAttrContValues,
                        CategorySaleAttrItemId: item.CategorySaleAttrItemId ? item.CategorySaleAttrItemId : this.created32Guid(),
                        IsCheck: item.IsCheck,
                        SaleAttrId: item.SaleAttrId,
                        Sequence: item.Sequence,
                        Value: item.Value
                    }
                })
            },
            descartes(array) {
                if (array.length < 2) return array[0] || [];
                return [].reduce.call(array, function (col, set) {
                    var res = [];
                    col.forEach(function (c) {
                        set.forEach(function (s) {
                            var t = [].concat(Array.isArray(c) ? c : [c]);
                            t.push(s);
                            res.push(t);
                        })
                    });
                    return res;
                });
            },
            created32Guid (len, radix) {
                let chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('')
                let uuid = []
                let i
                radix = radix || chars.length
                if (len) {
                    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
                } else {
                    let r
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
                    uuid[14] = '4'
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16
                            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
                        }
                    }
                }
                return uuid.join('')
            },
            getTableLeftTitles(list) {
                let res = []
                for (let i = 0; i < list.length; i++) {
                    const skuTag = list[i]
                    res.push(skuTag.name)
                }
                return res
            },
        },
        created() {
        },
        mounted() {
            this.initV1()
        },
        watch: {
            cityDataDesc: {
                deep: true,
                handler: function (newV, oldV) {
                    this.cityDataDesc = newV
                    console.log(this.saleAttrsData, '3344444444')
                    this.init()
                    console.log('触发了')
                }
            },
            saleAttrsData: {
                deep: true, //深度监听设置为 true
                handler: function (newV, oldV) {
                    this.saleAttrsDataV1 = newV
                    this.init()
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">
    .sale-box {
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
        .check-price-box {
            /*max-height: 520px;*/
            /*overflow-y: scroll;*/
            width: 100%;
            /*border: 1px solid #dcdcdc;*/
            .red-gots p:before {
                content: '*';
                color: #ff4949;
                margin-right: 4px;
                vertical-align: middle;
            }
            .select-guige-box {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .select-box {
                    display: flex;
                    justify-content: flex-start;
                   margin-right: 15px;
                    margin-bottom: 10px;
                    .el-select {
                        width: 140px !important;
                        .el-input {
                            width: 140px !important;
                        }
                    }
                }
            }
            .change-table-box {
                .changeTable {
                    box-sizing: border-box;
                    background-color: #fff;
                    .title-label {
                        display: flex;
                        justify-content: flex-start;
                        span {
                            font-size: 8px;
                            display: inline-block;
                            padding: 0px 10px;
                            width: 100px;
                            height: 70px;
                            line-height: 70px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            border-top: 1px solid #dfe6ec;
                            border-right: 1px solid #dfe6ec;
                            border-bottom: 1px solid #dfe6ec;
                        }
                        span:first-child {
                            border-left: 1px solid #dfe6ec;
                        }
                    }
                    .td {
                        height: 49px;
                        line-height: 49px;
                        span {
                            span {
                                font-size: 8px;
                                display: inline-block;
                                width: 100px;
                                height: 49px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                border-bottom: 1px solid #dfe6ec;
                                border-right: 1px solid #dfe6ec;
                                padding: 0px 10px;
                            }
                            span:first-child {

                            }
                        }

                    }
                }
                .change-table-box {
                    height: 100%;
                }
            }

        }
    }
</style>




