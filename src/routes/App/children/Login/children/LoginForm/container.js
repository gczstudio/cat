import { connect } from 'react-redux'
import Component from './component.js'

const mapStateToProps = (state) => ({
    loginUserInfo: state.user.loginUserInfo,
})

const mapDispatchToProps = dispatch => ({
    getLoginUserInfo: data => dispatch({
        type: 'GET_LOGIN_USER_INFO',
        data
    })
})


export default connect(mapStateToProps, mapDispatchToProps)(Component)
