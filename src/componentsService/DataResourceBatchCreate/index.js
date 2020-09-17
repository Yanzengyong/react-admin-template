import React from 'react'
import { Table, Input, Select, Button } from '@alifd/next'
import IconFont from '@/components/IconFont'
import './index.scss'
export default class DataResourceBatchCreate extends React.Component {
	state = {
		dataSource: [
			{
				name: '',
				description: '',
				type: '',
				dataSource: '',
				dataBase: '',
				dataInstance: '',
			},
			{
				name: '',
				description: '',
				type: '',
				dataSource: '',
				dataBase: '',
				dataInstance: '',
			},
			{
				name: '',
				description: '',
				type: '',
				dataSource: '',
				dataBase: '',
				dataInstance: '',
			},
			{
				name: '',
				description: '',
				type: '',
				dataSource: '',
				dataBase: '',
				dataInstance: '',
			},
			{
				name: '',
				description: '',
				type: '',
				dataSource: '',
				dataBase: '',
				dataInstance: '',
			},
		],
	}

	onSubmit = () => {

	}
	InputCell = (value, index, record, dataIndex, title) => {
		let saveDataSource = [...this.state.dataSource]
		return (
			<Input
				placeholder={'请输入' + title}
				style={{ width: '100%' }}
				onChange={(v) => {
					saveDataSource[index][dataIndex] = v
					this.setState({
						dataSource: saveDataSource,
					})
				}}
			/>
		)
	}
	SelectCell = (value, index, record, dataIndex, title) => {
		let selectdataSource = [
			{ label: 'option1', value: 'option1' },
			{ label: 'option2', value: 'option2' },
		]
		let { dataSource } = this.state
		return (
			<Select
				dataSource={selectdataSource}
				placeholder={'请选择' + title}
				style={{ width: '100%' }}
				onChange={(v) => {
					dataSource[index][dataIndex] = v
					this.setState({
						dataSource,
					})
				}}
			/>
		)
	}
	addDataSource = () => {
		let saveDataSource = [...this.state.dataSource]
		let item = {
			name: '',
			description: '',
			type: '',
			dataSource: '',
			dataBase: '',
			dataInstance: '',
		}
		saveDataSource.push(item)
		this.setState({
			dataSource: saveDataSource,
		})
	}
	descriptionInputCell = () => {}
	render () {
		const { dataSource } = this.state
		const { onCancel } = this.props
		const selectdataSource = [
			{ label: 'option1', value: 'option1' },
			{ label: 'option2', value: 'option2' },
		]

		const columnName = [
			{ title: '名称', dataIndex: 'name', cell: this.InputCell },
			{ title: '描述', dataIndex: 'description', cell: this.InputCell },
			{ title: '分类', dataIndex: 'type', cell: this.SelectCell },
			{ title: '数据源', dataIndex: 'dataSource', cell: this.SelectCell },
			{ title: '数据库', dataIndex: 'dataBase', cell: this.SelectCell },
			{ title: '数据实例', dataIndex: 'dataInstance', cell: this.SelectCell },
		]

		return (
			<div>
				<Table dataSource={dataSource}>
					{columnName.map((item, index) => {
						return (
							<Table.Column
								key={index}
								title={item.title}
								dataIndex={item.dataIndex}
								cell={(value, index, record) =>
									item.cell(value, index, record, item.dataIndex, item.title)
								}
							/>
						)
					})}
				</Table>
				<div className="icon_font_css" onClick={this.addDataSource}>
					<IconFont
						type="iconcatalogue_add"
						size="large"
						style={{ marginRight: '10px' }}
					/>
					添加
				</div>

				<div style={{ marginTop: '20px' }}>
					<Button
						type="primary"
						style={{ marginRight: 10 }}
						onClick={this.onSubmit}
					>
						确认
					</Button>
					<Button type="secondary" onClick={onCancel}>
						取消
					</Button>
				</div>
			</div>
		)
	}
}
