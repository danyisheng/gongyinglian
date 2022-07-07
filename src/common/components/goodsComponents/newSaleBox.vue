<template>
    <div class="sale-box">
        <common-row>
            <common-col :lot="8" class="price-btn" :height="50">
                <el-button size="medium" @click="addSaleData" type="primary">批量填充</el-button>
            </common-col>
        </common-row>
        <div class="check-price-box">
            <!--<div class="select-guige-box">-->
            <!--<div class="select-box" v-for="(item, index) in saleAttrsData" :key="index" v-if="item.data.length > 0">-->
            <!--<label>{{item.Name}}:</label>-->
            <!--<el-select v-model="item.selectVal" placeholder="请选择" @change="$forceUpdate()" clearable-->
            <!--style="width: 100px;">-->
            <!--<el-option v-for="(r, d) in item.data"-->
            <!--:label="r.CateSaleAttrContValues"-->
            <!--:value="r.CategorySaleAttrItemId"-->
            <!--:key="d">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</div>-->
            <!--</div>-->
            <div class="change-table-box">
                <div class="changeTable">
                    <div class="title-label">
                        <span v-for="(item, index) in  saleAttrsDataV1" :key="index" v-if="item.data.length > 0">{{item.Name}}</span>
                        <span v-if="tableData.length > 0 ">省份</span>
                    </div>
                    <div class="td" v-for="(item,index) in tableData" :key="index">
                        <span  v-if="typeof num === 'object'" v-for="(num,i) in item" :key="i">
                            <span v-if="num.CateSaleAttrContValues">{{num.CateSaleAttrContValues}}</span>
                        </span>
                    </div>
                </div>
                <el-table  v-if="tableData.length > 0" :data="tableData"  highlight-current-row>
                    <el-table-column type="index" width="50" label="序号"></el-table-column>
                    <el-table-column width="200" v-if="goodsType === 200  && platformType === 'pt'">
                        <template slot="header" slot-scope="scope">
                            <p>赠品抵扣价格:</p>
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
                            <p>Plus会员价格:</p>
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
                            <p>Plus会员抵扣金额:</p>
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
                    <el-table-column width="180" v-if="goodsType === 100&&platformType === 'pt'" >
                        <template slot="header" slot-scope="scope">
                            <p>价格（元）</p>
                            <el-input
                                    @focus="clickFocus('Price')"
                                    type="number"
                                    v-model="saleBox.Price"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="价格（元）批量填充"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input
                                    style="width: 100%"
                                    type="number"
                                    v-model="scope.row.Price"
                                    size="mini"
                                    placeholder="价格（元））"/>
                        </template>
                    </el-table-column>
                    <el-table-column width="180" v-if="goodsType === 100&&platformType !== 'pt'">
                        <template slot="header" slot-scope="scope">
                            <p>供货价（元）</p>
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
                    <el-table-column v-if="goodsType === 100 &&  platformType === 'pt'" width="180" >
                        <template slot="header" slot-scope="scope">
                            <p>非会员最多抵扣金额:</p>
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
                    <el-table-column  width="180">
                        <template slot="header" slot-scope="scope" >
                            <p>数量:</p>
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
                    <el-table-column  width="180">
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
                    <el-table-column  width="180">
                        <template slot="header" slot-scope="scope">
                            <p>倍数:</p>
                            <el-input
                                    @focus="clickFocus('ShipTimesNum')"
                                    clearable
                                    type="number"
                                    v-model="saleBox.ShipTimesNum"
                                    size="mini"
                                    style="width: 100%"
                                    placeholder="请输入倍数"/>
                        </template>
                        <template slot-scope="scope">
                            <el-input clearable style="width: 100%" type="number" v-model="scope.row.ShipTimesNum"
                                      placeholder="请输入倍数"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column  width="180">
                        <template slot="header" slot-scope="scope">
                            <p>市场价:</p>
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
                    <el-table-column  width="180" v-if="platformType == 'pt'">
                        <template slot="header" slot-scope="scope" >
                            <p>供货价:</p>
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
                    MarketPrice:null,
                    SupplyPrice:null,
                },
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
                tableDataV1: []
            }
        },
        props: {
            cityDataDesc: {
                type: Array,
                default() {
                    return []
                },
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
            changeBlur(type) {
                let num = 0
                if (type === 'Quantity') {
                    this.tableData.map(item => {
                        num = num + Number(item.Quantity)
                    })
                }
                this.$emit('changeQuantity', num)
            },
            clickFocus(fileds) {
                this.fileds = fileds

            },
            addSaleData() {
                let list = []
                this.cityDataList = this.cityDataDesc || this.$store.state.app.checkCityData
                if (this.cityDataList.length === 0) {
                    this.$message.error('请选择售卖区域批量填充！')
                    return false
                }
                if (this.goodsType === 100) {
                    if (this.guiGeVal && this.amount1Val) {
                        if (this.fileds === 'Price') {
                            this.cityDataList.map(row => {
                                list.push({
                                    NoPlusMaxDtPrice: this.saleBox.Price,
                                    Price: this.saleBox.Price,
                                    PlusPrice: this.saleBox.Price,
                                    PlusMaxDtPrice: this.saleBox.Price,
                                    value: row.value,
                                    label: row.label
                                })
                            })
                            this.cityDataList = list
                        }
                        this.tableData.map(item => {
                            if (item.gid === this.guiGeVal) {
                                if (item.wid === this.amount1Val) {
                                    this.$set(item, this.fileds, this.saleBox[this.fileds])
                                }
                            } else {
                                if (item.wid === this.amount1Val) {
                                    if (item.gid === this.guiGeVal) {
                                        this.$set(item, this.fileds, this.saleBox[this.fileds])
                                    }
                                }
                            }
                        })
                    } else if (this.guiGeVal) {
                        if (this.fileds === 'Price') {
                            this.cityDataList.map(row => {
                                list.push({
                                    NoPlusMaxDtPrice: this.saleBox.Price,
                                    Price: this.saleBox.Price,
                                    PlusPrice: this.saleBox.Price,
                                    PlusMaxDtPrice: this.saleBox.Price,
                                    value: row.value,
                                    label: row.label
                                })
                            })
                            this.cityDataList = list
                        }
                        this.tableData.map(item => {
                            if (item.gid === this.guiGeVal) {
                                this.$set(item, this.fileds, this.saleBox[this.fileds])
                            }
                        })

                    } else if (this.amount1Val) {
                        if (this.fileds === 'Price') {
                            this.cityDataList.map(row => {
                                list.push({
                                    NoPlusMaxDtPrice: this.saleBox.Price,
                                    Price: this.saleBox.Price,
                                    PlusPrice: this.saleBox.Price,
                                    PlusMaxDtPrice: this.saleBox.Price,
                                    value: row.value,
                                    label: row.label
                                })
                            })
                            this.cityDataList = list
                        }
                        this.tableData.map(item => {
                            if (item.wid === this.amount1Val) {
                                this.$set(item, this.fileds, this.saleBox[this.fileds])
                            }
                        })
                    } else {
                        if (this.fileds === 'Price') {
                            this.cityDataList.map(row => {
                                list.push({
                                    NoPlusMaxDtPrice: this.saleBox.Price,
                                    Price: this.saleBox.Price,
                                    PlusPrice: this.saleBox.Price,
                                    PlusMaxDtPrice: this.saleBox.Price,
                                    value: row.value,
                                    label: row.label
                                })
                            })
                            this.cityDataList = list
                        }
                        this.tableData.map(item => {
                            this.$set(item, this.fileds, this.saleBox[this.fileds])
                        })
                    }

                } else if (this.goodsType === 200) {
                    console.log('shezhi ')
                    if (this.guiGeVal) {
                        if (this.fileds === 'Price') {
                            this.cityDataList.map(row => {
                                list.push({
                                    DtPrice: this.saleBox.Price,
                                    value: row.value,
                                    label: row.label
                                })
                            })
                            this.cityDataList = list
                        }
                        this.tableData.map(item => {
                            if (item.gid === this.guiGeVal) {
                                this.$set(item, this.fileds, this.saleBox[this.fileds])
                            }
                        })

                    } else if (this.amount1Val) {
                        if (this.guiGeVal && this.amount1Val) {
                            if (this.fileds === 'Price') {
                                this.cityDataList.map(row => {
                                    list.push({
                                        DtPrice: this.saleBox.Price,
                                        value: row.value,
                                        label: row.label
                                    })
                                })
                                this.cityDataList = list
                            }
                            this.tableData.map(item => {
                                if ((item.gid === this.guiGeVal) && (item.wid === this.amount1Val)) {
                                    this.$set(item, this.fileds, this.saleBox[this.fileds])
                                }
                            })
                        } else if (this.fileds === 'Price') {
                            this.cityDataList.map(row => {
                                list.push({
                                    DtPrice: this.saleBox.Price,
                                    value: row.value,
                                    label: row.label
                                })
                            })
                            this.cityDataList = list
                        }
                        this.tableData.map(item => {
                            if (item.wid === this.amount1Val) {
                                this.$set(item, this.fileds, this.saleBox[this.fileds])
                            }
                        })

                    } else {
                        if (this.fileds === 'Price') {
                            this.cityDataList.map(row => {
                                list.push({
                                    DtPrice: this.saleBox.Price,
                                    value: row.value,
                                    label: row.label
                                })
                            })
                            this.cityDataList = list
                        }
                        this.tableData.map(item => {
                            this.$set(item, this.fileds, this.saleBox[this.fileds])
                        })
                    }
                }
                if (this.fileds === 'Quantity') {
                    this.$emit('changeQuantity', this.saleBox.Quantity * this.tableData.length)
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
                    SupplyPrice:null,
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
            getSaleCode (item) {
                return item[item.length - 1].value
            },
            getSaleBoxData() {
                return this.tableData.map((item, index) => {
                    return {
                        ProductSaleSpecId: item.ProductSaleSpecId ?  item.ProductSaleSpecId : '',
                        SaleRegionCode: item.length > 0 ? this.getSaleCode(item) : (item.SaleRegionCode || ''),
                        Code: item.Code ? item.Code : '',
                        Quantity: item.Quantity ?  Number(item.Quantity) : 0,
                        Price: item.Price ? Number(item.Price) : 0,
                        NoPlusMaxDtPrice: item.NoPlusMaxDtPrice ? Number(item.NoPlusMaxDtPrice) : 0,
                        PlusPrice: item.PlusPrice ? Number(item.PlusPrice) : 0,
                        PlusMaxDtPrice: item.PlusMaxDtPrice ? Number(item.PlusMaxDtPrice) : 0,
                        DtPrice: item.DtPrice ? Number(item.DtPrice) : 0,
                        ShipTimesNum: item.ShipTimesNum ? Number(item.ShipTimesNum) : 0,
                        MarketPrice: item.MarketPrice ?  parseFloat(item.MarketPrice) : 0,
                        SupplyPrice:item.SupplyPrice ? Number(item.SupplyPrice) : 0,
                        Sequence: index + 1,
                        ItemSaleSpecs: []

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
            init() {
                console.log('触发添加')
                let data = []
                let list = []
                console.log(this.saleAttrsDataV1);
                this.saleAttrsDataV1.map(item => {
                    if (item.data.length > 0) {
                        list.push(item.data)
                    }
                })
                list.push(this.cityDataDesc)
                if (list.length > 1) {
                    if (this.cityDataDesc.length > 0) {
                        if (list.length > 1) {
                            data = this.descartes(list)
                            this.tableData = data
                        }
                    }
                } else {
                    this.tableData = []
                }

            },
            initV1 () {
                let list = []
                let cityList = []
                let listData = []
                let data = []
                this.optionData.map(item => {
                    if (item.IsAddCont) {
                        list.push({
                            Name: item.Name,
                            data: this.getCheckTrue(item.CategorySaleAttrContsDatas.CustomizeSaleAttrItems || [])
                        })
                    } else {
                        list.push({
                            Name: item.Name,
                            data:this.getCheckTrue(item.CategorySaleAttrContsDatas.CategorySaleAttrConts[0].CategorySaleAttrItems || [])
                        })
                    }
                })
                this.saleAttrsDataV1 = list
                this.saleAttrsDataV1.map(item => {
                    if (item.data.length > 0) {
                        listData.push(item.data)
                    }
                })
                if (listData.length > 0) {
                    if (this.weightsData.length > 0) {
                        provinces.map(item => {
                            if (this.weightsData.indexOf(item.cityCode) !== -1) {
                                cityList.push({
                                    value: item.cityCode,
                                    label: item.cityName,
                                    CateSaleAttrContValues: item.cityName
                                })
                            }
                        })
                        listData.push(cityList)
                        if (listData.length > 1) {
                            if (cityList.length > 0) {
                                data = this.descartes(listData)
                                console.log(data, 'data')
                                if (data.length > 0 && this.dataList.length > 0) {
                                    data.map((item, index) => {
                                        this.tableData.push(Object.assign({}, item, this.dataList[index]))
                                    })
                                    console.log(this.tableData)
                                }
                            }

                        }
                    }
                }
            },
            getCheckTrue (list) {
                return  list.length > 0 ? list.filter(item => item.IsCheck) : []
            }
        },
        created() {
        },
        mounted() {
            this.initV1()
        },
        watch: {
            cityDataDesc: {
                deep: true, //深度监听设置为 tru
                handler: function (newV, oldV) {
                    console.log('触发了城市添加')
                    if (newV.length > 0) {
                        this.cityDataDesc = newV
                        this.init()
                    } else {
                        this.tableData = []
                    }
                }
            },
            saleAttrsData: {
                deep: true, //深度监听设置为 true
                handler: function (newV, oldV) {
                    console.log('触发了属性添加')
                    if (newV.length > 0) {
                        this.saleAttrsDataV1 = newV
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
            max-height: 520px;
            overflow-y: scroll;
            width: 100%;
            /*border: 1px solid #dcdcdc;*/
            .select-guige-box {
                display: flex;
                justify-content: flex-start;
                .select-box {
                    margin: 10px 5px;
                    .el-select {
                        width: 140px !important;
                        .el-input {
                            width: 140px !important;
                        }
                    }
                }
            }
            .change-table-box {
                display: flex;
                justify-content: flex-start;
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
                            text-overflow:ellipsis;
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
                                text-overflow:ellipsis;
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




