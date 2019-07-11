import { combineReducers } from 'redux'

const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO'
const GET_LOGIN_TYPE = 'GET_LOGIN_TYPE'


/**
 * reducers
 *  */

function loginUserInfo(state={data:{}}, action){
    if(action.type === GET_LOGIN_USER_INFO){
        return action.data
    }else{
        return state
    }

}

//是登录还是注册
function loginType(state = {type:1}, action){
    if(action.type === GET_LOGIN_TYPE){
        return action.data
    }else{
        return state
    }
}


const user = combineReducers({
    loginUserInfo,
    loginType
})
export default user