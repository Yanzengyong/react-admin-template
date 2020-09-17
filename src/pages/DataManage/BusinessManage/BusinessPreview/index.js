import React from 'react'
import { Button, Message, Tab } from '@alifd/next'
import BasicLayout from '@/components/BasicLayout'
import ListContainer from '@/components/ListContainer'
import ListCard from '@/components/ListCard'
import { findCurrentRouteItem, findSpecRouteItem } from '@/utils/menuForRoute'
import DeleteNotice from '@/components/DeleteNotice'
import './index.scss'
import { BusinessManageAction } from '@/actions'
import { getQueryItemValue } from 'utils/common'

const { getInfoSysListRQ, deleteInfoSysRQ, getSchemaListRQ, deleteSchemaRQ } = BusinessManageAction

export default class BusinessPreview extends React.Component {
	state = {
		currentBusinessUuid: '',
		currentBusiness: '暂无',
		currentTabKey: 0,

		infoSysTableLoading: false,
		infoSysSearchName: '',
		infoSysSelectedRowKeys: [],
		infoSysCurrentPage: 1,
		infoSysPageTotal: 10,
		infoSysPageSize: 5,
		infoSysClos: [
			{
				title: '信息系统名称',
				dataIndex: 'name',
			},
			{
				title: '信息系统描述',
				dataIndex: 'memo',
			},
			{
				title: '创建时间',
				dataIndex: 'createTime',
			},
		],
		infoSysData: [],

		schemaTableLoading: false,
		schemaSearchName: '',
		schemaSelectedRowKeys: [],
		schemaCurrentPage: 1,
		schemaPageTotal: 10,
		schemaPageSize: 5,
		schemaClos: [
			{
				title: '表单名称',
				dataIndex: 'name',
			},
			{
				title: '表单描述',
				dataIndex: 'memo',
			},
			{
				title: '创建时间',
				dataIndex: 'createTime',
			},
		],
		schemaData: [],
	}

	static getDerivedStateFromProps (props) {
		const _search = props.location.search
		const businessUuid = getQueryItemValue(_search, 'businessUuid')
		const businessName = getQueryItemValue(_search, 'title')

		return {
			currentBusinessUuid: businessUuid,
			currentBusiness: businessName
		}
	}

	componentDidMount () {
		this.getCurrentTabType()
	}

	componentWillUnmount () {
		this.setState = () => {
			return
		}
	}

	// 获取当前tab为信息系统或表单
	getCurrentTabType = () => {
		const storage = window.sessionStorage
		if (storage.businessTabKey) {
			this.setState({ currentTabKey: storage.businessTabKey }, () => {
				this.initList()
			})
		} else {
			this.setState({ currentTabKey: '0' }, () => {
				this.setStorageTabKeyInfo('InfoSys')
				this.initList()
			})
		}
	}

	// 切换tab时，需刷新列表内容
	changeTab = (tabKey) => {
		this.setState({ currentTabKey: tabKey }, () => {
			this.initList()
		})
	}

	// 获取列表
	initList = () => {
		// 信息系统列表查询
		if (this.state.currentTabKey === '0') {
			this.setState({ infoSysTableLoading: true }, async () => {
				const response = await getInfoSysListRQ({
					name: this.state.infoSysSearchName,
					businessUuid: this.state.currentBusinessUuid,
					isPage: true,
					page: this.state.infoSysCurrentPage,
					limit: this.state.infoSysPageSize,
				})
				console.log(response)
				if (response) {
					if (response.code === 10000) {
						this.setState({
							infoSysPageTotal: response.result.total,
							infoSysData: response.result.list,
							infoSysTableLoading: false,
						})
					} else {
						Message.error(response.msg || '列表获取失败')
					}
				} else {
					this.setState({
						infoSysTableLoading: false,
					})
				}
			})
		}
		// 表单列表查询
		else if (this.state.currentTabKey === '1') {
			this.setState({ schemaTableLoading: true }, async () => {
				const response = await getSchemaListRQ({
					name: this.state.schemaSearchName,
					businessUuid: this.state.currentBusinessUuid,
					isPage: true,
					page: this.state.schemaCurrentPage,
					limit: this.state.schemaPageSize,
				})
				console.log(response)
				if (response) {
					if (response.code === 10000) {
						this.setState({
							schemaPageTotal: response.result.total,
							schemaData: response.result.list,
							schemaTableLoading: false,
						})
					} else {
						Message.error(response.msg || '列表获取失败')
					}
				} else {
					this.setState({
						schemaTableLoading: false,
					})
				}
			})
		}
	}

	// 查询搜索的处理函数
	searchRequest = (val) => {
		// 信息系统搜索
		if (this.state.currentTabKey === '0') {
			this.setState(
				{
					infoSysSearchName: val,
					infoSysCurrentPage: 1,
				},
				() => {
					this.initList()
				}
			)
		}
		// 表单搜索
		else if (this.state.currentTabKey === '1') {
			this.setState(
				{
					schemaSearchName: val,
					schemaCurrentPage: 1,
				},
				() => {
					this.initList()
				}
			)
		}
	}

