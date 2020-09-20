/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-20 16:42:50
 */
// import DataManage from './DataManage'


// const Menu = [
// 	{
// 		title: '数据管理平台',
// 		icon: '',
// 		path: '/dataManage',
// 		defaultPath: '/dataManage/main',
// 		sideMenu: DataManage
// 	}
// ]

import TaskManage from './taskManage'
import UserManage from './userManage'

const Menu = [
	{
		title: '任务管理平台',
		icon: '',
		path: '/taskManage',
		defaultPath: '/taskManage/main',
		sideMenu: TaskManage
	},
	{
		title: '英雄管理平台',
		icon: '',
		path: '/userManage',
		defaultPath: '/userManage/dataSource',
		sideMenu: UserManage
	},
]

export default Menu
