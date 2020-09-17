/*
 * @Author: Zhangyao
 * @Date: 2020-08-17 11:06:21
 * @LastEditors: Zhangyao
 * @LastEditTime: 2020-09-11 12:37:19
 */
import { Host } from './index.js'

export const formatUrl = (part) => {
	part = part || 'govern-datasource/datasource'
	const partUrl = `${part}/catalogue/`
	return {
		getTree: Host + partUrl + 'tree', // 获取目录树
		addTree: Host + partUrl + 'add', //添加数据目录
		deleteTree: Host + partUrl + 'delete', //修改数据目录
		updateTree: Host + partUrl + 'update' //删除数据目录
	}
}

