    <template>
    <div class="uoloadBox">
        <!--图片墙-->
        <div class="picture-card-demo" v-if="isPictureCards">
            <el-upload
                    ref="card"
                    :http-request="httpRequest"
                    multiple
                    with-credentials
                    :action="uploadUrl"
                    :file-list="uploadfileCardList"
                    list-type="picture-card"
                    :accept="accept"
                    :name="'files'"
                    :headers="headerData"
                    :before-upload="beforeUpload"
                    :on-success="success"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :limit="limitNumber"
                    :on-exceed="exceedChange"
            >
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImagecardUrl" alt/>
            </el-dialog>
        </div>

        <!--按钮上传图片-->
        <div class="picture-card-btn" v-if="isPictureBtn" :style="{width: cWidth, height: cHeight}">
            <div
                    class="picture-image"
                    @mouseenter="uploadDemoBtn = true"
                    @mouseleave="uploadDemoBtn = false"
            >
                <img :src="dialogImageUrl" alt/>
                <el-upload
                        ref="btn"
                        :http-request="httpRequest"
                        class="upload-demo-btn"
                        v-show="uploadDemoBtn"
                        with-credentials
                        :show-file-list="false"
                        :action="uploadUrl"
                        :accept="accept"
                        :name="'files'"
                        :headers="headerData"
                        :before-upload="beforeUpload"
                        :on-success="success"
                        :on-preview="handlePictureCardPreview"
                        :limit="1"
                        :on-remove="handleRemove"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </div>
        </div>
        <!--头像-->
        <div class="picture-card-avatar" v-if="isPictureAvatar">
            <el-upload
                    ref="avatar"
                    :http-request="httpRequest"
                    class="avatar-uploader"
                    with-credentials
                    :show-file-list="false"
                    :action="uploadUrl"
                    :name="'files'"
                    :limit="1"
                    :headers="headerData"
                    :accept="accept"
                    :before-upload="beforeUpload"
                    :on-success="handleAvatarSuccess"
                    :on-remove="handleRemove"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>

        <div class="upload-file-list" v-if="isUploadFileList">
            <el-upload
                    ref="file"
                    :http-request="httpRequest"
                    :action="uploadUrl"
                    :name="'files'"
                    :headers="headerData"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :file-list="uploadList"
                    multiple
            >
                <el-button size="small" type="primary">📎附件上传</el-button>
            </el-upload>
        </div>
    </div>
</template>

