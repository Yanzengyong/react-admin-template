const initialState = {
	userInfo: {}
}
export default (state = initialState, action) => {

	switch (action.type) {
	case 'SET_USERINFO':
			return { ...state, userInfo: action.UserInfo }
	case 'GET_USERINFO':
		return { ...state, userInfo: action.UserInfo }
	default:
		return state
	}
}
