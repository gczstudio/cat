import React, { Component } from 'react'
import './component.scss'
import Header from 'components/Header/index'
import NoteList from './children/NoteList'
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
                <div className="content w clearfix">
                    <div className="main">
                        <NoteList />
                    </div>
                    {/*<div className="aside"></div> */}
                </div>
            </div>
        )
    }
}

export default Home