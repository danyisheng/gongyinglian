<template>
    <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
        <div :id="tinymceId" class="tinymce-textarea"></div>
    </div>
</template>

<script>
    import plugins from './plugins'
    import toolbar from './toolbar'
    import axios from 'axios'
    import dayjs from 'dayjs'
    export default {
        name: 'Tinymce',
        components: {},
        props: {
            id: {
                type: String,
                default: function () {
                    return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
                }
            },
            value: {
                type: String,
                default: ''
            },
            toolbar: {
                type: Array,
                required: false,
                default() {
                    return []
                }
            },
            menubar: {
                type: String,
                default: 'file edit insert view format table'
            },
            height: {
                type: Number,
                required: false,
                default: 520
            },
            code: {
                type: String,
                default: 'CP_XZXG'
            }
        },
        data() {
            return {
                hasChange: false,
                hasInit: false,
                tinymceId: this.id,
                fullscreen: false
            }
        },
        computed: {},
        watch: {
            value(val) {
                // if (!this.hasChange && this.hasInit) {}
                this.$nextTick(() =>
                    window.tinymce.get(this.tinymceId).setContent(val || ''))
            }
        },
        mounted() {
            this.initTinymce()
        },
        activated() {
            this.initTinymce()
        },
        deactivated() {
            this.destroyTinymce()
        },
        destroyed() {
            this.destroyTinymce()
        },
        methods: {
            initTinymce() {
                const _this = this
                window.tinymce.init({
                    selector: `#${this.tinymceId}`,
                    content_style:  `
                                    *                         { padding:0; margin:0; }
                                    html, body                { height:100%; }
                                    img                       { max-width:100%; display:block;height:auto; }
                                    a                         { text-decoration: none; }
                                    iframe                    { width: 100%; }
                                    p                         { line-height:1.6; margin: 0px; }
                                    table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
                                    .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
                                    ul,ol                     { list-style-position:inside; }
                                    `,
                    language: 'zh_CN',
                    height: this.height,
                    body_class: 'panel-body ',
                    images_upload_credentials: true,
                    file_browser_callback_types: 'file image media',  // type of file
                    object_resizing: false,
                    toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
                    menubar: this.menubar,
                    plugins: plugins,
                    end_container_on_empty_block: true,
                    powerpaste_word_import: 'clean',
                    code_dialog_height: 450,
                    code_dialog_width: 1000,
                    advlist_bullet_styles: 'square',
                    advlist_number_styles: 'default',
                    imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
                    default_link_target: '_blank',
                    image_list: [],
                    link_list: [],
                    fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                    font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
                    link_title: false,
                    paste_data_image: true,
                    nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
                    init_instance_callback: editor => {
                        if (_this.value) {
                            editor.setContent(_this.value)
                        }
                        _this.hasInit = true
                        editor.on('NodeChange Change KeyUp SetContent', () => {
                            this.hasChange = true
                            this.$emit('input', editor.getContent())
                        })
                    },
                    setup(editor) {
                        editor.on('FullscreenStateChanged', (e) => {
                            _this.fullscreen = e.state
                        })
                    },
                    images_upload_handler(blobInfo, success, failure, progress) {
                        console.log(blobInfo);
                        console.log(success);
                        const headerData = {'Content-Type': 'multipart/form-data'}
                        let file = blobInfo.blob()
                        if (file.size > 307200) {
                            failure('图片大小不得超过300KB，请重新上传')
                            return false
                        }
                        _this.$https.fetchNetPost('/api.Erp.Base_Manage.Base_MediaModule.GetMediaModulesByArgs', {Code: _this.code}).then(res => {
                            if (res.data.ErrorCode === 200) {
                                if (res.data.Data.length > 0) {
                                    console.log(res.data.Data, 'Data')
                                    let formData = new FormData()
                                    formData.append('files', file, 'a.' + file.type.split("/")[1])
                                    formData.append('userId', res.data.Data[0].CreatorId);
                                    formData.append('mediaModuleId', res.data.Data[0].Id)
                                    axios.post(res.data.Data[0].ServerHost + 'api.Erp.Base_Manage.Base_Media.Upload', formData, {headers: headerData}).then(response => {
                                        if (response.data.ErrorCode === 200) {
                                            if (res.data.Data.length > 0) {
                                                success(response.data.Data[0].Url)
                                            }
                                        } else {
                                            this.$message.error('上传失败')
                                        }
                                    })
                                }
                            }
                        })

                    }
                })
            },
            destroyTinymce() {
                const tinymce = window.tinymce.get(this.tinymceId)
                if (this.fullscreen) {
                    tinymce.execCommand('mceFullScreen')
                }

                if (tinymce) {
                    tinymce.destroy()
                }
            },
            setContent(value) {
                window.tinymce.get(this.tinymceId).setContent(value)
            },
            getContent() {
                return window.tinymce.get(this.tinymceId).getContent()
            }
        }
    }
</script>

<style scoped>
    .tinymce-container {
        position: relative;
        line-height: normal;
    }

    .tinymce-container >>> .mce-fullscreen {
        z-index: 10000;
    }

    .tinymce-textarea {
        visibility: hidden;
        z-index: -1;
    }

    .editor-custom-btn-container {
        position: absolute;
        right: 4px;
        top: 4px;
        /*z-index: 2005;*/
    }

    .fullscreen .editor-custom-btn-container {
        z-index: 10000;
        position: fixed;
    }

    .editor-upload-btn {
        display: inline-block;
    }
</style>
