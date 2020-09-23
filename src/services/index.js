/*
 * @Description:
 * @Version:
 * @Author: Yanzengyong
 * @Date: 2020-09-18 17:14:07
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-23 15:30:07
 */
import axios from 'axios'
// import qs from 'qs';
import config from './config'


const service = axios.create(config)

// 传参格式化
service.interceptors.request.use(
	config => {
		if (config.method === 'post') config.body = JSON.stringify(config.data)
		return config

	},
	error => {
		return Promise.reject(error)
	}
)
// 返回结果处理
service.interceptors.response.use(
	res => {
		// 这里可根据实际情况做一些操作
		if (res.status === 200) {
			return res.data
		} else {
			return res.data
		}

	}, error => {
		return Promise.reject(error)
	}
)

export default {
	// post function
	post (url, data) {
		// console.log('post request url', url)
		return service({
			method: 'post',
			url,
			data
		})
	},
	// get function
	get (url, data) {
		// console.log('get request url', url)
		return service({
			method: 'get',
			url,
			params: data
		})
	},
	// delete function
	delete (url, data) {
		// console.log('delete request url', url)
		return service({
			method: 'delete',
			url,
			params: data
		})
	}
}
