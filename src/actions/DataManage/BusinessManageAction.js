import api from '@/api/DataManage/BusinessManageApi'
import request from '@/services'
import { Message } from '@alifd/next'

export default {
	// 查询业务管理列表
	async getBusinessListRQ (params) {
		try {
			const result = await request.get(api.getBusinessList, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 查看业务详情
	async queryBusinessRQ (params) {
		try {
			const result = await request.get(api.queryBusiness, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 新建业务
	async addBusinessRQ (params) {
		try {
			const result = await request.post(api.addBusiness, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 编辑业务
	async updateBusinessRQ (params) {
		try {
			const result = await request.post(api.updateBusiness, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 删除业务
	async deleteBusinessRQ (params) {
		try {
			const result = await request.post(api.deleteBusiness, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 查询信息系统列表
	async getInfoSysListRQ (params) {
		try {
			const result = await request.get(api.getInfoSysList, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 查看信息系统详情
	async queryInfoSysRQ (params) {
		try {
			const result = await request.get(api.queryInfoSys, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 新建信息系统
	async addInfoSysRQ (params) {
		try {
			const result = await request.post(api.addInfoSys, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 编辑信息系统
	async updateInfoSysRQ (params) {
		try {
			const result = await request.post(api.updateInfoSys, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 删除信息系统
	async deleteInfoSysRQ (params) {
		try {
			const result = await request.post(api.deleteInfoSys, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 查询表单列表
	async getSchemaListRQ (params) {
		try {
			const result = await request.get(api.getSchemaList, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 查看表单详情
	async querySchemaRQ (params) {
		try {
			const result = await request.get(api.querySchema, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 新建表单
	async addSchemaRQ (params) {
		try {
			const result = await request.post(api.addSchema, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 编辑表单
	async updateSchemaRQ (params) {
		try {
			const result = await request.post(api.updateSchema, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 删除表单
	async deleteSchemaRQ (params) {
		try {
			const result = await request.post(api.deleteSchema, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 查询数据视图列表
	async getViewListRQ (params) {
		try {
			const result = await request.get(api.getViewList, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 查看数据视图详情
	async queryViewRQ (params) {
		try {
			const result = await request.get(api.queryView, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 新建视图
	async addViewRQ (params) {
		try {
			const result = await request.post(api.addView, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 编辑视图
	async updateViewRQ (params) {
		try {
			const result = await request.post(api.updateView, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},

	// 删除视图
	async deleteViewRQ (params) {
		try {
			const result = await request.post(api.deleteView, params)
			return result
		} catch (error) {
			if (
				error &&
				error.code === 'ECONNABORTED' &&
				error.message.indexOf('timeout') !== -1
			) {
				Message.error('请求超时，请检查网络')
			} else {
				Message.error('服务器未知异常，请联系管理员')
			}
		}
	},
}
