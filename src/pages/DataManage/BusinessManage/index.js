import React from 'react'
import { Button, Message, Notification } from '@alifd/next'
import BasicLayout from '@/components/BasicLayout'
import ListContainer from '@/components/ListContainer'
import ListCard from '@/components/ListCard'
import { findCurrentRouteItem } from '@/utils/menuForRoute'
import DeleteNotice from '@/components/DeleteNotice'
import { BusinessManageAction } from '@/actions'

const { getBusinessListRQ, deleteBusinessRQ } = BusinessManageAction

class BusinessManage extends React.Component {
	state = {
		// isShowCurrent: false,
		selectedCatalogue: '',
		searchName: '',
		selectedRowKeys: [],
		currentPage: this.props.history.location.state
			? this.props.history.location.state.currentPage * 1
			: 1,
		pageTotal: 0,
		pageSize: 5,
		clos: [
			{
				title: '业务名称',
				dataIndex: 'name',
			},
			{
				title: '业务描述',
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

	componentWillUnmount () {
		this.setState = () => {
			return
		}
	}

	componentDidMount () {

		this.getlistHandle()
	}

	// 刷新列表
	getlistHandle = () => {
		this.setState({ tableLoading: true }, async () => {
			const response = await getBusinessListRQ({
				isPage: true,
				page: this.state.currentPage,
				limit: this.state.pageSize,
				classification: this.state.selectedCatalogue,
				name: this.state.searchName,
			})
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
		})
	}

	// 选中数据源目录的触发
	onSelectTree = (node) => {
		const selectedCatalogue = node.uuid ? node.uuid : ''
		this.setState({
			selectedCatalogue: selectedCatalogue,
			currentPage: 1
		}, () => {
				this.getlistHandle()
		})
	}

	// 查询搜索的处理函数
	searchRequest = (val) => {
		this.setState(
			{
				searchName: val,
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
				selectedRowKeys: [],
			},
			() => {
				this.getlistHandle()
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
					onClick={() => this.onPreviewBusiness(item)}
				>
					查看
				</Button>
				<Button
					type="secondary"
					className="btn"
					onClick={() => this.onEditBusiness(item)}
				>
					编辑
				</Button>
				<Button
					type="primary"
					warning
					className="btn"
					onClick={() => {
						this.onDeleteHandle([item.uuid])
					}}
				>
					删除
				</Button>
			</div>
		)
	}

	// 新建业务
	createHandle = () => {
		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter((item) => item.title === '新建业务')
		if (JobPage && JobPage[0]) {
			this.props.history.push(JobPage[0].path)
		}
	}

	// 查看业务
	onPreviewBusiness = (item) => {
		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter((item) => item.title === '查看业务')
		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${item.uuid}&title=${encodeURI(item.name)}`)
		}
	}

	// 编辑业务
	onEditBusiness = (item) => {
		const page = findCurrentRouteItem(this.props.location.pathname)
		const JobPage = page.children.filter((item) => item.title === '编辑业务')
		if (JobPage && JobPage[0]) {
			this.props.history.push(`${JobPage[0].path}?businessUuid=${item.uuid}&title=${encodeURI(item.name)}`)
		}
	}

	// 删除目录当前选中的事件
	onDeleteHandle = (selectedRowKeys) => {
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
		const response = await deleteBusinessRQ({ uuids: selectedRowKeys })
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
				if (selectedRowKeys.length === this.state.data.length && this.state.currentPage !== 1 && deleteFailList.length === 0) {
					Message.success('删除成功')
					this.setState({
						currentPage: this.state.currentPage - 1
					}, () => {
							this.getlistHandle()
					})
				}
				// 当前页不完全删除：页数不变 + 刷新页面数据
				else {
					Message.success('删除成功')
					this.getlistHandle()
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

	render () {
		const {
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
				title="业务管理"
				subTitle="业务目录"
				catalogueType='ms-business/business'
				onSelectedHandle={this.onSelectTree}
			>
				<ListContainer
					searchRequest={this.searchRequest}
					createHandle={this.createHandle}
					deleteAllHandle={() => this.onDeleteHandle(selectedRowKeys)}
					selectedNum={selectedRowKeys.length}
					current={currentPage}
					onChange={this.pageOnChange}
					total={pageTotal}
					pageSize={pageSize}
				>
					<ListCard
						dataSource={data}
						clos={clos}
						operation={this.operation}
						primaryKey="uuid"
						rowSelection={this.rowSelection}
						selectedRowKeys={this.state.selectedRowKeys}
						loading={tableLoading}
					/>
				</ListContainer>
			</BasicLayout>
		)
	}
}

export default BusinessManage
