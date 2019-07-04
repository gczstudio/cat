import React, { Component } from 'react'
import './component.scss'
import logo from 'public/images/logo.png'
import { Icon } from 'antd'
import LoginForm from './children/LoginForm'
import RegisterForm from './children/RegisterForm'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            isActive: 1
        }
    }

    goHomeHandler = () => {
        this.props.history.push('/');
    }

    onTabChangeHandler = (index) => {
        this.setState({
            isActive: index
        })
    }

    componentDidMount() {
        let { state } = this.props.location;
        this.setState({
            isActive: state&&state.type ? state.type:1
        })
    }

    render () {
        let { isActive } = this.state;
        return (
            <div className="login-component">
                <div className="login-header">
                    <div className="logo fl"><img src={logo} alt=""/></div>
                    <div className="go-home fr" onClick={this.goHomeHandler}><Icon type="left" />返回首页</div>
                </div>
                <div className="login-center">
                    <div className="content">
                        <div className="login-box">
                            <div className="tabs">
                                <span className={isActive === 1?'active':''} onClick={()=>this.onTabChangeHandler(1)}>登录</span>
                                <span className={isActive === 2?'active':''} onClick={()=>this.onTabChangeHandler(2)}>注册</span>
                            </div>
                            {
                                isActive === 1 ? <LoginForm /> : <RegisterForm />
                            }
                            
                            
                        </div>
                    </div>
                </div>
                <div className="login-footer">
                    <p>版权所有 © 2019 czgao 鄂ICP备18024620号-1</p>
                </div>
            </div>
        )
    }
}

export default Login