import React, { Component } from 'react'
import './component.scss'
import Header from 'components/Header/index'
import List from './children/List/index'
import { BrowserRouter as Router, Route } from "react-router-dom";
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render () {
        return (
            <div className="home-component clearfix">
                <Header />
                <div className="content w">
                    <div className="main">
                        <List />
                    </div>
                    <div className="aside"></div>
                </div>
            </div>
        )
    }
}

export default Home