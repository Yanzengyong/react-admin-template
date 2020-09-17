import api from '@/api/FileApi'
import request from '@/services'
import {
	Message
} from '@alifd/next'

export default {
	// 上传文件
	async uploadFileRQ (params) {
		try {
			const result = await request.post(api.uploadFile, params)
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
