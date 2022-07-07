<template>
    <div class="category-rule-box">
        <label for="">当前类目：</label>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="font-color" v-for="(item, index) in  list" :key="index">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button v-if="CategoryBtn"  @click="routerToggleBack" class="qxCategory" size="mini" type="primary">{{label}}</el-button>
    </div>
</template>

<script>
    export default {
        name: '',
        props: {
            CategoryBtn: {
                type: Boolean,
                default: false
            },
            changeType: {
                type: String,
                default: 'add'
            },
            list: {
                type: Array,
                default () {
                    return [
                        {label: 'A', value: '1'},
                        {label: 'B', value: '2'},
                        {label: 'C', value: '3'},
                    ]
                }
            },
            label: {
                type: String,
                default: '切换类目'
            }
        },
        data() {
            return {}
        },

        computed: {},
        components: {},
        methods: {
            routerToggleBack () {
                this.$store.dispatch('app/setCargetyList', this.list)
                this.$router.go(-1)
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

<style lang="less">

</style>




