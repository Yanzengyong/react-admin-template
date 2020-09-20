/*
 * @Description:
 * @Version:
 * @Author: Yanzengyong
 * @Date: 2020-09-20 15:55:21
 * @LastEditors: Yanzengyong
 * @LastEditTime: 2020-09-20 15:58:25
 */
const setUserInfo = (info) => {
	window.localStorage.setItem('UserInfo', JSON.stringify(info))
}

const getUserInfo = () => {
	const UserInfo = window.localStorage.getItem('UserInfo') ?? '{}'
	return JSON.parse(UserInfo)
}

export {
	setUserInfo,
	getUserInfo
}
