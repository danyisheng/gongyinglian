<template>
    <!--选品信息-->
    <div>
        <common-row>
            <common-col :lot="7">
                <el-form-item label="选品开放时间：" prop="OpenDate" class="red-got">
                    <el-date-picker
                            style="width: 100%"
                            v-model="form.OpenDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </common-col>
        </common-row>
        <common-row>
            <common-col :lot="7">
                <el-form-item label="最佳售卖期限：" prop="BestSellPeriod"
                              :rules="[{ required: true, message: '请输入最佳售卖期限', trigger: 'blur'}]">
                    <el-input v-model="form.BestSellPeriod"   type="number"  style="width: 100%" placeholder="请输入最佳售卖期限" @keydown.native="channelInput">
                        <span slot="append">天</span>
                    </el-input>
                </el-form-item>
            </common-col>
        </common-row>
        <common-row>
            <common-col :lot="8">
                <el-form-item label="发货时间：" prop="DeliveryDate" class="red-got">
                    <el-radio-group v-model="form.DeliveryType">
                        <el-radio :label="item.id"   v-for="(item, index) in deliverList" :key="index">{{item.name}}
                        </el-radio>
                    </el-radio-group>
                    <el-date-picker
                            v-if="form.DeliveryType === 200"
                            v-model="form.DeliveryDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </common-col>
        </common-row>
        <common-row>
            <common-col :lot="7">
                <el-form-item label="现货到货时间：" prop="SpotArriveDay"
                              :rules="[{ required: true, message: '请输入现货到货时间', trigger: 'blur'}]">
                    <el-input v-model="form.SpotArriveDay"   type="number" style="width: 100%" placeholder="请输入现货到货时间"  @keydown.native="channelInput">
                        <span slot="append">天</span>
                    </el-input>
                </el-form-item>
            </common-col>
        </common-row>
        <common-row>
            <common-col :lot="7">
                <el-form-item label="预售到货时间：" prop="AdvanceSaleDay"
                              :rules="[{ required: true, message: '请输入预售到货时间', trigger: 'blur'}]">
                    <el-input v-model="form.AdvanceSaleDay"   type="number"  style="width: 100%" placeholder="请输入预售到货时间"  @keydown.native="channelInput">
                        <span slot="append">天</span>
                    </el-input>
                </el-form-item>
            </common-col>
        </common-row>
    </div>

</template>

<script>
    export default {
        name: '',
        data() {
            return {
                deliverList: [
                    {id: 100, name: '当日发昨天的选品'},
                    {id: 200, name: '指定时间发货'}
                ]
            }
        },
        props: {
            form: {
                type: Object
            }
        },
        computed: {},
        components: {},
        methods: {
            channelInput (e) {
                console.log(e, 'eeeeee')
                let key = e.key
                let reg = /^[1-9]\d*$/
                if (key === 'e' || key === '.' || key === '-') {
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




