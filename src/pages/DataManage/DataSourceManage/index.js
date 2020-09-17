import React from 'react'
import { Button, Message } from '@alifd/next'
import BasicLayout from '@/components/BasicLayout'
import ListContainer from '@/components/ListContainer'
import { DataSourceAction } from '@/actions'
import ListCard from '@/components/ListCard'
import DataSourceDrawer from '@/componentsService/DataSourceDrawer'
import DeleteNotice from '@/components/DeleteNotice'
const { getSourceListRQ } = DataSourceAction

class DataSourceManage extends React.Component {
	state = {
		clos: [
			{
				title: '数据源名称',
				dataIndex: 'name',
			},
			{
				title: '数据源描述',
				dataIndex: 'memo',
			},
			{
				title: '创建时间',
				dataIndex: 'createTime',
			},
		],

		testDataSource: [
			{
				apiUrl: '',
				catalogueDirectoryList: null,
				catalogueList: null,
				clusterAddress: '',
				connectStatus: 0,
				createTime: 1592448705000,
				creator: '',
				creatorName: '',
				datasourceType: 0,
				dbCount: 0,
				defaultDatabase: 'origin',
				deleteStatus: 0,
				fileLocation: '',
				host: '10.1.119.34',
				id: 3741,
				isProduction: 0,
				memo: '生态指标测试',
				name: '测试origin',
				partitionId: '',
				password: 'cetc@2019',
				port: 30036,
				status: 0,
				tableCount: 0,
				tableName: null,
				topic: '',
				type: 'mysql',
				updateTime: 1592448781000,
				updater: '',
				updaterName: '',
				username: 'root',
				uuid: 'd56a2a0470cc47589da30d0e759e7af4',
			},
			{
				apiUrl: '',
				catalogueDirectoryList: null,
				catalogueList: null,
				clusterAddress: '',
				connectStatus: 0,
				createTime: 1592448705000,
				creator: '',
				creatorName: '',
				datasourceType: 0,
				dbCount: 0,
				defaultDatabase: 'origin',
				deleteStatus: 0,
				fileLocation: '',
				host: '10.1.119.34',
				id: 3741,
				isProduction: 0,
				memo:
					'生态指标测试生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测生态指标测',
				name: '测试origin',
				partitionId: '',
				password: 'cetc@2019',
				port: 30036,
				status: 1,
				tableCount: 0,
				tableName: null,
				topic: '',
				type: 'mysql',
				updateTime: 1592448781000,
				updater: '',
				updaterName: '',
				username: 'root',
				uuid: 'd56a2a0470cc47589da30d0e759e7af4',
			},
		],
		tableLoading: true,
		selectedRowKeys: [],
		currentPage: this.props.history.location.state
			? this.props.history.location.state.currentPage * 1
			: 1,
		pageTotal: 0,
		pageSize: 5,
		searchName: '',
		selectedDirectoryId: '', // 选中的目录key，用来操作那颗树
		data: [],
		deleteDialogVisible: false,
		deleteParams: [],
		currentCatalogueName: '',
		isShowCurrent: false,
	}
	componentDidMount () {
		this.getlistHandle()
	}
	componentWillUnmount () {
		this.setState = () => {
			return
		}
	}
	// 获取列表的函数
	getlistHandle = async () => {
		this.setState({
			tableLoadin: true,
		})
		const response = await getSourceListRQ({
			isPage: true,
			page: this.state.currentPage,
			limit: this.state.pageSize,
			classification: this.state.selectedDirectoryId,
			name: this.state.searchName,
		})
		console.log(response)
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
	// 多选 、 单选的change事件
	rowSelection = (key) => {
		this.setState({
			selectedRowKeys: key,
		})
	}
	// 关闭数据源抽屉
	dataSourceDrawerOnClose = () => {
		this.setState({
			dataSourceDrawerVisible: false,
		})
	}
	// 选中数据源目录的触发
	onSelectTree = (node) => {
		this.setState(
			{
				selectedDirectoryId: node.uuid,
				searchName: '',
				currentPage: 1,
			},
			() => {
				this.getlistHandle()
			}
		)
	}

	// 查询搜索的处理函数
	handleSearch = (val) => {
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

	// 节流防抖的请求方式
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

	// 翻页的change事件
	pageOnChange = (page) => {
		this.setState(
			{
				currentPage: page,
				tableLoading: true,
				selectedRowKeys: [],
			},
			() => {
				this.getlistHandle()
			}
		)
	}
	// 批量删除、删除函数
	deleteHandle = (params) => {
		console.log(params)
		if (params.length > 0) {
			// 存在选中
			DeleteNotice.show({
				message: '该数据删除后无法恢复',
				onCancel: () => {
					DeleteNotice.close()
				},
				onConfirm: () => {
					DeleteNotice.close()
				},
			})
		} else {
			Message.show({
				type: 'error',
				content: '请选择需要删除的数据后再进行此操作',
				align: 'cc, cc',
				duration: 1500,
			})
		}
	}

	operation = (primaryKey, item) => {
		return (
			<div className="listCard_operation_box">
				<Button
					type="primary"
					onClick={() => {
						this.preview(primaryKey, item)
					}}
					className="btn"
				>
					查看
				</Button>
				<Button
					type="secondary"
					className="btn"
					onClick={() => {
						this.edit(primaryKey, item)
					}}
				>
					编辑
				</Button>
				<Button
					type="primary"
					warning
					className="btn"
					onClick={() => {
						this.deleteHandle([primaryKey])
					}}
				>
					删除
				</Button>
			</div>
		)
	}
	// 创建新增数据源
	createHandle = () => {
		this.setState({
			dataSourceDrawerVisible: true,
		})
	}
	edit = (item) => {
		this.props.history.push(
			`/dataManage/dataSource/edit?type=${item.type}&uuid=${item.uuid}&title=${encodeURI(item.name)}`
		)
	}
	preview = (item) => {
		this.props.history.push(
			`/dataManage/dataSource/preview?type=${item.type}&uuid=${item.uuid}&title=${encodeURI(item.name)}`
		)
	}

	render () {
		const {
			clos,
			data,
			selectedRowKeys,
			currentPage,
			pageTotal,
			pageSize,
			tableLoading,
			dataSourceDrawerVisible,
		} = this.state

		return (
			<BasicLayout
				title="数据源基础信息管理"
				subTitle="数据源目录"
					catalogueType='govern-datasource/datasource'
				onSelectedHandle={this.onSelectTree}
			>
				<ListContainer
					searchRequest={this.searchRequest}
					handleSearch={this.handleSearch}
					createHandle={this.createHandle}
					deleteAllHandle={() => this.deleteHandle(selectedRowKeys)}
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
						pictureIndex="type"
						primaryKey="uuid"
						rowSelection={this.rowSelection}
						selectedRowKeys={this.state.selectedRowKeys}
						loading={tableLoading}
					/>
					<DataSourceDrawer
						dataSourceDrawerVisible={dataSourceDrawerVisible}
						dataSourceDrawerOnClose={this.dataSourceDrawerOnClose}
						history={this.props.history}
					/>
				</ListContainer>
			</BasicLayout>
		)
	}
}

export default DataSourceManage
