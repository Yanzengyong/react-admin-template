/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-20 16:42:23
 */
export default [
	{
		title: '英雄管理',
		path: '/userManage/dataSource',
		exact: true,
		component: 'DataManage',
		layout: true,
		role: ['public', 'admin'],
		children: [
			{
				title: '新增英雄信息',
				path: '/userManage/dataSource/create',
				exact: true,
				component: 'DataSourceCreateEditPreviewLayout',
				layout: true,
				role: ['public', 'admin'],
				isHide: 'Y',
				type: 'create',
			},
			{
				title: '编辑英雄信息',
				path: '/userManage/dataSource/edit',
				exact: true,
				component: 'DataSourceCreateEditPreviewLayout',
				layout: true,
				role: ['public', 'admin'],
				isHide: 'Y',
				type: 'edit',
			},
			{
				title: '查看英雄信息',
				path: '/taskManage/dataSource/preview',
				exact: true,
				component: 'DataSourceCreateEditPreviewLayout',
				layout: true,
				role: ['public', 'admin'],
				isHide: 'Y',
				type: 'preview',
			}
		]
	}

]
