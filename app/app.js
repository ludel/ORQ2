import 'preact/devtools'

import {h, render, Component} from 'preact'
import Router from 'preact-router';
import {createHashHistory} from 'history';

import constants from "./constants";
import style from './style.css';

import Header from './pages/header'
import Movie from "./pages/movie";
import Movies from "./pages/movies";
import Recommendation from "./pages/recommendation";
import Footer from "./pages/footer";
import Persons from "./pages/persons";
import Person from "./pages/person";

const mountNode = document.getElementById('app');

class App extends Component {
    constructor() {
        super();
        this.state = {
            menu: '',
            breadcrumb: {},
            selection: JSON.parse(localStorage.getItem('selection')) || {},
            bgType: constants.bgStyle.image
        }
    }

    handleRoute = async e => {
        ga('send', 'pageview', '/app/#' + e.url);
    };

    updateMovieSelection = (id, title) => {
        const selection = this.state.selection;
        if (Object.keys(selection).includes((id || '').toString()))
            delete selection[id];
        else
            selection[id] = title;

        if (Object.keys(this.state.selection).length < 10) {
            this.setState({
                selection: selection
            });
            localStorage.setItem('selection', JSON.stringify(selection))
        }
    };

    headerCallBack = (menu, breadcrumb, bgType = constants.bgStyle.image) => {
        this.setState({menu: menu, breadcrumb: breadcrumb, bgType: bgType});
    };

    render(props, state) {
        return (
            <div>
                <Header menu={state.menu} breadcrumb={state.breadcrumb} bg-type={state.bgType}/>
                <Router history={createHashHistory()} onChange={this.handleRoute}>
                    <Movies path="/movies/:filter?" setHeader={this.headerCallBack}
                            update-selection={this.updateMovieSelection} selection={state.selection}/>
                    <Movie path="/movie/:id/:category?" setHeader={this.headerCallBack}
                           update-selection={this.updateMovieSelection} selection={state.selection}/>
                    <Recommendation path="/recommendation" setHeader={this.headerCallBack}/>

                    <Persons path="/persons" setHeader={this.headerCallBack}/>
                    <Person path="/person/:id" setHeader={this.headerCallBack}/>
                </Router>
            </div>
        );
    }
}

render(<App/>, mountNode, mountNode.lastChild);
