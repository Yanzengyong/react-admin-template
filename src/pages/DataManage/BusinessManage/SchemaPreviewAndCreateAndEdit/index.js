import React from 'react'
import InfoLayout from '@/components/InfoLayout'
import SchemaPreviewAndCreateAndEditService from '@/componentsService/SchemaPreviewAndCreateAndEditService'
import { findCurrentRouteItem, findSpecRouteItem } from '@/utils/menuForRoute'
import { getQueryItemValue } from '@/utils/common'
import { connect } from 'react-redux'
import { Tab } from '@/reduxActions'

class SchemaPreviewAndCreateAndEdit extends React.Component {
	state = {
		pageType: 'create',
		initFieldUuid: '',
		displayAdvance: false,
	}

	static getDerivedStateFromProps (props, state) {
		const Item = findCurrentRouteItem(props.location.pathname)
		const _search = props.location.search
		const currentSchemaUuid = getQueryItemValue(_search, 'schemaUuid')
		const prevUuid = state.initFieldUuid

		if (Item && Item.type === 'create') {
			return {
				pageType: 'create',
			}
		}
		else if (Item && (Item.type === 'edit' || Item.type === 'preview')) {
			if (currentSchemaUuid !== prevUuid) {
				return {
					pageType: Item.type,
					initFieldUuid: currentSchemaUuid,
				}
			}
		}
		return null
	}

	// 点击高级按钮，高级部分切换隐藏/显示模式
	showAdvance = () => {
		this.setState({
			displayAdvance: !this.state.displayAdvance,
		})
	}

	// 返回表单列表页
	onBack = (businessUuid, title) => {
		const businessPreviewRoute = findSpecRouteItem('查看业务')
		const { pathname, search } = this.props.location

		this.props.history.push(`${businessPreviewRoute.path}?businessUuid=${businessUuid}&title=${title}`)

		// session中tab设置为表单页
		let storage = window.sessionStorage
		storage.businessTabKey = 1

		// 注意设置tab的方法需要放在路由跳转的后面
		this.props.closeItemTab(`${pathname}${search}`)
	}

	render () {
		// 导航栏 - 标题+锚点id
		const navInfo = [
			{ label: '基本信息', value: 'basicInfo' },
			{ label: '高级', value: 'advanceBtn' },
			{ label: '文件信息', value: 'fileInfo' },
			{ label: '操作', value: 'operationBtns' },
		]

		// 导航栏 - 高级按钮需用于隐藏的部分的id集合
		const advanceAffectIds = ['fileInfo']

		// 导航栏 - 高级按钮的锚点id（需与navInfo)部分value相同，否则无效果
		const advanceBtnId = 'advanceBtn'

		// 导航栏 - 操作按钮的锚点id（需与navInfo）部分value相同，用于在“查看”页面中隐藏导航栏
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
				pageType={this.state.pageType}
			>
				<SchemaPreviewAndCreateAndEditService
					key={this.state.initFieldUuid}
					pageType={this.state.pageType}
					initFieldUuid={this.state.initFieldUuid}
					showAdvance={this.showAdvance}
					displayAdvance={this.state.displayAdvance}
					onBack={this.onBack}
					{...this.props}
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
)(SchemaPreviewAndCreateAndEdit)