<script>
    import dayjs from "dayjs";
    import axios from "axios";

    export default {
        name: "",
        props: {
            cWidth: {
                type: String,
                default: "100%"
            },
            cHeight: {
                type: String,
                default: "460px"
            },
            // 附件
            isUploadFileList: {
                type: Boolean,
                default: false
            },
            // 照片墙上传
            isPictureCards: {
                type: Boolean,
                default: false
            },
            // 按钮上传
            isPictureBtn: {
                type: Boolean,
                default: false
            },
            //头像
            isPictureAvatar: {
                type: Boolean,
                default: false
            },
            // 照片墙
            uploadfileCardLists: {
                type: Array,
                default() {
                    return [];
                }
            },
            // 按钮上传图片
            dialogImageUrls: {
                type: String,
                default: ""
            },
            // 头像
            imageUrls: {
                type: String,
                default: ""
            },
            // 文件
            uploadLists: {
                type: Array,
                default() {
                    return [];
                }
            },
            accept: {
                type: String,
                default: "jpg, jpeg, png"
            },
            headerData: {
                type: Object,
                default() {
                    return {
                        "Content-Type": "multipart/form-data"
                    };
                }
            },
            type: {
                type: String,
                default: ""
            },
            Index: {
                type: Number,
                default: -1
            },
            code: {
                type: String,
                default: "CP_XZXG"
            },
            mediaData: {
                type: Object,
                default() {
                    return {};
                }
            },
            limitNumber: {
                type: Number,
                default: 5
            },
            totalImageNum: {
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                acitonUrls: "",
                uploadfileCardList: this.uploadfileCardLists, //照片墙
                imageUrl: this.imageUrls, //头像
                dialogImageUrl: this.dialogImageUrls, //单图
                uploadList: this.uploadLists, //文件
                uploadDemoBtn: false,
                dialogImagecardUrl: "",
                uploadUrl: "api.Erp.Base_Manage.Base_Media.Upload",
                dialogVisible: false
            };
        },
        computed: {},
        components: {},
        methods: {
             httpRequest(file, e) {
                 this.$https
                    .fetchNetPost(
                        "/api.Erp.Base_Manage.Base_MediaModule.GetMediaModulesByArgs",
                        {Code: this.code}
                    )
                    .then(res => {
                        if (res.data.ErrorCode === 200) {
                            if (res.data.Data.length > 0) {
                                console.log(res.data.Data, "Data");
                                let formData = new FormData();
                                formData.append(
                                    "files",
                                    file.file,
                                    "a." + file.file.type.split("/")[1]
                                );
                                formData.append("userId", res.data.Data[0].CreatorId);
                                formData.append("mediaModuleId", res.data.Data[0].Id);
                                axios
                                    .post(res.data.Data[0].ServerHost + file.action, formData, {
                                        headers: this.headerData
                                    })
                                    .then(response => {
                                        if (response.data.ErrorCode === 200) {
                                            if (res.data.Data.length > 0) {
                                                if (this.isPictureCards) {
                                                    this.uploadfileCardList.push({
                                                        MediaModuleId: response.data.Data[0].MediaModuleId,
                                                        FileFullName: response.data.Data[0].FileFullName,
                                                        FileName: response.data.Data[0].FileName,
                                                        FileSuffix: response.data.Data[0].FileSuffix,
                                                        Url: response.data.Data[0].Url,
                                                        Id: response.data.Data[0].Id,
                                                        CreateTime: response.data.Data[0].CreateTime,
                                                        CreatorId: response.data.Data[0].CreatorId,
                                                        CreatorName: response.data.Data[0].CreatorName,
                                                        ModifyTime: response.data.Data[0].ModifyTime,
                                                        EditorId: response.data.Data[0].EditorId,
                                                        EditorName: response.data.Data[0].EditorName,
                                                        IsValid: response.data.Data[0].IsValid,
                                                        name: response.data.Data[0].FileName,
                                                        url: response.data.Data[0].Url,
                                                        MediaId: response.data.Data[0].Id,
                                                        MediaUrl: response.data.Data[0].Url
                                                    });
                                                    this.$emit("sucessUpload", {
                                                        list: this.uploadfileCardList,
                                                        type: this.type,
                                                        Index: this.Index
                                                    });
                                                    this.$refs.card.clearFiles();
                                                } else if (this.isPictureBtn) {
                                                    this.$message.success("上传成功");
                                                    this.dialogImageUrl = response.data.Data[0].Url;
                                                    this.$emit("sucessUpload", {
                                                        list: response.data.Data[0],
                                                        type: this.type,
                                                        Index: this.Index
                                                    });
                                                    this.$refs.btn.clearFiles();
                                                } else if (this.isPictureAvatar) {
                                                    this.$message.success("上传成功");
                                                    this.imageUrl = response.data.Data[0].Url;
                                                    this.$emit("sucessUpload", {
                                                        list: response.data.Data[0],
                                                        type: this.type,
                                                        Index: this.Index
                                                    });
                                                    this.$refs.avatar.clearFiles();
                                                } else if (this.isUploadFileList) {
                                                    this.$message.success("上传成功");
                                                    this.uploadList.push({
                                                        MediaModuleId: response.data.Data[0].MediaModuleId,
                                                        FileFullName: response.data.Data[0].FileFullName,
                                                        FileName: response.data.Data[0].FileName,
                                                        FileSuffix: response.data.Data[0].FileSuffix,
                                                        Url: response.data.Data[0].Url,
                                                        Id: response.data.Data[0].Id,
                                                        CreateTime: response.data.Data[0].CreateTime,
                                                        CreatorId: response.data.Data[0].CreatorId,
                                                        CreatorName: response.data.Data[0].CreatorName,
                                                        ModifyTime: response.data.Data[0].ModifyTime,
                                                        EditorId: response.data.Data[0].EditorId,
                                                        EditorName: response.data.Data[0].EditorName,
                                                        IsValid: response.data.Data[0].IsValid,
                                                        name: response.data.Data[0].FileName,
                                                        url: response.data.Data[0].Url
                                                    });
                                                    this.$emit("sucessUpload", {
                                                        list: this.uploadList,
                                                        type: this.type,
                                                        Index: this.Index
                                                    });
                                                    this.$refs.file.clearFiles();
                                                }
                                            }
                                        } else {
                                            this.$message.error("上传失败");
                                        }
                                    });
                            }
                        }
                    });
            },
            handleRemove(file, fileList) {
                console.log(fileList, '1111111')
                this.$emit("sucessUpload", {
                    list: fileList,
                    type: this.type,
                    Index: this.Index
                });
            },
            handlePictureCardPreview(file) {
                this.dialogVisible = true;
                this.$nextTick(() => {
                    this.dialogImagecardUrl = file.url ? file.url : file.Url;
                })
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            exceedChange (files, fileList) {
                this.$message.error('已经超出图片上传总数！')
            },
            beforeUpload(file) {
                if (file.size > 307200) {
                    this.$message.error("图片大小不得超过300KB，请重新上传");
                    return false;
                }
            },
            success(response, file, list) {
                console.log(111);
                if (this.isPictureCards) {
                    this.$emit("sucessUpload", {
                        list,
                        type: this.type,
                        Index: this.Index
                    });
                } else if (this.isPictureBtn) {
                    this.dialogImageUrl = response.data.imgurl;
                    this.$emit("sucessUpload", {
                        imgUrl: response.data.imgurl,
                        type: this.type,
                        Index: this.Index
                    });
                } else if (this.isPictureAvatar) {
                    this.$emit("sucessUpload", {
                        imgUrl: response.data.imgurl,
                        type: this.type,
                        Index: this.Index
                    });
                }
            },
            handlePreview(file) {
                this.$emit('changeFile', file)
            },
            handleSuccess() {
            },
            init() {
                this.uploadfileCardList = [];
                this.uploadList = [];
                this.imageUrl = "";
                this.dialogImageUrl = "";
            }
        },
        created() {
            this.init();
        },
        mounted() {
        },
        watch: {
            imageUrls(val) {
                this.$nextTick(() => {
                    this.imageUrl = val;
                });
            },
            dialogImageUrls(val) {
                this.$nextTick(() => {
                    this.dialogImageUrl = val;
                });
            },
            uploadfileCardLists: {
                handler(val) {
                    this.$nextTick(() => {
                        this.uploadfileCardList = val;
                    });
                },
                immediate: true,
                deep: true
            },
            uploadLists(val) {
                this.$nextTick(() => {
                    this.uploadList = val;
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    .picture-card-btn {
        position: relative;
        border: 1px solid #dcdcdc;
        .picture-image {
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
            .upload-demo-btn {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>

<style lang="scss">
    .picture-card-avatar {
        .avatar-uploader .el-upload {
            border: 1px dashed #409eff;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409eff;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>




