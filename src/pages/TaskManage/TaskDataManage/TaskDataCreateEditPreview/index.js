/*
 * @Description:
 * @Version:
 * @Author: Yanzengyong
 * @Date: 2020-09-18 17:14:07
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-23 10:06:36
 */
import React from 'react'
import { Button } from '@alifd/next'
import { connect } from 'react-redux'
import { Tab } from '@/reduxActions'
import { getQueryItemValue } from '@/utils/common'

@connect(
	(state) => ({
		state: state.tabs,
	}),
	Tab
)
class DataSourceCreateEditPreviewLayout extends React.Component {

	componentWillUnmount () {
		this.setState = () => {
			return
		}
	}


	onConfirm = async () => {
		const { pathname, search } = this.props.location

		this.props.history.replace('/taskManage/dataSource/source')

		// 注意设置tab的方法需要放在路由跳转的后面
		await this.props.setDeleteTabPath([`${pathname}${search}`])

		this.props.closeItemTab(`${pathname}${search}`)
	}

	onBack = () => {
		this.props.history.replace('/taskManage/dataSource/source')
	}

	render () {

		return (
			<div>
				<h1>
				【任务信息管理】我是新增、编辑、查看的页面
				</h1>
				<h3>
				任务名称: {decodeURI(getQueryItemValue(this.props.location.search, 'title'))}
				</h3>
				<Button style={{ marginTop: 10 }} type='primary' onClick={this.onConfirm} >确认按钮（确认会关闭该Tab）</Button>
				<br />
				<Button style={{ marginTop: 10 }} type='primary' onClick={this.onBack} >返回按钮</Button>
			</div>
		)
	}
}
export default DataSourceCreateEditPreviewLayout
