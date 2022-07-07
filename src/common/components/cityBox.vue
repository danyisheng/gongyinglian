<template>
    <div class="selectCity">
        <div class="btn-box">
            <label for="" v-if="isName">{{ areaName }}：</label>
        </div>
        <div class="btn-box" :style="{ width: cWidth }">
            <el-select v-model="province" placeholder="请选择省份" clearable style="width: 100%"
                       @change="change('province')" :disabled="isDisabled">
                <el-option v-for="(item, index) in pdata" :key="index" :label="item.cityName"
                           :value="item.cityCode"></el-option>
            </el-select>
        </div>
        <div class="btn-box" :style="{ width: cWidth }">
            <el-select v-model="city" placeholder="请选择城市" style="width: 100%" clearable @change="change('city')"
                       :disabled="isDisabled">
                <el-option v-for="(item, index) in cdata" :key="index" :label="item.cityName"
                           :value="item.cityCode"></el-option>
            </el-select>
        </div>
        <div class="btn-box" :style="{ width: cWidth }" v-if="isArea">
            <el-select v-model="area" placeholder="请选择地区" clearable style="width: 100%" @change="change('area')"
                       :style="{ width: cWidth }" :disabled="isDisabled">
                <el-option v-for="(item, index) in adata" :key="index" :label="item.cityName"
                           :value="item.cityCode"></el-option>
            </el-select>
        </div>
        <div class="btn-box" v-if="isBtn">
            <el-button @click="serchBtn">搜索</el-button>
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
            isDisabled: {
                type: Boolean,
                default: false
            },
            provinces: {
                type: String,
                default: ''
            },
            citys: {
                type: String,
                default: ''
            },
            areas: {
                type: String,
                default: ''
            },
            isArea: {
                type: Boolean,
                default: false
            },
            isName: {
                type: Boolean,
                default: false
            },
            areaName: {
                type: String,
                default: '选择地区'
            },
            cWidth: {
                type: String,
                default: '190px'
            },
            isBtn: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                pdata: provinces,
                province: this.provinces,
                city: this.citys,
                area: this.areas,
            }
        },

        computed: {
            cdata() {
                return citys.filter(item => {
                    return item.parentCode === this.province
                })
            },
            adata() {
                return areas.filter(item => {
                    return item.parentCode === this.city
                })
            }
        },
        components: {},
        methods: {
            change(type) {
                console.log(type, 'type')
                let val = ''
                switch (type) {
                    case 'province':
                        this.city = ''
                        this.area = ''
                        val = this.province
                        break
                    case 'city':
                        this.areas = ''
                        val = this.city
                        break
                    case 'area':
                        val = this.area
                        break
                }
                console.log(val, 'val')
                this.$emit('changeArea', {type: type, value: val})
            },
            serchBtn() {
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
    .el-select {
        margin-right: 10px;
    }
</style>

<style lang="scss">
    .selectCity {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
    }

</style>




