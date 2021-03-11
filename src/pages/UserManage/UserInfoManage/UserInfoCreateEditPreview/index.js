/*
 * @Author: Zhangyao
 * @Date: 2020-08-13 09:43:20
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-22 22:46:38
 */
import React from 'react'
import { Button } from '@alifd/next'
import { getQueryItemValue, jumpToPage } from '@/utils/common'
import { Tab } from '@/reduxActions'
import { connect } from 'react-redux'
@connect((state) => ({ state: state.tabs }), Tab)
class DataSourceCreateEditPreviewLayout extends React.Component {

	componentWillUnmount () {
		this.setState = () => {
			return
		}
	}

	onConfirm = () => {
		jumpToPage(this.props, '英雄管理', null, true)
	}

	onBack = () => {
		jumpToPage(this.props, '英雄管理', null, false)
	}

	render () {

		return (
			<div>
				<h1>
				【英雄信息管理】我是新增、编辑、查看的页面
				</h1>
				<h3>
				英雄名称: {decodeURI(getQueryItemValue(this.props.location.search, 'title'))}
				</h3>
				<Button style={{ marginTop: 10 }} type='primary' onClick={this.onConfirm} >确认按钮（确认会关闭该Tab）</Button>
				<br />
				<Button style={{ marginTop: 10 }} type='primary' onClick={this.onBack} >返回按钮</Button>
			</div>
		)
	}
}
export default DataSourceCreateEditPreviewLayout
