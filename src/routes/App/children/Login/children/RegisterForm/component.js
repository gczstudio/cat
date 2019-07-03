import React, { Component } from 'react'
import './component.scss'
import { Form, Icon, Input, Button, Checkbox, Divider } from 'antd';

const { Item } = Form;

class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    };

    componentDidMount() {

    }

    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="register-form-component">
                <Form onSubmit={this.handleSubmit} className="register-form">
                    <Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入昵称!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            size="large"
                            placeholder="你的昵称"
                            />,
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入手机号!' }],
                        })(
                            <Input
                            prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            size="large"
                            placeholder="手机号"
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
                            placeholder="设置密码"
                            />,
                        )}
                    </Item>
                    <Item>
                        <Button type="primary" size="large" htmlType="submit" className="register-form-button">
                            注 册
                        </Button>
                    </Item>
                </Form>
                <div className="others-method">
                    <Divider>社交帐号直接注册</Divider>
                    <div className="icons">
                        <span className="icon icon-weibo"><Icon type="weibo-circle" theme="filled" /></span>
                        <span className="icon icon-wechat"><Icon type="wechat" theme="filled" /></span>
                        <span className="icon icon-qq"><Icon type="qq-circle" theme="filled" /></span>
                    </div>        
                </div>
            </div>
        )
    }
}
const WrappedRegisterForm = Form.create({ name: 'normal_register' })(RegisterForm);

export default WrappedRegisterForm