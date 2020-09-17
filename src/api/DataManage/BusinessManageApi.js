import { Host } from '../index.js'

const businessManageService = 'ms-business'

const apiList = {
	// 业务管理相关api
	getBusinessList: Host + businessManageService + '/business/list', // 查询业务列表
	queryBusiness: Host + businessManageService + '/business/query', // 查询业务详情
	addBusiness: Host + businessManageService + '/business/add', // 新建业务
	updateBusiness: Host + businessManageService + '/business/update', // 编辑业务
	deleteBusiness: Host + businessManageService + '/business/delete', // 删除业务

	// 信息系统相关api
	getInfoSysList: Host + businessManageService + '/informationSystem/list', // 查询信息系统列表
	queryInfoSys: Host + businessManageService + '/informationSystem/query', // 查询信息系统详情
	addInfoSys: Host + businessManageService + '/informationSystem/add', // 新建信息系统
	updateInfoSys: Host + businessManageService + '/informationSystem/update', // 编辑信息系统
	deleteInfoSys: Host + businessManageService + '/informationSystem/delete', // 删除信息系统

	// 表单相关api
	getSchemaList: Host + businessManageService + '/form/list', // 查询表单列表
	querySchema: Host + businessManageService + '/form/query', // 查询表单详情
	addSchema: Host + businessManageService + '/form/add', // 新建表单
	updateSchema: Host + businessManageService + '/form/update', // 编辑表单
	deleteSchema: Host + businessManageService + '/form/delete', // 删除表单

	// 数据视图相关api
	getViewList: Host + businessManageService + '/dataView/list', // 查询数据视图列表
	queryView: Host + businessManageService + '/dataView/query', // 查询数据视图详情
	addView: Host + businessManageService + '/dataView/add', // 新建数据视图
	updateView: Host + businessManageService + '/dataView/update', // 编辑数据视图
	deleteView: Host + businessManageService + '/dataView/delete', // 删除数据视图
}

export default apiList
