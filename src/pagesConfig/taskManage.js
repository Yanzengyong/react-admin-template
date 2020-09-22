/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-22 15:17:06
 */
import AsyncComponent from '@/utils/asyncComponent'

const TaskDataMain = AsyncComponent(() => import('@/pages/TaskManage/Main'))
const TaskDataManage = AsyncComponent(() => import('@/pages/TaskManage/TaskDataManage'))
const TaskDataCreateEditPreview= AsyncComponent(() => import('@/pages/TaskManage/TaskDataManage/TaskDataCreateEditPreview'))

export default {
	TaskDataMain, // 首页
	TaskDataManage, // 任务数据管理
	TaskDataCreateEditPreview, // 任务数据新增、编辑、查看
}
