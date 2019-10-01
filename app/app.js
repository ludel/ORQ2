import {h, render, Component} from 'preact'
import Router from 'preact-router';
import {createHashHistory} from 'history';

import 'preact/devtools'
import {config} from './config'

import Header from './components/header'
import Movie from "./pages/movie";
import Movies from "./pages/movies";

const mountNode = document.getElementById('app');

class App extends Component {
    constructor() {
        super();
        this.state = {
            menu: '',
            breadcrumb: {},
            bgType: 'img'
        }
    }

    headerCallBack = (menu, breadcrumb, bgType = 'img') => {
        this.setState({menu: menu, breadcrumb: breadcrumb, bgType: bgType});
    };

    render(props, state) {
        return (
            <div>
                <Header menu={state.menu} breadcrumb={state.breadcrumb} bg-type={state.bgType}/>
                <Router>
                    <Movies path="/movies/:filter?" setHeader={this.headerCallBack}/>
                    <Movie path="/movie/:id/:category?" setHeader={this.headerCallBack}/>
                </Router>
            </div>
        );
    }
}

render(<App/>, mountNode, mountNode.lastChild);
