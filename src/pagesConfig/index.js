/*
 * @Description:
 * @Version:
 * @Author: Yanzengyong
 * @Date: 2020-09-18 17:14:07
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-23 09:11:53
 */

import Login from '@/pages/Login'
import TaskManage from './taskManage'
import UserManage from './userManage'
import LayoutCommon from '@/layout'

export default {
	Login,
	LayoutCommon,
	...TaskManage,
	...UserManage
}
