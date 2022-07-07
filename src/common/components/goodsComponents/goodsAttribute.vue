<template>
    <!--商品属性-->
    <div>
        <common-row v-for="(item, index) in form.SaleAttrs" :key="index">
            <common-col v-if="!item.IsAddCont" :lot="8">
                <el-form-item :label="item.Name + ':'" :class="{'red-got':item.IsRequired}">
                    <div class="goods-diam-box"
                         v-for="(o, x) in item.CategorySaleAttrContsDatas.CategorySaleAttrConts"
                         :key="x">
                        <div v-if="o.Type === 200">
                            <el-checkbox @change="changeCheckBox(r, index, item)" :checked="r.IsCheck"
                                         v-for="(r, d) in o.CategorySaleAttrItems" :key="d">{{r.CateSaleAttrContValues}}
                            </el-checkbox>
                        </div>
                    </div>
                </el-form-item>
            </common-col>
            <common-col :lot="8" v-if="item.IsAddCont">
                <el-form-item v-if="item.RecordValueMode === 100" :label="item.Name + ':'"
                              prop="checkList" class="red-got">
                    <div class="guige-box">
                        <div class="weight-box" style="margin-bottom: 20px;">
                            <div v-for="(o, x) in item.CategorySaleAttrContsDatas.CategorySaleAttrConts"
                                 :key="x">
                                <el-input v-if="o.Type === 100" v-model="item.numVal"
                                          placeholder="请输入"
                                          style="margin: 0px 10px"
                                          clearable :type="o.Type100Con == 200?'number':'text'"></el-input>
                                <el-select v-if="o.Type === 200" v-model="item.selectVal"
                                           @change="changeSelectVal(o.CategorySaleAttrItems)"
                                           placeholder="请选择" clearable
                                           style="margin: 0px 10px">
                                    <el-option v-for="(r, d) in o.CategorySaleAttrItems"
                                               :label="r.CateSaleAttrContValues"
                                               :value="r.CategorySaleAttrItemId" :key="d"></el-option>
                                </el-select>
                            </div>
                            <el-button size="medium" @click="addChange(item, index)" type="primary">添加
                            </el-button>
                        </div>
                        <div class="check-weight">
                            <el-checkbox
                                    @change="changeCheckBox(r, index, item)"
                                    :checked="r.IsCheck"
                                    v-for="(r, d) in item.CategorySaleAttrContsDatas.CustomizeSaleAttrItems"
                                    :key="d">
                                <span>{{r.CateSaleAttrContValues}}</span>
                                <a href="javascript:;"
                                   @click="delItem(item.CategorySaleAttrContsDatas.CustomizeSaleAttrItems, d)">
                                    <i class="el-icon-delete"></i>
                                </a>
                            </el-checkbox>
                        </div>
                    </div>
                </el-form-item>
            </common-col>
        </common-row>
    </div>

</template>

<script>
    export default {
        name: '',
        data() {
            return {
                itemsVal: []
            }
        },
        props: {
            form: {
                type: Object
            }
        },
        computed: {},
        components: {},
        methods: {
            changeCheckBox(r, x) {
                r.IsCheck = !r.IsCheck
                this.$store.dispatch('goods/setCheckVal', r)
                this.$store.dispatch('goods/setIndex', x)   // 设置索引
                this.$store.dispatch('goods/setDescarte', r, x)
                this.changeAttri()

            },
            changeAttri () {
                this.$nextTick(() => {
                    let list = this.form.SaleAttrs.map((item, index) => {
                        if (!item.IsAddCont) {
                            return {
                                fields: 'CateSaleAttrContValues' + index,
                                name: item.Name,
                                data: this.getCheckList(item.CategorySaleAttrContsDatas.CategorySaleAttrConts[0].CategorySaleAttrItems || [])
                            }
                        } else {
                            return {
                                fields: 'CateSaleAttrContValues' + index,
                                name: item.Name,
                                data: this.getCheckList(item.CategorySaleAttrContsDatas.CustomizeSaleAttrItems || [])
                            }
                        }
                    })
                    console.log(list, 'list')
                    for (let i = list.length -1; i >= 0; i--) {
                        if (list[i].data.length === 0) {
                            list.splice(i, 1)
                        }
                    }
                    console.log(list, 'list12222')
                    this.$store.dispatch('goods/setSaleAttrsData', list)
                })
            },
            getCheckList(list) {
                let data = []
                let listData = []
                if (list) {
                    data = list.filter(item => item.IsCheck)
                    if (data.length > 0) {
                        data.map((item, index) => {
                            let obj = {
                                CategorySaleAttrItemId: item.CategorySaleAttrItemId ? item.CategorySaleAttrItemId : this.created32Guid(),
                                SaleAttrId: item.SaleAttrId,
                                CateSaleAttrContIds: item.CateSaleAttrContIds,
                                CateSaleAttrContValues: item.CateSaleAttrContValues,
                                Value: item.Value,
                                Sequence: index,
                                IsCheck: item.IsCheck
                            }
                            listData.push(obj)
                        })
                    }
                }
                return listData
            },
            addChange(row, x) {
                if (!row.numVal) {
                    this.$message.error('输入框必须填写！')
                    return false
                }
                let listData = row.CategorySaleAttrContsDatas.CustomizeSaleAttrItems
                listData.push({
                    CategorySaleAttrItemId: this.created32Guid(),
                    SaleAttrId: row.SaleAttrId,
                    CateSaleAttrContIds: row.CategorySaleAttrContsDatas.CategorySaleAttrConts[0].CategorySaleAttrContId,
                    CateSaleAttrContValues: (row.numVal ? row.numVal : '') + this.getFilterVal(row.selectVal),
                    Value: row.numVal + this.getFilterVal(row.selectVal),
                    Sequence: x + 1,
                    IsCheck: true,
                })
                this.$set(row.CategorySaleAttrContsDatas, 'CustomizeSaleAttrItems', listData)
                this.$set(row, 'numVal', '')
                this.$nextTick()
                this.changeAttri()
            },
            getFilterVal(id) {
                let list = this.itemsVal.filter(item => item.CategorySaleAttrItemId === id)
                return list.length > 0 ? list[0].CateSaleAttrContValues : ''
            },
            delItem(row, index) {
                row.splice(index, 1)
                this.$nextTick(() => {
                    let list = this.form.SaleAttrs.map(item => {
                        if (!item.IsAddCont) {
                            return {
                                Name: item.Name,
                                data: this.getCheckList(item.CategorySaleAttrContsDatas.CategorySaleAttrConts[0].CategorySaleAttrItems)
                            }
                        } else {
                            return {
                                Name: item.Name,
                                data: this.getCheckList(item.CategorySaleAttrContsDatas.CustomizeSaleAttrItems || [])
                            }
                        }
                    })
                    this.$store.dispatch('goods/setSaleAttrsData', list)
                })
            },
            changeSelectVal(val) {
                this.itemsVal = val
               this.$emit('changeSelectVal', val)
            },
            created32Guid (len, radix) {
                let chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('')
                let uuid = []
                let i
                radix = radix || chars.length
                if (len) {
                    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
                } else {
                    let r
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
                    uuid[14] = '4'
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16
                            uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
                        }
                    }
                }
                return uuid.join('')
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {}
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">

</style>




