<template>
  <div class="changePdw">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
    >
      <el-form-item prop="phone">
        <el-input placeholder="请输入注册手机号码" v-model="loginForm.phone" class="input-with-select">
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
    </el-form>
    <div class="button">
      <el-button>取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { Loading } from "element-ui";
export default {
  props: {
    getSon: {
      type: Boolean
    }
  },
  watch: {
    getSon: function(newV, oldV) {
      if (!newV) {
        this.loginForm = {
          phone: "",
          username: "",
          verify: "",
          password: "",
          newPassword: ""
        };
        this.codeMsg = "获取验证码";
        this.codeDisabled = false;
        clearInterval(this.t);
      }
    }
  },
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
        verify: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
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
  methods: {
    getCode() {
      let that = this;
       var reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
      if (!reg.test(this.loginForm.phone)) {
        this.$message.error("手机号格式错误");
        return false;
      }
      let time = 60;
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
            that.t = setInterval(function() {
              time--;
              that.codeMsg = time + "秒";
              if (time === 0) {
                that.codeMsg = "重新获取";
                that.codeDisabled = false;
                clearInterval(that.t);
              }
            }, 1000);
          } else {
            that.codeDisabled = false;
            this.$message.error(res.data.Msg)
          }
        });
    },
    save() {
      let that = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          
          if (
            this.loginForm.password.trim() == this.loginForm.newPassword.trim()&&this.loginForm.password.trim()
          ) {
            that.checkCode();
          } else {
            this.$message.error("新密码输入错误");
          }
        } else {
          that.$message.error("注册失败！");
          return false;
        }
      });
    },
    //检查验证码，后注册
    checkCode() {
      var that = this;
      that.loadingInstance1 = Loading.service({ fullscreen: true });
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
            this.changePdw(params);
          } else {
            this.$message.error(res.data.Msg);
            that.loadingInstance1.close();
          }
        });
    },
    changePdw(params) {
      var that = this;
      params.NewPwd = this.loginForm.newPassword;
      this.$https
        .fetchNetPost("/api.Erp.Open.Check.VCodeModifyPwd", params)
        .then(res => {
          if (res.data.Success) {
            //改变用户信息
            this.$store.dispatch("user/getInfo").then(res => {
              that.loadingInstance1.close();
                this.$emit('getSonData',false)
            });
          } else {
            this.$message.error(res.data.Msg)
            that.loadingInstance1.close();
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.changePdw {
  .verify {
    position: relative;
    .verify_content {
      width: 220px;
      .el-input__icon {
        line-height: 54px;
      }
    }
    .verCode {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100px;
      height: 40px;
      border: 1px solid #dcdfe6;
      text-align: center;
      color: #1890ff;
      border-radius: 5px;
    }
  }

  .el-input {
    width: 100%;
    height: 40px;
  }
  .button {
    position: relative;
    text-align: right;
    .el-button {
      height: 35px;
      font-size: 18px;
    }
  }
}
</style>
<style lang="scss">
</style>