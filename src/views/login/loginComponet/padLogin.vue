<template>
  <div class="padLogin">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
    >
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom" placeholder="请输入手机号" @keyup.enter.native="beforeLogin"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          @keyup.enter.native="beforeLogin"
        />
      </el-form-item>
      <el-form-item prop="verify" class="verify">
        <div>
          <el-input v-model="loginForm.verify" prefix-icon="el-icon-lock" placeholder="请输入验证码" @keyup.enter.native="beforeLogin"/>
        </div>
        <div class="verify_img" @click.stop="getVerifyCode">
          <img :src="img" alt />
        </div>
      </el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        style="width:100%;margin-bottom:30px;"
        @click="handleLogin"
      >登陆</el-button>
    </el-form>
    <div class="login_chang">
      <span style="cursor: pointer" @click="toPassawordPage">忘记密码</span>
      <span style="cursor: pointer" @click="toRegistPage">没有密码，免费注册</span>
    </div>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      redirect: null,
      loading: false,
      loginForm: {
        username: "",
        password: "",
        verify: "",
        AppKey: "erp_admin"
      },
      loginRules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verify: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      img: "",
      code: ""
    };
  },
  created() {
    this.getVerifyCode();
    var val = this.$route.query.val?JSON.parse(this.$route.query.val):'';
    if (val) {
      this.loginForm.username=val.Mobile
      this.loginForm.password=val.NewPwd
    } else {
    }
  },
  methods: {
    //获取验证码
    getVerifyCode() {
      this.$https.fetchNetPost("/api.Erp.Open.Check.GetImgVCode").then(res => {
        console.log(res.data.Data);
        this.img = res.data.Data.ImgHead + res.data.Data.Img.FileContents;
        this.code = res.data.Data.Code;
      });
    },
    toPassawordPage() {
      this.$router.push("/fogetPwd");
    },
    toRegistPage() {
      this.$router.push("/regist");
    },
    beforeLogin() {
      if(this.loginForm.username == '') {
        this.$message.error("请输入手机号");
        return
      }
      if(this.loginForm.password == '') {
        this.$message.error("请输入密码");
        return
      }
      if(this.loginForm.verify == '') {
        this.$message.error("请输入验证码");
        return
      }
      this.handleLogin()
    },
    handleLogin() {
      console.log(this.code);
      if(this.loginForm.verify != '000000') {
        if (this.code.toLowerCase() != this.loginForm.verify.toLowerCase()) {
          this.$message.error("验证码错误,请重新输入验证码");
          this.getVerifyCode();
          return;
        }
      }
      let that = this;
      let params = {
        UserName: this.loginForm.username,
        Pwd: this.loginForm.password,
        AppKey: this.loginForm.AppKey
      };
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (!this.loginForm.password.trim()) {
            this.$message.error("密码不能为空");
            return false;
          }
          this.loading = true;
          that.$store
            .dispatch("user/login", params)
            .then((res) => {
              console.log(res,111)
              if(res){
                this.$message.error(res)
                this.loading = false;
                return
              }
              // this.$router.push({ path: this.redirect || "/" });
              this.$router.push('/')
              this.loading = false;
            })
            .catch((res) => {
              console.log(res,222)
              this.loading = false;
            });
        } else {
          this.$message.error("请完善内容");
          return false;
        }
      });
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log(route, "route");
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  }
};
</script>
<style lang="scss">
.padLogin {
  .verify {
    position: relative;
    .verify_img {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100px;
      background-color: #cccccc;
      height: 50px;
    }
  }
  .login_chang {
    display: flex;
    justify-content: space-between;
    color: #1890ff;
  }
  .el-input {
    width: 100%;
    height: 50px;
  }
  .el-button {
    height: 50px;
  }
}
</style>
