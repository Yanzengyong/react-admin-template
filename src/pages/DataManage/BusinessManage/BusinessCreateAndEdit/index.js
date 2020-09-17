/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-08-17 09:06:45
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-08-31 11:51:32
 */
import React from 'react'
import InfoLayout from '@/components/InfoLayout'
import BusinessCreateAndEditService from '@/componentsService/BusinessCreateAndEditService'
import { findCurrentRouteItem, findSpecRouteItem } from '@/utils/menuForRoute'
import { getQueryItemValue } from '@/utils/common'
import { connect } from 'react-redux'
import { Tab } from '@/reduxActions'
import './index.scss'
class BusinessCreateAndEdit extends React.Component {

	state = {
		pageType: '',
		initFieldUuid: ''
	}

	static getDerivedStateFromProps (props, state) {
		const Item = findCurrentRouteItem(props.location.pathname)
		const _search = props.location.search
		const currentUuid = getQueryItemValue(_search, 'businessUuid')
		const prevUuid = state.initFieldUuid
		if (Item && Item.type === 'create') {
			return {
				pageType: 'create'
			}
		}
		else if (Item && Item.type === 'edit') {
			if (currentUuid !== prevUuid) {
				return {
					pageType:'edit',
					initFieldUuid: currentUuid
				}
			}
		}
		else if (Item && Item.type === 'preview') {
			return {
				pageType: 'preview'
			}
		}
		return null
	}

	// 返回业务管理主页
	onBack = async () => {

		const businessManageRoute = findSpecRouteItem('业务管理')
		const {
			pathname,
			search
		} = this.props.location

		this.props.history.push(businessManageRoute.path)
		// 注意设置tab的方法需要放在路由跳转的后面
		await this.props.setDeleteTabPath([`${pathname}${search}`])
		this.props.closeItemTab(`${pathname}${search}`)
	}


	render () {
		const { pageType, initFieldUuid } = this.state
		return (
			<InfoLayout>
				<BusinessCreateAndEditService
					key={initFieldUuid}
					pageType={pageType}
					initFieldUuid={initFieldUuid}
					onBack={() => this.onBack()}
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
)(BusinessCreateAndEdit)
