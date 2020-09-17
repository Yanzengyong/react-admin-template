/*
 * @Description:
 * @Version:
 * @Author: Yanzengyong
 * @Date: 2020-06-21 10:03:54
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-08-31 16:07:40
 */
import React from 'react'
import { Nav } from '@alifd/next'
import { Link, withRouter } from 'react-router-dom'
import { Tab } from '@alifd/next'
import MenuConfig from '@/menus'
import IconFont from '@/components/IconFont'
import { DefaultMenu, expendSideMenusHandle, instantiationRouteDiv } from '@/utils/menuForRoute'
import { getQueryItemValue } from '@/utils/common'
import { connect } from 'react-redux'
import { Tab as TabAction } from '@/reduxActions'
import './index.scss'
const { Item, SubNav } = Nav

class Layout extends React.Component {
	state = {
		showContextMenu: false,
		currentContextMenu: {}, // 右键点击的tab
		sideMenu: [],
		MainNavselectedKeys: [],
		sideNavSelectedKeys: [], // 左侧菜单栏选中的selectkeys
		sideNavOpenKeys: [], // 左侧菜单栏打开的openkeys
		activeKey: '',
	}
	componentDidMount () {
		const route = this.props.location

		this.renderRouteTab(route)
		this.initMenu(route.pathname)
		this.routerListenerHandle()

	}

	componentWillUnmount () {
		this.setState = () => {
			return
		}
	}

	// 监听点击事件（点击某个元素之外自动隐藏此元素）
	clickOtherCloseDom = (e) => {
		const _con = document.querySelector('.tabRender_option_box') // 设置目标区域

		const isChild = (parent, node) => {
			while (node && (node = node.parentNode))
				if (node === parent) return true
			return false
		}

		if (!isChild(_con, e.target)) {
			this.setState({
				showContextMenu: false
			})
		}

	}

	// 监听路由change事件
	routerListenerHandle = () => {
		this.props.history.listen((route) => {
			this.renderRouteTab(route)
			this.initMenu(route.pathname)
		})
	}

	// 根据路由来渲染对应的tab页面
	renderRouteTab = (route) => {

		// 菜单路由对象
		const currentTab =
			route.pathname === '/'
				? DefaultMenu
				: this.findCurrentRouteItem(route.pathname)
		const { tabs } = this.props.state

		const NoNotFoundTab = tabs.filter(
			(item) => item.title !== 'NotFound'
		)
		const _title = route.search !== '' ? `${currentTab.title}(${getQueryItemValue(route.search, 'title')})` : currentTab.title

		let avtiveRoutePath

		if (route.pathname === '/') {
			avtiveRoutePath = DefaultMenu.path
		} else {
			avtiveRoutePath = `${route.pathname}-${route.search}`
		}

		const finalTabs = currentTab
		? this.arrayOnlyHandle([
			...tabs,
			{ ...currentTab, search: route.search, title: _title },
		])
		: this.arrayOnlyHandle([
			...NoNotFoundTab,
			route.pathname !== '/'
				? {
					title: 'NotFound',
					path: route.pathname,
					component: 'NotFound',
				}
				: null,
		])

		this.props.setTabs(finalTabs)

		this.setState({
			activeKey: avtiveRoutePath,
		})
	}

	// 获取当前的菜单对象
	findCurrentRouteItem = (path, title) => {
		const routeList = instantiationRouteDiv(MenuConfig)
		const currentPath = path
		const currentTitle = title
		return routeList.find(
			(item) => item.path === currentPath || item.title === currentTitle
		)
	}


	// 获取需要展开的nav菜单
	getSubMenuOpenKeys = (PathInfo) => {
		let sideNavOpenKeys = ''

		const loopGetOpenKeys = (currentPathInfo) => {
			if (currentPathInfo.parent) {
				currentPathInfo.parent.isSub
					? (sideNavOpenKeys = currentPathInfo.parent.path)
					: loopGetOpenKeys(currentPathInfo.parent)
			} else {
				sideNavOpenKeys = ''
			}
		}
		loopGetOpenKeys(PathInfo)
		return sideNavOpenKeys
	}

