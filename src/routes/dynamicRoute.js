/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-09-15 18:07:31
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-18 10:45:32
 */
/**
 * 定义应用路
 */
import React from 'react'
import {
	Route,
	Redirect,
	Switch,
	HashRouter as Router
} from 'react-router-dom'
import Layout from '@/layout'
import NotFound from '@/pages/NotFound'
import MenuConfig from '@/menus'
import AllPages from '@/pagesConfig'


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


const routeList = instantiationRouteDiv(MenuConfig)

class Routes extends React.Component {

	state = {
		routeList: []
	}

	componentDidMount () {
		setTimeout(() => {
			this.setState({
				routeList
			})
		}, 5000)
	}

	render () {
		const {
			routeList
		} = this.state
		return (
			<Switch>
				{routeList.map((item, index) => (
					<Route
						key={index}
						path={item.path}
						exact={item.exact}
						render={(props) => {

							const ItemComponent = item ? AllPages[item.component] : NotFound

							return (
								<ItemComponent
									{...props}
									title={item.title}
								/>
							)

						}}
					/>
				))}
				<Redirect from='/' exact to="/dataManage/main" />
				<Route component={NotFound}/>
			</Switch>
		)
	}
}

const routes = () => {
	return (
		<Router>
			<Layout>
				<Routes />
			</Layout>
		</Router>
	)
}

export default routes
