import React, { Component } from 'react'
import './component.scss'
import logo from 'public/images/logo.png'
import avatar from './images/logo.jpeg'
import { withRouter, Link } from 'react-router-dom'
import { Input, Button, Menu, Dropdown, Icon } from 'antd';

const { Search } = Input;
const { Item } = Menu;

const menu = (
    <Menu>
    <Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            <Icon type="home" theme="filled" />
            我的主页
        </a>
      </Item>
      <Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            <Icon type="setting" theme="filled" />
            设置
        </a>
      </Item>
      <Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            <i className="iconfont">&#xe659;</i>
            退出
        </a>
      </Item>
    </Menu>
  );

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    goLoginHandler = (type) => {
        this.props.history.push({
            pathname: '/login',
            state: {
                type
            }
        });
    }

    componentDidMount() {

    }

    render () {
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
                            <div className="avatar fl">
                                <Dropdown overlay={menu}>
                                    <img src={avatar} alt=""/>
                                </Dropdown>
                            </div>
                            <Button type="primary" shape="round"  onClick={()=>this.goLoginHandler(1)}>登录</Button>
                            <Button type="link" onClick={()=>this.goLoginHandler(2)}>注册</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)