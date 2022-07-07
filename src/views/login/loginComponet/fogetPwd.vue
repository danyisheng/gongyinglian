<template>
  <div class="foget-container">
    <div class="login-top">
      <img src="../../../assets/image/bg.png" alt />
      <!-- <div>
        <p>供应链管理平台</p>
        <p>Supply Chain Management Platform v1.0</p>
      </div> -->
    </div>
    <div class="formArea">
      <span>忘记密码</span>
    </div>
    <div class="login_component">
      <div class="fastLogin">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
        >
          <el-form-item prop="phone">
            <el-input placeholder="请输入手机号码" v-model="loginForm.phone" class="input-with-select">
              <template slot="prepend">+86</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="verify" class="verify">
            <div class="verify_content">
              <el-input v-model="loginForm.verify" placeholder="请输入验证码" />
            </div>
            <el-button :disabled="codeDisabled" class="verCode" @click="getCode">{{codeMsg}}</el-button>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入新密码(6位字符以上)" />
          </el-form-item>
          <el-form-item prop="newPassword">
            <el-input type="password" v-model="loginForm.newPassword" placeholder="请再次输入新密码" />
          </el-form-item>
          <div class="button">
            <el-button
              type="primary"
              :loading="loading"
              style="width:50%;margin-bottom:30px;"
              @click.native.prevent="handleLogin"
            >登录</el-button>
            <div class="login_chang">
              <span @click="toLoginPage">使用已有帐户登录</span>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getToken, setToken, removeToken } from "@/utils/auth";

export default {
  name: "Login",
  components: {},
  data() {
    var roluPhone = (rule, value, callback) => {
      var reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if (reg.test(value)) {
        return callback();
      }
      return callback("手机号格式错误");
    };
    return {
      codeDisabled: false,
      codeMsg: "获取验证码",
      loading: false,
      loginForm: {
        phone: "",
        username: "",
        verify: "",
        password: "",
        newPassword: ""
      },
      select: "",
      loginRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: roluPhone, trigger: "blur" }
        ],
        verify: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 50, message: "长度在6个字符以上", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { min: 6, max: 50, message: "长度在6个字符以上", trigger: "blur" }
        ]
      }
    };
  },
  watch: {},
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {},
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    getCode() {
      let that = this;
      let time = 60;
      var reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if (!reg.test(this.loginForm.phone)) {
        this.$message.error("手机号格式错误");
        return false;
      }
      let times = new Date().getTime() + 1000 * 60;
      let params = {
        SmsType: 100,
        SmsSendType: 300,
        CodeLength: 4,
        ExpireDate: dayjs(times).format("YYYY-MM-DD HH:mm:ss"),
        ExpireMinutes: 5,
        Mobile: this.loginForm.phone,
        IsCover: true
      };
      that.codeDisabled = true;
      this.$https
        .fetchNetPost("/api.Erp.Open.Check.SendCodeByArgs", params)
        .then(res => {
          if (res.data.Success) {
            let t = setInterval(function() {
              time--;
              that.codeMsg = time + "秒";
              if (time === 0) {
                that.codeMsg = "重新获取";
                that.codeDisabled = false;
                clearInterval(t);
              }
            }, 1000);
          } else {
            that.codeDisabled = false;
            this.$message.error(res.data.Msg);
          }
        });
    },
    checkCode() {
      let params = {
        SmsType: 100,
        SmsSendType: 300,
        Mobile: this.loginForm.phone,
        Code: this.loginForm.verify
      };
      this.$https
        .fetchNetPost("/api.Erp.Open.Check.CheckVCodeByArgs", params)
        .then(res => {
          if (res.data.Success) {
            this.beforeLogin(params);
          } else {
            this.$message.error(res.data.Msg);
            this.loading = false;
          }
        });
    },
    beforeLogin(params) {
      params.NewPwd = this.loginForm.newPassword;
      // this.$store
      //   .dispatch("user/fastlogin", params)
      //   .then(res => {
      //     this.$router.push({ path: this.redirect || "/" });
      //     this.loading = false;
      //   })
      //   .catch(() => {
      //     this.loading = false;
      //   });
      this.$https
        .fetchNetPost("/api.Erp.Open.Check.VCodeModifyPwd", params)
        .then(res => {
          if (res.data.Success) {
            var val=JSON.stringify(params)
            this.$router.push({ path: "/login", query: { val } });
            this.$message({
              message: "修改密码成功",
              type: "success"
            });
          } else {
            this.$message.error(res.data.Msg);
            this.loading = false;
          }
        });
    },
    toLoginPage() {
      this.$router.push("/login");
    },
    tabChangEvent(i) {
      this.currentIndex = i;
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= "a" && key <= "z") ||
          (!shiftKey && key >= "A" && key <= "Z")
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    //登陆
    handleLogin() {
      let that = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (
            that.loginForm.password.trim() == that.loginForm.newPassword &&
            that.loginForm.password.trim()
          ) {
            this.loading = true;
            that.checkCode();
          } else {
            that.$message.error("密码错误");
          }
        } else {
          that.$message.error("注册失败！");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss">
.foget-container {
  width: 100%;
  height: 100%;
  .login-top {
    position: relative;
    height: 280px;
    width: 100%;
    // background:rgba(24,144,255,0.8) url('../../../assets/image/login_bg.png') no-repeat;
    // background-color:rgba(55,164,255,1);
    // margin-bottom: 20px;
    img {
      width: 100%;
      height: 280px;
      font-size: 0;
    }
    > div {
      position: absolute;
      width: 300px;
      height: 100px;
      top: 100px;
      left: 50%;
      margin-left: -150px;
      text-align: center;
      p:first-child {
        font-size: 34px;
        color: #ffffff;
      }
      p:last-child {
        font-size: 14px;
        color: #ffffff;
        margin-top: 20px;
      }
    }
  }
  .formArea {
    width: 500px;
    margin: 0 auto;
    font-size: 18px;
    margin-top: 30px;
    color: #000000;
  }
  .login_component {
    width: 500px;
    margin: 0 auto;
    margin-top: 20px;
    .fastLogin {
      .el-select .el-input {
        width: 80px;
        .el-select .el-select--medium {
          width: 80px;
        }
        .el-input__suffix {
          line-height: 50px;
        }
      }
      .input-with-select .el-input-group__prepend {
        background-color: #fff;
      }
      .verify {
        position: relative;
        .verify_content {
          width: 330px;
          .el-input__icon {
            line-height: 54px;
          }
        }
        .verCode {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 150px;
          height: 50px;
          border: 1px solid #dcdfe6;
          text-align: center;
          color: #1890ff;
          border-radius: 5px;
        }
      }

      .el-input {
        width: 100%;
        height: 50px;
      }
      .button {
        position: relative;
        .el-button {
          height: 50px;
          font-size: 18px;
        }
        .login_chang {
          position: absolute;
          width: 200px;
          height: 50px;
          text-align: center;
          right: 0;
          top: 0;
          line-height: 50px;
          color: #1890ff;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.fastLogin {
  .el-select {
    width: 80px;
  }
}
</style>
v
