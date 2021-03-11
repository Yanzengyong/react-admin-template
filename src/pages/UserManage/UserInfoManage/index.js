import React from 'react'
import { Button, Message, Table } from '@alifd/next'
import BasicLayout from '@/components/BasicLayout'
import ListContainer from '@/components/ListContainer'
import IconFont from '@/components/IconFont'
import Ellipsis from '@/components/Ellipsis'
import DeleteNotice from '@/components/DeleteNotice'
import { jumpToPage } from '@/utils/common'

class UserInfoManage extends React.Component {
	state = {
		cols: [
			{
  			title: '英雄名称',
  			dataIndex: 'name'
  		},
  		{
  			title: '英雄描述',
  			dataIndex: 'desc'
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
					id: 'fasu227y8g23',
					name: '钢铁侠',
					desc: '钞能力拥有者',
				},
				{
					id: '423a423g23fd',
					name: '浩克',
					desc: '变异超能力拥有者',
				},
				{
					id: 'fadnfo89b2es',
					name: '美国队长',
					desc: '超级士兵、血清注射者',
				},
				{
					id: 'f2ni720hdf82',
					name: '雷神',
					desc: '阿斯加德的神',
				}
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
						onClick={() => {
							const params = [
								{ label: 'id', value: record.id },
								{ label: 'title', value: encodeURI(record.name) },
							]
							jumpToPage(
								this.props,
								'查看英雄信息',
								params,
								false,
								this.state.currentPage
							)
						}}
					>
						<IconFont type='iconperview' size='xs'/>
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
				title="英雄信息管理"
				onlyRight
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

export default UserInfoManage
