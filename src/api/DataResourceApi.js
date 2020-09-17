// import { Host } from './index.js'
import { Host } from './index.js'
const dataResouceService = 'govern-dataresource/resource/'

const apiList = {
	getList: Host + dataResouceService + 'list', // 查询列表
	delete: Host + dataResouceService + 'delete', // 删除
	query: Host + dataResouceService + 'query', // 查询详情
	add: Host + dataResouceService + 'add', // 新增
	update: Host + dataResouceService + 'update', // 修改

	getTree: Host + dataResouceService + 'catalogue/tree', //获取目录树
	addTree: Host + dataResouceService + 'catalogue/add', //新增目录
	deleteTree: Host + dataResouceService + 'catalogue/delete', //删除目录
	updateTree: Host + dataResouceService + 'catalogue/update', //更新目录
}
export default apiList
