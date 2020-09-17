import api from '@/api/DataResourceApi'
import request from '@/services'

import { Message } from '@alifd/next'

export default {
	// 获取列表
	async getList (params) {
		try{
			let result = await request.get(api.getList, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 获取详情
	async query (params) {
		try{
			let result = await request.get(api.query, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 编辑数据资产对象
	async update (params) {
		try{
			let result = await request.post(api.update, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 新增数据资产对象
	async add (params) {
		try{
			let result = await request.post(api.add, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 删除数据资产对象
	async deleteItems (params) {
		try{
			let result = await request.post(api.delete, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 查询数据资产目录树
	async getTreeRQ (params) {
		try {
			const result = await request.get(api.getTree, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 新增数据资产目录
	async addTreeRQ (params) {
		try {
			const result = await request.post(api.addTree, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 修改数据资产目录
	async updateTreeRQ (params) {
		try {
			const result = await request.post(api.updateTree, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 删除数据资产目录
	async deleteTreeRQ (params) {
		try {
			const result = await request.post(api.deleteTree, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},
}
