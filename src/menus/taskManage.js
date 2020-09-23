/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-23 16:46:42
 */
export default [
	{
		title: '首页',
		path: '/taskManage/main',
		exact: true,
		component: 'TaskDataMain',
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
				component: 'TaskDataManage',
				layout: true,
				role: ['public', 'admin'],
				children: [
					{
						title: '新增任务信息',
						path: '/taskManage/dataSource/source/create',
						exact: true,
						component: 'TaskDataCreateEditPreview',
						layout: true,
						role: ['public', 'admin'],
						isHide: 'Y',
						type: 'create',
					},
					{
						title: '编辑任务信息',
						path: '/taskManage/dataSource/source/edit',
						exact: true,
						component: 'TaskDataCreateEditPreview',
						layout: true,
						role: ['public', 'admin'],
						isHide: 'Y',
						type: 'edit',
					},
					{
						title: '查看任务',
						path: '/taskManage/dataSource/source/preview',
						exact: true,
						component: 'TaskDataCreateEditPreview',
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
