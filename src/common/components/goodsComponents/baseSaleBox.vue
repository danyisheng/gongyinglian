<template>
    <!--销售部分信息-->
    <div>
        <common-row>
            <common-col :lot="8">
                <el-form-item label="总数量：" prop="Quantity"
                              :rules="[{ required: true, message: '总数量不能为空'}]">
                    <el-input type="number" @keydown.native="channelInputLimit" :min="0"
                              :disabled="form.SaleAttrs.length > 0" v-model="form.Quantity"
                              style="width: 30%"
                              placeholder="请输入总数量">
                        <span slot="append">件</span>
                    </el-input>
                </el-form-item>
            </common-col>
            <common-col :lot="8">
                <el-form-item label="服务费：" prop="ServicePrice">
                    <span>服务费+价格=平台售卖价格。服务费越高，越有可能在售卖区域被选品售卖哦，请酌情填写。</span>
                    <div>
                        <el-input type="number" v-model="form.ServicePrice" style="width: 30%"
                                  placeholder="请输入服务费" @keydown.native="channelInputLimitB" :min="0"
                                  :max="100">
                            <span slot="append">元/件</span>
                        </el-input>
                    </div>
                </el-form-item>
            </common-col>
            <common-col :lot="8" v-if="form.SaleAttrs.length === 0">
                <el-form-item label="发货倍数：" prop="ShipTimesNum"
                              :rules="[{ required: true, message: '发货倍数不能为空'}]">
                    <span>n件商品打包共用一个物流单，即n倍。倍数最低为1，即一单一件</span>
                    <div>
                        <el-input type="number" v-model="form.ShipTimesNum" style="width: 30%"
                                  placeholder="请输入发货倍数" @keydown.native="channelInputLimit" :min="0">
                            <span slot="append">倍数</span>
                        </el-input>
                    </div>
                </el-form-item>
            </common-col>
            <common-col :lot="8" v-if="form.SaleAttrs.length === 0">
                <el-form-item label="单次最大发货量：" prop="MaximumShipment"
                              :rules="[{ required: true, message: '发货倍数不能为空'}]">
                    <div>
                        <el-input type="number" v-model="form.MaximumShipment" style="width: 30%"
                                  placeholder="请输入单次最大发货量" @keydown.native="channelInputMax" :min="0">
                            <span slot="append">件</span>
                        </el-input>
                    </div>
                </el-form-item>
            </common-col>
        </common-row>
    </div>

</template>
<script>
    export default {
        name: '',
        data() {
            return {}
        },
        props: {
            form: {
                type: Object
            }
        },
        computed: {},
        components: {},
        methods: {
            channelInputLimit(e) {
                let key = e.key
                // 不允许输入'e'和'.'和'-',两位数
                if (key === 'Backspace') {
                    return true
                }
                if (key === 'e' || key === '.' || key === '-') {
                    e.returnValue = false
                    return false
                }
                return true
            },
            channelInputLimitB(e) {
                let key = e.key
                // 不允许输入'e'和'.'和'-',限制小数点后两位数
                if (key === 'Backspace') {
                    return true
                }
                let aaa = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/;
                if (key === 'e' || key === '-') {
                    e.returnValue = false
                    return false
                } else if (aaa.test(Number(this.form.ServicePrice))) {
                    e.returnValue = false
                    return false
                } else {
                    return true
                }
            },
            channelInputMax (e) {
                let key = e.key
                // 不允许输入'e'和'.'和'-',限制小数点后两位数
                if (key === 'Backspace') {
                    return true
                }
                let aaa = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/;
                if (key === 'e' || key === '-') {
                    e.returnValue = false
                    return false
                } else if (aaa.test(Number(this.form.MaximumShipment))) {
                    e.returnValue = false
                    return false
                } else {
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




