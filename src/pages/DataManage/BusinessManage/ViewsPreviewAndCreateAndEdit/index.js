import React from 'react'
import InfoLayout from '@/components/InfoLayout'
import ViewsPreviewAndCreateAndEditService from '@/componentsService/ViewsPreviewAndCreateAndEditService'
import { findCurrentRouteItem, findSpecRouteItem } from '@/utils/menuForRoute'
import { getQueryItemValue } from '@/utils/common'
import { connect } from 'react-redux'
import { Tab } from '@/reduxActions'

class ViewsPreviewAndCreateAndEdit extends React.Component {
  state = {
  	pageType: 'create',
  	initFieldUuid: '',
  	displayAdvance: false
	}

	static getDerivedStateFromProps (props, state) {
		const Item = findCurrentRouteItem(props.location.pathname)
		const _search = props.location.search
		const currentViewUuid = getQueryItemValue(_search, 'viewUuid')
		const prevUuid = state.initFieldUuid

		if (Item && Item.type === 'create') {
			return {
				pageType: 'create',
			}
		} else if (Item && (Item.type === 'edit' || Item.type === 'preview')) {
			if (currentViewUuid !== prevUuid) {
				return {
					pageType: Item.type,
					initFieldUuid: currentViewUuid,
				}
			}
		}
		return null
	}

  // 点击高级按钮，高级部分切换隐藏/显示模式
  showAdvance = () => {
  	this.setState({
  		displayAdvance: !this.state.displayAdvance
  	})
	}

	onBack = (businessUuid, title, infoSysUuid, businessName) => {
		const viewManageRoute = findSpecRouteItem('数据视图管理')
		const { pathname, search } = this.props.location

		this.props.history.push(`${viewManageRoute.path}?businessUuid=${businessUuid}&infoSysUuid=${infoSysUuid}&title=${title}&businessName=${businessName}`)

		// 注意设置tab的方法需要放在路由跳转的后面
		this.props.closeItemTab(`${pathname}${search}`)
	}

  render () {
  	// 导航栏 - 标题+锚点id
  	const navInfo = [
  		{ label:'基本信息', value: 'basicInfo' },
  		{ label:'高级', value: 'advanceBtn' },
  		{ label:'视图信息', value: 'viewInfo' },
  		{ label:'附件', value: 'extraFiles' },
  		{ label:'操作', value: 'operationBtns' },
  	]

  	// 导航栏 - 高级按钮需用于隐藏的部分的id集合
  	const advanceAffectIds = ['viewInfo', 'extraFiles']

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
				<ViewsPreviewAndCreateAndEditService
					key={this.state.initFieldUuid}
  				pageType={this.state.pageType}
  				initFieldUuid={this.state.initFieldUuid}
					onBack={this.onBack}
  				showAdvance={this.showAdvance}
					displayAdvance={this.state.displayAdvance}
					{...this.props}
  			/>
  		</InfoLayout>
  	)
  }
}

export default connect(
	(state) => ({
		state: state.tabs
	}), Tab
)(ViewsPreviewAndCreateAndEdit)
