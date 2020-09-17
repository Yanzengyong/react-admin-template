/*
 * @Description:
 * @Version:
 * @Author: Yanzengyong
 * @Date: 2020-08-30 21:59:23
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-08-31 11:06:04
 */

const localTabs = JSON.parse(window.sessionStorage.getItem('TABS'))
// 初始化state数据
const initialState = {
	tabs: localTabs ?? [],
	deleteTabPath: []
}
export default (state = initialState, action) => {

	const closeItemTabsHandle = (path) => {
		const stayTabs = state.tabs.filter((item) => `${item.path}${item.search}` !== path)
		window.sessionStorage.setItem('TABS', JSON.stringify(stayTabs))
		return stayTabs
	}

	const setCurrentTabs = (tabs) => {
		window.sessionStorage.setItem('TABS', JSON.stringify(tabs))
		return tabs
	}

	switch (action.type) {
	case 'SET_TABS':
		return { ...state, tabs: setCurrentTabs(action.tabs) }
	case 'CLOSE_ITEM_TAB':
		return { ...state, tabs: closeItemTabsHandle(action.path) }
	case 'SET_DELETE_TAB_PATH':
		return { ...state, deleteTabPath: action.path }
	default:
		return state
	}
}
