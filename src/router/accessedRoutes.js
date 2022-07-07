import Layout from '@/layout'

export const accessedRoutes = [
    {
        level: '1',
        IsNeedAction: false,
        Id: '1207846324284690424',
        ParentId: null,
        Url: "layout",
        path: "/supplyGoodsManage",
        title: "商品管理（供货商）",
        key: 'supplyGoodsManage',
        icon: 'el-icon-yunliankeji- iconfont',
        children: [
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294002',
                ParentId: '1207846324284690424',
                Url: "views/supplyGoodsManage/goodsList",
                path: "supplyGoodsList",
                title: '商品列表',
                key: 'supplyGoodsList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294001',
                ParentId: '1207846324284690424',
                Url: "views/supplyGoodsManage/auditList",
                path: "auditList",
                title: '审核记录',
                key: 'auditList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '1207849622878294098',
                ParentId: '1207846324284690424',
                Url: "views/supplyGoodsManage/supplyAddGoods",
                path: "supplyAddGoods",
                title: '新增商品',
                key: 'supplyAddGoods',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '1207849622878294097',
                ParentId: '1207846324284690424',
                Url: "views/supplyGoodsManage/supplyGoodsInfo",
                path: "supplyGoodsInfo",
                title: '商品详情',
                key: 'supplyGoodsInfo',
                icon: ''
            }
        ]
    },
    {
        level: '1',
        IsNeedAction: false,
        Id: '1207846324284690425',
        ParentId: null,
        Url: "layout",
        path: "/platformGoodsManage",
        title: "商品管理（平台）",
        key: 'platformGoodsManage',
        icon: 'el-icon-shangpin iconfont',
        children: [
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294006',
                ParentId: '1207846324284690425',
                Url: "views/platformGoodsManage/goodsList",
                path: "goodsList",
                title: '平台商品列表',
                key: 'goodsList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294005',
                ParentId: '1207846324284690425',
                Url: "views/platformGoodsManage/supplyGoodsList",
                path: "platformSupplyGoodsList",
                title: '供应商商品列表',
                key: 'platformSupplyGoodsList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294004',
                ParentId: '1207846324284690425',
                Url: "views/platformGoodsManage/applyList",
                path: "applyList",
                title: '审核记录',
                key: 'applyList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '1207849622878294003',
                ParentId: '1207846324284690425',
                Url: "views/platformGoodsManage/platformAddGoods",
                path: "platformAddGoods",
                title: '新增商品',
                key: 'platformAddGoods',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '1207849622878294002',
                ParentId: '1207846324284690425',
                Url: "views/platformGoodsManage/platformGoodsInfo",
                path: "/platformGoodsInfo",
                title: '商品详情',
                key: 'platformGoodsInfo',
                icon: ''
            }
        ]
    },
    {
        level: '1',
        IsNeedAction: false,
        Id: '1207846324284690426',
        ParentId: null,
        Url: "layout",
        path: "/purchaseManage",
        title: "采购管理",
        key: 'purchaseManage',
        icon: 'el-icon-caigou iconfont',
        children: [
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294007',
                ParentId: '1207846324284690426',
                Url: "views/purchaseManage/purchaseList",
                path: "purchaseList",
                title: '采购订单',
                key: 'purchaseList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '1207849622878294024',
                ParentId: '1207846324284690426',
                Url: "views/purchaseManage/purchaseDetail",
                path: "purchaseDetail",
                title: '采购详情',
                key: 'purchaseDetail',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '1207849622878294024',
                ParentId: '1207846324284690427',
                Url: "views/purchaseManage/logistics",
                path: "logistics",
                title: '发货单详情',
                key: 'logistics',
                icon: ''
            },       
            {
                level: '2',
                IsNeedAction: true,
                Id: '1207849622878294025',
                ParentId: '1207846324284690426',
                Url: "views/purchaseManage/purchaseOrder",
                path: "purchaseOrder",
                title: '采购单',
                key: 'purchaseOrder',
                icon: ''
            }
        ]
    },
    {
        level: '1',
        IsNeedAction: false,
        Id: '1207846324284690427',
        ParentId: null,
        Url: "layout",
        path: "/cargoDamageManage",
        title: "货损管理",
        key: 'cargoDamageManage',
        icon: 'el-icon-sunhuai iconfont',
        children: [
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294009',
                ParentId: '1207846324284690427',
                Url: "views/cargoDamageManage/damageList",
                path: "damageList",
                title: '货损列表',
                key: 'damageList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294008',
                ParentId: '1207846324284690427',
                Url: "views/cargoDamageManage/replacementList",
                path: "replacementList",
                title: '补发订单',
                key: 'replacementList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '1207849622878295010',
                ParentId: '1207846324284690427',
                Url: "views/cargoDamageManage/cargoDetail",
                path: "cargoDetail",
                title: '货损详情',
                key: 'cargoDetail',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '1207849622878296010',
                ParentId: '1207846324284690427',
                Url: "views/cargoDamageManage/replaceDetail",
                path: "replaceDetail",
                title: '补发订单详情',
                key: 'replaceDetail',
                icon: ''
            }
        ]
    },
    {
        level: '1',
        IsNeedAction: false,
        Id: '1207846324284690428',
        ParentId: null,
        Url: "layout",
        path: "/supplyReconciliationManage",
        title: "对账管理（供货商）",
        key: 'supplyReconciliationManage',
        icon: 'el-icon-duizhang iconfont',
        children: [
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294011',
                ParentId: '1207846324284690428',
                Url: "views/supplyReconciliationManage/reconciliationList",
                path: "supplyRreconciliationList",
                title: '对账管理',
                key: 'supplyReconciliationList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '1207849622878294010',
                ParentId: '1207846324284690428',
                Url: "views/supplyReconciliationManage/settlementList",
                path: "supplySettlementList",
                title: '采购单详情',
                key: 'supplySettlementList',
                icon: ''
            },
        ]
    },
    {
        level: '1',
        IsNeedAction: false,
        Id: '1207846324284690429',
        ParentId: null,
        Url: "layout",
        path: "/platformReconciliationManage",
        title: "对账管理（平台）",
        key: 'platformReconciliationManage',
        icon: 'el-icon-duizhangzhongxin iconfont',
        children: [
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294013',
                ParentId: '1207846324284690429',
                Url: "views/platformReconciliationManage/reconciliationList",
                path: "reconciliationList",
                title: '对账管理',
                key: 'reconciliationList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '1207849622878294012',
                ParentId: '1207846324284690429',
                Url: "views/platformReconciliationManage/settlementList",
                path: "settlementList",
                title: '结算记录',
                key: 'settlementList',
                icon: ''
            },
        ]
    },
    {
        level: '1',
        IsNeedAction: false,
        Id: '1207846324284690430',
        ParentId: null,
        Url: "layout",
        path: "/qualificationManage",
        title: "资质审核",
        key: 'qualificationManage',
        icon: 'el-icon-zizhi iconfont',
        children: [
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294014',
                ParentId: '1207846324284690430',
                Url: "views/qualificationManage/qualificationList",
                path: "qualificationList",
                title: '资质审核列表',
                key: 'qualificationList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '120784962287829119',
                ParentId: '1207846324284690430',
                Url: "views/qualificationManage/waitShenHe/waitShenHeDetail",
                path: "waitShenHeDetail",
                title: '资质审核详情',
                key: 'waitShenHeDetail',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '120784962287829110',
                ParentId: '1207846324284690430',
                Url: "views/qualificationManage/qualicationApprove",
                path: "qualicationApprove",
                title: '供应商认证',
                key: 'qualicationApprove',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '120784962287829111',
                ParentId: '1207846324284690430',
                Url: "views/qualificationManage/processFail",
                path: "processFail",
                title: '供应商认证',
                key: 'processFail',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: true,
                Id: '120784962287829112',
                ParentId: '1207846324284690430',
                Url: "views/qualificationManage/auditDetail",
                path: "auditDetail",
                title: '资质审核详情',
                key: 'auditDetail',
                icon: ''
            },
        ]
    },
    {
        level: '1',
        IsNeedAction: false,
        Id: '1207846324284690431',
        ParentId: null,
        Url: "layout",
        path: "/supplyManage",
        title: "供应商管理",
        key: 'supplyManage',
        icon: 'el-icon-lianyinggonghuoshang iconfont',
        children: [
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294015',
                ParentId: '1207846324284690431',
                Url: "views/supplyManage/supplyList",
                path: "supplyList",
                title: '供应商管理',
                key: 'supplyList',
                icon: ''
            },
        ]
    },
    {
        level: '1',
        IsNeedAction: false,
        Id: '1207846324284690432',
        ParentId: null,
        Url: "layout",
        path: "/systemManage",
        title: "系统设置",
        key: 'systemManage',
        icon: 'el-icon-xitong iconfont',
        children:[
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294016',
                ParentId: '1207846324284690432',
                Url: "views/systemManage/classList",
                path: "classList",
                title: '类目管理',
                key: 'classList',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294017',
                ParentId: '1207846324284690432',
                Url: "views/systemManage/salesAttribute",
                path: "salesAttribute",
                title: "销售属性",
                key: 'salesAttribute',
                icon: ''
            },
            {
                IsNeedAction: false,
                Id: '1207849622878294018',
                ParentId: '1207846324284690432',
                Url: "views/systemManage/user",
                path: "user",
                title: "账号信息",
                key: 'user',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294019',
                ParentId: '1207846324284690432',
                Url: "views/systemManage/menu",
                path: "menu",
                title: "功能菜单",
                key: 'menu',
                icon: ''
            },
            {
                IsNeedAction: false,
                Id: '1207849622878294020',
                ParentId: '1207846324284690432',
                Url: "views/systemManage/role/role",
                path: "role",
                title: "角色信息",
                key: 'role',
                icon: ''
            },
            {
                IsNeedAction: true,
                Id: '1207849622878294020',
                ParentId: '1207846324284690432',
                Url: "views/systemManage/role/roleInfo",
                path: "roleInfo",
                title: "角色详情",
                key: 'roleInfo',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294022',
                ParentId: '1207846324284690432',
                Url: "views/systemManage/media",
                path: "media",
                title: "媒体文件",
                key: 'media',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294030',
                ParentId: '1207846324284690432',
                Url: "views/systemManage/mediaModule",
                path: "mediaModule",
                title: "媒体模块",
                key: 'mediaModule',
                icon: ''
            },
            {
                level: '2',
                IsNeedAction: false,
                Id: '1207849622878294023',
                ParentId: '1207846324284690432',
                Url: "views/systemManage/components",
                path: "components",
                title: "组件模版",
                key: 'components',
                icon: ''
            }
        ]
    }
]
