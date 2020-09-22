/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-08-17 09:06:45
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-22 23:19:33
 */
// 注册store
import { createStore } from 'redux'
import reducer from '@/reducers'

// // 调用日子打印方法

export default createStore(reducer)
