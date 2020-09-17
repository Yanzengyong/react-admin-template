import React from 'react'
import {
	Form,
	Field,
	Input,
	CascaderSelect,
	Button,
	Select,
	Checkbox,
	DatePicker,
} from '@alifd/next'
import InfoContainer from '@/components/InfoContainer'
import PropTypes from 'prop-types' // 类型检查
import moment from 'moment'

moment.locale('zh-cn')

const FormItem = Form.Item
const { RangePicker } = DatePicker

export default class JobCreateAndEditService extends React.Component {
	field = new Field(this)

	state = {
		useAirflow: false,
		timeCircleOptions: [
			{ label: '分钟', value: 'minute' },
			{ label: '小时', value: 'hour' },
			{ label: '天', value: 'day' },
			{ label: '周', value: 'week' },
			{ label: '月', value: 'month' },
		],
	}

	UNSAFE_componentWillReceiveProps (nextProps) {
		if (nextProps.pageType === 'edit') {
			this.field.setValue('name', 'test')
		}
	}

	componentWillUnmount () {
		this.setState = () => {
			return
		}
	}

	// 确认提交
	onSubmit = () => {
		this.field.validate((errors, values) => {
			if (errors) return
			console.log(values)
		})
	}

	render () {
		const { pageType, onCancel } = this.props

		const { useAirflow, timeCircleOptions } = this.state

		const init = this.field.init

		return (
			<Form labelAlign="top" field={this.field} style={{ width: '100%' }}>
				<InfoContainer title="基本信息" id="basicInfo">
					<FormItem label="所属项目：" required>
						<Select
							style={{ width: '49%' }}
							placeholder="请选择所属项目"
							{...init('projectUuid')}
							disabled
						/>
					</FormItem>
					<FormItem label="作业名称：" required>
						<Input
							maxLength={50}
							hasLimitHint
							placeholder="请输入作业名称"
							{...init('name', {
								rules: [{ required: true, message: '作业名称不能为空' }],
							})}
						/>
					</FormItem>
					<FormItem label="作业描述：">
						<Input
							maxLength={200}
							hasLimitHint
							placeholder="请输入作业描述"
							{...init('description')}
						/>
					</FormItem>
					<FormItem label="作业分类：">
						<CascaderSelect
							style={{ width: '49%' }}
							placeholder="请选择作业分类"
							{...init('catelogUuid')}
						/>
					</FormItem>
				</InfoContainer>

				<InfoContainer title="调度信息" id="airflowInfo">
					<FormItem label="调度配置：">
						<Checkbox
							label="是否调度"
							value={useAirflow}
							onChange={(val) => {
								this.setState({ useAirflow: val })
							}}
						/>
					</FormItem>
					{this.state.useAirflow ? (
						<span>
							<FormItem label="调度生效日期：" required>
								<RangePicker style={{ width: '49%' }} {...init('timePeriod')} />
							</FormItem>
							<FormItem label="调度预警邮箱：" required>
								<Input
									style={{ width: '49%' }}
									{...init('alertEmail')}
									hasLimitHint
									placeholder="请添加预警邮箱，按中文逗号“，”分割"
								/>
							</FormItem>
							<FormItem label="调度周期设置：" required>
								<Select
									style={{ width: '49%' }}
									placeholder="请选择调度周期"
									{...init('circle')}
									dataSource={timeCircleOptions}
								/>
							</FormItem>
						</span>
					) : null}
				</InfoContainer>

				<div
					id="operationBtns"
					style={{ display: pageType === 'preview' ? 'none' : '' }}
				>
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

// props默认值指定
JobCreateAndEditService.defaultProps = {
	pageType: 'create',
	initFieldUuid: '',
}

JobCreateAndEditService.propTypes = {
	pageType: PropTypes.string, // 页面类型 - 新建业务：create/编辑业务：edit/查看业务：preview
	initFieldUuid: PropTypes.string, // 编辑业务 - 初始化表单数据的业务uuid
}
