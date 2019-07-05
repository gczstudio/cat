import React, { Component } from 'react'
import './component.scss'
import { Form, Icon, Input, Button, Checkbox, Divider, message } from 'antd';
import { withRouter } from 'react-router-dom'
import axios from 'utils/axios'
const { Item } = Form;

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            axios.post('/user/login', values).then((data)=>{
                this.props.getLoginUserInfo(data.data);
                localStorage.setItem('username',data.data.user_name)
                message.success('登录成功！');
                this.props.history.push('/');
            })  
          }
        });
    };

    componentDidMount() {
        console.log(this.props,11111111)
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
                    <Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住密码</Checkbox>)}
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