import React, { Component } from 'react'
import './component.scss'
import { Form, Icon, Input, Button, Checkbox, Divider, message } from 'antd';
import { withRouter } from 'react-router-dom'
import axios from 'utils/axios'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const { Item } = Form;

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            loginError: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            if(values.remember){
                Cookies.set('username',values.username)
            }else{
                Cookies.remove('username')
            }
            values.password = CryptoJS.AES.encrypt(values.password, '1234567890').toString();
            axios.post('/user/login', values).then((data)=>{
                if(data.msg){
                    this.setState({
                        loginError: true
                    })
                    message.error(data.msg);
                    this.getCaptcha();
                    return;
                }
                this.props.getLoginUserInfo(data.data);
                localStorage.setItem('username',data.data.user_name)
                message.success('登录成功！');
                this.props.history.push('/');
            })  
          }
        });
    };

    getCaptcha = ()=>{
        if(!this.state.loginError) return;
        axios.get('/user/captcha').then((data)=>{
            this.svg.innerHTML = data.data
        })  
    }

    componentWillReceiveProps(nextProps){

    }

    componentDidMount() {
        let username = Cookies.get('username');
        this.props.form.setFieldsValue({
            username
        });
        this.getCaptcha();
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-form-component">
                
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入手机号或邮箱!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            size="large"
                            placeholder="手机号或邮箱"
                            />,
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            size="large"
                            placeholder="密码"
                            />,
                        )}
                    </Item>
                    
                    {
                        this.state.loginError ? 
                        <Item>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: '请输入验证码!' }],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="captcha"
                                size="large"
                                placeholder="验证码"
                                addonAfter={<div className="svg-captcha" ref={svg=> this.svg = svg } onClick={this.getCaptcha}></div>}
                                />,
                            )}
                        </Item>
                        : ''
                    }
                    <Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住用户</Checkbox>)}
                        <a className="login-form-forgot" href="xxx">
                            忘记密码
                        </a>
                        <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                            登 录
                        </Button>
                    </Item>
                </Form>
                <div className="others-method">
                    <Divider>社交账号登录</Divider>
                    <div className="icons">
                        <span className="icon icon-weibo"><Icon type="weibo-circle" theme="filled" /></span>
                        <span className="icon icon-wechat"><Icon type="wechat" theme="filled" /></span>
                        <span className="icon icon-qq"><Icon type="qq-circle" theme="filled" /></span>
                        <span className="other-text">其他</span>
                    </div>        
                </div>
            </div>
        )
    }
}
const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default withRouter(WrappedLoginForm)