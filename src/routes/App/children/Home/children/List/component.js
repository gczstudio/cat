import React, { Component } from 'react'
import './component.scss'
import { Icon } from 'antd'


class List extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render () {
        return (
            <div className="list-component">
                <ul className="note-list">
                    <li className="have-img">
                        <a className="wrap-img" href="/p/7f0f2d07a9a6" target="_blank">
                            <img className="  img-blur-done" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1563980539,1672265910&fm=27&gp=0.jpg" alt="120" />
                        </a>
                        <div className="content">
                            <a className="title" target="_blank" href="/p/7f0f2d07a9a6">“不打麻药，穿刺下身，一次5万”：多少爸妈捧在手心的女孩，正在贱卖自己</a>
                            <p className="abstract">
                            文|阿丧 来源 | 国馆（ID：guoguan5000） 假设一下这番情景： 你很想要买一部最新款的手机，非买不可。 但是你手头并不充裕，家里也...
                            </p>
                            <div className="meta">
                                <span className="jsd-meta">
                                    <Icon type="sketch" /> 81.5
                                </span>
                                <a className="nickname" target="_blank" href="/u/52cc74d31c3f">捡书先生说</a>
                                    <a target="_blank" href="/p/7f0f2d07a9a6#comments">
                                    <Icon type="message" /> 409
                                </a>      
                                <span><Icon type="heart" />1384</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default List