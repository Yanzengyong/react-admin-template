import React from 'react'
import { Button, Message } from '@alifd/next'
import BasicLayout from '@/components/BasicLayout'
import ListContainer from '@/components/ListContainer'
import ListCard from '@/components/ListCard'
import { findCurrentRouteItem, findSpecRouteItem } from '@/utils/menuForRoute'
import DeleteNotice from '@/components/DeleteNotice'
import { BusinessManageAction } from '@/actions'
import { getQueryItemValue } from 'utils/common'

const { getViewListRQ, deleteViewRQ } = BusinessManageAction

export default class ViewsManage extends React.Component {
	state = {
		currentBusiness: '暂无',
		currentInfoSys: '暂无',
		currentBusinessUuid: '',
		currentInfoSysUuid: '',
		searchName: '',
		selectedRowKeys: [],
		currentPage: this.props.history.location.state
			? this.props.history.location.state.currentPage * 1
			: 1,
		pageTotal: 0,
		pageSize: 5,
		clos: [
			{
				title: '视图名称',
				dataIndex: 'name',
			},
			{
				title: '视图描述',
				dataIndex: 'memo',
			},
			{
				title: '创建时间',
				dataIndex: 'createTime',
			},
		],
		data: [],
		tableLoading: false,
	}

	static getDerivedStateFromProps (props) {
		const _search = props.location.search
		const currentBusiness = getQueryItemValue(_search, 'businessName')
		const currentBusinessUuid = getQueryItemValue(_search, 'businessUuid')
		const currentInfoSys = getQueryItemValue(_search, 'title')
		const currentInfoSysUuid = getQueryItemValue(_search, 'infoSysUuid')

		return {
			currentBusiness: currentBusiness,
			currentInfoSys: currentInfoSys,
			currentBusinessUuid: currentBusinessUuid,
			currentInfoSysUuid: currentInfoSysUuid
		}
	}

	componentDidMount () {
		this.getListHandle()
	}

	componentWillUnmount () {
		this.setState = () => {
			return
		}
	}

	// 刷新列表
	getListHandle = async () => {
		let param = {
			name: this.state.searchName,
			informationSystemsUuid: getQueryItemValue(
				this.props.location.search,
				'infoSysUuid'
			),
			isPage: true,
			page: this.state.currentPage,
			limit: this.state.pageSize,
		}
		let response = await getViewListRQ(param)
		if (response) {
			if (response.code === 10000) {
				this.setState({
					pageTotal: response.result.total,
					data: response.result.list,
					tableLoading: false,
				})
			} else {
				Message.error(response.msg || '列表获取失败')
			}
		} else {
			this.setState({
				tableLoading: false,
			})
		}
	}

	// 查询搜索的处理函数
	searchRequest = (val) => {
		this.setState(
			{
				searchName: val,
				currentPage: 1,
			},
			() => {
				this.getListHandle()
			}
		)
	}

	// 选中数据源目录的触发
	onSelectTree = (uuid, node) => {
		const params = node.node.props.extra.item
		this.setState(
			{
				currentCatalogueName: params.label,
				isShowCurrent: true,
				selectedDirectoryId: uuid[0],
				searchName: '',
				currentPage: 1,
			},
			() => {
				this.getlistHandle()
			}
		)
	}

	// 删除目录当前选中的事件
	deleteCurrentHandle = () => {
		this.setState(
			{
				currentCatalogueName: '',
				isShowCurrent: false,
				selectedDirectoryId: '',
				searchName: '',
				currentPage: 1,
			},
			() => {
				this.getlistHandle()
			}
		)
	}

	// 多选 、 单选的change事件
	rowSelection = (key) => {
		this.setState({
			selectedRowKeys: key,
		})
	}

	// 翻页的change事件
	pageOnChange = (page) => {
		this.setState(
			{
				currentPage: page,
				selectedRowKeys: []
			},
			() => {
				this.getListHandle()
			}
		)
	}

	// 列表item的操作按钮
	operation = (item) => {
		return (
			<div className="listCard_operation_box">
				<Button
					type="primary"
					className="btn"
					onClick={() => this.onPreviewViews(item)}
				>
					查看
				</Button>
				<Button
					type="secondary"
					className="btn"
					onClick={() => this.onEditViews(item)}
				>
					编辑
				</Button>
				<Button
					type="primary"
					warning
					className="btn"
					onClick={() => {
						this.deleteHandle([item.uuid])
					}}
				>
					删除
				</Button>
			</div>
		)
	}

