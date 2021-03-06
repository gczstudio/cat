import React, { Component } from 'react'
import './component.scss'
import logo from 'public/images/logo.png'
import avatar from './images/logo.jpeg'
import { withRouter, Link } from 'react-router-dom'
import { Input, Button, Menu, Dropdown, Icon } from 'antd';
import axios from 'utils/axios'
const { Search } = Input;
const { Item } = Menu;


class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInfo: {}
        }

        this.menu = (
            <Menu>
            <Item>
                <span>
                    <Icon type="home" theme="filled" />
                    我的主页
                </span>
              </Item>
              <Item>
                <span>
                    <Icon type="setting" theme="filled" />
                    设置
                </span>
              </Item>
              <Item  onClick={this.onLogoutHandler}>
                <span>
                    <i className="iconfont">&#xe659;</i>
                    退出
                </span>
              </Item>
            </Menu>
          );
    }

    onLogoutHandler = () => {
        console.log(111111111111)
        axios.get('/user/logout').then( (response)=> {
            console.log(response)
            this.props.history.push('/login');
        })
        .catch( (error)=> {
            console.log(error);
        });
    }

    goLoginHandler = (type) => {
        this.props.history.push({
            pathname: '/login',
            state: {
                type
            }
        });
    }

    getUserInfo = () => {
        axios.post('/dashboard/userInfo',{
            username: localStorage.getItem('username')
        }).then( (response)=> {
           this.setState({
               userInfo: response.data || {}
           })
        })
        .catch( (error)=> {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getUserInfo();
    }

    render () {
        let { userInfo } = this.state;
        return (
            <div className="header-component">
                <div className="small-header"></div>
                <div className="big-header">
                    <div className="content clearfix">
                        <div className="logo"><Link to="/"><img src={logo} alt=""/></Link></div>
                        <div className="header-center  clearfix">
                            <div className="nav fl">
                                <ul className="clearfix">
                                    <li className="active">首页</li>
                                    <li>发现</li>
                                </ul>
                            </div>
                            <div className="search fr">
                                <Search
                                    placeholder="请输入搜索内容..."
                                    onSearch={value => console.log(value)}
                                    style={{ width: 300 }}
                                    size="large"
                                />
                            </div>
                        </div>
                        <div className="login">
                            {
                                userInfo.user_name ?
                                <div className="avatar fl">
                                    <Dropdown overlay={this.menu}>
                                        <img src={avatar} alt=""/>
                                    </Dropdown>
                                </div>
                                :
                                <div>
                                    <Button type="primary" shape="round"  onClick={()=>this.goLoginHandler(1)}>登录</Button>
                                    <Button type="link" onClick={()=>this.goLoginHandler(2)}>注册</Button>
                                </div>
                            }
                            
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)