/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-08-17 09:06:45
 * @LastEditors: Zhangyao
 * @LastEditTime: 2020-08-31 16:56:13
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from '@/routes'
import 'moment/locale/zh-cn'
import { Provider } from 'react-redux'
import store from '@/store'
import './index.scss'

ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root')
)

