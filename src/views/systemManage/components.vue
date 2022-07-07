<template>
    <div class="components containerBox" :style="height">
        <h4>导入文件</h4>
        <div class="components-box">
            <el-button @click="exportData">导出excel</el-button>
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"></upload-excel-component>
            <el-table :data="tableExcelData" border highlight-current-row style="width: 100%;margin-top:20px;">
                <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
            </el-table>

        </div>
        <h4>商品类目导航</h4>
        <div class="components-box">
            <category-box></category-box>
        </div>
        <h4>联动面板</h4>
        <div class="components-box">
            <cascader-box :optionsData="options"></cascader-box>
        </div>
        <h4>价格设置一</h4>
        <div class="components-box">
            <price-box></price-box>
        </div>
        <h4>价格设置二</h4>
        <div class="components-box">
            <div class="btn-box">
                <el-button @click="clickDialog('dialogSmpBox')" size="medium" type="primary">售卖品价格弹框</el-button>
            </div>
            <div class="btn-box">
                <el-button  @click="clickDialog('dialogZpBox')" size="medium" type="primary">赠品价格设置弹框</el-button>
            </div>
            <div class="btn-box">
                <el-button  @click="clickDialog('dialogSaleAttribute')" size="medium" type="primary">销售属性弹框</el-button>
            </div>
        </div>
        <div class="components-box">
            <sale-box></sale-box>
        </div>
        <h4>操作</h4>
        <div class="components-box">
            <div class="btn-box">
                <el-button @click="loading" size="medium" type="primary">加载</el-button>
            </div>
            <div class="btn-box">
                <el-button @click="del" size="medium" type="primary">删除</el-button>
            </div>
            <div class="btn-box">
                <el-button @click="clickModal" size="medium" type="primary">弹框</el-button>
            </div>
        </div>
        <h4>附件上传</h4>
        <div class="components-box">
            <upload-box isUploadFileList></upload-box>
        </div>
        <h4>图片上传I</h4>
        <div class="components-box">
            <upload-box isPictureAvatar :imageUrls="'https://www.ddtapp.cn/upload/gylDev20200227/b07e7ba1dca442f19af909b19b4e3340.png'"></upload-box>
        </div>
        <h4>图片上传II</h4>
        <div class="components-box">
            <upload-box @sucessUpload="sucessUpload" isPictureCards :uploadfileCardLists="[{name: 'food.jpeg', url: 'https://www.ddtapp.cn/upload/gylDev20200227/b07e7ba1dca442f19af909b19b4e3340.png'}]"></upload-box>
        </div>
        <h4>图片上传III</h4>
        <div class="components-box">
            <upload-box isPictureBtn :dialogImageUrls="'https://www.ddtapp.cn/upload/gylDev20200227/b07e7ba1dca442f19af909b19b4e3340.png'"></upload-box>
        </div>
        <h4>城市选择一(单选)</h4>
        <div class="components-box">
            <city-box isArea></city-box>
        </div>
        <h4>城市选择二(单选)</h4>
        <div class="components-box">
            <city-boxs :citys="citys" allCity></city-boxs>
        </div>
        <h4>城市选择二(多选)</h4>
        <div class="components-box check-area-box" >
            <city-boxs :citys="citys" :multiple="true" :checkStrictly="true" allCity></city-boxs>
        </div>
        <h4>省份选择(多选)</h4>
        <div class="components-box check-area-box">
            <province-box :citys="citys" :multiple="true" :checkStrictly="true"></province-box>
        </div>
        <h4>图文编辑</h4>
        <div class="components-box">
            <vue-editor :value="content" ref="editor"></vue-editor>
            <div style="margin: 20px 0px">
                <el-button @click="getContent">获取内容</el-button>
            </div>
        </div>
        <h4>地图</h4>
        <div class="components-box">
            <maps-box ref="mapBox" @change="changeMap" :lngs="113" :lats="222"></maps-box>
        </div>
        <el-dialog
                width="720"
                class="dialog-box"
                :visible.sync="dialogVisible">
            <div style="text-align: center" slot="title">
                这是弹框
            </div>
            <div class="form-modal-box">
                <el-form ref="form" :model="filterCondition" label-width="90px">
                    <common-row>
                        <common-col :lot="7">
                            <el-form-item label="开始日期">
                                <el-date-picker v-model="filterCondition.Begin_Date" type="date" :clearable="false"
                                                placeholder="操作生成开始日期"></el-date-picker>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="7">
                            <el-form-item label="结束日期">
                                <el-date-picker v-model="filterCondition.End_Date" type="date" :clearable="false"
                                                placeholder="操作生成结束日期"></el-date-picker>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="7">
                            <el-form-item label="结束日期">
                                <el-date-picker v-model="filterCondition.End_Date" type="date" :clearable="false"
                                                placeholder="操作生成结束日期"></el-date-picker>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="7">
                            <el-form-item label="活动名称">
                                <el-input v-model="filterCondition.End_Date"></el-input>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="7">
                            <el-form-item label="活动区域">
                                <el-select v-model="filterCondition.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="8">
                            <el-form-item label="活动性质">
                                <el-checkbox-group v-model="filterCondition.type">
                                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="8">
                            <el-form-item label="即时配送">
                                <el-switch v-model="filterCondition.delivery"></el-switch>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="8">
                            <el-form-item label="特殊资源">
                                <el-radio-group v-model="filterCondition.resource">
                                    <el-radio label="线上品牌商赞助"></el-radio>
                                    <el-radio label="线下场地免费"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </common-col>
                        <common-col :lot="7"></common-col>
                        <common-col :lot="8">
                            <el-form-item label="活动形式">
                                <el-input type="textarea" v-model="filterCondition.desc"></el-input>
                            </el-form-item>
                        </common-col>
                    </common-row>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <dialog-zp-box  ref="dialogZpBox"></dialog-zp-box>
        <dialog-smp-box ref="dialogSmpBox"></dialog-smp-box>
        <dialog-sale-attribute :tags="tagList" ref="dialogSaleAttribute"></dialog-sale-attribute>
    </div>
