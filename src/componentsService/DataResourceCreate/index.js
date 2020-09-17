import React from 'react'
import {
	Form,
	Field,
	Input,
	Select,
	Button,
	Table,
	Search,
	Pagination,
	Tree,
	TimePicker,
	Radio,
} from '@alifd/next'
import InfoContainer from '@/components/InfoContainer'
import reg from '@/utils/formValidation'
import CatalogueService from '@/componentsService/CatalogueService'
import './index.scss'
const FormItem = Form.Item
const { Node: TreeNode } = Tree
const RadioGroup = Radio.Group
export default class DataResourceCreate extends React.Component {
  field = new Field(this)
  state = {
  	dataSource: [
  		{ name: '5', type: '555', uuid: '4455' },
  		{ name: '5', type: '555', uuid: '1' },
  		{ name: '5', type: '555', uuid: '2' },
  		{ name: '5', type: '555', uuid: '3' },
  		{ name: '5', type: '555', uuid: '4' },
  	],
  	treeData: [],
  	dataSourceType: '',
  }
  // 目录节点选中
  onSelectedHandle = (node) => {
  	const { onSelectedHandle } = this.props
  	if (onSelectedHandle) {
  		onSelectedHandle(node)
  	}
  }
  searchOnChange = (v) => {
  	console.log(v)
  }

  render () {
  	const loop = (data) =>
  		data.map((item) => {
  			if (item.children) {
  				return (
  					<TreeNode
  						label={item.name}
  						// label={
  						// 	<div style={{ minWidth: 50 }}>
  						// 		<IceEllipsis
  						// 			lineLimit={1}
  						// 			text={item.name}
  						// 			showTooltip={true}
  						// 		/>
  						// 	</div>
  						// }
  						key={item.key}
  					>
  						{loop(item.children)}
  					</TreeNode>
  				)
  			}
  			return (
  				<TreeNode
  					label={item.name}
  					key={item.key}
  					isLeaf={item.isLeaf}
  					selectable={item.selectable}
  				/>
  			)
  		})
  	const init = this.field.init
  	const { dataSource, sampleDataSource, dataSourceType } = this.state
  	const { onCancel } = this.props
  	return (
  		<Form labelAlign="top" field={this.field} style={{ width: '100%' }}>
  			<InfoContainer title="选择数据源" id="chooseDataSource">
  				<div className="choose_data_source">
  					<div className="tree_box">
  						<CatalogueService
  							catalogueType="datasource"
  							onSelectedHandle={this.onSelectedHandle}
  						/>
  					</div>
  					<div className="data_source_table">
  						<Search
  							shape="simple"
  							onChange={this.searchOnChange}
  							className="search_data_source"
  						/>
  						<RadioGroup>
  							<Table dataSource={dataSource} id="relaDataResource">
  								<Table.Column
  									title=""
  									dataIndex="uuid"
  									align="center"
  									cell={(value) => {
  										return <Radio value={value}></Radio>
  									}}
  								/>

  								<Table.Column
  									title="数据源名称"
  									dataIndex="name"
  									align="center"
  								/>
  								<Table.Column
  									title="数据源类型"
  									dataIndex="type"
  									align="center"
  								/>
  							</Table>
  						</RadioGroup>

  						<Pagination
  							className="pag"
  							defaultCurrent={2}
  							onChange={this.onChange}
  						/>
  					</div>
  				</div>
  			</InfoContainer>
  			<InfoContainer title="选择数据对象" id="chooseDataObject">
  				{dataSourceType === 'wenjian' ? (
  					<div>
  						<FormItem label="时间标签：" required>
  							<TimePicker format="HH:mm" />
  						</FormItem>
  						<FormItem label="选择文件" required>
  							<Select
  								style={{ width: '50%' }}
  								placeholder="请选择文件"
  								{...init('relatedInfoSys')}
  							/>
  						</FormItem>
  						<FormItem label="样例数据：" required>
  							<Input.TextArea rows={4} />
  						</FormItem>
  					</div>
  				) : (
  					<div className="chooseDataSource">
  						<div className="treeBox">
  							<Tree
  								onSelect={this.onSelect}
  								loadData={this.onLoadData}
  								checkStrictly={true}
  								// onExpand={this.onExpand.bind(this)}
  								showLine
  							>
  								{loop(this.state.treeData)}
  							</Tree>
  						</div>
  						<div className="data_source_table">
  							<FormItem label="数据库：" required>
  								<Input
  									placeholder="请在左侧库表信息中选择数据库"
  									{...init('database', {
  										rules: [
  											{
  												required: true,
  												message: '请在左侧库表信息中选择数据库',
  											},
  										],
  									})}
  								/>
  							</FormItem>
  							<FormItem label="数据实例：" required>
  								<Input
  									placeholder="请在左侧库表信息中选择数据实例"
  									{...init('sample', {
  										rules: [
  											{
  												required: true,
  												message: '请在左侧库表信息中选择数据实例',
  											},
  										],
  									})}
  								/>
  							</FormItem>
  							<FormItem label="样例数据" required>
  								<Table dataSource={sampleDataSource}></Table>
  							</FormItem>
  						</div>
  					</div>
  				)}
  			</InfoContainer>
  			<InfoContainer title="配置" id="config">
  				<FormItem label="数据资源名称：" required>
  					<Input
  						placeholder="请输入数据资源名称"
  						{...init('sample', {
  							rules: [
  								{
  									required: true,
  									message: '请输入数据资源名称',
  								},
  							],
  						})}
  					/>
  				</FormItem>
  				<FormItem label="数据资源描述：" required>
  					<Input
  						placeholder="请输入数据资源描述"
  						{...init('sample', {
  							rules: [
  								{
  									required: true,
  									message: '请输入数据资源描述',
  								},
  							],
  						})}
  					/>
  				</FormItem>
  				<FormItem label="数据资源分类：" required>
  					<Select
  						style={{ width: '50%' }}
  						placeholder="请选择数据资源分类"
  						{...init('relatedInfoSys')}
  					/>
  				</FormItem>
  			</InfoContainer>
  			<div id="operationBtns">
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
  		</Form>
  	)
  }
}
