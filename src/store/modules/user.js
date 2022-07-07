import { login, logout, getInfo, getInfoV2,fastLogin,registLogin } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import axios from 'axios'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    supplyId: '',
    UserInfo: {},
    Permissions: [],

}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_ROLENAME: (state, roleName) => {
        state.roleName = roleName
    },
    SET_SUPPLYID: (state, id) => {
        state.supplyId = id
    },
    SETUSERDATA: (state, obj) => {
        state.UserInfo = obj
    },
    SETPERMISSONS: (state, list) => {
        state.Permissions = list
    }
}

const actions = {
    // user login
    login({ commit },{UserName, Pwd, AppKey}) {
        return new Promise((resolve, reject) => {
            login({UserName, Pwd, AppKey}).then(res => {
                if (res.data.Success) {
                    commit('SET_TOKEN', res.data.Data)
                    setToken(res.data.Data)
                    resolve()
                }else {
                    resolve(res.data.Msg)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    //快捷登陆
    fastlogin({commit},{SmsType, SmsSendType, Mobile,Code,Pwd,AppKey}){
        console.log(SmsType)
        console.log(SmsSendType)
        console.log(Code)
        console.log(Mobile)
        console.log(Pwd)
        console.log(AppKey)
        return new Promise((resolve, reject) => {
            fastLogin({SmsType, SmsSendType, Mobile,Code,Pwd,AppKey}).then(res => {
                if (res.data.Success) {
                    commit('SET_TOKEN', res.data.Data)
                    setToken(res.data.Data)
                    resolve()
                }else {
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    //注册
    registLogin({commit},{SmsType, SmsSendType, Mobile,Code,Pwd,AppKey}){
        return new Promise((resolve, reject) => {
            registLogin({SmsType, SmsSendType, Mobile,Code,Pwd,AppKey}).then(res => {
                if (res.data.Success) {
                    commit('SET_TOKEN', res.data.Data)
                    setToken(res.data.Data)
                    resolve()
                }else {
                    resolve(res)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response
                if (!data.Data) {
                    reject('验证失败，请重新登陆!')
                }
                if (data.ErrorCode === 200) {
                    const {
                        RealName,
                        UserName,
                        Mobile,
                        RoleIdList,
                        Id
                    } = data.Data.UserInfo

                    // roles must be a non-empty array
                    // if (!RoleIdList || RoleIdList.length <= 0) {
                    //     reject('getInfo: roles must be a non-null array!')
                    // }
                    commit('SET_ROLES', RoleIdList)
                    commit('SET_NAME', UserName)
                    commit('SET_AVATAR', Mobile)
                    commit('SET_ROLENAME', RealName)
                    commit('SET_SUPPLYID', Id)
                    commit('SETUSERDATA', data.Data.UserInfo)
                    commit('SETPERMISSONS', data.Data.Permissions)
                    resolve(data.Data)
                }
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()

                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                dispatch('tagsView/delAllViews', null, { root: true })

                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // dynamically modify permissions
    changeRoles({ commit, dispatch }, role) {
        return new Promise(async resolve => {
            const token = role + '-token'

            commit('SET_TOKEN', token)
            setToken(token)

            const { roles } = await dispatch('getInfo')

            resetRouter()

            // generate accessible routes map based on roles
            const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // reset visited views and cached views
            dispatch('tagsView/delAllViews', null, { root: true })

            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
