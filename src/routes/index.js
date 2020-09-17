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
// import { TransitionGroup, CSSTransition } from 'react-transition-group'
// import './trastion.scss'

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

const Routes = withRouter(({ location }) => (
	<Switch location={location}>
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
		<Route path='/dataManage/businessManage/yzy/:id' render={() => <div>cccccc_yzy</div>} />
		{/* <Route path='/dataManage/businessManage/yzy/dht' render={() => <div>我是定海听</div>} /> */}
		<Redirect from='/' exact to="/dataManage/main" />
		<Route component={NotFound}/>
	</Switch>
))

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
