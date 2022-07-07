<template>
    <!--其他信息-->
    <div>
        <common-row>
            <common-col :lot="8">
                <el-form-item label="联系人：">
                    <el-input v-model="form.ContPsonName" style="width: 40%"
                              placeholder="请输入联系人">
                    </el-input>
                </el-form-item>
            </common-col>
            <common-col :lot="8">
                <el-form-item label="联系电话：">
                    <el-input v-model="form.ContPsonMobile" style="width: 40%"
                              placeholder="请输入联系电话">
                    </el-input>
                </el-form-item>
            </common-col>
            <common-col :lot="8">
                <el-form-item label="创建时间：">
                    <el-date-picker
                            v-model="form.CreateTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="right">
                    </el-date-picker>
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
        methods: {},
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




