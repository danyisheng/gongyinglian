<template>
  <div class="tabChang">
    <div class="tab1">
      <div
        v-for="(item,i) in tab1Data1"
        :key="i"
        @click="tab1Event(i,item.data)"
        :class="i==tab1Current1?'tab1CurrentCL':''"
      >{{item.name}}</div>
    </div>
    <div class="tab2">
      <div
        v-for="(item,i) in tab1Data2"
        :key="i"
        @click="tab2Event(i,item.data)"
        :class="i==tab1Current2?'tab2CurrentCL':''"
      >{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab1Data1: [
        { id: 0, name: "采购发货", data: "cGSendNum" },
        { id: 1, name: "货损数", data: "HSNum" },
        { id: 2, name: "新增供应商", data: "supplyer" }
      ],
      tab1Current1: 0,
      tab1Current2: 0,
      tab1Data2: [
        { id: 0, name: "近7天", data: "week" },
        { id: 1, name: "近30天", data: "mouth" },
        { id: 2, name: "近60天", data: "twomouth" }
      ],
      supolyType: null
    };
  },
  methods: {
    tab1Event(i, data) {
      this.tab1Current1 = i;
      this.$emit("handleEvent", data);
    },
    tab2Event(i, data) {
      this.tab1Current2 = i;
      this.$emit("handleEvent", data);
    },
    getTabData() {
      this.supolyType = this.$user.UserInfo().SupplierType;
      if (this.supolyType != 300) {
        this.tab1Data1 = [
          { id: 0, name: "采购发货", data: "cGSendNum" },
          { id: 1, name: "货损数", data: "HSNum" }
        ];
      }
    }
  },
  created() {
    this.getTabData();
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.tabChang {
  display: flex;
  align-items: center;
  .tab1 {
    flex: 7;
    display: flex;
    height: 40px;
    div {
      padding: 5px 20px;
      font-size: 18px;
      font-weight: 600;
      margin: 0 15px;
      &:hover{
        cursor: pointer;
      }
    }
    .tab1CurrentCL {
      border-bottom: 1px solid #1890ff;
      color: #1890ff;
    }
  }
  .tab2 {
    flex: 4;
    display: flex;
    div {
      padding: 5px 20px;
      font-size: 14px;
      border: 1px solid #1890ff;
       &:hover{
        cursor: pointer;
      }
      &:nth-of-type(1) {
        border-radius: 5px 0 0 5px;
      }
      &:nth-of-type(2) {
        border-left: none;
        border-right: none;
      }
      &:nth-of-type(3) {
        border-radius: 0 5px 5px 0;
      }
    }
    .tab2CurrentCL {
      color: #ffffff;
      background-color: #1890ff;
    }
  }
}
</style>