	// 初始化菜单
	initMenu = (path) => {
		const UrlPath = path === '/' ? DefaultMenu.path : path

		const currentMain = MenuConfig.find((item) => {
			return UrlPath.indexOf(item.path) !== -1
		})

		const currentMainSelectKeys = currentMain ? currentMain.path : ''

		const currentSideMenu = currentMain ? currentMain.sideMenu : []

		const expendSideMenus = expendSideMenusHandle(currentSideMenu)

		const currentPathInfo =
			expendSideMenus.find((item) => item.path === UrlPath) ?? {}

		const sideNavSelectedKeys = currentPathInfo.isHide
			? currentPathInfo.parent.path
			: currentPathInfo.path

		const sideNavOpenKeys = this.getSubMenuOpenKeys(currentPathInfo)

		this.setState({
			MainNavselectedKeys: currentMainSelectKeys,
			sideMenu: currentSideMenu,
			sideNavSelectedKeys: sideNavSelectedKeys,
			sideNavOpenKeys: sideNavOpenKeys,
		})
	}

	// 头部菜单的选中
	headerNavSelect = (selectedKeys, item) => {
		const mainMenu = item.props.data || {}
		const sideMenu = mainMenu ? mainMenu.sideMenu : []

		const expendSideMenus = expendSideMenusHandle(sideMenu)

		const currentPathInfo =
			expendSideMenus.find((item) => item.path === mainMenu.defaultPath) ?? {}

		const sideNavSelectedKeys = currentPathInfo.isHide
			? currentPathInfo.parent.path
			: currentPathInfo.path

		const sideNavOpenKeys = this.getSubMenuOpenKeys(currentPathInfo)

		this.setState(
			{
				MainNavselectedKeys: selectedKeys,
				sideMenu: sideMenu,
				sideNavSelectedKeys: sideNavSelectedKeys,
				sideNavOpenKeys: sideNavOpenKeys,
			},
			() => {
				this.props.history.replace(sideNavSelectedKeys)
			}
		)
	}

	// 对象数组去重
	arrayOnlyHandle = (arr) => {
		const deleteInvalid = arr.filter(
			(item) => item !== null && item !== undefined
		)
		let obj = {}
		return deleteInvalid.reduce((curs, next) => {
			if (!next.search) {
				obj[next.path] ? '' : obj[next.path] = true && curs.push(next)
			} else {
				obj[next.path] ? curs.findIndex((item) => item.search === next.search) !== -1 ? '' : obj[next.path] = true && curs.push(next) : obj[next.path] = true && curs.push(next)
			}
			return curs
		}, [])
	}

	// 侧边栏菜单的选中
	sideNavSelect = (selectedKeys) => {
		this.setState({
			sideNavSelectedKeys: selectedKeys,
		})
	}

	// 侧边栏菜单展开
	sideNavOpen = (openKeys, extra) => {
		const currentKeys = extra.open ? extra.key : []
		this.setState({
			sideNavOpenKeys: currentKeys,
		})
	}

	// 渲染侧边菜单的函数
	renderNavHandle = (menu) =>
		menu.map((menuItem) => {
			if (menuItem.children && menuItem.children.length > 0) {
				const isSubNav = menuItem.children.some(
					(item) => item.isHide && item.isHide === 'Y'
				)
				if (!isSubNav) {
					return (
						<SubNav label={menuItem.title} key={menuItem.path}>
							{this.renderNavHandle(menuItem.children)}
						</SubNav>
					)
				} else {
					if (
						menuItem.path.indexOf('http') !== -1 ||
						menuItem.path.indexOf('http') !== -1
					) {
						return (
							<Item key={menuItem.path} data={menuItem}>
								<a
									rel="noopener noreferrer"
									href={menuItem.path}
									target="_blank"
								>
									{' '}
									{menuItem.title}{' '}
								</a>
							</Item>
						)
					} else {
						return (
							<Item key={menuItem.path} data={menuItem}>
								<Link className="menu_title" to={menuItem.path}>
									{' '}
									{menuItem.title}{' '}
								</Link>
							</Item>
						)
					}
				}
			} else {
				if (
					menuItem.path.indexOf('http') !== -1 ||
					menuItem.path.indexOf('http') !== -1
				) {
					return (
						<Item key={menuItem.path} data={menuItem}>
							<a rel="noopener noreferrer" href={menuItem.path} target="_blank">
								{' '}
								{menuItem.title}{' '}
							</a>
						</Item>
					)
				} else {
					return (
						<Item key={menuItem.path} data={menuItem}>
							<Link to={menuItem.path}> {menuItem.title} </Link>
						</Item>
					)
				}
			}
		})

