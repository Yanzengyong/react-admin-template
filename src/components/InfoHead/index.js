/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-08-17 09:06:45
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-08-26 10:16:23
 */
import React from 'react'
import { Breadcrumb, Button } from '@alifd/next'
import { withRouter, Link } from 'react-router-dom'
import MenuConfig from '@/menus'
import {	DefaultMenu, expendSideMenusHandle, getBreadcrumbData } from 'utils/menuForRoute'
import './index.scss'


class InfoHead extends React.Component {
	state = {
		breadcrumbList: []
	}
	componentDidMount () {

		const route = this.props.location

		this.initBreadcrumb(route.pathname)
	}

	// 初始化面包屑
	initBreadcrumb = (path) => {

		const UrlPath = path === '/' ? DefaultMenu.path : path

		const currentMain = MenuConfig.find((item) => {
			return UrlPath.indexOf(item.path) !== -1
		})

		const currentSideMenu = currentMain ? currentMain.sideMenu : []

		const expendSideMenus = expendSideMenusHandle(currentSideMenu)

		const currentPathInfo = expendSideMenus.find((item) => item.path === UrlPath)

		const breadcrumbList = getBreadcrumbData(currentPathInfo)

		this.setState({
			breadcrumbList
		})
	}

	backRouteHandle = () => {
		this.props.history.go(-1)
	}
	render () {
		return (
			<div className="info_head">
				<Breadcrumb>
					{
						this.state.breadcrumbList.map((item) => (
							<Breadcrumb.Item key={item.path}>
								{item.title}
								{/* {this.state.breadcrumbList.length - 1 === index ? (
									item.title
								) : <Link to={item.path}> {item.title} </Link>} */}
							</Breadcrumb.Item>
						))
					}
				</Breadcrumb>
				<Button
					size='medium'
					type="primary"
					onClick={this.backRouteHandle}
				>返回</Button>
			</div>
		)
	}
}

export default withRouter(InfoHead)
