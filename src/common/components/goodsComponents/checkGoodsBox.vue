<template>
    <!--商品资质信息-->
    <div>
        <common-row>
            <common-col :lot="8">
                <el-form-item label="资质图片：" prop="ProductReports" :rules="[{ required: true, message: '资质图片不能为空'}]">
                    <span>图片不能超过300K,最多5张</span>
                    <upload-box isPictureCards @sucessUpload="changeReports"
                                :uploadfileCardLists="form.ProductReports"></upload-box>
                </el-form-item>
            </common-col>
        </common-row>
        <!--<common-row>-->
        <!--<common-col :lot="8">-->
        <!--<el-form-item label="附件：">-->
        <!--<upload-box isUploadFileList @sucessUpload="changeEnclosures"-->
        <!--:uploadLists="form.ProductEnclosures"></upload-box>-->
        <!--</el-form-item>-->
        <!--</common-col>-->
        <!--</common-row>-->
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
            changeReports(obj) {
                this.form.ProductReports = obj.list
            },
            changeEnclosures(obj) {
                this.form.ProductEnclosures = obj.list
            },
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




