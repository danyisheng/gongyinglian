<template>
    <!--商品基础信息-->
    <div>
        <common-row>
            <common-col :lot="8">
                <el-form-item label="商品名称：" prop="Name" :rules="[{ required: true, message: '请输商品名称', trigger: 'blur' }]">
                    <el-input v-model="form.Name" style="width: 80%"
                              placeholder="请输入商品名称"></el-input>
                </el-form-item>
            </common-col>
        </common-row>
        <common-row>
            <common-col :lot="7">
                <el-form-item label="商品产地：" prop="OriginRegionIds" :rules="[{ required: true, message: '请选择商品产地', trigger: 'blur' }]">
                    <city-boxs :citys="form.OriginRegionIds" @change="changeCity"
                               allCity></city-boxs>
                </el-form-item>
            </common-col>
        </common-row>
        <common-row v-if="isPlatform">
            <common-col :lot="7">
                <el-form-item label="商品类型：" class="red-got">
                    <el-radio-group v-model="form.Type">
                        <el-radio :label="item.value" :key="index" :disabled="form.showType === 'edit' || form.showType === 'updat'"
                                  v-for="(item, index) in goodsTypeList">{{item.label}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </common-col>
        </common-row>
        <common-row v-if="isPlatform">
            <common-col :lot="8">
                <el-form-item label="采购类型：" class="red-got">
                    <el-radio-group v-model="form.PurchaseType">
                        <el-radio :label="item.value" :key="index"    v-for="(item, index) in purchType">{{item.label}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </common-col>
            <common-col :lot="8">
                <el-form-item label="供应商省份：" prop="SupplierRegionCode" :rules="[{ required: true, message: '请输供应商省份', trigger: 'blur' }]">
                    <province-box :citys="form.SupplierRegionCode" @provinceChangeList="changeCitys" :isDispath="true" :cWidth="'300px'"></province-box>
                </el-form-item>
            </common-col>
            <common-col :lot="8" >
                <el-form-item label="供应商姓名：" prop="SupplierName" :rules="[{ required: true, message: '请输供应商姓名', trigger: 'blur' }]">
                    <el-input v-model="form.SupplierName" style="width: 80%"
                              placeholder="请输入供应商姓名"></el-input>
                </el-form-item>
            </common-col>
            <common-col :lot="8" >
                <el-form-item label="供应商手机号：" prop="SupplierMobile" :rules="[{ required: true, message: '请输供应商手机号', trigger: 'blur' }]">
                    <el-input v-model="form.SupplierMobile" style="width: 80%"
                              placeholder="请输入供应商手机号" type="numble"   @keydown.native="channelInput"></el-input>
                </el-form-item>
            </common-col>
        </common-row>
        <common-row>
            <common-col :lot="7">
                <el-form-item label="生产日期：" prop="ProductionDate" class="red-got">
                    <el-date-picker
                            v-model="form.ProductionDate"
                            type="date"
                            style="width: 100%"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </common-col>
        </common-row>
        <common-row>
            <common-col :lot="7">
                <el-form-item label="保质期：" prop="ShelfLife"  :rules="[{ required: true, message: '请输入保质期', trigger: 'blur' }]">
                    <el-input v-model="form.ShelfLife" style="width: 100%" placeholder="请输入保质期"  type="number" @keydown.native="channelInput">
                        <span slot="append">天</span>
                    </el-input>
                </el-form-item>
            </common-col>
        </common-row>
        <common-row>
            <common-col :lot="8">
                <el-form-item label="售后规则：" prop="Aftermarket" :rules="[{ required: true, message: '请输入售卖规则', trigger: 'blur' }]" >
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入商品的售后规则，售后规则越详尽越好，保护供应者与店主双方利益，以免发生纠纷。例：收货后7天，非人为损伤，可凭运单号，照片等依据进行售后补发以及退款。"
                            v-model="form.Aftermarket">
                    </el-input>
                </el-form-item>
            </common-col>
        </common-row>
    </div>

</template>

<script>
    import cityBoxs from '@/common/components/cityBoxs'
    import provinceBox from '@/common/components/provinceBox'
    export default {
        name: '',
        data() {

            return {
                goodsTypeList: [{label: '售卖品', value: 100}, {label: '赠品', value: 200}],
                purchType: [{label: '直采', value: 100}, {label: '省营', value: 200}]
            }
        },
        props: {
            showType: {
                type: String,
                default: ''
            },
            form: {
                type: Object
            },
            isPlatform: {
                type: Boolean,
                default: false
            }
        },
        computed: {},
        components: {cityBoxs, provinceBox},
        methods: {
            changeCity (val) {
                this.form.OriginRegionIds = val
            },
            changeCitys(list){
                this.form.SupplierRegionCode = list.length > 0 ? list : []
            },
            channelInput (e) {
                let key = e.key
                let reg = /^[1-9]\d*$/
                if (key === 'e' || key === '.' || key === '-' || key === ',') {
                    e.returnValue = false
                    return false
                }
                if (reg.test(e.key)) {
                    return true
                }
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {}
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">

</style>




