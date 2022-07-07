<template>
    <div class="platformAddGoods containerBoxInfo" :style="height" :loading="cascaderLoading">
        <div class="goods-content-first">
            <h3 class="label-title">
                新增商品
            </h3>
            <div class="goods-base">
                <common-row>
                    <!--<common-col :lot="8" :height="50">-->
                    <!--<el-autocomplete-->
                    <!--class="inline-input"-->
                    <!--style="width: 100%;"-->
                    <!--v-model="state"-->
                    <!--placeholder="类目搜索：可输入产品名称"-->
                    <!--&gt;</el-autocomplete>-->
                    <!--</common-col>-->
                    <!--<common-col :lot="8" :height="50">-->
                    <!--<div class="lishi-box">-->
                    <!--<label for="">发布历史:</label>-->
                    <!--<a class="font-color" href="javascript:;">冰糖心</a>-->
                    <!--<span>|</span>-->
                    <!--<a class="font-color" href="javascript:;">冰糖心</a>-->
                    <!--<span>|</span>-->
                    <!--<a class="font-color" href="javascript:;">冰糖心</a>-->
                    <!--<span>|</span>-->
                    <!--<a class="font-color" href="javascript:;">冰糖心</a>-->
                    <!--<span>|</span>-->
                    <!--<a class="font-color" href="javascript:;">冰糖心</a>-->
                    <!--</div>-->
                    <!--</common-col>-->
                    <common-col :lot="8" :height="460" class="cascader-content">
                        <cascader-box @change="cascaderChange"
                                      @changeArray="changeCascaderArray"
                                      :searchTitle="'类目关键字搜索'"
                                      :cascaderData="cascaderDatas"
                                      :optionsData="optionsDatas"
                                      :propsData="propObj"
                        ></cascader-box>
                    </common-col>
                    <common-col :lot="8" :height="70">
                        <category-box :list="listData"></category-box>
                    </common-col>
                    <common-col :lot="8" :height="50">
                        <div class="btn-box" style="margin-left: 0px;">
                            <el-button @click="$router.go(-1)" size="medium" type="primary">返回列表</el-button>
                        </div>
                        <div class="btn-box">
                            <el-button @click="next" size="medium" type="primary">下一步</el-button>
                        </div>
                    </common-col>
                </common-row>
            </div>
        </div>
    </div>
</template>

<script>
    import categoryBox from '@/common/components/goodsComponents/categoryBox'
    import cascaderBox from '@/common/components/goodsComponents/cascaderBox'
    import qs from 'qs'

    export default {
        name: '',
        data() {
            return {
                cascaderLoading: false,
                propObj: {
                    value: 'CategoryId',
                    label: 'Name',
                    children: 'SubCategoryList'
                },
                optionsDatas: [],
                cascaderDatas: [],
                listData: [],
                state: '',
                searchBox: {
                    goodsName: ''
                }
            }
        },
        props: [],
        computed: {
            height() {
                return {
                    height: window.innerHeight - 100 + 'px'
                }
            }
        },
        components: {categoryBox, cascaderBox},
        methods: {
            getGetSaleAttr () {

            },
            next() {
                if (this.cascaderDatas.length === 0) {
                    this.$message.error('请选择类目再下一步！')
                    return false
                }
                let row = {
                    showType: 'add',
                    list: this.listData
                }
                this.$router.push({name: 'platformGoodsInfo', query: {data: qs.stringify(row)}})
            },
            cascaderChange(val) {
                this.cascaderDatas = val
            },
            changeCascaderArray(arr) {
                this.listData = arr
            },
            getCategoryList() {
                let params = {
                    "IsAll": true,
                    "IsEnble": true
                }
                this.cascaderLoading = true
                this.$actionApi.getApiDataV2('/api.Erp.ProductCategory.GetProductCategoryList', params, this).then(data => {
                    this.cascaderLoading = false
                    this.optionsDatas = data
                })
            },
            init() {
                this.getCategoryList()
                if (this.$store.state.app.cargetyList.length > 0) {
                    this.cascaderDatas = this.$store.state.app.cargetyList.map(item => item.value)
                    this.listData = this.$store.state.app.cargetyList
                }
            }
        },
        created() {
        },
        mounted() {
            this.init()
        },
        watch: {}
    }
</script>

<style scoped lang="scss">
    .supplyAddGoods {
        .font-color {
            color: #1890FF;
        }
        .lishi-box {
            display: flex;
            justify-content: flex-start;
            label {
                text-align: left;
            }
            a, span {
                margin: 0px 5px;
                display: inline-block;
                height: 28px;
                line-height: 28px;
            }
        }
        .category-rule-box {
            display: flex;
            justify-content: flex-start;
        }
    }
</style>

<style lang="scss">
    .platformAddGoods {
        .cascader-box {
            height: 100%;
            .el-cascader-panel {
                height: 400px;
                .el-cascader-menu__wrap {
                    height: 100%;
                }
            }
        }
        .inline-input {
            .el-input {
                width: 80% !important;
            }
        }
    }
</style>




