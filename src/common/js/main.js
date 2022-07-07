import Vue from 'vue'
import request from '@/api/https'
import jquery from 'jquery'
import dayjs from 'dayjs'
import '../../assets/font/iconfont.css'
import store from '@/store'
import { getDataV1, getDataV2, detailData, manageData, reviewData, addData, getList } from './actionApi'
import commonRow from '@/common/components/common-row'
import commonCol from '@/common/components/common-col'
import provinces from '/public/static/json/zsProvince'
import pageBox from '@/common/components/pageBox'
import cityBoxs from '@/common/components/cityBoxs'
import categoryBox from '@/common/components/goodsComponents/categoryBox'
import citys from '/public/static/json/zsCity'
import areas from '/public/static/json/zsArea'
import uploadBox from '@/common/components/uploadBox'
import { getLodop } from '/public/static/js/LodopFuncs'


// 封装请求方式
Vue.use(commonRow)
Vue.use(commonCol)
Vue.component('page-box', pageBox)
Vue.component('category-box', categoryBox)
Vue.component('city-boxs', cityBoxs)
Vue.component('upload-box', uploadBox)

Vue.prototype.$lodop =  function () {
    return getLodop(document.getElementById('LODOP_OB'), document.getElementById('LODOP_EM'))
  }

export const formatJson = (filterVal, jsonData) => {
    return jsonData.map(v => filterVal.map(j => v[j]))
}

export  const _this = Vue
/** js数组去重  */
Vue.prototype.$distinct = (arr) => {
    var res = []
    var json = {}
    for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i])
            json[arr[i]] = 1
        }
    }
    return res
}

Vue.prototype.$excel = {
    exportData: (header, filterVal, list, filename, multiHeader, merges, bookType) => {
        /**
         * @description 头部横条信息展示 通常和单元格合并
         * @param {Array}  multiHeader
         * @returns {Array}  例子 【'这是格'】
         */
        /**
         * @description 导出表格的表头信息 默认[]
         * @param {Array} header
         * @returns {Array}
         */
        /**
         * @description 匹配后台返回的Data数据额key 默认[]
         * @param {Array} filterVal
         * @returns {Array}
         */
        /**
         * @description 后台返回的Data数据 默认[]
         * @param {Array} list
         * @returns {Array}
         */
        /**
         * @description 导出文件名
         * @param {Boolean} filename
         * @returns {String}
         */
        /**
         * @description 是否自适应 ，默认false
         * @param {Boolean} autoWidth,
         * @returns {Boolean}
         */
        /**
         * @description 导出excel 格式  默认xlsx   xlsx|xls|csv
         * @param {String} bookType
         * @returns {String}
         */
        /**
         * @description 单元格合并项  例子  ['A1:A2', 'B1:D1', 'E1:E2'],可传可不传 不传不合并
         * @param {Array} merges
         * @returns {Array}
         */
        import('@/vendor/Export2Excel').then(excel => {
            const data = formatJson(filterVal, list)
            excel.export_json_to_excel({
                multiHeader,
                header,
                data,
                filename,
                autoWidth: true,
                merges: merges || [],
                bookType
            })
        })
    }
}

Vue.prototype.$https = {
    fetchPost: (url, data, baseURL) => {
        return request({
            url,
            data,
            method: 'post',
            baseURL: baseURL || 'javaApi'
        })
    },
    fetchGet: (url, params, baseURL) => {
        return request({
            url,
            params,
            method: 'get',
            baseURL: baseURL || 'javaApi'
        })
    },
    fetchQsPost: (url, params, baseURL) => {
        return request({
            url,
            params,
            method: 'post',
            baseURL: baseURL || 'javaApi'
        })
    },
    // .net 调用
    fetchNetPost: (url, data, baseURL) => {
        return request({
            url,
            data,
            method: 'post',
            baseURL: baseURL || 'devMapi',
            flag: true
        })
    }
}


Vue.prototype.$jquery = jquery


Vue.prototype.$dayjs = dayjs


Vue.prototype.setCookie = function (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    if (window.top) {
        window.top.document.cookie = cname + '=' + cvalue + ';' + expires
    } else {
        document.cookie = cname + '=' + cvalue + ';' + expires
    }
}

// 全局相关配置
Vue.prototype.globalConfig = {
    page: { // 分页相关
        pageSize: 20, // 每页条数
        pageNum: 1, // 当前页
        total: 0 // 数据总条数
    }
}


// 获取cookie
Vue.prototype.getCookie = function (cname) {
    var name = cname + '='
    var doc = window.top ? window.top.document.cookie : document.cookie
    var ca = doc.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1)
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
}
// 清除cookie
Vue.prototype.clearCookie = function () {
    if (arguments.length <= 0) return false
    Array.from(arguments).forEach((item) => {
        this.setCookie(item, '', -1)
    })
}
Vue.prototype.showLoading = function (text, background) {
    text = text || '正在加载...'
    return this.$loading({text: text, background: background})
}

