/*
 * @Description:
 * @Version:
 * @Author: Yanzengyong
 * @Date: 2020-09-18 17:14:07
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-22 15:09:16
 */
// import DataManage from './dataManage'
import Login from '@/pages/Login'
import TaskManage from './taskManage'
import UserManage from './userManage'

export default {
	Login,
	// ...DataManage,
	...TaskManage,
	...UserManage
}
