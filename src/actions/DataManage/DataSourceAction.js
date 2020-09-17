import api from '@/api/DataManage/DataSourceApi'
import request from '@/services'
import {
	Message
} from '@alifd/next'

export default {
	// 查询数据源列表
	async getSourceListRQ (params) {
		try {
			const result = await request.get(api.getSourceList, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},
	// // 查询数据源
	// async getSourceInfoRQ (params) {
	// 	try {
	// 		const result = await request.get(api.getSourceInfo, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },
	// // 修改数据源
	// async updateSourceRQ (params) {
	// 	try {
	// 		const result = await request.post(api.updateSource, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },
	// // 新增数据源
	// async addSourceRQ (params) {
	// 	try {
	// 		const result = await request.post(api.addSource, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },
	// // 删除数据源
	// async deleteSourceRQ (params) {
	// 	try {
	// 		const result = await request.post(api.deleteSource, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },
	// 测试连接
	async testConnectRQ (params) {
		try {
			const result = await request.post(api.testConnect, params)
			return result
		} catch (error) {
			if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},
	// // 查询数据源目录列表
	// async getSourceTreeRQ (params) {
	// 	try {
	// 		const result = await request.get(api.getSourceTree, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },
	// // 获取样例数据
	// async getSampleRQ (params) {
	// 	try {
	// 		const result = await request.post(api.getSample, params)
	// 		return result
	// 	} catch (error) {
	// 		Message.show({
	// 			type: 'error',
	// 			content: '样例数据获取失败！',
	// 			align: 'cc, cc',
	// 			duration: 2000
	// 		})
	// 	}
	// },
	// // 获取数据源库表结构
	// async getStructureRQ (params) {
	// 	try {
	// 		const result = await request.post(api.getStructure, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },
	// // 查询关系型数据库采集任务详情
	// async getCollectInfoRQ (params) {
	// 	try {
	// 		const result = await request.get(api.getCollectInfo, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },
	// // 新增关系型数据库采集任务
	// async addCollectRQ (params) {
	// 	try {
	// 		const result = await request.post(api.addCollect, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },
	// // 修改关系型数据库采集任务
	// async updateCollectRQ (params) {
	// 	try {
	// 		const result = await request.post(api.updateCollect, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },
	// // 查询数据源元数据
	// async getSourceMetaRQ (params) {
	// 	try {
	// 		const result = await request.post(api.getSourceMeta, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },
  // 	// 查询实体类目目录树
	// async getTreeRQ (params) {
	// 	try {
	// 		const result = await request.get(api.getTree, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },

	// // 新增实体类目
	// async addTreeRQ (params) {
	// 	try {
	// 		const result = await request.post(api.addTree, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },

	// // 修改数据实体类目
	// async updateTreeRQ (params) {
	// 	try {
	// 		const result = await request.post(api.updateTree, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// },

	// // 删除实体目录
	// async deleteTreeRQ (params) {
	// 	try {
	// 		const result = await request.post(api.deleteTree, params)
	// 		return result
	// 	} catch (error) {
	// 		if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
	// 			Message.error('请求超时，请检查网络')
	// 		} else {
	// 			Message.error('服务器未知异常，请联系管理员')
	// 		}
	// 	}
	// }
}