	// 返回上一页
	onBack = () => {
		const businessManageRoute = findSpecRouteItem('业务管理')
		this.props.history.push(businessManageRoute.path)
	}

	// 多选 、 单选的change事件
	rowSelection = (key) => {
		// 信息系统
		if (this.state.currentTabKey === '0') {
			this.setState({ infoSysSelectedRowKeys: key })
		}
		// 表单
		else if (this.state.currentTabKey === '1') {
			this.setState({ schemaSelectedRowKeys: key })
		}
	}

	// 信息系统列表的操作按钮
	infoSysOperation = (item) => {
		return (
			<div className="listCard_operation_box">
				<Button
					type="primary"
					className="btn"
					onClick={() => this.onCheckInfoSys(item)}
				>
					查看
				</Button>
				<Button
					type="secondary"
					className="btn"
					onClick={() => this.onEditInfoSys(item)}
				>
					编辑
				</Button>
				<Button
					type="secondary"
					className="btn"
					onClick={() => this.onManageViews(item)}
				>
					数据视图
				</Button>
				<Button
					type="primary"
					warning
					className="btn"
					onClick={() => { this.deleteHandle([item.uuid]) }}
				>
					删除
				</Button>
			</div>
		)
	}

	// 新建信息系统
	onCreateInfoSys = () => {
		this.setStorageTabKeyInfo('InfoSys')

		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter(
			(item) => item.title === '新建信息系统'
		)
		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${this.state.currentBusinessUuid}&title=${encodeURI(this.state.currentBusiness)}`)
		}
	}

	// 查看信息系统
	onCheckInfoSys = (item) => {
		this.setStorageTabKeyInfo('InfoSys')

		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter(
			(item) => item.title === '查看信息系统'
		)
		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${this.state.currentBusinessUuid}&infoSysUuid=${item.uuid}&title=${encodeURI(item.name)}&businessName=${encodeURI(this.state.currentBusiness)}`)
		}
	}

	// 编辑信息系统
	onEditInfoSys = (item) => {
		this.setStorageTabKeyInfo('InfoSys')

		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter((item) => item.title === '编辑信息系统')

		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${this.state.currentBusinessUuid}&infoSysUuid=${item.uuid}&title=${encodeURI(item.name)}&businessName=${encodeURI(this.state.currentBusiness)}`)
		}
	}

	// 管理数据视图
	onManageViews = (item) => {
		this.setStorageTabKeyInfo('InfoSys')

		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter((item) => item.title === '数据视图管理')

		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${this.state.currentBusinessUuid}&infoSysUuid=${item.uuid}&title=${encodeURI(item.name)}&businessName=${encodeURI(this.state.currentBusiness)}`)
		}
	}

	// 表单列表的操作按钮
	schemaOperation = (item) => {
		return (
			<div className="listCard_operation_box">
				<Button
					type="primary"
					className="btn"
					onClick={() => this.onCheckSchema(item)}
				>
					查看
				</Button>
				<Button
					type="secondary"
					className="btn"
					onClick={() => this.onEditSchema(item)}
				>
					编辑
				</Button>
				<Button
					type="primary"
					warning
					className="btn"
					onClick={() => { this.deleteHandle([item.uuid], 'schema') }}
				>
					删除
				</Button>
			</div>
		)
	}

	// 新建表单
	onCreateSchema = () => {
		this.setStorageTabKeyInfo('Schema')

		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter((item) => item.title === '新建表单')

		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${this.state.currentBusinessUuid}&title=${encodeURI(this.state.currentBusiness)}`)
		}
	}

	// 查看表单
	onCheckSchema = (item) => {
		this.setStorageTabKeyInfo('Schema')

		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter((item) => item.title === '查看表单')

		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${this.state.currentBusinessUuid}&schemaUuid=${item.uuid}&title=${encodeURI(item.name)}`)
		}
	}

	// 编辑表单
	onEditSchema = (item) => {
		this.setStorageTabKeyInfo('Schema')

		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter((item) => item.title === '编辑表单')

		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${this.state.currentBusinessUuid}&schemaUuid=${item.uuid}&title=${encodeURI(item.name)}`)
		}
	}

	// 根据不同的tab，删除选中item
	deleteHandle = (selectedRowKeys) => {
		if (selectedRowKeys.length > 0) {
			DeleteNotice.show({
				message: '该数据删除后无法恢复',
				onCancel: () => {
					DeleteNotice.close()
				},
				onConfirm: () => {
					DeleteNotice.close()
					this.deleteCurrentHandle(selectedRowKeys)
				}
			})
		}
		else {
			Message.warning('未选中任何数据')
		}
	}
	// 确认删除
	deleteCurrentHandle = async (selectedRowKeys) => {
		let response = null
		// 信息系统
		if (this.state.currentTabKey === '0') {
			response = await deleteInfoSysRQ({ uuids: selectedRowKeys })
		}
		else if (this.state.currentTabKey === '1') {
			response = await deleteSchemaRQ({ uuids: selectedRowKeys })
		}
		if (response) {
			let deleteFailList = []
			// 通过notification展示
			if (response.code === 10000) {
				if (response.result && response.result.length > 0) {
					response.result.map(item => {
						deleteFailList.push(item.uuid)
						let content = ''
						if (item.name && item.msg) {
							content = item.name + '删除失败：' + item.msg
						}
						else if (item.msg) {
							content = '删除失败!'
						}
						Notification.error({
							placement: 'topRight',
							content: content,
							duration: 3000
						})
					})
				}
				const listData = this.state.currentTabKey === '0' ? this.state.infoSysData : this.state.schemaData
				// 当前页完全删除：页数返回上一页 + 刷新页面数据
				if (selectedRowKeys.length === listData.length && this.state.currentPage !== 1 && deleteFailList.length === 0) {
					Message.success('删除成功')
					this.setState({
						currentPage: this.state.currentPage - 1
					}, () => {
							this.initList()
					})
				}
				// 当前页不完全删除：页数不变 + 刷新页面数据
				else {
					Message.success('删除成功')
					this.initList()
				}
				this.setState({ selectedRowKeys: deleteFailList })
			}
			else {
				Message.error(response.msg || '删除失败')
			}
		}
		else {
			Message.error('删除失败')
		}
	}

	// 将tab存入session storage
	setStorageTabKeyInfo = (tabType) => {
		let storage = window.sessionStorage
		storage.businessTabKey = tabType === 'InfoSys' ? 0 : 1
	}

	// 翻页的change事件
	pageOnChange = (page) => {
		// 信息系统
		if (this.state.currentTabKey === '0') {
			this.setState(
				{
					infoSysCurrentPage: page,
					infoSysSelectedRowKeys: []
				},
				() => {
					this.initList()
				}
			)
		}
		// 表单
		else if (this.state.currentTabKey === '1') {
			this.setState(
				{
					schemaCurrentPage: page,
					schemaSelectedRowKeys: []
				},
				() => {
					this.initList()
				}
			)
		}
	}

	render () {
		const {
			currentBusiness,
			currentTabKey,
			infoSysTableLoading,
			infoSysSelectedRowKeys,
			infoSysCurrentPage,
			infoSysPageTotal,
			infoSysPageSize,
			schemaTableLoading,
			schemaSelectedRowKeys,
			schemaCurrentPage,
			schemaPageTotal,
			schemaPageSize,
			infoSysClos,
			infoSysData,
			schemaClos,
			schemaData,
		} = this.state

		return (
			<BasicLayout
				title={'信息系统与表单管理（业务：' + currentBusiness + '）'}
				onlyRight
				headRightReactNode={
					<Button type="primary" onClick={this.onBack}>
						返回
					</Button>
				}
			>
				<Tab
					shape="wrapped"
					onChange={this.changeTab}
					activeKey={currentTabKey}
				>
					<Tab.Item
						title="信息系统"
						style={{ width: '100px', textAlign: 'center' }}
					>
						<div className="infosys_schema_contaner">
							<ListContainer
								searchRequest={this.searchRequest}
								createHandle={this.onCreateInfoSys}
								deleteAllHandle={() => this.deleteHandle(infoSysSelectedRowKeys)}
								selectedNum={infoSysSelectedRowKeys.length}
								current={infoSysCurrentPage}
								onChange={this.pageOnChange}
								total={infoSysPageTotal}
								pageSize={infoSysPageSize}
							>
								<ListCard
									dataSource={infoSysData}
									clos={infoSysClos}
									operation={this.infoSysOperation}
									primaryKey="uuid"
									rowSelection={(key) => this.rowSelection(key)}
									selectedRowKeys={this.state.infoSysSelectedRowKeys}
									loading={infoSysTableLoading}
								/>
							</ListContainer>
						</div>
					</Tab.Item>
					<Tab.Item
						title="表单"
						style={{ width: '100px', textAlign: 'center' }}
					>
						<div className="infosys_schema_contaner">
							<ListContainer
								searchRequest={this.searchRequest}
								createHandle={this.onCreateSchema}
								deleteAllHandle={() => this.deleteHandle(schemaSelectedRowKeys)}
								selectedNum={schemaSelectedRowKeys.length}
								current={schemaCurrentPage}
								onChange={this.pageOnChange}
								total={schemaPageTotal}
								pageSize={schemaPageSize}
							>
								<ListCard
									dataSource={schemaData}
									clos={schemaClos}
									operation={this.schemaOperation}
									primaryKey="uuid"
									rowSelection={(key) => this.rowSelection(key, 'schema')}
									selectedRowKeys={this.state.schemaSelectedRowKeys}
									loading={schemaTableLoading}
								/>
							</ListContainer>
						</div>
					</Tab.Item>
				</Tab>
			</BasicLayout>
		)
	}
}
