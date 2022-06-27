
const defaultState = {
	userInfo:null
}


//reducer可以接收state，但是绝对不能修改state
//reducer是一个纯函数，即给固定的输入，就一定会给出固定的输出，所以里面不能有异步，时间相关的操作。也不能对参数进行修改。
export default (state = defaultState,action) => {
	if(action.type === "change_user_info"){
		const newState = JSON.parse(JSON.stringify(state))
		newState.userInfo = action.value
		return newState
	}
	return state
}

