import React from 'react'
import {
	Form,
	Field,
	Input,
	Button
} from '@alifd/next'
import InfoContainer from '@/components/InfoContainer'
const FormItem = Form.Item
export default class DataResourceEdit extends React.Component {
  field = new Field(this)
  render () {
  	const init = this.field.init
  	const { onCancel }=this.props
  	return (
  		<Form labelAlign="top" field={this.field} style={{ width: '100%' }}>
  			<InfoContainer title="基本信息" id="chooseDataSource">
  				<FormItem label="数据资源名称：" required>
  					<Input
  						placeholder="请输入数据资源名称"
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
  				<FormItem label="数据资源描述：" required>
  					<Input placeholder="请输入数据资源描述" />
  				</FormItem>
  				<FormItem label="数据资源分类：" required>
  					<Input placeholder="请选择数据资源分类" />
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
