<template>
    <div class="city-boxs">
        <div class="province-box" style="{display: flex;justify-content: flex-start}">
            <el-cascader
                    clearable
                    ref="province"
                    v-model="city"
                    @change="changeCityProvince"
                    :style="{width: cWidth}"
                    placeholder="试试搜索"
                    :options="provinceCityData"
                    :props="{ multiple: multiple, checkStrictly: checkStrictly }"
                    filterable>
            </el-cascader>
            <el-button v-if="isShowChecekBtn" size="medium"  @click="toggleCitys" type="primary">{{flag ? '取消全选' : '全选城市'}}</el-button>
        </div>
    </div>
</template>

<script>
    import provinces from '/public/static/json/zsProvince'
    import citys from '/public/static/json/zsCity'
    import areas from '/public/static/json/zsArea'
    export default {
        name: '',
        props:{
            isShowChecekBtn: {
                type: Boolean,
                default: false,
            },
            isDispath: {
                type: Boolean,
                default: false,
            },
            allCity: {
                type: Boolean,
                default: false,
            },
            provinceCity: {
                type: Boolean,
                default: false,
            },
            cWidth: {
                type: String,
                default: '100%'
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            checkStrictly: {
                type: Boolean,
                default: false,
            },
            citys: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        data() {
            return {
                city: [],
                flag: false
            }
        },
        computed: {
            provinceCityData () {
                return provinces.map(item => {
                    return {
                        value: item.cityCode,
                        label: item.cityName,
                        level: item.level,
                        parentCode: item.parentCode
                    }
                })
            },
            options () {
                let list = []
                list.push(...provinces, ...citys, ...areas)
                return this.getCityTreeData(list.map(item => {
                    return {
                        value: item.cityCode,
                        label: item.cityName,
                        level: item.level,
                        parentCode: item.parentCode
                    }
                }), '0')
            }
        },
        components: {},
        methods: {
            getCityTreeData (data, pid) {
                let result = []
                let temp = null
                for (var i in data) {
                    if (data[i].parentCode === pid) {
                        result.push(data[i])
                        temp = this.getCityTreeData(data, data[i].value)
                        if (temp.length > 0) {
                            data[i].children = []
                            data[i].children = temp
                        }
                    }
                }
                return result
            },
            toggleCitys () {
                this.flag = !this.flag
                let _citys = []
                let _cityList = []
                if (this.flag) {
                    _citys = this.provinceCityData.map(item => {
                        return {
                            label: item.label,
                            value: item.value,
                            CateSaleAttrContValues: item.label,
                            SaleRegionCode: item.value,
                            CategorySaleAttrItemId: item.value
                        }
                    })
                    _cityList = _citys.map(item => item.value)
                } else {
                    _citys = []
                    _cityList = []
                }
                this.$store.dispatch('app/setCity', _citys)
                this.$emit('provinceChange', _citys)
                this.$emit('provinceChangeList', _cityList)
            },
            changeCityProvince (val) {
                if (this.isDispath) {
                    this.$emit('provinceChangeList', val)
                } else {
                    if (val.length > 0) {
                        this.$nextTick(() => {
                            let list = this.$refs.province.getCheckedNodes()
                            let data = list.map(item => {
                                return {
                                    label: item.label,
                                    value: item.value,
                                    CateSaleAttrContValues: item.label,
                                    SaleRegionCode: item.value,
                                    CategorySaleAttrItemId: item.value
                                }
                            })
                            this.$store.dispatch('app/setCity', data)
                            this.$emit('provinceChange', data)
                            this.$emit('provinceChangeList', val)
                        })
                    } else {
                        this.$store.dispatch('app/setCity', [])
                        this.$emit('provinceChange', [])
                        this.$emit('provinceChangeList', val)
                    }
                }
            }
        },
        created() {
        },
        mounted() {
            this.city = this.citys
        },
        watch: {
            'citys' (val) {
                console.log(val)
                this.$nextTick(() => {
                    this.city = val
                })
            }
        }
    }
</script>

<style scoped lang="scss">

</style>

<style lang="scss">

</style>




