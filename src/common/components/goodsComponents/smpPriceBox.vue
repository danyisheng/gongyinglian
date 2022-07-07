<template>
  <!--无属性售卖品信息-->
  <div class="price-box">
    <common-row>
      <common-col :lot="8" class="price-btn">
        <el-button size="medium" @click="addComit" type="primary">批量填充</el-button>
      </common-col>
    </common-row>
    <div class="city-type-box">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column label="省份"  align="center" prop="label"></el-table-column>
        <el-table-column width="220">
          <template slot="header" slot-scope="scope">
            <div class="red-gots">
              <p>售卖方式</p>
            </div>
            <el-select v-model="searchBox.SellingMode" placeholder="请选择"   clearable style="width: 80%;"
                       @change="clickFocus('SellingMode')">
              <el-option :label="item.label" :value="item.value"
                         v-for="(item, index) in sellingModeList" :key="index"></el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            <el-select v-model="scope.row.SellingMode" placeholder="请选择" clearable style="width: 80%;">
              <el-option :label="item.label" :value="item.value"
                         v-for="(item, index) in sellingModeList" :key="index"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column v-if=" platformType === 'pt'" width="180">
          <template slot="header" slot-scope="scope">
            <div class="red-gots">
              <p>Plus会员价格</p>
            </div>
            <el-input
              type="number"
              @focus="clickFocus('PlusPrice')"
              v-model="searchBox.PlusPrice"
              size="mini"
              style="width: 100%"
              placeholder="Plus会员价格（元）批量填充"
            />
          </template>
          <template slot-scope="scope">
            <el-input
              style="width: 100%"
              type="number"
              v-model="scope.row.PlusPrice"
              size="mini"
              placeholder="Plus会员价格（元）"
            />
          </template>
        </el-table-column>
        <el-table-column v-if="platformType === 'pt'" width="180">
          <template slot="header" slot-scope="scope">
            <div class="red-gots">
              <p>Plus会员最多抵扣金额</p>
            </div>
            <el-input
              @focus="clickFocus('PlusMaxDtPrice')"
              type="number"
              v-model="searchBox.PlusMaxDtPrice"
              size="mini"
              style="width: 100%"
              placeholder="Plus会员最多抵扣金额批量填充"
            />
          </template>
          <template slot-scope="scope">
            <el-input
              style="width: 100%"
              type="number"
              v-model="scope.row.PlusMaxDtPrice"
              size="mini"
              placeholder="Plus会员最多抵扣金额"
            />
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <div class="red-gots">
              <p>{{platformType === 'pt' ? '价格' : '供货价'}}</p>
            </div>
            <el-input
              @focus="clickFocus('Price')"
              type="number"
              v-model="searchBox.Price"
              size="mini"
              style="width: 100%"
              :placeholder="platformType === 'pt' ? '请输入价格' : '请输入供货价（元）'"
            />
          </template>
          <template slot-scope="scope">
            <el-input
              style="width: 100%"
              type="number"
              v-model="scope.row.Price"
              size="mini"
              :placeholder="platformType === 'pt' ? '请输入价格' : '请输入供货价'"
            />
          </template>
        </el-table-column>

        <el-table-column v-if="platformType === 'pt'" width="180">
          <template slot="header" slot-scope="scope">
            <div class="red-gots">
              <p>非会员最多抵扣金额</p>
            </div>
            <el-input
              @focus="clickFocus('NoPlusMaxDtPrice')"
              type="number"
              v-model="searchBox.NoPlusMaxDtPrice"
              size="mini"
              style="width: 100%"
              placeholder="非会员最多抵扣金额 （元）批量填充"
            />
          </template>
          <template slot-scope="scope">
            <el-input
              style="width: 100%"
              type="number"
              v-model="scope.row.NoPlusMaxDtPrice"
              size="mini"
              placeholder="非会员最多抵扣金额（元）"
            />
          </template>
        </el-table-column>
        <el-table-column width="180">
          <template slot="header" slot-scope="scope">
            <div class="red-gots">
              <p>市场价</p>
            </div>
            <el-input
              @focus="clickFocus('MarketPrice')"
              type="number"
              v-model="searchBox.MarketPrice"
              size="mini"
              style="width: 100%"
              placeholder="市场价"
            />
          </template>
          <template slot-scope="scope">
            <el-input
              style="width: 100%"
              type="number"
              v-model="scope.row.MarketPrice"
              size="mini"
              placeholder="市场价格（元））"
            />
          </template>
        </el-table-column>
        <el-table-column width="180"  v-if=" platformType === 'pt'">
          <template slot="header" slot-scope="scope">
            <div class="red-gots">
              <p>供货价</p>
            </div>
            <el-input
                    @focus="clickFocus('SupplyPrice')"
                    clearable
                    type="number"
                    v-model="searchBox.SupplyPrice"
                    size="mini"
                    style="width: 100%"
                    placeholder="请输入供货价"/>
          </template>
          <template slot-scope="scope">
            <el-input clearable style="width: 100%" type="number" v-model="scope.row.SupplyPrice"
                      placeholder="请输入供货价"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      searchBox: {
        NoPlusMaxDtPrice: null,
        Price: null,
        PlusPrice: null,
        PlusMaxDtPrice: null,
        MarketPrice: null,
        SupplyPrice: null,
        SellingMode: ''
      },
      fileds: "",
      tableData: [],
      sellingModeList: [
        {label: '仅现货 ', value: 100},
        {label: '仅预售', value: 200},
        {label: '现货+预售', value: 300}
      ]
    };
  },
  props: ["cityDataDesc", "platformType"],
  computed: {
    saleAttrsData() {
      return this.$store.state.goods.SaleAttrsData;
    }
  },
  components: {},
  methods: {
    init() {
      let list = this.cityDataDesc || this.$store.state.app.checkCityData;
      if (list.length > 0) {
        this.tableData = list.map(item => {
          return {
            NoPlusMaxDtPrice: 0,
            Price: 0,
            PlusPrice: 0,
            PlusMaxDtPrice: 0,
            value: item.value,
            label: item.label,
            MarketPrice: 0,
            SupplyPrice: 0,
            SellingMode: 0
          };
        });
      } else {
        this.tableData = [];
      }
    },
    addComit() {
      console.log("33333");
      this.tableData.map(item => {
        this.$set(item, this.fileds, this.searchBox[this.fileds]);
      });
      this.searchBox = {
        NoPlusMaxDtPrice: null,
        Price: null,
        PlusPrice: null,
        PlusMaxDtPrice: null,
        SupplyPrice: null,
        SellingMode: null
      };
    },
    clickFocus(fileds) {
      this.fileds = fileds;
    },
    getTableData() {
      // return
      return this.tableData.map((item, index) => {
        return {
          ProductSaleSpecId: item.ProductSaleSpecId
            ? item.ProductSaleSpecId
            : "",
          SaleRegionCode: item.value ? item.value : "",
          Price: item.Price ? Number(item.Price) : 0,
          MarketPrice: item.MarketPrice ?  parseFloat(item.MarketPrice) : 0,
          NoPlusMaxDtPrice: item.NoPlusMaxDtPrice
            ? Number(item.NoPlusMaxDtPrice)
            : 0,
          PlusPrice: item.PlusPrice ? Number(item.PlusPrice) : 0,
          PlusMaxDtPrice: item.PlusMaxDtPrice ? Number(item.PlusMaxDtPrice) : 0,
          Sequence: item.Sequence ? item.Sequence : index + 1,
          ItemSaleSpecs: item.ItemSaleSpecs ? item.ItemSaleSpecs : [],
          SupplyPrice: item.SupplyPrice ? Number(item.SupplyPrice) : 0,
          SellingMode: item.SellingMode ? item.SellingMode : 0
        };
      });
    }
  },
  created() {},
  mounted() {},
  watch: {
    cityDataDesc: {
      deep: true, //深度监听设置为 true
      handler: function(newV, oldV) {
        if (newV.length > 0) {
          this.init();
        } else {
          this.tableData = [];
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.price-box {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fcf9fc;
  border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
  opacity: 1;
  border-radius: 10px;
  .price-btn {
    text-align: right;
  }
  .city-type-box {
    margin-top: 10px;
  }
  .red-gots p:before {
     content: '*';
     color: #ff4949;
     margin-right: 4px;
     vertical-align: middle;
   }
}
</style>

<style lang="scss">
</style>