	// tab栏的关闭
	onCloseTab = async (path, search) => {

		// 判断是否存在【关闭其他、关闭所有】按钮，存在即不可以做其他操作（选择中也应该加入此规则）
		const { showContextMenu } = this.state
		if (showContextMenu) {
			return
		}

		const { location } = this.props

		const { tabs } = this.props.state

		const closePath = `${path}${search}`

		// 清除本地存储
		window.sessionStorage.removeItem(closePath)
		// 设置被删除的的tab的path数组
		await this.props.setDeleteTabPath([closePath])

		const deleteTabIndex = tabs.findIndex((item) => `${item.path}${item.search}` === closePath)

		const currentUrlPath = `${location.pathname}${location.search}`
		const activeKeyPath = `${location.pathname}-${location.search}`

		const newTabs = tabs.filter((item) => {
			if (item.path !== path) {
				return item
			}
			if (item.path === path && item.search !== search) {
				return item
			}
		})

		let currentTabPath = ''
		const newTabLength = newTabs.length

		if (newTabLength > 0) {
			// 说明至少存在一个
			if (closePath === currentUrlPath) {
				// 假设我现在删除的是我选中的
				if (newTabLength - 1 >= deleteTabIndex + 1) {
					// 当前所剩的tabs的最大索引大于等于我的删除索引+1时，说明我删除的至少不是最后一个tab
					currentTabPath = `${newTabs[deleteTabIndex].path}${newTabs[deleteTabIndex].search}`
				} else {
					// 否则说明我删除的是末尾的tab
					currentTabPath = `${newTabs[newTabLength - 1].path}${newTabs[newTabLength - 1].search}`
				}
			} else {
				// 假设我现在删除的不是我选中的
				currentTabPath = currentUrlPath
			}
		} else {
			// 所有tab被删除完后所做的事情
			currentTabPath = '/'
		}

		this.props.setTabs(newTabs)
		this.setState(
			{
				activeKey: activeKeyPath,
			},
			() => {
				this.props.history.replace(currentTabPath)
			}
		)
	}

	// 右键选项关闭的处理函数
	closeTabHandle = async (type) => {

		const { currentContextMenu } = this.state
		const { tabs } = this.props.state

		let closeTabsArr = []
		let stayTabs = []
		let activeKey = ''
		let goPath = '/'
		if (type && type === 'other') {
			stayTabs = [currentContextMenu]
			activeKey = `${currentContextMenu.path}-${currentContextMenu.search}`
			goPath = `${currentContextMenu.path}${currentContextMenu.search}`
			closeTabsArr = tabs.filter((item) => `${item.path}${item.search}` !== goPath).map((item) => `${item.path}${item.search}`)
		}
		if (type && type === 'all') {
			stayTabs = []
			activeKey = ''
			goPath = '/'
			closeTabsArr = tabs.map((item) => `${item.path}${item.search}`)
		}

		this.props.setTabs(stayTabs)

		// 设置当前删除的tabs的path数组
		await this.props.setDeleteTabPath(closeTabsArr)
		// 清除本地存储
		closeTabsArr.forEach((item) => {
			window.sessionStorage.removeItem(item)
		})

		this.setState({
			showContextMenu: false,
			currentContextMenu: {},
			activeKey: activeKey,
		}, () => {
			this.props.history.replace(goPath)
		})
	}

