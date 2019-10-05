import {h, render, Component} from 'preact'
import Router from 'preact-router';

import 'preact/devtools'

import constants from "./constants";
import Header from './pages/header'
import Movie from "./pages/movie";
import Movies from "./pages/movies";
import Recommendation from "./pages/recommendation";
import Footer from "./pages/footer";

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

    updateMovieSelection = (id, title) => {
        const selection = this.state.selection;
        if (Object.keys(selection).includes(id.toString()))
            delete selection[id];
        else
            selection[id] = title;

        this.setState({
            selection: selection
        });
        localStorage.setItem('selection', JSON.stringify(selection))
    };

    headerCallBack = (menu, breadcrumb, bgType = constants.bgStyle.image) => {
        this.setState({menu: menu, breadcrumb: breadcrumb, bgType: bgType});
    };

    render(props, state) {
        return (
            <div>
                <Header menu={state.menu} breadcrumb={state.breadcrumb} bg-type={state.bgType}/>
                <Router>
                    <Movies path="/movies/:filter?" setHeader={this.headerCallBack}
                            update-selection={this.updateMovieSelection} selection={state.selection}/>
                    <Movie path="/movie/:id/:category?" setHeader={this.headerCallBack}
                           update-selection={this.updateMovieSelection} selection={state.selection}/>
                    <Recommendation path="/recommendation" setHeader={this.headerCallBack}/>
                </Router>
                <Footer bg-type={state.bgType}/>
            </div>
        );
    }
}

render(<App/>, mountNode, mountNode.lastChild);
