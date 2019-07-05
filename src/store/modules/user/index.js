import { combineReducers } from 'redux'

const GET_LOGIN_USER_INFO = 'GET_LOGIN_USER_INFO'


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


const user = combineReducers({
    loginUserInfo
})
export default user