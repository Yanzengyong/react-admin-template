/*
 * @Description:
 * @Version:
 * @Author: Yanzengyong
 * @Date: 2020-09-18 17:14:07
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-23 15:01:15
 */
import { formatUrl } from '@/api/CatalogueApi'
import request from '@/services'
import {
	Message
} from '@alifd/next'

export default {

	// 查询目录列表
	async getTreeRQ (type, params) {
		try {
			const result = await request.get(formatUrl(type).getTree, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 新增目录
	async addTreeRQ (type, params) {
		try {
			const result = await request.post(formatUrl(type).addTree, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 修改目录
	async updateTreeRQ (type, params) {
		try {
			const result = await request.post(formatUrl(type).updateTree, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 删除目录
	async deleteTreeRQ (type, params) {
		try {
			const result = await request.post(formatUrl(type).deleteTree, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	}
}
