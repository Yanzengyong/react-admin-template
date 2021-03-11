/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-23 17:46:01
 */
export default [
	{
		title: '英雄管理',
		path: '/userManage/userInfo',
		exact: true,
		component: 'UserInfoManage',
		role: ['admin'],
		children: [
			{
				title: '查看英雄信息',
				path: '/userManage/userInfo/preview',
				exact: true,
				component: 'UserInfoCreateEditPreview',
				role: ['admin'],
				isHide: 'Y',
				type: 'preview',
			}
		]
	}
]
