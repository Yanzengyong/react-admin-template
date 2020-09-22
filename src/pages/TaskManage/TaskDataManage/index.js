import React from 'react'
import { Button, Message, Table } from '@alifd/next'
import BasicLayout from '@/components/BasicLayout'
import ListContainer from '@/components/ListContainer'
import IconFont from '@/components/IconFont'
import Ellipsis from '@/components/Ellipsis'
import DeleteNotice from '@/components/DeleteNotice'


class TaskManage extends React.Component {
	state = {
		cols: [
			{
  			title: '任务名称',
  			dataIndex: 'taskName'
  		},
  		{
  			title: '任务描述',
  			dataIndex: 'taskDesc'
  		},
  		{
  			title: '任务成员',
  			dataIndex: 'user'
			},
			{
  			title: '操作',
  			dataIndex: 'action'
  		}
		],
		tableLoading: true,
		selectedRowKeys: [],
		searchName: '',
		data: []
	}

	componentDidMount () {
		this.setState({
			data: [
				{
					id: 'u7463hrb8332',
					taskName: '获取力量宝石',
					taskDesc: '获取力量宝石',
					user: [
						{ name: '钢铁侠', avatarname: 'iconIronman' },
						{ name: '幻视', avatarname: 'iconVisus' },
						{ name: '黑寡妇', avatarname: 'iconBlackwidow' },
						{ name: '黑豹', avatarname: 'iconPanther' }
					]
				},
				{
					id: 'u5342huini932',
					taskName: '获取空间宝石',
					taskDesc: '获取空间宝石',
					user: [
						{ name: '黑寡妇', avatarname: 'iconBlackwidow' },
						{ name: '浩克', avatarname: 'iconHulk' },
						{ name: '美国队长', avatarname: 'iconCaptain' }
					]
				},
				{
					id: 'u7fasfi284242',
					taskName: '获取现实宝石',
					taskDesc: '获取现实宝石',
					user: [
						{ name: '黑豹', avatarname: 'iconPanther' },
						{ name: '浩克', avatarname: 'iconHulk' },
						{ name: '鹰眼', avatarname: 'iconHawk' },
						{ name: '猎鹰', avatarname: 'iconFalcon' }
					]
				},
			],
			tableLoading: false
		})
	}

	componentWillUnmount () {
		this.setState = () => {
			return
		}
	}

	// 查询搜索的处理函数
	handleSearch = (val) => {
		this.setState(
			{
				searchName: val,
				currentPage: 1,
			}, () => {
				// 搜索对应的列表
			}
		)
	}

	// 节流防抖的请求方式
	searchRequest = (val) => {
		this.setState(
			{
				searchName: val,
				currentPage: 1,
			}, () => {
				// 搜索对应的列表
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

  // 多选 、 单选的change事件
  selectionOnChange = (key) => {
  	this.setState({
  		selectedRowKeys: key
  	})
	}

	// 渲染table的行逻辑
	renderTableCol = (dataIndex, record) => {
		if (dataIndex === 'action') {
			return (
				<div className='action_cols_box'>
					<Button
						className='icon'
						title="查看详情"
						type="primary"
						size='medium'
						onClick={
							() => {
								this.props.history.push(`/taskManage/dataSource/source/preview?title=${encodeURI(record.taskName)}&id=${record.id}`)
							}
						}
					>
						<IconFont type='iconperview' size='xs'/>
					</Button>
					<Button
						className='icon'
						title="编辑"
						type="primary"
						size='medium'
						onClick={() => { this.props.history.push(`/taskManage/dataSource/source/edit?title=${encodeURI(record.taskName)}&id=${record.id}`) }}
					>
						<IconFont type='iconedit' size='xs'/>
					</Button>
					<Button
						className='icon'
						title="删除"
						type="primary"
						warning
						size='medium'
						onClick={() => this.deleteHandle([record.id])}
					>
						<IconFont type='icondelete' size='xs'/>
					</Button>
				</div>
			)
		} else if (dataIndex === 'user') {
			return (
				<div className='action_cols_box'>
					{
						record[dataIndex].map((item) => (
							<div key={item.name} title={item.name}>
								<IconFont type={item.avatarname} size='xl'/>
							</div>
						))
					}
				</div>
			)
		} else {
			return record[dataIndex] ? <Ellipsis style={{ maxWidth: 150 }} text={record[dataIndex]} /> : '暂无'
		}
	}

	render () {
		const {
			cols,
			data,
			selectedRowKeys,
			tableLoading,
		} = this.state

  	const rowSelection = {
  		onChange: this.selectionOnChange,
  		selectedRowKeys
  	}
		return (
			<BasicLayout
				title="任务信息管理"
				subTitle="任务目录"
			>
				<ListContainer
					searchRequest={this.searchRequest}
					handleSearch={this.handleSearch}
					deleteAllHandle={() => this.deleteHandle(selectedRowKeys)}
					selectedNum={selectedRowKeys.length}
				>
  				<Table
  					loading={tableLoading}
  					primaryKey='uuid'
  					dataSource={data}
  					rowSelection={rowSelection}
  				>
  					{cols.map((item) => (
							<Table.Column
								key={item.title}
								title={item.title}
								cell={(value, index, record) => this.renderTableCol(item.dataIndex, record)}
							/>
  					))}
  				</Table>
				</ListContainer>
			</BasicLayout>
		)
	}
}

export default TaskManage
