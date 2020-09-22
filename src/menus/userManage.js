/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-22 22:56:07
 */
export default [
	{
		title: '英雄管理',
		path: '/userManage/userInfo',
		exact: true,
		component: 'UserInfoManage',
		layout: true,
		role: ['public', 'admin'],
		children: [
			{
				title: '查看英雄信息',
				path: '/userManage/userInfo/preview',
				exact: true,
				component: 'UserInfoCreateEditPreview',
				layout: true,
				role: ['public', 'admin'],
				isHide: 'Y',
				type: 'preview',
			}
		]
	}

]
