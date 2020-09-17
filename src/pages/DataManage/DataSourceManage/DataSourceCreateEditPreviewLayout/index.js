/*
 * @Author: Zhangyao
 * @Date: 2020-08-13 09:43:20
 * @LastEditors: Zhangyao
 * @LastEditTime: 2020-09-01 11:34:12
 */
import React from 'react'
import InfoLayout from '@/components/InfoLayout'
import DataSourceCreateEditPreview from '@/componentsService/DataSourceCreateEditPreview'
import { findCurrentRouteItem, findSpecRouteItem } from '@/utils/menuForRoute'
import { getQueryItemValue } from '@/utils/common'
import { connect } from 'react-redux'
import { Tab } from '@/reduxActions'
class DataSourceCreateEditPreviewLayout extends React.Component {
	state = {
		rightLabel: '',
		initFieldUuid: '',
	}
	// 返回数据源管理主页
	onBack = async () => {
		const dataSourceManageRoute = findSpecRouteItem('数据源管理')
		const { pathname, search } = this.props.location
		this.props.history.push(dataSourceManageRoute.path)
		// 注意设置tab的方法需要放在路由跳转的后面
		await this.props.setDeleteTabPath([`${pathname}${search}`])
		this.props.closeItemTab(`${pathname}${search}`)
	}

	componentWillUnmount () {
		this.setState = () => {
			return
		}
	}
	// 点击高级按钮，高级部分切换隐藏/显示模式
	showAdvance = () => {
		this.setState({
			displayAdvance: !this.state.displayAdvance,
		})
	}
	static getDerivedStateFromProps (props, state) {
		const currentUuid = props.location.search
		const prevUuid = state.initFieldUuid
		if (currentUuid !== prevUuid) {
			return {
				initFieldUuid: currentUuid,
			}
		}

		// 区分不同操作
		const Item = findCurrentRouteItem(props.location.pathname)
		console.log(Item)
		const dataSourceType = getQueryItemValue(props.location.search, 'type')
		return {
			pageType: Item && Item.type ? Item.type : 'create',
			dataSourceType: dataSourceType,
			rightLabel:
				dataSourceType === 'file'
					? '文件信息'
					: dataSourceType + '数据源连接信息',
		}
	}
	// 自己定义的组件，必须添加displayAdvance使用高级。必须添加onCancel使用返回,connectLabel动态传递数据源右边label
	render () {
		const {
			dataSourceType,
			connectLabel,
			rightLabel,
			pageType,
			initFieldUuid,
		} = this.state
		const navInfo = [
			{ label: '基本信息', value: 'basicInfo' },
			{ label: '高级', value: 'advanceBtn' },
			{ label: rightLabel, value: 'connectInfo' },
			{ label: '操作', value: 'operationBtns' },
		]
		if (pageType === 'preview') {
			navInfo.push({ label: '关联数据资源', value: 'relaDataResource' })
		}
		const advanceBtnId = 'advanceBtn'
		const advanceAffectIds = ['connectInfo', 'relaDataResource']
		const operationBtnId = 'operationBtns'
		return (
			<InfoLayout
				hasNavBar
				navInfo={navInfo}
				displayAdvance={this.state.displayAdvance}
				advanceBtnId={advanceBtnId}
				showAdvance={this.showAdvance}
				advanceAffectIds={advanceAffectIds}
				operationBtnId={operationBtnId}
				pageType={pageType}
			>
				<DataSourceCreateEditPreview
					key={initFieldUuid}
					initFieldUuid={initFieldUuid}
					pageType={pageType}
					connectLabel={connectLabel}
					showAdvance={this.showAdvance}
					displayAdvance={this.state.displayAdvance}
					dataSourceType={dataSourceType}
					{...this.props}
					onCancel={() => {
						this.props.history.go(-1)
					}}
				/>
			</InfoLayout>
		)
	}
}
export default connect(
	(state) => ({
		state: state.tabs,
	}),
	Tab
)(DataSourceCreateEditPreviewLayout)
