import { enhancerMenu } from '@/utils/menuForRoute.js'
import TaskManage from './taskManage'
import UserManage from './userManage'

const Menu = [
	{
		title: '任务管理平台',
		icon: '',
		path: '/taskManage',
		defaultPath: '/taskManage/main',
		sideMenu: TaskManage,
		layout: 'LayoutCommon'
	},
	{
		title: '英雄管理平台',
		icon: '',
		path: '/userManage',
		defaultPath: '/userManage/userInfo',
		sideMenu: UserManage,
		layout: 'LayoutCommon'
	}
]

// 给MenuConfig的每一个对象都新增了layout属性和修改了path属性
const _enhancerMenu = enhancerMenu(Menu)

export default _enhancerMenu

