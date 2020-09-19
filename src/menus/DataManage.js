/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-19 22:48:30
 */
export default [
	{
		path: '/login',
		exact: true,
		component: 'DataManageMain',
		role: ['public', 'admin', 'developer'],
	},
	{
		title: '首页',
		path: '/dataManage/main',
		exact: true,
		component: 'DataManageMain',
		role: ['public', 'admin', 'developer'],
		layout: true
	},
	{
		title: '数据源接入',
		path: '/dataManage/dataSource',
		isSub: true,
		layout: true,
		role: ['public', 'admin', 'developer'],
		children: [
			{
				title: '数据源管理',
				path: '/dataManage/dataSource/source',
				exact: true,
				component: 'DataManage',
				layout: true,
				role: ['public', 'admin', 'developer'],
				children: [
					{
						title: '新增数据源',
						path: '/dataManage/dataSource/source/create',
						exact: true,
						component: 'DataSourceCreateEditPreviewLayout',
						layout: true,
						role: ['public', 'admin', 'developer'],
						isHide: 'Y',
						type: 'create',
					},
					{
						title: '编辑数据源',
						path: '/dataManage/dataSource/source/edit',
						exact: true,
						component: 'DataSourceCreateEditPreviewLayout',
						layout: true,
						role: ['public', 'admin', 'developer'],
						isHide: 'Y',
						type: 'edit',
					},
					{
						title: '查看数据源',
						path: '/dataManage/dataSource/source/preview',
						exact: true,
						component: 'DataSourceCreateEditPreviewLayout',
						layout: true,
						role: ['public', 'admin', 'developer'],
						isHide: 'Y',
						type: 'preview',
					}
				]
			}
		]
	}

]
