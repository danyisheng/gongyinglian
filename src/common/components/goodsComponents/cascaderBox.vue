<template>
    <div class="cascader-box">
        <div class="cascader-content">
            <el-cascader :placeholder="searchTitle"
                         ref="cascader"
                         popper-class="cascaderContentBox"
                         :options="optionsDatas"
                         :props="propsData"
                         style="width: 100%"
                         @visible-change="visibleChange"
                         v-model="cascaderDatas"
                         filterable>

            </el-cascader>
        </div>

        <div class="panel">
            <el-cascader-panel  :options="optionsDatas" :props="propsData" ref="cascaderPanel" v-model="cascaderDatas" @change="changes" filterable></el-cascader-panel>
        </div>

    </div>
</template>

<script>
    export default {
        name: '',
        props: {
            searchTitle: {
                type: String,
                default: ''
            },
            cascaderData: {
                type: Array,
                default () {
                    return []
                }
            },
            optionsData: {
                type: Array,
                default () {
                    return []
                }
            },
            propsData: {
                type: Object,
                default () {
                    return {
                        value: 'value',
                        label: 'label',
                        children: 'children'
                    }
                }
            }
        },
        data() {
            return {
                optionsDatas: this.optionsData,
                cascaderDatas: this.cascaderData
            }
        },
        computed: {},
        components: {},
        methods: {
            filterMethod(node, keyword) {
            },
            visibleChange(flag) {
                if (!flag) {
                    this.$nextTick(() => {
                        this.$emit('change', this.cascaders)
                        if (this.$refs.cascader.getCheckedNodes()[0]) {
                            let res = this.$refs.cascaderPanel.getCheckedNodes()[0]
                            let list = res.pathNodes.map(item => {
                                return {
                                    value: item.value,
                                    label: item.label
                                }
                            })
                            this.$emit('changeArray', list)
                        }
                    })

                }
            },
            changes(val) {
                this.$nextTick(() => {
                    this.$emit('change', val)
                    if (this.$refs.cascaderPanel.getCheckedNodes()[0]) {
                        let res = this.$refs.cascaderPanel.getCheckedNodes()[0]
                        let list = res.pathNodes.map(item => {
                            return {
                                value: item.value,
                                label: item.label
                            }
                        })
                        this.$emit('changeArray', list)
                    }
                })
            },
            delateMenuChildren (arr) {
                if (arr.length) {
                    for (let i in arr) {
                        if (arr[i].SubCategoryList.length) {
                            this.delateMenuChildren(arr[i].SubCategoryList)
                        } else {
                            delete arr[i].SubCategoryList
                        }
                    }
                }
                return arr
            }
        },
        created() {
        },
        mounted() {
        },
        watch: {
            'cascaderData' (val) {
                this.$nextTick(() => {
                    this.cascaderDatas = val
                })
            },
            optionsData: {
                handler(newVal, oldVal){
                    this.optionsDatas = this.delateMenuChildren(newVal)
                },
                deep: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .cascader-box {
    }
</style>

<style lang="scss">
    .cascader-box {
        .cascader-content {
        }
        .panel {
           margin-top: 12px;
        }
    }
    .cascaderContentBox {
        .el-cascader-panel {
            display: none !important;
        }
        .popper__arrow {
            display: none !important;
        }
    }
</style>




