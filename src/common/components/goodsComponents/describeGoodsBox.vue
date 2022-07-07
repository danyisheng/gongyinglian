<template>
    <!--商品描述-->
<div>
    <common-row>
        <common-col :lot="8">
            <el-form-item label="商品图片：" prop="ProductImgs" :rules="[{ required: true, message: '商品图片不能为空'}]">
                <span>图片不能超过300K,最多5张</span>
                <div class="add-img">
                    <upload-box isPictureCards @sucessUpload="changeImgs"
                                :uploadfileCardLists="form.ProductImgs"></upload-box>
                    <div class="exImg">
                        <img src="../../../assets/image/sl.png" class="exImg-img">
                        <span>示例图，尽量上传白底图</span>
                    </div>
                </div>
            </el-form-item>
        </common-col>
        <common-col :lot="8">
            <el-form-item label="商品描述：" >
                <vue-editor :value="form.Remark" ref="editor"></vue-editor>
            </el-form-item>
        </common-col>
    </common-row>
</div>
</template>

<script>
    import vueEditor from '@/common/components/editor'
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
        components: {
            vueEditor
        },
        methods: {
            changeImgs(obj) {
                this.form.ProductImgs = obj.list
            },
            getContents () {
               return this.$refs.editor.getContent() ? this.$refs.editor.getContent() : ''
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {
        }
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">

</style>