</template>

<script>
    import provinceBox from '@/common/components/provinceBox'
    import uploadBox from '@/common/components/uploadBox'
    import vueEditor from '@/common/components/editor'
    import cityBox from '@/common/components/cityBox'
    import cityBoxs from '@/common/components/cityBoxs'
    import mapsBox from '@/common/components/mapsBox'
    import cascaderBox from '@/common/components/goodsComponents/cascaderBox'
    import priceBox from '@/common/components/goodsComponents/priceBox'
    import saleBox from '@/common/components/goodsComponents/saleBox'
    import categoryBox from '@/common/components/goodsComponents/categoryBox'
    import dialogSmpBox from '@/common/components/goodsComponents/dialogSmpBox'
    import dialogZpBox from '@/common/components/goodsComponents/dialogZpBox'
    import dialogSaleAttribute from '@/common/components/dialogSaleAttribute'
    import uploadExcelComponent from '@/common/components/UploadExcel/index.vue'

    export default {
        name: '',
        data() {
            return {
                tableHeader: [],
                tableExcelData: [],
                tagList: [],
                dialogZpVisible: false,
                dialogSmpVisible:false,
                filterCondition: {
                    Begin_Date: '',
                    End_Date: '',
                    desc: '',
                    region: '',
                    type: '',
                    delivery: '',
                    resource: ''
                },
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }],
                citys: [],
                dialogVisible: false,
                content: '<p>3333333333</p>'
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
        components: {
            uploadExcelComponent,
            vueEditor,
            uploadBox,
            cityBox,
            mapsBox,
            cityBoxs,
            cascaderBox,
            priceBox,
            saleBox,
            categoryBox,
            dialogSmpBox,
            dialogZpBox,
            dialogSaleAttribute,
            provinceBox
        },
        methods: {
            exportData () {
              this.$excel.exportData(this.tableHeader, this.tableHeader, this.tableExcelData, '测试', ['A1:A2', 'B1:D1', 'E1:E2'], true)
            },
            beforeUpload(file) {
                const isLt1M = file.size / 1024 / 1024 < 1

                if (isLt1M) {
                    return true
                }

                this.$message({
                    message: 'Please do not upload files larger than 1m in size.',
                    type: 'warning'
                })
                return false
            },
            handleSuccess({ results, header }) {
                console.log(results, header, '文件导入')
                let flag = true
                // 头部信息要完整，如果不完整渲染表格会报错, 建议渲染前写个判断条件
                header.map(item => {
                   if (!item) flag = false
                })
                if (!flag) {
                    this.$message.error('表格信息需要完整，否则渲染表格出错')
                    return false
                }
                this.tableExcelData = results
                this.tableHeader = header
            },
            getContent() {
                this.$message.success(this.$refs.editor.getContent())
            },
            changeMap() {

            },
            clickDialog (ref) {
                this.$refs[ref].dialogVisible = true
            },
            loading() {
                this.loadingWait = this.showLoading('请稍候...')
                setTimeout(() => {
                    this.loadingWait.close()
                }, 3000)
            },
            clickModal() {
                this.dialogVisible = true
            },
            del() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            init () {},
            sucessUpload (obj) {
                console.log(obj, 'obj')
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
    .components {
        overflow-y: scroll;
        padding: 30px;
        box-sizing: border-box;
        .components-box {
            padding: 20px 55px;
            box-sizing: border-box;
        }
    }
</style>

<style lang="scss">

</style>




