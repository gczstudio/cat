import React, { Component } from 'react'
import './component.scss'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Loadable from 'components/Loadable/index';

const Home = Loadable(import('./children/Home/index'));
const Login = Loadable(import('./children/Login/index'));


class App extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render () {
        return (
            <Router>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
            </Router>
        )
    }
}

export default App