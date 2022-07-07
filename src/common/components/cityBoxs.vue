<template>
    <div class="city-boxs">
        <div class="allCity" v-if="allCity">
            <el-cascader
                    clearable
                    v-model="city"
                    ref="provincesAll"
                    @change="changeCityAll"
                    :style="{width: cWidth}"
                    placeholder="试试搜索"
                    :options="options"
                    :props="{ multiple: multiple, checkStrictly: checkStrictly }"
                    filterable>

            </el-cascader>
        </div>
    </div>
</template>

<script>
    import provinces from '/public/static/json/zsProvince'
    import citys from '/public/static/json/zsCity'
    import areas from '/public/static/json/zsArea'
    export default {
        name: '',
        props: {
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
                city: []
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
            changeCityAll(val){
                this.$emit('change', val)
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {
            'citys' (val) {
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




