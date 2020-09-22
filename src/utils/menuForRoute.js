/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-08-19 17:00:59
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-22 16:57:17
 */
import MenuConfig from '@/menus'

const DefaultMenu = 	{
	title: '首页',
	path: '/taskManage/main',
	exact: true,
	component: 'DataManageMain',
	role: ['public', 'admin'],
	layout: true
}


// 将特定的侧边菜单栏转换为数据，每个单位包含父元素
const expendSideMenusHandle = (menus) => {
	let arr = []
	const loop = (menus, parent) => {
		menus.forEach((item) => {
			const newObj = { ...item, parent }
			if (item.children && item.children.length > 0) {
				arr = [...arr, { ...newObj }]
				loop(item.children, newObj)
			} else {
				arr = [...arr, { ...newObj }]
			}
		})
	}
	loop(menus)
	return arr
}


// 将所有平台中的侧边菜单转换为数组，实例化路由对象 (存在component的菜单对象即实例路由)
const	instantiationRouteDiv = (MenuConfig) => {
	let routerList = []
	MenuConfig.forEach((item) => {
		const loopMenu = (menus) => {
			menus.forEach((menu) => {
				if (menu.children && menu.children.length > 0) {
					loopMenu(menu.children)
					menu.isSub && !menu.component
						? (routerList = [...routerList])
						: (routerList = [menu, ...routerList])
				} else {
					routerList = [menu, ...routerList]
				}
			})
		}
		loopMenu(item.sideMenu)
	})
	return routerList
}

// 获取当前地址的面包屑数据
const getBreadcrumbData = (currentPathInfo) => {
	let breadcrumbList = []
	const loop = (info) => {
		if (info.parent && !info.parent.isNav) {
			breadcrumbList.unshift(info)
			loop(info.parent)
		} else {
			breadcrumbList.unshift(info)
		}
	}
	loop(currentPathInfo)
	return breadcrumbList
}

// 获取当前的菜单对象
const findCurrentRouteItem = (path, title) => {
	const routeList = instantiationRouteDiv(MenuConfig)
	const currentPath = path
	const currentTitle = title
	return routeList.find(
		(item) => item.path === currentPath || item.title === currentTitle
	)
}

// 根据全部menu中任一菜单标题获取该菜单对象
const findSpecRouteItem = (title) => {
	const routeList = instantiationRouteDiv(MenuConfig)
	const specRouteItem = routeList.find(item => item.title === title)
	return specRouteItem ?? {}
}

export {
	DefaultMenu,
	expendSideMenusHandle,
	instantiationRouteDiv,
	getBreadcrumbData,
	findCurrentRouteItem,
	findSpecRouteItem
}
