/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-18 16:29:51
 */
import AsyncComponent from '@/utils/asyncComponent'

const DataManageMain = AsyncComponent(() => import('@/pages/DataManage/Main'))
const DataManage = AsyncComponent(() => import('@/pages/DataManage/DataSourceManage'))
const DataSourceCreateEditPreviewLayout= AsyncComponent(() => import('@/pages/DataManage/DataSourceManage/DataSourceCreateEditPreviewLayout'))
const DataResource =AsyncComponent(() => import('@/pages/DataManage/DataResourceManage'))
const DataResourceCreateLayout =AsyncComponent(() => import('@/pages/DataManage/DataResourceManage/DataResourceCreateLayout'))
const DataResourceBatchCreateLayout =AsyncComponent(() => import('@/pages/DataManage/DataResourceManage/DataResourceBatchCreateLayout'))
const DataResourceEditLayout =AsyncComponent(() => import('@/pages/DataManage/DataResourceManage/DataResourceEditLayout'))
const DataResourcePreviewLayout =AsyncComponent(() => import('@/pages/DataManage/DataResourceManage/DataResourcePreviewLayout'))


export default {
	DataManageMain, // 首页
	DataManage, // 数据源管理
	DataSourceCreateEditPreviewLayout, //数据源新增
	DataResource, //数据资源管理
	DataResourceCreateLayout, //数据资源新增
	DataResourceEditLayout, //数据资源编辑
	DataResourcePreviewLayout, //数据资源查看
	DataResourceBatchCreateLayout, //数据资源批量新增
}
