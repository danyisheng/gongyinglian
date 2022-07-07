import request from '@/api/https'

export const login = ({UserName, Pwd, AppKey}) => {
    const data = {UserName, Pwd, AppKey}
    return request({
        url: '/api.Erp.Open.Check.UserNameLogin',
        method: 'post',
        data,
        flag: true
    })
}

export const getInfo = (token) => {
    const data =  {token}
    return request({
        url: '/api.Erp.Open.Check.GetOperatorInfo',
        method: 'post',
        data,
        flag: true
    })
}

export const getMenus = (roles) => {
    const data =  {roles}
    return request({
        url: '/api.Erp.Open.Check.GetOperatorMenuList',
        method: 'post',
        data,
        flag: true
    })
}

export const logout = () => {
    return request({
        url: '/api.Erp.Open.Check.GetOperatorMenuList',
        method: 'get',
        data,
        flag: true
    })
}

export const fastLogin = ({SmsType, SmsSendType, Mobile,Code,Pwd,AppKey}) => {
    const data = {SmsType, SmsSendType, Mobile,Code,Pwd,AppKey}
    return request({
        url: '/api.Erp.Open.Check.VCodeLogin',
        method: 'post',
        data,
        flag: true
    })
}
export const registLogin = ({SmsType, SmsSendType, Mobile,Code,Pwd,AppKey}) => {
    const data = {SmsType, SmsSendType, Mobile,Code,Pwd,AppKey}
    return request({
        url: '/api.Erp.Open.Check.VCodeLogin',
        method: 'post',
        data,
        flag: true
    })
}


export const getMenusList = (data) => {
    return request({
        url: '/api.Erp.Open.Check.GetOperatorMenuList',
        method: 'post',
        data,
        flag: true
    })
}
