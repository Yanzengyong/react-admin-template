import React from 'react'
import { Button, Message } from '@alifd/next'
// import './index.scss'
import BasicLayout from '@/components/BasicLayout'
import ListContainer from '@/components/ListContainer'
import { DataResourceAction } from '@/actions'
import ListCard from '@/components/ListCard'
// import DataSourceDrawer from './components/dataSourceDrawer'
import DeleteNotice from '@/components/DeleteNotice'
const { getList } = DataResourceAction

class DataResourceManage extends React.Component {
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
  	treeList: [],
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
  	// this.getDirectoryList()
  }
  componentWillUnmount () {
  	this.setState = () => {
  		return
  	}
  }
  // 获取列表的函数
  getlistHandle = async () => {
  	this.setState({
  		tableLoading: true,
  	})
  	const response = await getList({
  		isPage: true,
  		page: this.state.currentPage,
  		limit: this.state.pageSize,
  		classification: this.state.selectedDirectoryId,
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
  	}
  }
  // 获取数据源目录
  getDirectoryList = async () => {}
  // 多选 、 单选的change事件
  rowSelection = (key) => {
  	this.setState({
  		selectedRowKeys: key,
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
		this.setState({
			searchName: val,
			currentPage: 1,
			}, () => {
			this.getlistHandle()
		})
	}

	// 节流防抖的请求方式
	searchRequest = (val) => {
		this.setState({
			searchName: val,
			currentPage: 1
		}, () => {
			this.getlistHandle()
		})
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

	operation = (item) => {
  	return (
  		<div className="listCard_operation_box">
  			<Button
  				type="primary"
  				onClick={() => {
  					this.preview(item)
  				}}
  				className="btn"
  			>
          查看
  			</Button>
  			<Button
  				type="secondary"
  				className="btn"
  				onClick={() => {
  					this.edit(item)
  				}}
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
  // 创建新增数据源
  createHandle = () => {
  	this.props.history.push('/dataManage/dataResource/create')
  }

  edit = (item) => {
  	this.props.history.push(`/dataManage/dataReSource/edit?uuid=${item.uuid}&title=${encodeURI(item.name)}`)
  	// this.props.history.push(`/dataManage/dataReSource/edit?uuid=${item.uuid}`)
  }

  preview = (item) => {
  	this.props.history.push(
  		`/dataManage/dataReSource/preview?uuid=${item.uuid}&title=${encodeURI(item.name)}`
  	)
  }
  batchCreate = () => {
  	this.props.history.push('/dataManage/dataReSource/batchCreate')
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
  		treeList
  	} = this.state
  	const test = (
  		<div>
  			<Button
  				style={{ marginRight: '10px' }}
  				className="listContainer_utilbox_right_btn"
  				type="primary"
  				onClick={this.createHandle}
  			>
          + 新建
  			</Button>
  			<Button
  				style={{ marginRight: '10px' }}
  				className="listContainer_utilbox_right_btn"
  				type="primary"
  				onClick={this.batchCreate}
  			>
          批量新增
  			</Button>
  			<Button
  				style={{ marginRight: '10px' }}
  				className="listContainer_utilbox_right_btn"
  				type="primary"
  				warning
  				onClick={() => this.deleteHandle(selectedRowKeys)}
  			>
          批量删除
  			</Button>
  		</div>
  	)
  	return (
  		<BasicLayout
  			title="数据资源基础信息管理"
  			subTitle="数据资源目录"
  			treeListData={treeList}
  			onSelectedHandle={this.onSelectTree}
  		>
  			<ListContainer
					searchRequest={this.searchRequest}
					handleSearch={this.handleSearch}
  				// createHandle={this.createHandle}
  				// deleteAllHandle={() => this.deleteHandle(selectedRowKeys)}
  				selectedNum={selectedRowKeys.length}
  				current={currentPage}
  				onChange={this.pageOnChange}
  				total={pageTotal}
  				pageSize={pageSize}
  				rightNode={test}
  			>
  				<ListCard
  					dataSource={data}
  					clos={clos}
  					operation={this.operation}
  					// pictureIndex="type"
  					primaryKey="uuid"
  					rowSelection={this.rowSelection}
  					selectedRowKeys={this.state.selectedRowKeys}
  					loading={tableLoading}
  				></ListCard>
  			</ListContainer>
  		</BasicLayout>
  	)
  }
}

export default DataResourceManage