	// 新增视图
	createHandle = () => {
		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter((item) => item.title === '新建数据视图')

		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${this.state.currentBusinessUuid}&informationSystemsUuid=${this.state.currentInfoSysUuid}&businessName=${this.state.currentBusiness}&title=${encodeURI(this.state.currentInfoSys)}`)
		}
	}

	// 查看视图
	onPreviewViews = (item) => {
		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter((item) => item.title === '查看数据视图')

		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${this.state.currentBusinessUuid}&businessName=${this.state.currentBusiness}&informationSystemsUuid=${this.state.currentInfoSysUuid}&informationSystemsName=${this.state.currentInfoSys}&viewUuid=${item.uuid}&title=${encodeURI(item.name)}`)
		}
	}

	// 编辑视图
	onEditViews = (item) => {
		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter((item) => item.title === '编辑数据视图')
		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${this.state.currentBusinessUuid}&businessName=${this.state.currentBusiness}&informationSystemsUuid=${this.state.currentInfoSysUuid}&informationSystemsName=${this.state.currentInfoSys}&viewUuid=${item.uuid}&title=${encodeURI(item.name)}`)
		}
	}

	// 删除列表当前选中的事件
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
				},
			})
		} else {
			Message.warning('未选中任何数据')
		}
	}
	// 确认删除
	deleteCurrentHandle = async (selectedRowKeys) => {
		const response = await deleteViewRQ({ uuids: selectedRowKeys })
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
				// 当前页完全删除：页数返回上一页 + 刷新页面数据
				// TODO: 当为中间页时，页数不应该返回上一页
				if (selectedRowKeys.length === this.state.data.length && this.state.currentPage !== 1 && deleteFailList.length === 0) {
					Message.success('删除成功')
					this.setState({
						currentPage: this.state.currentPage - 1
					}, () => {
							this.getListHandle()
					})
				}
				// 当前页不完全删除：页数不变 + 刷新页面数据
				else {
					Message.success('删除成功')
					this.getListHandle()
				}
				this.setState({ selectedRowKeys: deleteFailList })
			} else {
				Message.error(response.msg || '删除失败')
			}
		}
		else {
			Message.error('删除失败')
		}
	}

	// 返回上一页
	onBack = () => {
		const businessPreviewRoute = findSpecRouteItem('查看业务')
		const { search } = this.props.location
		const businessUuid = getQueryItemValue(search, 'businessUuid')
		const businessName = getQueryItemValue(search, 'businessName')

		this.props.history.push(`${businessPreviewRoute.path}?businessUuid=${businessUuid}&title=${businessName}`)

		// session中tab设置为信息系统页
		let storage = window.sessionStorage
		storage.businessTabKey = 0
	}

	render () {
		const {
			currentBusiness,
			currentInfoSys,
			selectedRowKeys,
			currentPage,
			pageTotal,
			pageSize,
			data,
			clos,
			tableLoading,
		} = this.state

		return (
			<BasicLayout
				title={
					'数据视图管理（业务：' +
					currentBusiness +
					'/' +
					'信息系统：' +
					currentInfoSys +
					'）'
				}
				onlyRight
				headRightReactNode={
					<Button type="primary" onClick={this.onBack}>
						返回
					</Button>
				}
			>
				<ListContainer
					searchRequest={this.searchRequest}
					createHandle={this.createHandle}
					deleteAllHandle={() => this.deleteHandle(selectedRowKeys)}
					selectedNum={selectedRowKeys.length}
					current={currentPage}
					total={pageTotal}
					pageSize={pageSize}
					onChange={this.pageOnChange}
				>
					<ListCard
						dataSource={data}
						clos={clos}
						operation={this.operation}
						primaryKey="uuid"
						rowSelection={(key) => this.rowSelection(key)}
						selectedRowKeys={this.state.selectedRowKeys}
						loading={tableLoading}
					></ListCard>
				</ListContainer>
			</BasicLayout>
		)
	}
}
