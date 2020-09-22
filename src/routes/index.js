/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-22 23:20:00
 */
/**
 * 定义应用路
 */
import React from 'react'
import {
	Route,
	Redirect,
	Switch,
	withRouter,
	HashRouter as Router
} from 'react-router-dom'
import Layout from '@/layout'
import NotFound from '@/pages/NotFound'
import MenuConfig from '@/menus'
import AllPages from '@/pagesConfig'
import { getUserInfo } from 'utils/authentication'


// 处理菜单列表，实例化路由标签
const instantiationRouteDiv = (MenuConfig) => {
	let routerList = []
	MenuConfig.forEach((item) => {
		const loopMenu = (menus) => {
			menus.forEach((menu) => {
				if (menu.children && menu.children.length > 0) {
					loopMenu(menu.children)
					menu.isSub && !menu.component ? routerList = [...routerList] : routerList = [menu, ...routerList]
				} else {
					routerList = [
						menu,
						...routerList
					]
				}
			})
		}
		loopMenu(item.sideMenu)
	})
	return routerList
}

// 配置路由鉴权
const AuthRouteComponentHandle = (props) => {
	const {
		role,
		path,
		exact,
		component,
		title,
		...restProps
	} = props
	console.log(restProps)
	const UserInfo = getUserInfo()

	if (UserInfo && UserInfo.role && role.indexOf(UserInfo.role) !== -1) {
		return (
			<Route
				path={path}
				exact={exact}
				render={(props) => {
					const ItemComponent = AllPages[component]

					return (
						<ItemComponent
							{...props}
							title={title}
						/>
					)

				}}
			/>
		)
	} else {
		return (
			<Route component={((extra) => (props) => <NotFound {...props} {...extra} />)({ Auth: 'no' })} />
		)
	}
}

const routeList = instantiationRouteDiv(MenuConfig)
// layout路由列表
const LayoutRouteList = routeList.filter((item) => item.layout)
// 无layout路由列表
const OriginalRouteList = routeList.filter((item) => {
	const hasLayout = item.layout ?? false
	return hasLayout === false
})
// 路由渲染装饰器
const DecoratorRouteLayout = (OriginalRouteList, LayoutRouteList) => {
	return (Comp) => {
		return (props) => {
			return <Comp {...props} OriginalRouteList={OriginalRouteList} LayoutRouteList={LayoutRouteList}/>
		}
	}
}
@DecoratorRouteLayout(OriginalRouteList, LayoutRouteList)
@withRouter
class Routes extends React.Component {

	render () {
		// console.log(this.props)
		const { location, OriginalRouteList, LayoutRouteList } = this.props
		const pathname = location.pathname
		// 路由是否包含layout
		const isOriginal = OriginalRouteList.findIndex((item) => item.path === pathname) !== -1 ? true : false

		return isOriginal ? (
			<Switch>
				{OriginalRouteList.map((item) => {
					return <AuthRouteComponentHandle key={item.path} {...item} />
				})}
			</Switch>
		) : (
			<Layout>
				<Switch>
					{ // 该情况适用于菜单非后端获取，菜单由前端配置，菜单中可以配置role属性，通过登录获取到的用户信息来判断某路由是否可以被渲染
						LayoutRouteList.map((item) => {
							return <AuthRouteComponentHandle key={item.path} {...item} />
						})
					}
					<Redirect from='/' exact to="/taskManage/main" />
					<Route component={NotFound}/>
				</Switch>
			</Layout>
		)
	}
}

const routes = () => {
	return (
		<Router>
			<Routes />
		</Router>
	)
}

export default routes
