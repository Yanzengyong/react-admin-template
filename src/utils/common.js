/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-08-26 17:58:08
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-08-31 14:14:19
 */
import warning from 'rc-util/lib/warning'
import store from '@/store'

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
	hasStorageAndInit
}
