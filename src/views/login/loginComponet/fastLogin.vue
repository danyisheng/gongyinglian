<template>
  <div class="fastLogin">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
    >
      <el-form-item prop="phone">
        <el-input v-model="loginForm.phone" prefix-icon="el-icon-s-custom" placeholder="请输入手机号" @keyup.enter.native="beforeHandleLogin"/>
      </el-form-item>

      <el-form-item prop="verify" class="verify">
        <div class="verify_content">
          <el-input v-model="loginForm.verify" prefix-icon="el-icon-message" placeholder="请输入验证码" @keyup.enter.native="beforeHandleLogin"/>
        </div>
        <el-button :disabled="codeDisabled" class="verify_img" @click="getCode">{{codeMsg}}</el-button>
      </el-form-item>
      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登陆</el-button>
    </el-form>
    <div class="login_chang">
      <span>未注册的手机号将自动注册</span>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
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
      codeMsg: "发送验证码",
      loginForm: {
        phone: "",
        verify: ""
      },
      loginRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { max: 11, message: "请输入11位数字的手机号", trigger: "blur" },
          { validator: roluPhone, trigger: "blur" }
        ],
        verify: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    getCode() {
      var reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if (!reg.test(this.loginForm.phone)) {
        this.$message.error("手机号格式错误");
        return false;
      }
      let that = this;
      let time = 60;
      if (!this.loginForm.phone) {
        this.$message.error("请填写手机号码并发送验证码！");
        return false;
      }
      let times = new Date().getTime() + 1000 * 60;
      let params = {
        SmsType: 100,
        SmsSendType: 200,
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
          console.log(res, "ress");
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
          }else {
             that.codeDisabled = false;
            this.$message.error(res.data.Msg)
          }
        });
    },
    beforeHandleLogin() {
      if(this.loginForm.phone == '') {
        this.$message.error("请输入手机号");
        return
      }
      if(this.loginForm.verify == '') {
        this.$message.error("请输入验证码");
        return
      }
      this.handleLogin()
    },
    //登陆
    handleLogin() {
      let that = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          that.checkCode();
        } else {
          that.$message.error("注册失败！");
          return false;
        }
      });
    },
    //检查验证码，后注册
    checkCode() {
      let params = {
        SmsType: 100,
        SmsSendType: 200,
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
          }
        });
    },
    beforeLogin(params) {
      params.AppKey = "erp_admin";
      console.log(params,'pa')
      this.$store
        .dispatch("user/fastlogin", params)
        .then(res => {
          if(res){
            this.$message.error(res.data.Msg)
            return false
          }
          const hasToken = getToken();
          this.$router.push({ path: this.redirect || "/" });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="scss" >
.fastLogin {
  .verify {
    position: relative;
    .verify_content {
      width: 300px;
    }
    .verify_img {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 150px;
      height: 47px;
      border: 1px solid #1890ff;
      text-align: center;
      color: #1890ff;
      border-radius: 5px;
      line-height: 38px;
    }
  }
  .login_chang {
    color: rgba(0, 0, 0, 0.3);
    text-align: center;
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
