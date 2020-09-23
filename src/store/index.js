/*
 * @Descripttion:
 * @version:
 * @Author: Yanzengyong
 * @Date: 2020-08-17 09:06:45
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-23 17:55:43
 */
// 注册store
import { createStore } from 'redux'
import reducer from '@/reducers'


export default createStore(reducer)
