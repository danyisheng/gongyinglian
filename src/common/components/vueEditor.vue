<template>
    <div class="editor-box">
        <editor api-key="no-api-key" :init="initBase"/>
    </div>
</template>

<script>
    // import Editor from '@tinymce/tinymce-vue'

    export default {
        name: '',
        data() {
            return {
                initBase: {
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                }
            }
        },
        props: [],
        computed: {},
        components: {
            'editor': Editor
        },
        methods: {},
        created() {
        },
        mounted() {
        },
        watch: {}
    }
</script>

<style scoped lang="less">

</style>

<style lang="less">

</style>




