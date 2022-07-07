<template>
  <div class="oneImgUpload">
    <el-upload
      class="avatar-uploader"
      :http-request="httpRequest"
      :action="acitonUrl"
      :name="'files'"
      :limit="1"
      :show-file-list="false"
      :headers="headerData"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <img v-else v-bind:src="getImage[staticUrl]" alt class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>
<script>
 import axios from 'axios'
export default {
  props: {
    acitonUrl: {
      type: String,
      default: "api.Erp.Base_Manage.Base_Media.Upload"
    },
    staticUrl: {
      type: Number,
      default: 1
    },
    headerData: {
      type: Object,
      default() {
        return {
          "Content-Type": "multipart/form-data"
        };
      }
    },
    code: {
      type: String,
      default: "CP_XZXG"
    },
    // 头像
    imageUrls: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      getImage: {
        1: require("@/assets/image/zhengmian.png"),
        2: require("@/assets/image/fanmian.png"),
        3: require("@/assets/image/zhizhao.png")
      },
     imageUrl: this.imageUrls
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //自定义上传
    httpRequest(file, e) {
      //这个获取服务器地址，相关id，相当于需要两个服务器地址
      this.$https
        .fetchNetPost(
          "/api.Erp.Base_Manage.Base_MediaModule.GetMediaModulesByArgs",
          { Code: this.code }
        )
        .then(res => {
          //然后重新发送请求将图片发送到另外一个服务，上传图传文件流
          let formData = new FormData();
          //这个后缀
          formData.append(
            "files",
            file.file,
            "a." + file.file.type.split("/")[1]
          );
          //两个id
          formData.append("userId", res.data.Data[0].CreatorId);
          formData.append("mediaModuleId", res.data.Data[0].Id);
          axios.post(res.data.Data[0].ServerHost + file.action, formData, {headers: this.headerData}).then(
            res=>{
              this.imageUrl=res.data.Data[0].Url
              this.$emit('successUpload',{
                list:res.data.Data[0],
                index:this.staticUrl
              })
            }
          )
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.oneImgUpload {
  margin-right: 20px;
  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    width: 250px;
    height: 150px;
  }
  .avatar {
    width: 250px;
    height: 150px;
    display: block;
  }
}
</style>