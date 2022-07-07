<template>
  <div class="class-con containerBox">
    <div class="class-yes-box">
      <div class="mB">
        <el-button @click="addClass" type="primary" icon="el-icon-plus">添加类目</el-button>
      </div>
      <div class="mB">
        <el-input clearable style="width: 70%;" placeholder="类目搜索：可输入产品名称" v-model="filterText" @keyup.enter.native="getfilter"></el-input>
        <el-button @click="getfilter">搜索</el-button>
      </div>
      <div class="class-content">
        <div class="tree-class-box">
          <h4>类目管理</h4>
          <el-tree
            @node-click="nodeClick"
            class="filter-tree-box"
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            node-key="CategoryId"
            label="ShortName"
            children="SubCategoryList"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
          >
            <span class="custom-tree-node-box" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="small"
                  @click="() => append(node, data)"
                  icon="el-icon-plus"
                >添加子节点</el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="() => edit(node, data)"
                  icon="el-icon-edit"
                ></el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="() => remove(node, data)"
                  icon="el-icon-delete"
                ></el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="data.IsEnble"
                  @click="() => pause(node, data ,1)"
                >
                  <img src="../../assets/image/kai@2x.png" class="closeIcon" />
                </el-button>
                <el-button type="text" size="small" v-else @click="() => pause(node, data, 2)">
                  <img src="../../assets/image/guan@2x.png" class="closeIcon" />
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
        <div class="attribute-box">
          <div class="categoryList">
            <category-box :list="navigationData"></category-box>
          </div>
          <div class="mb20">
            <el-button @click="addMarket" :disabled="!this.marketBth" type="primary">绑定销售属性</el-button>
          </div>
          <h4>销售属性配置</h4>
          <div class="table-box">
            <el-table border :data="marketList" style="width: 100%">
              <el-table-column prop="Name" label="属性名" width="180"></el-table-column>
              <el-table-column prop="RecordValueModeDesc" label="值录入方式" width="180"></el-table-column>
              <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                  <a
                    class="attribute-o"
                    @click="markrtMove(scope.row.SaleAttrId,'up')"
                    style="color: #1890FF"
                    href="javascript:;"
                  >上移</a>
                  <a
                    class="attribute-o"
                    @click="markrtMove(scope.row.SaleAttrId,'down')"
                    style="color: #1890FF"
                    href="javascript:;"
                  >下移</a>
                  <a
                    class="attribute-o"
                    @click="unbundle(scope.row.SaleAttrId)"
                    style="color: #F5222D"
                    href="javascript:;"
                  >解绑</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <dialog-sale-attribute :categoryId="categoryId" ref="dialogSaleAttribute" @change="getTagList"></dialog-sale-attribute>
  </div>
</template>

