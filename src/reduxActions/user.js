import { setLocalStorageItem, getLocalStorageItem } from '@/utils/storage'

export default {
	setUserInfo (UserInfo) {
		setLocalStorageItem('UserInfo', UserInfo)
		setLocalStorageItem('TOKEN', UserInfo.token)
		return {
			type: 'SET_USERINFO',
			UserInfo
		}
	},

	getUserInfo () {
		let UserInfo = getLocalStorageItem('UserInfo') ?? {}
		return {
			type: 'GET_USERINFO',
			UserInfo
		}
	}
}
