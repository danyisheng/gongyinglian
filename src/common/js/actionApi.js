// 针对列表分页的
export const getDataV1 = (vm, url, params, loading) => {
    return new Promise((resolve, reject) => {
        loading ? vm[loading] = true : vm.wait = vm.showLoading('请稍等......')
        vm.$https.fetchNetPost(url, params).then(res => {
            if (res.data.Success) {
                loading ? vm[loading] = false : vm.wait.close()
                vm.pages.totalPage = res.data.PageCount
                vm.pages.totalCount = res.data.Total
                resolve(res.data.Data)
            } else {
                vm.$message.error(res.data.Msg)
                loading ? vm[loading] = false : vm.wait.close()
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const getDataV2 = (vm, url, params, loading) => {
    return new Promise((resolve, reject) => {
        loading ? vm[loading] = true : vm.wait = vm.showLoading('请稍等......')
        vm.$https.fetchNetPost(url, params).then(res => {
            if (res.data.Success) {
                loading ? vm[loading] = false : vm.wait.close()
                resolve(res.data.Data)
            } else {
                vm.$message.error(res.data.Msg)
                loading ? vm[loading] = false : vm.wait.close()
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const manageData = (vm, url, params, actionTitle, title, loading) => {
    console.log(params)
    return new Promise((resolve, reject) => {
        vm.$confirm('确定要把这' + params.Ids.length + '条'+ title +'数据操作'+ actionTitle + '？, 是否继续?', '' + actionTitle + title + '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(() => {
            loading ? vm[loading] = true : vm.wait = vm.showLoading('请稍等......')
            vm.$https.fetchNetPost(url, params).then(res => {
                if (res.data.Success) {
                    loading ? vm[loading] = false : vm.wait.close()
                    resolve(res.data.Data)
                    vm.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                } else {
                    loading ? vm[loading] = false : vm.wait.close()
                    vm.$message.error(res.data.Msg)
                }
            }).catch(error => {
                reject(error)
            })
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消'
            });
        });
    })
}


export const reviewData = (vm, url, params, actionTitle, title, key, loading) => {
    return new Promise((resolve, reject) => {
        vm.$prompt('申请原因', '确定要把这 ' + params.Ids.length + '条 '+ title +'数据操作' + actionTitle + '?', {
            inputPlaceholder: '请输入原因',
            inputPattern: /\S/,
            inputErrorMessage: '原因未填写',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(({value}) => {
            params[key] = value
            loading ? vm[loading] = true : vm.wait = vm.showLoading('请稍等......')
            vm.$https.fetchNetPost(url, params).then(res => {
                if (res.data.Success) {
                    loading ? vm[loading] = false : vm.wait.close()
                    resolve(res.data.Data)
                    vm.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                } else {
                    loading ? vm[loading] = false : vm.wait.close()
                }
            }).catch(error => {
                reject(error)
            })
        }).catch(() => {
            vm.$message({
                type: 'info',
                message: '已取消'
            });
        });
    })
}

export const getList = (vm, url, params) => {
    return new Promise((resolve, reject) => {
        vm.$https.fetchNetPost(url, params).then(res => {
            if (res.data.Success) {
                resolve(res.data.Data)
            } else {
                vm.$message.error(res.data.Msg)
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const detailData = (vm, url, params, loading) => {
    return new Promise((resolve, reject) => {
        loading ? vm[loading] = true : vm.wait = vm.showLoading('请稍等......')
        vm.$https.fetchNetPost(url, params).then(res => {
            if (res.data.Success) {
                loading ? vm[loading] = false : vm.wait.close()
                resolve(res.data.Data)
            } else {
                loading ? vm[loading] = false : vm.wait.close()
                vm.$message.error(res.data.Msg)
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const addData = (vm, url, params, loading) => {
    return new Promise((resolve, reject) => {
        loading ? vm[loading] = true : vm.wait = vm.showLoading('请稍等......')
        vm.$https.fetchNetPost(url, params).then(res => {
            if (res.data.Success) {
                loading ? vm[loading] = false : vm.wait.close()
                resolve(res.data.Data)
                vm.$message.success('操作成功')
            } else {
                loading ? vm[loading] = false : vm.wait.close()
                vm.$message.error(res.data.Msg)
            }
        }).catch(error => {
            reject(error)
        })
    })
}
