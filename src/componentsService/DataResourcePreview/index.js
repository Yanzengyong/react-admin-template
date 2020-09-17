import React from 'react'
import {
	Form,
	Field,
	Input,
	Table
} from '@alifd/next'
import InfoContainer from '@/components/InfoContainer'
import AdvanceBtn from '@/components/AdvanceBtn'
import BloodKinship from './bloodKinship'
import DataSize from './dataSize'
const FormItem = Form.Item
export default class DataResourcePreview extends React.Component {
  field = new Field(this)
  state = {
  	collectColumn: [
  		{ dataIndex: 'task', title: '采集任务' },
  		{ dataIndex: 'time', title: '采集时间' },
  		{ dataIndex: 'result', title: '采集状态' },
  		{ dataIndex: 'operation', title: '操作' },
  	],
  	qualityColumn: [
  		{ dataIndex: 'task', title: '质量任务' },
  		{ dataIndex: 'task', title: '执行时间' },
  		{ dataIndex: 'task', title: '执行结果' },
  		{ dataIndex: 'task', title: '操作' },
  	],
	}

  render () {
  	const init = this.field.init
  	const {
  		onCancel,
  		displayAdvance,
  		showAdvance,
  		sampleDataSource,
  		CollecteDataSource,
  	} = this.props
  	const { collectColumn, qualityColumn } = this.state
  	return (
  		<Form labelAlign="top" field={this.field} style={{ width: '100%' }}>
  			<InfoContainer title="基本信息" id="basicInfo">
  				<FormItem label="数据资源名称：" required>
  					<Input {...init('database', {})} />
  				</FormItem>
  				<FormItem label="数据资源描述：" required>
  					<Input {...init('database', {})} />
  				</FormItem>
  				<FormItem label="数据资源分类：" required>
  					<Input {...init('database', {})} />
  				</FormItem>
  				<FormItem label="数据源：" required>
  					<Input {...init('database', {})} />
  				</FormItem>
  				<FormItem label="数据库：" required>
  					<Input {...init('database', {})} />
  				</FormItem>
  				<FormItem label="数据实例" required>
  					<Input {...init('database', {})} />
  				</FormItem>
  			</InfoContainer>
  			<AdvanceBtn
  				displayAdvance={displayAdvance}
  				showAdvance={showAdvance}
  				id="advanceBtn"
  			/>
  			<InfoContainer
  				title="样例数据"
  				id="sampleData"
  				style={{ display: !this.props.displayAdvance ? 'none' : '' }}
  			>
  				<Table dataSource={sampleDataSource}></Table>
  			</InfoContainer>
  			<InfoContainer
  				title="血缘关系"
  				id="bloodKinship"
  				style={{ display: !this.props.displayAdvance ? 'none' : '' }}
  			>
  				<BloodKinship></BloodKinship>
  			</InfoContainer>
  			<InfoContainer
  				title="数据量趋势"
  				id="dataSize"
  				style={{ display: !this.props.displayAdvance ? 'none' : '' }}
  			>
  				<DataSize></DataSize>
  			</InfoContainer>
  			<InfoContainer
  				title="数据采集概况"
  				id="dataCollect"
  				style={{ display: !this.props.displayAdvance ? 'none' : '' }}
  			>
  				<Table dataSource={CollecteDataSource}>
  					{collectColumn.map((item, index) => {
  						return (
  							<Table.Column
  								key={index}
  								title={item.title}
  								dataIndex={item.dataIndex}
  								align="center"
  							/>
  						)
  					})}
  				</Table>
  			</InfoContainer>
  			<InfoContainer
  				title="数据模型"
  				id="dataModel"
  				style={{ display: !this.props.displayAdvance ? 'none' : '' }}
  			>
  				<FormItem label="模型名称：" required>
  					<Input {...init('database', {})} />
  				</FormItem>
  				<FormItem label="模型描述：" required>
  					<Input {...init('database', {})} />
  				</FormItem>
  				<FormItem label="模型详情：" required></FormItem>
  			</InfoContainer>
  			<InfoContainer
  				title="数据质量"
  				id="dataQuality"
  				style={{ display: !this.props.displayAdvance ? 'none' : '' }}
  			>
  				<Table dataSource={CollecteDataSource}>
  					{qualityColumn.map((item, index) => {
  						return (
  							<Table.Column
  								key={index}
  								title={item.title}
  								dataIndex={item.dataIndex}
  								align="center"
  							/>
  						)
  					})}
  				</Table>
  			</InfoContainer>
  		</Form>
  	)
  }
}
