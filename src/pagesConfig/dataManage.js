import AsyncComponent from '@/utils/asyncComponent'

const DataManageMain = AsyncComponent(() => import('@/pages/DataManage/Main'))
const DataManage = AsyncComponent(() => import('@/pages/DataManage/DataSourceManage'))
const DataSourceCreateEditPreviewLayout= AsyncComponent(() => import('@/pages/DataManage/DataSourceManage/DataSourceCreateEditPreviewLayout'))
const DataResource =AsyncComponent(() => import('@/pages/DataManage/DataResourceManage'))
const DataResourceCreateLayout =AsyncComponent(() => import('@/pages/DataManage/DataResourceManage/DataResourceCreateLayout'))
const DataResourceBatchCreateLayout =AsyncComponent(() => import('@/pages/DataManage/DataResourceManage/DataResourceBatchCreateLayout'))
const DataResourceEditLayout =AsyncComponent(() => import('@/pages/DataManage/DataResourceManage/DataResourceEditLayout'))
const DataResourcePreviewLayout =AsyncComponent(() => import('@/pages/DataManage/DataResourceManage/DataResourcePreviewLayout'))
const BusinessManage = AsyncComponent(() => import('@/pages/DataManage/BusinessManage'))
const BusinessCreateAndEdit = AsyncComponent(() => import('@/pages/DataManage/BusinessManage/BusinessCreateAndEdit'))
const InfoSysPreviewAndCreateAndEdit = AsyncComponent(() => import('@/pages/DataManage/BusinessManage/InfoSysPreviewAndCreateAndEdit'))
const BusinessPreview = AsyncComponent(() => import('@/pages/DataManage/BusinessManage/BusinessPreview'))
const ViewsManage = AsyncComponent(() => import('@/pages/DataManage/BusinessManage/ViewsManage'))
const ViewsPreviewAndCreateAndEdit = AsyncComponent(() => import('@/pages/DataManage/BusinessManage/ViewsPreviewAndCreateAndEdit'))
const SchemaPreviewAndCreateAndEdit = AsyncComponent(() => import('@/pages/DataManage/BusinessManage/SchemaPreviewAndCreateAndEdit'))

export default {
	DataManageMain, // 首页
	BusinessManage, // 业务管理
	BusinessCreateAndEdit, // 新建编辑业务
	BusinessPreview, // 查看业务
	InfoSysPreviewAndCreateAndEdit, // 查看新建编辑信息系统
	ViewsManage, // 数据视图管理
	ViewsPreviewAndCreateAndEdit, //查看新建编辑数据视图
	SchemaPreviewAndCreateAndEdit, // 查看新建编辑表单
	DataManage, // 数据源管理
	DataSourceCreateEditPreviewLayout, //数据源新增
	DataResource, //数据资源管理
	DataResourceCreateLayout, //数据资源新增
	DataResourceEditLayout, //数据资源编辑
	DataResourcePreviewLayout, //数据资源查看
	DataResourceBatchCreateLayout, //数据资源批量新增
}
