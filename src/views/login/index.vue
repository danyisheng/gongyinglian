<template>
  <div class="login-container">
    <div class="login-top">
      <img src="../../assets/image/bg.png" alt />
      <!--<div>-->
      <!--<p>供应链管理平台</p>-->
      <!--<p>供应链管理平台</p>-->
      <!--</div>-->
    </div>
    <div class="formArea">
      <div class="tabChang">
        <div
          v-for="(item,i) in tabData"
          :key="i"
          @click="tabChangEvent(i)"
          :class="currentIndex==i?'currentColor':''"
        >{{item.name}}</div>
      </div>
    </div>
    <!-- 密码登陆 -->
    <div class="login_component" v-if="currentIndex==0">
      <psdLogin @loginHandleLogin="handleLogin"></psdLogin>
    </div>
    <!-- 快速登陆 -->
    <div class="login_component" v-else>
      <fastLogin></fastLogin>
    </div>
    <!-- 注册 -->
  </div>
</template>

<script>
import psdLogin from "./loginComponet/padLogin";
import fastLogin from "./loginComponet/fastLogin";

export default {
  name: "Login",
  components: { psdLogin, fastLogin },
  data() {
    return {
      tabData: [
        { name: "密码登陆", id: 1 },
        { name: "快捷登陆", id: 2 }
      ],
      currentIndex: 0,
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    tabChangEvent(i) {
      this.currentIndex = i;
    },
    handleLogin(val) {
      console.log(val);
      this.$router.push({
        path: this.redirect || "/"
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
.login-container {
  width: 100%;
  height: 100%;
  .login-top {
    position: relative;
    height: 280px;
    background-color: #cccccc;
    width: 100%;
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
    display: flex;
    justify-content: center;
    .tabChang {
      cursor: pointer;
      width: 400px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      > div {
        padding: 20px 30px;
        font-size: 18px;
      }
      .currentColor {
        color: #1890ff;
        border-bottom: 1px solid #1890ff;
      }
    }
  }
  .login_component {
    width: 500px;
    margin: 0 auto;
    margin-top: 10px;
  }
}
</style>

<style lang="scss" scoped>
</style>
