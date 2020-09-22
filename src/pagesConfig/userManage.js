/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-22 15:16:56
 */
import AsyncComponent from '@/utils/asyncComponent'

const UserInfoManage = AsyncComponent(() => import('@/pages/UserManage/UserInfoManage'))
const UserInfoCreateEditPreview= AsyncComponent(() => import('@/pages/UserManage/UserInfoManage/UserInfoCreateEditPreview'))

export default {
	UserInfoManage, // 英雄信息管理
	UserInfoCreateEditPreview, // 英雄信息新增、编辑、查看
}
