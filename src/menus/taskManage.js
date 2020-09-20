/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-20 16:33:16
 */
export default [
	{
		path: '/login',
		exact: true,
		component: 'Login',
		role: ['public', 'admin'],
	},
	{
		title: '首页',
		path: '/taskManage/main',
		exact: true,
		component: 'DataManageMain',
		role: ['public', 'admin'],
		layout: true
	},
	{
		title: '任务信息接入',
		path: '/taskManage/dataSource',
		isSub: true,
		layout: true,
		role: ['public', 'admin'],
		children: [
			{
				title: '任务管理',
				path: '/taskManage/dataSource/source',
				exact: true,
				component: 'DataManage',
				layout: true,
				role: ['public', 'admin'],
				children: [
					{
						title: '新增任务信息',
						path: '/taskManage/dataSource/source/create',
						exact: true,
						component: 'DataSourceCreateEditPreviewLayout',
						layout: true,
						role: ['public', 'admin'],
						isHide: 'Y',
						type: 'create',
					},
					{
						title: '编辑任务信息',
						path: '/taskManage/dataSource/source/edit',
						exact: true,
						component: 'DataSourceCreateEditPreviewLayout',
						layout: true,
						role: ['public', 'admin'],
						isHide: 'Y',
						type: 'edit',
					},
					{
						title: '查看任务',
						path: '/taskManage/dataSource/source/preview',
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
	}

]
