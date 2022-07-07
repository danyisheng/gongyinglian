<template>
    <div class="supply-goods-detail  containerBoxInfo" :style="height">
        <category-box class="category-goods" :CategoryBtn="form.showType === 'add'"
                      :list="navigationData"></category-box>
        <div class="form-box">
            <el-form ref="form" :model="form" :rules="rules" label-width="140px">
                <div class="goods-content">
                    <h3 class="label-title">
                        基础信息
                    </h3>
                    <div class="goods-content-box goods-base">
                        <base-goods-box  :form="form" :showType="form.showType" ></base-goods-box>
                    </div>
                </div>
                <div class="goods-xuanpin">
                    <h3 class="label-title">
                        选品信息
                    </h3>
                    <div class="goods-xuanpin-box goods-base">
                        <xuanpin-box :form="form"></xuanpin-box>
                    </div>
                </div>
                <div class="goods-sale">
                    <h3 class="label-title">
                        销售信息
                    </h3>
                    <div class="goods-sale-box goods-base">
                        <goods-attribute :form="form" @changeSelectVal="changeSelectVal"></goods-attribute>
                        <common-row>
                            <common-col :lot="8">
                                <el-form-item label="售卖区域：" class="saleArea red-got" prop="SaleRegionIds">
                                    <province-box @provinceChange="changeProvince"
                                                  @provinceChangeList="provinceChangeList"
                                                  :citys="form.SaleRegionIds"
                                                  :multiple="true"
                                                  :checkStrictly="true"
                                                  isShowChecekBtn
                                                  :cWidth="'80%'"
                                                  provinceCity></province-box>
                                </el-form-item>
                            </common-col>
                        </common-row>
                        <common-row>
                            <common-col v-if="form.SaleAttrs.length > 0" :lot="8">
                                <el-form-item label="供货价：" class="red-got">
                                    <span>在标题栏中输入或选择内容可以进行筛选和批量填充</span>
                                    <sale-box @changeQuantity="changeQuantity"
                                              ref="salePriceBox"
                                              :isSaleAttribute="'price'"
                                              :cityDataDesc="cityDataDesc"
                                              :optionData="optionList"
                                              :weightsData="weightsList"
                                              :dataList="dataLisParams"
                                              :goodsType="form.Type"></sale-box>
                                </el-form-item>
                            </common-col>
                        </common-row>
                        <common-row>
                            <common-col v-if="form.SaleAttrs.length > 0" :lot="8">
                                <el-form-item label="商品销售规格：" class="red-got">
                                    <span>在标题栏中输入或选择内容可以进行筛选和批量填充。 n件商品打包共用一个物流单，即n倍。倍数最低为1，即一单一件</span>
                                    <sale-box @changeQuantity="changeQuantity"
                                              ref="saleBox"
                                              :isSaleAttribute="'attribute'"
                                              :cityDataDesc="cityDataDesc"
                                              :optionData="optionList"
                                              :weightsData="weightsList"
                                              :SpecificationValues="SpecificationValues"
                                              :goodsType="form.Type"></sale-box>
                                </el-form-item>
                            </common-col>
                        </common-row>
                        <common-row>
                            <common-col v-if="form.SaleAttrs.length === 0" :lot="8">
                                <el-form-item label="价格" class="red-got">
                                    <span>在标题栏中输入内容可以进行批量填充。</span>
                                    <smp-price-box ref="smPrice" :cityDataDesc="cityDataDesc"
                                                   v-if="form.Type=== 100"></smp-price-box>
                                    <price-box ref="zpPrice" :cityDataDesc="cityDataDesc"
                                               v-if="form.Type=== 200"></price-box>
                                </el-form-item>
                            </common-col>
                        </common-row>
                        <base-sale-box :form="form"></base-sale-box>
                    </div>
                </div>
                <div class="goods-check">
                    <div style="display: flex;justify-content: flex-start">
                        <h3 class="label-title">
                            检测报告
                        </h3>
                    </div>
                    <div class="goods-check-box goods-base">
                        <check-goods-box :form="form"></check-goods-box>
                    </div>
                </div>
                <div class="goods-title ">
                    <h3 class="label-title">
                        商品描述
                    </h3>
                    <div class="goods-base">
                        <describe-goods-box ref="describeBox" :form="form"></describe-goods-box>
                    </div>
                </div>
                <div class="supply-content" v-if="form.showType === 'look' || form.showType === 'audit'">
                    <h3 class="label-title">
                        其他信息
                    </h3>
                    <div class="goods-base">
                        <other-box :form="form"></other-box>
                    </div>
                </div>
                <div class="goods-box-aduti" v-if="form.showType === 'audit'">
                    <h3 class="label-title">
                        审核环节
                    </h3>
                    <div class="goods-base">
                        <common-row>
                            <common-col :lot="8">
                                <el-form-item label="审核结果：" prop="status"
                                              :rules="[{ required: true, message: '操作审核状态不能为空'}]">
                                    <el-select v-model="form.status" placeholder="请选择" clearable>
                                        <el-option :label="item.label" :value="item.value"
                                                   v-for="(item, index) in auditTypeList" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                            </common-col>
                        </common-row>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="action-box">
            <div class="btn-box">
                <el-button size="medium" @click="$router.go(-1)" icon="el-icon-arrow-left" type="primary">返回</el-button>
            </div>
            <div class="btn-box" v-if="form.showType === 'add' || form.showType === 'edit'">
                <el-button size="medium" @click="saveGoods('form')" class="saveBtn">保存</el-button>
            </div>
            <div class="btn-box" v-if="form.showType === 'updat' && Status === 2">
                <el-button size="medium" @click="groundSupplyGood" type="primary">申请上架</el-button>
            </div>
            <div class="btn-box" v-if="form.showType === 'updat' && Status === 1">
                <el-button size="medium" @click="underSupplyGood" type="primary">申请下架</el-button>
            </div>
            <div class="btn-box" v-if="form.showType === 'audit'">
                <el-button size="medium" @click="commitAudit" type="primary">提交</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    import qs from 'qs'
    import categoryBox from '@/common/components/goodsComponents/categoryBox'
    import provinceBox from '@/common/components/provinceBox'
    import saleBox from '@/common/components/goodsComponents/saleBox'
    import priceBox from '@/common/components/goodsComponents/priceBox'
    import smpPriceBox from '@/common/components/goodsComponents/smpPriceBox'
    import provinces from '/public/static/json/zsProvince'
    import cascaderBox from '@/common/components/goodsComponents/cascaderBox'
    import xuanpinBox from '@/common/components/goodsComponents/xuanpinBox'
    import baseGoodsBox from '@/common/components/goodsComponents/baseGoodsBox'
    import describeGoodsBox from '@/common/components/goodsComponents/describeGoodsBox'
    import checkGoodsBox from '@/common/components/goodsComponents/checkGoodsBox'
    import goodsAttribute from '@/common/components/goodsComponents/goodsAttribute'
    import baseSaleBox from '@/common/components/goodsComponents/baseSaleBox'
    import otherBox from '@/common/components/goodsComponents/otherBox'

    export default {
        name: '',
        data() {
            return {
                propObj: {
                    value: 'CategoryId',
                    label: 'Name',
                    children: 'SubCategoryList'
                },
                auditTypeList: [{label: '审核通过', value: 2000}, {label: '审核拒绝', value: 3000}],
                optionsDatas: [],
                cascaderDatas: [],
                goodsTypeList: [{label: '售卖品', value: 100}, {label: '赠品', value: 200}],
                cityDataDesc: [],
                weightsList: [],
                optionList: [],
                form: {
                    ProductionDate: '',//生产日期
                    ShelfLife: 0, //保质期(天)
                    Aftermarket: '',//售后规则
                    OpenDate: '', //选品开放时间
                    BestSellPeriod: 0,//最佳售卖期限(天)
                    DeliveryType: 100,//发货时间 0:默认状态 100:当日发昨日的选品 200:指定时间发货
                    DeliveryDate: '',//发货时间
                    SpotArriveDay: 0,//现货到货时间(天)
                    AdvanceSaleDay: 0,//预售到货时间(天)
                    MaximumShipment: 0,//单次最大发货量
                    createTime: '',
                    status: 2000,
                    checkList: [],
                    showType: '',
                    Id: '',
                    Code: '',
                    Name: '',
                    OriginRegionId: '',
                    OriginRegionIds: [],
                    OriginRegionName: '',
                    SaleRegionId: '',
                    SaleRegionIds: [],
                    SaleRegionName: '',
                    ProductCategoryId: '',
                    ProductCategoryIds: [],
                    Type: 100,
                    ShipTimesNum: 0,
                    ServicePrice: 0,
                    Quantity: 0,
                    Remark: null,
                    ContPsonName: null,
                    ContPsonMobile: null,
                    ProductReports: [],
                    ProductEnclosures: [],
                    ProductImgs: [],
                    SaleAttrs: [],
                    SaleAttrItemValues: [],
                    CategorySaleAttrItems: [],
                    addValue: '',
                    addSelectValue: '',
                    checkData: [],
                    checkDataList: [],
                    selectVal: '',
                    numVal: '',
                },
                rules: {},
                navigationData: [],
                fromCitys: [],
                citys: [],
                CustomizeSaleAttrItems: [],
                itemsVal: [],
                dataLisParams: [],
                initData: [],
                Status: null,
                reviewId: '',
                SpecificationValues: []
            }
        },
        props: [],
        computed: {
            height() {
                return {
                    height: window.innerHeight - 100 + 'px'
                }
            }
        },
        components: {
            categoryBox,
            priceBox,
            saleBox,
            smpPriceBox,
            cascaderBox,
            provinceBox,
            baseGoodsBox,
            xuanpinBox,
            describeGoodsBox,
            checkGoodsBox,
            goodsAttribute,
            baseSaleBox,
            otherBox
        },
        methods: {
            commitAudit() {
                let list = [this.reviewId]
                let title = this.form.status === 2000 ? '审核通过' : this.form.status === 3000 ? '审核拒绝' : ''
                this.reviewActionData(list, this.form.status, title, '商品', 'ManageReason', 'pt')
            },
            groundSupplyGood() {
                let list = [this.form.Id]
                console.log(list, 'list')
                this.aferActionData(list, '2', '申请上架', '商品')
            },
            underSupplyGood() {
                let list = [this.form.Id]
                this.aferActionData(list, '3', '申请下架', '商品')
            },
            cancelSupplyGood() {
                let list = [this.form.Id]
                this.reviewActionData(list, '4000', '撤销申请', '商品', 'ManageReason', 'ghs')
            },
            aferActionData(list, type, actionTitle, showTitle) {
                let params = {
                    Ids: list,
                    ManageType: type
                }
                this.$actionApi.manageApiData('/api.Erp.Product.ManageProduct', params, this, actionTitle, showTitle).then(data => {
                    this.$router.push({name: 'supplyGoodsList'})
                })
            },
            reviewActionData(list, type, actionTitle, showTitle, key, platformType) {
                let params = {
                    Ids: list,
                    Status: type
                }
                this.$actionApi.reviewApiData('/api.Erp.Product.ManageProductReview', params, this, actionTitle, showTitle, key).then(data => {
                    if (platformType === 'pt') {
                        this.$router.push({name: 'applyList'})
                    } else if (platformType === 'ghs') {
                        this.$router.push({name: 'supplyGoodsList'})
                    }
                })
            },
            changeQuantity(val) {
                this.$set(this.form, 'Quantity', val)
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
            getCheckList(list, x) { // 获取数据
                let data = []
                let listData = []
                if (list) {
                    data = list.filter(item => item.IsCheck)
                    if (data.length > 0) {
                        data.map((item, index) => {
                            let obj = {
                                CategorySaleAttrItemId: item.CategorySaleAttrItemId ? item.CategorySaleAttrItemId : this.created32Guid(),
                                SaleAttrId: item.SaleAttrId,
                                CateSaleAttrContIds: item.CateSaleAttrContIds,
                                CateSaleAttrContValues: item.CateSaleAttrContValues,
                                Value: item.Value,
                                Sequence: index,
                                IsCheck: item.IsCheck,
                                componentIndex: x
                            }
                            obj['CateSaleAttrContValues' + x] = item.CateSaleAttrContValues
                            listData.push(obj)
                        })
                    }
                }
                return listData
            },
            changeProvince(list) {
                this.cityDataDesc = list.length > 0 ? list : []
            },
            provinceChangeList(val) {
                this.form.SaleRegionIds = val
            },
            changeSelectVal(val) {
                this.itemsVal = val
            },
            getProductCategoryId() {
                return this.navigationData.map(item => item.value) || []
            },
            getGetSaleAttr(id) {
                let params = {
                    ProductCategoryId: id
                }
                let listData = []
                this.$actionApi.getApiDataV2('/api.Erp.Product.GetSaleAttr', params, this).then(data => {
                    this.form.SaleAttrs = data.SaleAttrs ? data.SaleAttrs : []
                    this.form.ProductCategoryId = data.ProductCategoryId
                    if (this.form.SaleAttrs.length > 0) {
                        let list = data.SaleAttrs.map(item => {
                            if (!item.IsAddCont) {
                                return {
                                    name: item.Name,
                                    data: this.getCheckList(item.CategorySaleAttrContsDatas.CategorySaleAttrConts[0].CategorySaleAttrItems)
                                }
                            } else {
                                return {
                                    name: item.Name,
                                    data: this.getCheckList(item.CategorySaleAttrContsDatas.CustomizeSaleAttrItems || [])
                                }
                            }
                        })
                        this.$store.dispatch('goods/setSaleAttrsData', list)
                        this.form.SaleAttrs.map(item => {
                            listData.push({
                                CategorySaleAttrId: item.CategorySaleAttrId,
                                SaleAttrId: item.SaleAttrId,
                                Name: item.Name,
                                RecordValueMode: item.RecordValueMode,
                                IsAddCont: item.IsAddCont,
                                IsRequired: item.IsRequired,
                                Sequence: item.Sequence,
                                CategorySaleAttrContsDatas: {
                                    CategorySaleAttrConts: item.CategorySaleAttrContsDatas.CategorySaleAttrConts,
                                    CustomizeSaleAttrItems: []
                                }
                            })
                        })
                        this.form.SaleAttrs = listData
                    }
                })
            },
            getItemDatas(list) {
                return list.map(item => {
                    return {
                        CategorySaleAttrItemId: item.CategorySaleAttrItemId,
                        SaleAttrId: item.SaleAttrId,
                        CateSaleAttrContIds: item.CateSaleAttrContIds,
                        CateSaleAttrContValues: item.CateSaleAttrContValues,
                        Value: item.Value,
                        Sequence: Number(item.Sequence),
                        IsCheck: item.IsCheck,
                        IsCustomize: item.IsCustomize
                    }
                })
            },
            getCategorySaleAttrContsData(list) {
                return list.map(item => {
                    return {
                        CategorySaleAttrContId: item.CategorySaleAttrContId,
                        SaleAttrId: item.SaleAttrId,
                        Type: item.Type,
                        Type100Con: item.Type100Con,
                        Sequence: item.Sequence,
                        CategorySaleAttrItems: this.getItemDatas(item.CategorySaleAttrItems)
                    }
                })
            },
            saveGoods(name) {
                let ProductReports = this.form.ProductReports.map((item, index) => {
                    return {
                        MediaId: item.MediaId,
                        MediaUrl: item.MediaUrl,
                        FileType: item.FileType ? item.FileType : 0,
                        Sequence: item.Sequence ? item.Sequence : index + 1
                    }

                })
                let ProductImgs = this.form.ProductImgs.map((item, index) => {
                    return {
                        MediaId: item.MediaId,
                        MediaUrl: item.MediaUrl,
                        FileType: item.FileType ? item.FileType : 0,
                        Sequence: item.Sequence ? item.Sequence : index + 1
                    }

                })
                let ProductEnclosures = this.form.ProductEnclosures.map((item, index) => {
                    return {
                        MediaId: item.MediaId,
                        MediaUrl: item.MediaUrl,
                        FileType: item.FileType ? item.FileType : 0,
                        Sequence: item.Sequence ? item.Sequence : index + 1
                    }
                })
                let SaleAttrsList = this.form.SaleAttrs.length > 0 ? this.form.SaleAttrs.map(item => {
                    return {
                        CategorySaleAttrId: item.CategorySaleAttrId,
                        SaleAttrId: item.SaleAttrId,
                        Name: item.Name,
                        RecordValueMode: item.RecordValueMode,
                        IsAddCont: item.IsAddCont,
                        IsRequired: item.IsRequired,
                        Sequence: item.Sequence,
                        CategorySaleAttrContsDatas: {
                            CategorySaleAttrConts: this.getCategorySaleAttrContsData(item.CategorySaleAttrContsDatas.CategorySaleAttrConts),
                            CustomizeSaleAttrItems: item.CategorySaleAttrContsDatas.CustomizeSaleAttrItems

                        }

                    }
                }) : []
                let cityVal = this.$store.state.app.checkCityData.length > 0 ? this.$store.state.app.checkCityData.map(item => item.value) : []
                if (cityVal.length === 0) {
                    this.$message.error('请选择售卖区域批量填充！')
                    return false
                }
                let params = {
                    IsAddNew: this.form.showType === 'add',
                    Id: '',
                    Name: this.form.Name,
                    ProductionDate: this.form.ProductionDate ? this.$getDate.getYYYYMMDD(this.form.ProductionDate) : '',//生产日期
                    ShelfLife: this.form.ShelfLife ? this.form.ShelfLife : 0 , //保质期(天)
                    Aftermarket: this.form.Aftermarket ? this.form.Aftermarket : '',//售后规则
                    OpenDate: this.form.OpenDate ? this.$getDate.getYYYYMMDD(this.form.OpenDate) : '', //选品开放时间
                    BestSellPeriod: this.form.BestSellPeriod ? this.form.BestSellPeriod : 0,//最佳售卖期限(天)
                    DeliveryType: this.form.DeliveryType ? this.form.DeliveryType : '',//发货时间 0:默认状态 100:当日发昨日的选品 200:指定时间发货
                    DeliveryDate: this.form.DeliveryDate ? this.$getDate.getYYYYMMDD(this.form.DeliveryDate) : '',//发货时间
                    SpotArriveDay: this.form.SpotArriveDay ? this.form.SpotArriveDay : 0,//现货到货时间(天)
                    AdvanceSaleDay: this.form.AdvanceSaleDay ? this.form.AdvanceSaleDay : 0,//预售到货时间(天)
                    MaximumShipment: this.form.MaximumShipment ? this.form.MaximumShipment : 0,//单次最大发货量
                    OriginRegionCode: this.form.OriginRegionIds.length > 0 ? this.form.OriginRegionIds[this.form.OriginRegionIds.length - 1] : '',
                    SaleRegionCode: cityVal,
                    ProductCategoryId: this.getProductCategoryId().length > 0 ? this.getProductCategoryId()[this.getProductCategoryId().length - 1] : '',
                    IsSwitch: true,
                    Type: this.form.Type,
                    ShipTimesNum: Number(this.form.ShipTimesNum),
                    ServicePrice: Number(this.form.ServicePrice),
                    Quantity: Number(this.form.Quantity),
                    Remark: this.$refs.describeBox.getContents() ? this.$refs.describeBox.getContents() : '',
                    SaleAttrs: SaleAttrsList,
                    SaleAttrItemValues: this.form.SaleAttrs.length > 0 ?
                        this.$refs.salePriceBox.getSaleBoxData() : this.form.Type === 100 ?
                            this.$refs.smPrice.getTableData() : this.form.Type === 200 ?
                                this.$refs.zpPrice.getTableData() : [],
                    SpecificationValues: this.form.SaleAttrs.length > 0 ? this.$refs.saleBox.getSpecificationData() : [],
                    ProductReports: ProductReports,
                    ProductEnclosures: ProductEnclosures,
                    ProductImgs: ProductImgs,

                }
                if (this.form.showType === 'edit') {
                    params.Id = this.form.Id
                    params.IsSwitch = false
                }
                console.log(params, '值')
                // return
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let wait = this.showLoading('请稍等.....')
                        this.$https.fetchNetPost('/api.Erp.Product.AddProduct', params).then(res => {
                            if (res.data.Success) {
                                this.$message.success('操作成功')
                                this.$router.push({name: 'supplyGoodsList'})
                                wait.close()
                            } else {
                                this.$message.error(res.data.Msg)
                                wait.close()
                            }
                        })
                    } else {
                        console.log('信息未填写完整');
                        return false;
                    }
                });
            },
            getGoodsDetail(Id, type) {
                let list = []
                let params = {Id}
                this.$actionApi.detailApiData('/api.Erp.Product.GetProductDetail', params, this).then(data => {
                    this.form = data
                    this.form.OpenDate = data.OpenDate ? this.$getDate.getYYYYMMDD(data.OpenDate) : ''
                    this.form.ProductionDate = data.ProductionDate ? this.$getDate.getYYYYMMDD(data.ProductionDate) : ''
                    this.form.DeliveryDate = data.DeliveryDate ? this.$getDate.getYYYYMMDD(data.DeliveryDate) : ''
                    this.form.showType = type
                    this.form.SaleRegionIds = data.SaleRegionCode
                    this.dataLisParams = data.SaleAttrItemValues
                    this.SpecificationValues = data.SpecificationValues
                    this.form.ProductImgs = data.ProductImgs.map(item => {
                        return {
                            MediaId: item.MediaId,
                            MediaUrl: item.MediaUrl,
                            FileType: item.FileType,
                            Sequence: item.Sequence,
                            url: item.MediaUrl,
                            name: item.MediaId
                        }
                    })
                    this.form.ProductReports = data.ProductReports.map(item => {
                        return {
                            MediaId: item.MediaId,
                            MediaUrl: item.MediaUrl,
                            FileType: item.FileType,
                            Sequence: item.Sequence,
                            url: item.MediaUrl,
                            name: item.MediaId
                        }
                    })
                    this.form.ProductEnclosures = data.ProductEnclosures.map(item => {
                        return {
                            MediaId: item.MediaId,
                            MediaUrl: item.MediaUrl,
                            FileType: item.FileType,
                            Sequence: item.Sequence,
                            url: item.MediaUrl,
                            name: item.MediaId
                        }
                    })
                    provinces.map(item => {
                        if (data.SaleRegionCode.indexOf(item.cityCode) !== -1) {
                            list.push({
                                label: item.cityName,
                                value: item.cityCode,
                                CateSaleAttrContValues: item.cityName,
                                SaleRegionCode: item.cityCode,
                            })
                        }
                    })
                    this.$store.dispatch('app/setCity', list)
                    this.cityDataDesc = list
                    // let provicestr = data.OriginRegionCode ? data.OriginRegionCode.substr(0, 2) + '0000' : ''
                    // let citystr = data.OriginRegionCode ? data.OriginRegionCode.substr(0, 4) + '00' : ''
                    // this.form.OriginRegionIds = [provicestr, citystr, data.OriginRegionCode]
                    this.form.OriginRegionIds = data.OriginRegionCode ? data.OriginRegionCode.split(',') : ''
                    this.form.Remark = data.Remark ? data.Remark : ''
                    this.navigationData = data.ProductCategorys ? data.ProductCategorys : []
                    this.optionList = data.SaleAttrs
                    this.weightsList = data.SaleRegionCode

                    if (this.form.SaleAttrs.length === 0) {
                        let _data = data.SaleAttrItemValues.map(item => {
                            return {
                                ProductSaleSpecId: item.ProductSaleSpecId ? item.ProductSaleSpecId : '',
                                SaleRegionCode: item.SaleRegionCode ? item.SaleRegionCode : '',
                                Code: item.Code ? item.Code : '',
                                Quantity: item.Quantity ? item.Quantity : 0,
                                Price: item.Price ? item.Price : 0,
                                NoPlusMaxDtPrice: item.NoPlusMaxDtPrice,
                                PlusPrice: item.PlusPrice,
                                MarketPrice:item.MarketPrice,
                                PlusMaxDtPrice: item.PlusMaxDtPrice,
                                DtPrice: item.DtPrice,
                                ShipTimesNum: item.ShipTimesNum,
                                Sequence: item.Sequence,
                                ItemSaleSpecs: item.ItemSaleSpecs ? item.ItemSaleSpecs : [],
                                label: this.getSaleDesc(item.SaleRegionCode),
                                value: item.SaleRegionCode ? item.SaleRegionCode : '',
                                SupplyPrice: item.SupplyPrice ? item.SupplyPrice : 0,
                                SellingMode: item.SellingMode ? item.SellingMode : 0
                            }
                        })
                        if (this.form.Type === 100) {
                            this.$nextTick(() => {
                                this.$refs.smPrice.tableData = _data
                            })

                        } else {
                            this.$nextTick(() => {
                                this.$refs.zpPrice.tableData = _data
                            })

                        }
                    }
                })
            },
            getSaleDesc(saleCode) {
                let list = provinces.filter(r => r.cityCode === saleCode)
                return list.length > 0 ? list[0].cityName : ''
            },
            init() {
                if (qs.parse(this.$route.query.data)) {
                    let data = qs.parse(this.$route.query.data)
                    console.log(data, '跳转数据')
                    switch (data.showType) {
                        case 'updat':
                            this.Status = Number(data.Status)
                            this.form.Id = data.id
                            this.getGoodsDetail(data.id, data.showType)
                            break
                        case 'look':
                            this.form.Id = data.id
                            this.getGoodsDetail(data.id, data.showType)
                            break
                        case 'add':
                            this.$store.dispatch('app/setCity', [])
                            this.navigationData = data.list
                            this.getGetSaleAttr(data.list[data.list.length - 1].value)
                            this.form.showType = data.showType
                            break
                        case 'edit':
                            this.form.Id = data.id
                            this.getGoodsDetail(data.id, data.showType)
                            break
                        case 'audit':
                            this.form.Id = data.id
                            this.reviewId = data.reviewId
                            this.getGoodsDetail(data.id, data.showType)
                            break
                    }
                }
            },
        },
        activated() {

        },
        created() {
        },
        mounted() {
            this.init()
        },
        watch: {}
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">
    .supply-goods-detail {
        padding-bottom: 54px;
        .category-goods {
            margin-bottom: 40px;
        }
        .goods-base {
            padding-left: 80px;
            padding-top: 40px;
            box-sizing: border-box;
        }
        .add-img{
            vertical-align:top;
            .uoloadBox{
                display: inline-block;
                vertical-align:top;
            }
            .exImg{
                text-align:center;
                width:148px;
                height:148px;
                border-radius:6px;
                border: 1px dashed #c0ccda;
                display: inline-block;
                margin-left:4px;
                .exImg-img{
                    width:120px;
                    height:90px;
                    margin-top:10px;
                }
                span{
                    color:#00000073;
                    font-size:12px;
                    background-color:#F6F6F6FF;
                    padding:0 4px;
                    border-radius:30px;
                    display:inline-block;
                    margin-top:10px;
                }
            }
        }
        .goods-content {

        }
        .goods-sale {
            margin-top: 40px;
            .goods-diam-box {
                width: 100%;
                padding: 20px;
                box-sizing: border-box;
                background-color: #FCF9FC;
                border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
                opacity: 1;
                border-radius: 10px;
                .el-checkbox-group {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    .el-checkbox {
                        margin-right: 58px;
                        margin-bottom: 20px;
                    }
                }
            }
            .guige-box {
                .weight-box {
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: nowrap;
                }
                .check-weight {
                    width: 100%;
                    padding: 20px;
                    /*margin-top: 20px;*/
                    height: 100px;
                    overflow-y: scroll;
                    margin-bottom: 20px;
                    box-sizing: border-box;
                    background-color: #FCF9FC;
                    border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
                    opacity: 1;
                    border-radius: 10px;
                    .el-checkbox-group {
                        display: flex;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                        .el-checkbox {
                            margin-right: 58px;
                            margin-bottom: 20px;
                        }
                    }
                }
            }
            .saleArea {
                .el-cascader {
                    height: inherit !important;
                    .el-input {
                        height: inherit !important;
                    }
                }

            }
        }
        .goods-check {
            margin-top: 40px;
        }
        .goods-title {
            margin-top: 40px;
        }
        .red-got .el-form-item__label:before {
            content: '*';
            color: #ff4949;
            margin-right: 4px;
        }
    }
</style>




