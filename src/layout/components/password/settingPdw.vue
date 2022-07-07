<template>
  <div class="settingPdw">
    <el-form :model="form" :rules="loginRules" ref="ruleForm">
      <el-form-item prop="oldPdw">
        <el-input v-model="form.oldPdw" placeholder="请输入密码(6位以上字符)"></el-input>
      </el-form-item>
      <el-form-item prop="newPdw">
        <el-input v-model="form.newPdw" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <div class="button">
        <el-button>取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
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
        this.form = {
          oldPdw: "",
          newPdw: ""
        };
      }
    }
  },
  data() {
    return {
      form: {
        oldPdw: "",
        newPdw: ""
      },
      loginRules: {
        oldPdw: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在6个字符以上", trigger: "blur" }
        ],
        newPdw: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在6个字符以上", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    save() {
      let loadingInstance1 = Loading.service({ fullscreen: true });
      this.$refs.ruleForm.validate(res => {
        if (res) {
          if (this.form.oldPdw.trim() == this.form.newPdw) {
            var params = {
              OldPwd: "",
              NewPwd: this.form.newPdw
            };
            this.$https
              .fetchNetPost("/api.Erp.Open.Check.UpdatePwdByOld", params)
              .then(res => {
                if (res.data.Success) {
                  this.$store.dispatch("user/getInfo").then(res => {
                    loadingInstance1.close();
                    this.$emit("getSonData", false);
                  });
                } else {
                  this.$message.error(res.data.Msg);
                  loadingInstance1.close();
                }
              });
          }else {
            this.$message.error('密码设置错误');
            loadingInstance1.close();
          }
        } else {
          this.$message.error("输入有误");
          loadingInstance1.close();
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.settingPdw {
  .el-input {
    width: 290px;
    height: 30px;
  }
  .button {
    text-align: right;
  }
}
</style>