	// 自定义选项卡渲染
	tabRender = (key, props) => {

		const Search = props.data.search ?? ''
		const Path = props.data.path ?? ''

		const onCloseTab = (e) => {
			// 阻止事件冒泡
			e.stopPropagation()

			this.onCloseTab(Path, Search)
		}

		const onSeleteTab = (e) => {

			e.stopPropagation()
			// 判断是否存在【关闭其他、关闭所有】按钮，存在即不可以做其他操作（选择中也应该加入此规则）
			const { showContextMenu } = this.state
			if (showContextMenu) {
				return
			}
			this.setState({ activeKey: key }, () => {
				this.props.history.replace(`${Path}${Search}`)
			})
		}

		const onContextMenuTab = (e) => {
			e.preventDefault()

			const x = e.clientX - document.querySelector('.layout_menu').offsetWidth
			const y = e.clientY - document.querySelector('.layout_header').offsetHeight

			this.setState({
				showContextMenu: true,
				x,
				y,
				currentContextMenu: props.data
			})
		}

		return (
			<div onClick={onSeleteTab} onContextMenu={onContextMenuTab} className="tabRender_box">
				<span className='tabRender_title' title={props.title} >{props.title}</span>
				<IconFont
					onClick={onCloseTab}
					type="iconclose"
					className="tabDelete_icon"
				/>
			</div>
		)
	}

	render () {
		const {
			MainNavselectedKeys,
			sideMenu,
			sideNavSelectedKeys,
			sideNavOpenKeys,
			activeKey,
			showContextMenu,
			y,
			x
		} = this.state
		const {
			tabs
		} = this.props.state

		return (
			<div className="layout_container" onClick={this.clickOtherCloseDom}>
				<div className="layout_header">
					<div className="layout_logo">
						<div className="layout_logo_box">
							<img
								src="assets/images/cetclogo.png"
								className="avatar"
								alt="用户头像"
							/>
						</div>
						<Nav
							className="header_nav"
							direction="hoz"
							type="primary"
							embeddable
							selectedKeys={MainNavselectedKeys}
							onSelect={this.headerNavSelect}
						>
							{MenuConfig.map((item) => (
								<Item key={item.path} data={item}>
									{item.title}
								</Item>
							))}
						</Nav>
					</div>
					<div className="layout_user_box">
						<img
							src="https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png"
							className="avatar"
							alt="用户头像"
						/>
						<div className="user_info">
							{window.localStorage.getItem('CURRENT_USER')}
						</div>
					</div>
				</div>
				<div className="layout_main">
					<Nav
						className="layout_menu"
						openMode="single"
						type="primary"
						selectedKeys={sideNavSelectedKeys}
						onSelect={this.sideNavSelect}
						openKeys={sideNavOpenKeys}
						onOpen={this.sideNavOpen}
					>
						{this.renderNavHandle(sideMenu)}
					</Nav>
					<div className="layout_content">
						{
							showContextMenu ? (
								<ul style={{ top: y, left: x }} className='tabRender_option_box'>
									<li onClick={() => this.closeTabHandle('other')}>关闭其他</li>
									<li onClick={() => this.closeTabHandle('all')}>关闭所有</li>
								</ul>
							) : null
						}
						<Tab
							className="layout_tab_box"
							navClassName="layout_url_tab"
							contentClassName="layout_tab_content"
							shape="wrapped"
							activeKey={activeKey}
							tabRender={this.tabRender}
						>
							{tabs.map((item) => (
								<Tab.Item
									key={`${item.path}-${item.search}`}
									closeable
									title={item.title}
									data={item}
								/>
							))}
						</Tab>
						<div className="layout_content_body">{this.props.children}</div>
						<div className="layout_footer_copyright">
							<div className="copyleft">CopyRight © 2020-2021</div>
							<div className="copyright">
								版权所有：提升政府治理能力大数据应用技术国家工程实验室
								中电科大数据研究院有限公司
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect((state) => (
	{
		state: state.tabs
	}
), TabAction)(withRouter(Layout))
