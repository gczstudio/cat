import { connect } from 'react-redux'
import Component from './component.js'

const mapStateToProps = (state) => ({
    loginType: state.user.loginType,
})

const mapDispatchToProps = dispatch => ({
    getLoginType: data => dispatch({
        type: 'GET_LOGIN_TYPE',
        data
    })
})


export default connect(mapStateToProps, mapDispatchToProps)(Component)
