import React, { Component } from 'react'
import './component.scss'
import { Form, Icon, Input, Button, Divider, message } from 'antd';
import axios from 'utils/axios'
import CryptoJS from 'crypto-js'
import { withRouter} from 'react-router-dom'
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
            values.password = CryptoJS.AES.encrypt(values.password, '1234567890').toString();
            console.log('Received values of form: ', values);
            axios.post('/user/register', values).then( (response)=> {
                message.success('注册成功！')
                this.props.getLoginType({
                    type: 1
                })
                localStorage.setItem('username',response.data.username);
            })
            .catch( (error)=> {
                console.log(error);
            });
    
          }
        });
    };

    componentDidMount() {

    }

    render () {
        const { getFieldDecorator } = this.props.form;
        const phoneValidator = function(rule, value, callback){
            let reg = /^1[3456789]\d{9}$/;
            if(value === ''){
                callback('请输入手机号！')
            }else if(!reg.test(value)){
                callback('请输入正确的手机号！')
            }else{
                callback();
            }
        }
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
                        {getFieldDecorator('mobile', {
                            rules: [{ required: true, validator: phoneValidator}],
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

export default withRouter(WrappedRegisterForm)