// 接口报错提示弹出框
Vue.prototype.messageInfo = function (text) {
    return this.$alert(text, '提示', {
        confirmButtonText: '确定',
        type: 'warning'
    })
}

// 文件上传模版

Vue.prototype.$upload = function (code) {

}

// 封装获取屏幕
Vue.prototype.$window = {
    getHeight: () => {
        return {
            height: window.innerHeight + 'px'
        }
    },
    getWidth: () => {
        return {
            height: window.innerWidth + 'px'
        }
    },
    getHeightBox: (h) => {
        return {
            height: window.innerHeight - h + 'px'
        }
    }
}


// table的高度设置
Vue.prototype.$tableHeight = function (h) {
    return window.innerHeight - h
}

// 封装分页全局
Vue.prototype.$pages = function () {
    return {
        currentPage: 1,
        pageSize: 20,
        totalPage: 1,
        totalCount: 20
    }
}

Vue.prototype.goBack = function (num) {
    this.$router.go(num)
}

Vue.prototype.$getDate = {
    getYYYYMMDD: date => {
        return dayjs(date).format('YYYY-MM-DD')
    },
    getHHMMSS: date => {
        return dayjs(date).format('HH:mm:ss')
    },
    getYYSS: date => {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    }
}

// table的高度设置 默认150
Vue.prototype.$tableHeight = function (h) {
    return window.innerHeight - (150 + h)
}


//屏幕宽度样式
Vue.prototype.$class = {
    scrolls: () => {
        let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
        if (htmlWidth < 620) {
            return 'srcolls'
        } else {
            return ''
        }
    },
    styleScrolls: () => {
        let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
        if (htmlWidth < 620) {
            return {
                overflow: 'scroll'
            }
        } else {
            return {}
        }
    }
}


//  获取当前登陆信息
Vue.prototype.$user = {
    supplyId: () => {
        return store.state.user.supplyId
    },
    UserInfo: () => {
        return store.state.user.UserInfo
    },
    Permissions: () => {
        return store.state.user.Permissions
    }
}


Vue.prototype.$width = {
    widths: () => {
        return {
            width: '177px'
        }
    },
    width: () => {
        return {
            width: '70px'
        }
    },
    timerWidth: () => {
        return {
            width: '145px'
        }
    },
    selectWidth: () => {
        return {
            width: '100px'
        }
    },
    inputWidth: () => {
        return {
            width: '145px'
        }
    },
    cardWidth: () => {
        return {
            width: '87px'
        }
    },
    cospalled: () => {
        return false
    },
    cospall: () => {
        return true
    }
}

// 获取dom 元素高度
Vue.prototype.$refHeight = {
    getHeight: (vm, ref) => {
        return {
            heigth: vm.$refs[ref].offsetHeight + 'px'
        }
    }
}
// 获取dom 元素宽度
Vue.prototype.$refHeight = {
    getHeight: (vm, ref) => {
        return {
            heigth: vm.$refs[ref].offsetWidth + 'px'
        }
    }
}

// 全局响应式
Vue.prototype.$span = {
    xxl: () => {
        return 4
    },
    xl: () => {
        return 4
    },
    lg: () => {
        return 6
    },
    md: () => {
        return 8
    },
    sm: () => {
        return 12
    },
    xs: () => {
        return 24
    }
}


// 城市Code删选
//  c 代表传来父级code
Vue.prototype.$cityCode = {
    pCode: (c) => {
        return provinces.filter(item => {
            return item.cityCode === c
        })
    },
    cCode: (c) => {
        return citys.filter(item => {
            return item.cityCode === c
        })
    },
    aCode: (c) => {
        return areas.filter(item => {
            return item.city_code === c
        })
    }
}


Vue.prototype.$permission = function (keyword) {
    let list = store.state.user.Permissions
    if (list.indexOf(keyword) > -1) {
        return true
    } else {
        return false
    }
}


Vue.prototype.$actionApi = {
    getApiDataV1: (url, params, vm, loading) => {
       return new Promise ((resolve, reject) => {
           getDataV1(vm, url, params, loading).then(data => {
               resolve(data)
           }).catch(error => {
               reject(error)
           })
       })
    },
    getApiDataV2: (url, params, vm, loading) => {
        return new Promise ((resolve, reject) => {
            getDataV2(vm, url, params, loading).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    manageApiData: (url, params, vm, actionTitle, title, loading) => {
        return new Promise ((resolve, reject) => {
            manageData(vm, url, params, actionTitle, title, loading).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    reviewApiData: (url, params, vm, actionTitle, title, key, loading) => {
        return new Promise ((resolve, reject) => {
            reviewData(vm, url, params, actionTitle, title, key, loading).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getApiList: (url, params, vm) => {
        return new Promise ((resolve, reject) => {
            getList(vm, url, params).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    detailApiData: (url, params, vm, loading) => {
        return new Promise ((resolve, reject) => {
            detailData(vm, url, params, loading).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    addApiData: (url, params, vm, loading) => {
        return new Promise ((resolve, reject) => {
            addData(vm, url, params, loading).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

