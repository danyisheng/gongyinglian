<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <div class="user-box">
        <el-badge :value="3" class="badge-box-content">
          <img src="../../assets/image/xiaoxi.png" alt style="width: 24px; height: 24px;" />
        </el-badge>
        <a href="javascript:;">
          <img src="../../assets/image/yhtx.png" alt style="width: 24px; height: 24px;" />
        </a>
        <a href="javascript:;">
          <span>{{RoleNames}}</span>
        </a>
        <a href="javascript:;">
          <span>{{roles}}</span>
        </a>
      </div>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span style="font-size: 14px; margin-right: 15px;">{{name}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="navbar-dropdown-menu">
          <el-dropdown-item>
            <span style="display:inline-block;" @click="attestationClick">
              <span>供应商认证</span>
              <span style="color:#FFBA00;">{{IsSupplierCertSuc?"认证通过":statusVal[getStatus]}}</span>
            </span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:inline-block;" @click="updatPassword">设置密码/修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:inline-block;width:100%;" @click="logout">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      class="pwdSetting"
      width="25%"
      :modal-append-to-body="false"
      @close="dialogClose"
    >
      <!-- 设置修改====密码 -->
      <settingPdw v-if="isTheOne" @getSonData="fatherGet" :getSon="dialogFormVisible"></settingPdw>
      <changePdw v-else @getSonData="fatherGet" :getSon="dialogFormVisible"></changePdw>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import settingPdw from "./password/settingPdw";
import changePdw from "./password/changePdw";
import { removeToken } from "@/utils/auth";
import { Loading } from "element-ui";

export default {
  data() {
    return {
      //弹框莫泰框
      dialogFormVisible: false,
      dialogTitle: "设置密码",
      isTheOne: false,
      //状态
      getStatus: this.$user.UserInfo().CertFlowStatus,
      statusVal: {
        0: "未认证",
        1000: "待审核",
        2000: "通过",
        3000: "拒绝"
      },
      IsSupplierCertSuc: this.$user.UserInfo().IsSupplierCertSuc
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    settingPdw,
    changePdw
  },
  watch: {
    navStatus(val) {
      console.log(val);
      this.getStatus = val;
    }
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device", "roles"]),
    name() {
      return this.$store.state.user.name;
    },
    roles() {
      return this.$store.state.user.roleName;
    },
    navStatus() {
      return this.$user.UserInfo().CertFlowStatus;
    },
    RoleNames() {
      return this.$user.UserInfo().RoleNames;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      this.$store.dispatch("user/resetToken").then(res => {
        console.log(res);
      });

      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    attestationClick() {
      var userInfo = this.$user.UserInfo();
      console.log(userInfo, "222");
      if (!userInfo.CertFlowStatus) {
        if (this.IsSupplierCertSuc) {
          this.$message({
            message: "认证通过",
            type: "success"
          });
          return false;
        }
        this.$router.push({ name: "qualicationApprove" });
      } else if (userInfo.CertFlowStatus == 2000) {
        this.$message({
          message: "认证通过",
          type: "success"
        });
        return false;
      } else {
        this.$router.push({
          name: "processFail",
          query: { status: userInfo.CertFlowStatus }
        });
      }
    },
    //设置修改密码
    updatPassword() {
      var userInfo = this.$user.UserInfo();
      console.log(userInfo.IsExistPwd);
      // 修改密码
      this.dialogFormVisible = true;
      if (!userInfo.IsExistPwd) {
        this.isTheOne = true;
        this.dialogTitle = "设置密码";
      } else {
        this.isTheOne = false;
        this.dialogTitle = "修改密码";
      }
    },
    //接受子数据关闭对话框
    fatherGet(val) {
      this.dialogFormVisible = val;
    },
    //关闭对话框
    dialogClose() {
      // console.log(this.dialogFormVisible)
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  background: #fff;
  padding: 0px 10px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #dcdcdc;
  .pwdSetting {
    .el-dialog {
      .el-dialog__body {
        padding-top: 15px;
      }
    }
  }
  .hamburger-container {
    line-height: 64px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    .el-breadcrumb__item {
      height: 64px;
      line-height: 64px;
    }
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .user-box {
      height: 100%;
      line-height: 50px;
      a {
        display: inline-block;
        line-height: 64px;
        margin: 0px 8px;
        img {
          line-height: 64px;
        }
      }
      a:last-child {
        margin-right: 10px;
      }
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      /*margin-right: 30px;*/

      .avatar-wrapper {
        height: 100%;
        line-height: 60px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 14px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.navbar {
  .pwdSetting {
    .el-dialog {
      .el-dialog__body {
        padding-top: 15px;
      }
    }
  }
  .breadcrumb-container {
    float: left;
    .el-breadcrumb__item {
      height: 64px;
      line-height: 64px;
    }
  }
  .badge-box-content {
    margin: 0px 10px;
    height: 100%;
    line-height: 60px;
    .el-badge__content.is-fixed {
      top: 20px;
    }
  }
}

.navbar-dropdown-menu {
  /*text-align: center;*/
  /*left: 0px;*/
  /*right: 10px;*/
  /*width: 200px;*/
  /*top: 50px !important;*/
  /*margin: 0px !important;*/
  /*padding: 0px !important;*/
  /*.el-dropdown-menu__item {*/
  /*border-bottom: 1px solid #dcdcdc;*/
  /*}*/
}

.navbar-dropdown-menu .el-dropdown-menu__item.el-dropdown-menu__item--divided {
  /*margin: 0 !important;*/
}

.navbar-dropdown-menu:first-child {
  /*margin: 0px !important;*/
}
</style>