<script>
import dialogSaleAttribute from "@/common/components/dialogSaleAttribute";
let id = 1000;
export default {
  name: "",
  data() {
    return {
      categoryId: "",
      tagList: [],
      navigationData: [],
      filterText: "",
      treeData: [],
      defaultProps: {
        children: "SubCategoryList",
        label: "Name"
      },
      marketList: [],
      marketBth: false
    };
  },
  props: [],
  computed: {},
  components: { dialogSaleAttribute },
  methods: {
    //做筛选
    getfilter() {
      this.$refs.tree.filter(this.filterText);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.Name.indexOf(value) !== -1;
    },
    //加销售属性
    addMarket() {
      if (this.marketList.length < 2) {
        this.$refs.dialogSaleAttribute.dialogVisible = true;
        this.$refs.dialogSaleAttribute.getTableData(this.categoryId);
      } else {
        this.$message({
          type: "info",
          message: "绑定销售属性最多2个"
        });
      }
    },
    //点击事件
    nodeClick(node, data, event) {
      this.navigationData = [];
      switch (data.level) {
        case 1:
          this.navigationData.push({
            id: data.id,
            label: data.label
          });
          break;
        case 2:
          this.navigationData = [
            { id: data.parent.id, label: data.parent.label },
            { id: data.id, label: data.label }
          ];
          break;
        case 3:
          this.navigationData = [
            { id: data.parent.parent.id, label: data.parent.parent.label },
            { id: data.parent.id, label: data.parent.label },
            { id: data.id, label: data.label }
          ];
          break;
      }
      if (data.childNodes.length == 0 || data.childNodes == []) {
        this.marketBth = true;
        this.categoryId = data.key;
        this.getProduct();
      } else {
        this.marketBth = false;
      }
    },
    //禁用/启用
    pause(node, data, num) {
      this.$confirm("是否" + num == 1 ? "禁用" : "启用" + "此节点?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.pauseTreeList(node.key, num);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    pauseTreeList(id, num) {
      let params = {
        CategoryId: id,
        IsEnble: num == 1 ? false : true,
        Type: 2
      };
      this.loadingWait = this.showLoading("请稍候...");
      this.$https
        .fetchNetPost("/api.Erp.ProductCategory.EditCategoryData", params)
        .then(res => {
          if (res.data.ErrorCode == 200) {
            this.loadingWait.close();
            this.getData();
            this.$message({
              type: "success",
              message: "已经成功启用此节点"
            });
          } else {
            this.loadingWait.close();
            this.$message({
              type: "error",
              message: res.data.Msg
            });
          }
        });
    },
    //删除
    remove(node, data) {
      this.$confirm("是否删除此节点?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.removeTreeList(node.key);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    removeTreeList(id) {
      let params = {
        CategoryId: id
      };
      this.loadingWait = this.showLoading("请稍候...");
      this.$https
        .fetchNetPost("/api.Erp.ProductCategory.DelCategoryData", params)
        .then(res => {
          if (res.data.ErrorCode == 200) {
            this.loadingWait.close();
            this.getData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.loadingWait.close();
            this.$message({
              type: "error",
              message: res.data.Msg
            });
          }
        });
    },
    //重命名
    edit(node, data) {
      this.$prompt("分类名称", "分类修改", {
        inputPlaceholder: "请输入分类名称",
        inputPattern: /\S/,
        inputValue: data.Name,
        inputErrorMessage: "分类名称未填写",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.editTreeList(value, node.key);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    editTreeList(value, id) {
      let params = {
        CategoryId: id,
        Name: value,
        Type: 1
      };
      this.loadingWait = this.showLoading("请稍候...");
      this.$https
        .fetchNetPost("/api.Erp.ProductCategory.EditCategoryData", params)
        .then(res => {
          if (res.data.ErrorCode == 200) {
            this.loadingWait.close();
            this.getData();
            this.$message({
              type: "success",
              message: "已经成功修改" + value + "分类！"
            });
          } else {
            this.loadingWait.close();
            this.$message({
              type: "error",
              message: res.data.Msg
            });
          }
        });
    },
    //添加子节点
    append(node, data) {
      this.$prompt("分类名称", "子节点添加", {
        inputPlaceholder: "请输入子节点名称",
        inputPattern: /\S/,
        inputErrorMessage: "子节点名称未填写",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.addTree(value, node.key);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },
    //增加类目
    addClass() {
      this.$prompt("分类名称", "分类添加", {
        inputPlaceholder: "请输入分类名称",
        inputPattern: /\S/,
        inputErrorMessage: "分类名称未填写",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.addTree(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },
    //增加类目
    addTree(value, id) {
      let params = {
        ParentId: id ? id : "", //父节点id ParentId传值，为新增子节点，反之为添加同级节点
        MediaId: "", //图标id 没有可以传空字符串
        Name: value, //类目名称 必传
        ShortName: "" //类目简称 没有可以传空字符串
      };
      this.loadingWait = this.showLoading("请稍候...");
      this.$https
        .fetchNetPost("/api.Erp.ProductCategory.AddSubCategoryData", params)
        .then(res => {
          if (res.data.ErrorCode == 200) {
            this.loadingWait.close();
            this.getData();
            this.$message({
              type: "success",
              message: "已经成功添加" + value
            });
          } else {
            this.loadingWait.close();
            this.$message({
              type: "error",
              message: res.data.Msg
            });
          }
        });
    },
    //获取类目树状图
    getData() {
      let params = {
        IsAll: true
      };
      this.loadingWait = this.showLoading("请稍候...");
      this.$https
        .fetchNetPost("/api.Erp.ProductCategory.GetProductCategoryList", params)
        .then(res => {
          if (res.data.ErrorCode == 200) {
            if (res.data.Data) {
              this.treeData = res.data.Data;
            }
          } else {
            this.$message({
              type: "error",
              message: res.data.Msg
            });
          }
          this.loadingWait.close();
        });
    },
    //获取销售属性列表
    getProduct() {
      let params = {
        pagination: {
          PageIndex: 1,
          PageRows: 20,
          SortField: "Sequence",
          SortType: "asc"
        },
        CategoryId: this.categoryId
      };
      // this.loadingWait = this.showLoading('请稍候...')
      this.$https
        .fetchNetPost(
          "/api.Erp.ProductCategory.GetCategorySaleAttrList",
          params
        )
        .then(res => {
          if (res.data.ErrorCode == 200) {
            if (res.data.Data) {
              this.marketList = res.data.Data;
            } else {
              this.tableData = [];
            }
          } else {
            this.$message({
              type: "error",
              message: res.data.Msg
            });
          }
          // this.loadingWait.close()
        });
    },
    //获取传入得销售属性
    getTagList(e) {
      let saleAttrId = [];
      for (let i in e) {
        saleAttrId.push(e[i].SaleAttrId);
      }
      let params = {
        CategoryId: this.categoryId,
        SaleAttrIds: saleAttrId
      };
      this.loadingWait = this.showLoading("请稍候...");
      this.$https
        .fetchNetPost(
          "/api.Erp.ProductCategory.BindingCategorySaleAttr",
          params
        )
        .then(res => {
          if (res.data.ErrorCode == "200") {
            this.loadingWait.close();
            this.getProduct();
            this.$message({
              type: "success",
              message: "已经成功绑定销售属性"
            });
          } else {
            this.loadingWait.close();
            this.$message({
              type: "error",
              message: res.data.Msg
            });
          }
        });
    },
    //解绑
    unbundle(id) {
      let params = {
        CategoryId: this.categoryId, //类目id
        SaleAttrId: id //属性id
      };
      this.loadingWait = this.showLoading("请稍候...");
      this.$https
        .fetchNetPost(
          "/api.Erp.ProductCategory.UnBindingCategorySaleAttr",
          params
        )
        .then(res => {
          if (res.data.ErrorCode == 200) {
            this.loadingWait.close();
            this.getProduct();
            this.$message({
              type: "success",
              message: "已经成功解绑"
            });
          } else {
            this.loadingWait.close();
            this.$message({
              type: "error",
              message: res.data.Msg
            });
          }
        });
    },
    //上移/下移
    markrtMove(id, status) {
      let params = {
        CategoryId: this.categoryId, //类目id
        SaleAttrId: id, //属性id
        Move: status
      };
      this.loadingWait = this.showLoading("请稍候...");
      this.$https
        .fetchNetPost("/api.Erp.ProductCategory.MoveCategorySaleAttr", params)
        .then(res => {
          if (res.data.ErrorCode == 200) {
            this.loadingWait.close();
            this.getProduct();
            this.$message({
              type: "success",
              message: "已经成功" + (status == "up" ? "上移" : "下移")
            });
          } else {
            this.loadingWait.close();
            this.$message({
              type: "error",
              message: res.data.Msg
            });
          }
        });
    }
  },
  created() {},
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
.class-con {
  .category-rule-box {
    background-color: #fff;
    border: none;
    padding: 0;
  }
  .class-yes-box {
    .mB {
      margin: 10px 30px 20px 30px;
    }
    .class-content {
      height: calc(100vh - 240px);
      padding: 0px 30px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      .tree-class-box {
        height: 100%;
        width: 50%;
        overflow-y: scroll;
        .filter-tree-box {
          margin-top: 20px;
          box-sizing: border-box;
          .custom-tree-node-box {
            width: 100%;
            line-height: 24px;
            display: flex;
            justify-content: space-between;
            .el-button--text {
              font-size: 14px;
            }
            .closeIcon {
              width: 20px;
              height: 20px;
              vertical-align: text-top;
            }
          }
        }
      }
      .attribute-box {
        height: 100%;
        overflow-y: scroll;
        width: 48%;
        .categoryList {
          margin-bottom: 20px;
        }
        .mb20 {
          margin-bottom: 20px;
        }
        .table-box {
          margin-top: 20px;
          .attribute-o {
            color: #1890ff;
            margin: 0px 10px;
          }
          .attribute-o:first-child {
            margin-left: 0px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
</style>




