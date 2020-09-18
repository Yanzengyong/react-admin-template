/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-08-26 17:58:08
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-17 11:57:53
 */
import warning from 'rc-util/lib/warning'
import store from '@/store'
import { findCurrentRouteItem } from '@/utils/menuForRoute'
import { Message, Notification } from '@alifd/next'
import DeleteNotice from '@/components/DeleteNotice'

// 根据location.state中的currentPage获取当前缓存页码
const getCurrentPageFromLocation = (props) => {
	return props && props.history && props.history.location.state ? props.history.location.state.currentPage : 1
}

/**
 * @跳转页面
 * @pageNum 需要缓存于props.location.state中的当前页码
 * @routeName 配置在menu里面对应路由的title名称，例如：`“新建业务”`
 * @queryParam 跳转页面需要在路由的query部分携带的参数，类型为数组，包含label和value键值对例如：
 * ```const queryParam = [
			{ label: 'businessUuid', value: item.uuid },
			{ label: 'title', value: encodeURI(item.name) },
		]```
 */
const jumpToPage = (props, pageNum, routeName, queryParam) => {
	const page = findCurrentRouteItem(props.location.pathname)
	const JobPage = page && page.children ? page.children.filter((item) => item.title === routeName) : undefined
	let queryStr = ''
	if (queryParam && queryParam.length && queryParam.length > 0) {
		queryParam.map(item => {
			queryStr = queryStr + '&' + item.label + '=' + item.value
		})
	}
	queryStr = queryStr.substr(1)

	if (JobPage && JobPage[0]) {
		const path = {
			pathname: `${JobPage[0].path}`,
			search: queryStr,
			state: {
				currentPage: pageNum
			}
		}
		props.history.push(path)
	}
}

/**
 * @删除表格或列表中对象的方法
 * @thisEvent 调用当前方法的组件的this对象，使用时直接传入this即可
 * @deleteAction 删除item的请求方法
 * @selectedRowKeys 需删除的uuid数组对象
 * @callback 删除成功后的回调函数
 * @样例： deleteListItemAction(this, deleteBusinessRQ, selectedRowKeys, this.getlistHandle)
 */
const deleteListItemAction = (thisEvent, deleteAction, selectedRowKeys, callback) => {
	if (selectedRowKeys.length > 0) {
		DeleteNotice.show({
			message: '该数据删除后无法恢复',
			onCancel: () => {
				DeleteNotice.close()
			},
			onConfirm: async () => {
				DeleteNotice.close()
				// 确认删除
				const response = await deleteAction({ uuids: selectedRowKeys })
				if (response) {
					let deleteFailList = []
					// 通过notification展示
					if (response.code === 10000) {
						if (response.result && response.result.length > 0) {
							response.result.map(item => {
								deleteFailList.push(item.uuid)
								let content = ''
								if (item.name && item.msg) {
									content = item.name + '删除失败：' + item.msg
								}
								else if (item.msg) {
									content = '删除失败!'
								}
								Notification.error({
									placement: 'topRight',
									content: content,
									duration: 3000
								})
							})
						}
						// 当前页完全删除：页数返回上一页 + 刷新页面数据
						if (selectedRowKeys.length === thisEvent.state.data.length && thisEvent.state.currentPage !== 1 && deleteFailList.length === 0) {
							Message.success('删除成功')
							thisEvent.setState({
								currentPage: thisEvent.state.currentPage - 1
							}, () => {
									callback()
							})
						}
						// 当前页不完全删除：页数不变 + 刷新页面数据
						else {
							if (deleteFailList.length === 0) Message.success('删除成功')
							callback()
						}
						thisEvent.setState({ selectedRowKeys: deleteFailList })
					} else {
						Message.error(response.msg || '删除失败')
					}
				}
				else {
					Message.error('删除失败')
				}
			},
		})
	} else {
		Message.warning('未选中任何数据')
	}

}

// 获取query值中某个固定属性值
const getQueryItemValue = (query, attr) => {
	if (!!query && query.indexOf('?') !== -1) {
		// 存在query值
		const queryStr = query.split('?')[1] ?? ''
		let paramsObj = {}
		const queryParamsArr = queryStr.split('&')
		queryParamsArr.forEach((item) => {
			const attrName = item.split('=')[0] ?? ''
			const attrValue = item.split('=')[1] ?? ''
			attrName !== '' ? paramsObj[attrName] = attrValue : ''
		})

		return attr === 'title' ? decodeURI(paramsObj[attr]) : paramsObj[attr]

	} return ''
}

// 判断字符串是否为json
const isJSON = (str) => {
	if (typeof str == 'string') {
		try {
			const obj = JSON.parse(str)
			if (typeof obj == 'object' && obj) {
				return true
			} else {
				return false
			}

		} catch (e) {
			// console.log('error：' + str + '!!!' + e)
			return false
		}
	}
	warning(
		typeof str === 'string',
		`输入判断的类型错误，期望string，实际为${typeof str}`,
	)
}

// 页面离开并且存储当前的页面数据
const leaveAndSave = (storageName, data) => {

	const closeTabPathArr = store.getState() && store.getState().tabs && store.getState().tabs.deleteTabPath
	const isString = typeof data === 'string' ? true : false
	const storageData = data ? isString ? data : JSON.stringify(data) : null


	if (closeTabPathArr.indexOf(storageName) === -1) {
		window.sessionStorage.setItem(storageName, storageData)
	} else {
		console.log(`我是common文件中，当先正在离开的地址是${storageName}，当前的关闭的tab数组为${closeTabPathArr}`)
		window.sessionStorage.removeItem(storageName)
	}
	// 当前离开的页面是关闭了tab的页面
	store.dispatch({
		type: 'SET_DELETE_TAB_PATH',
		path: []
	})

}

// 查看当前路由是否存在存储数据，若存在则初始化存储数据
const hasStorageAndInit = () => {
	const pathHash = window.location.hash
	const routePathUrl = pathHash.substring(1)

	const storageData = window.sessionStorage.getItem(routePathUrl)

	return storageData && isJSON(storageData) ? JSON.parse(storageData) : storageData
}

export {
	getQueryItemValue,
	leaveAndSave,
	hasStorageAndInit,
	getCurrentPageFromLocation,
	jumpToPage,
	deleteListItemAction
}
