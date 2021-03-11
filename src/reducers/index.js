/*
 * @Description:
 * @Version:
 * @Author: Yanzengyong
 * @Date: 2020-06-15 16:21:45
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-08-30 22:50:30
 */
import { combineReducers } from 'redux'
import tabs from './tabs'
import user from './user'

const rootReducer = combineReducers({
	tabs,
	user
})

export default rootReducer
