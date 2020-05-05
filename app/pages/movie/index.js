import {h, Component} from 'preact';
import requests from "../../requests";

import constants from "../../constants";
import BigButton from "../../components/buttons/bigButton";

import RateMenu from "./utils/scoreMenu";
import CategoryMenu from "./utils/categoryMenu";

import style from './style.css';


class Movie extends Component {
    constructor() {
        super();
        this.state = {loading: true, detail: {}, bgStyle: {}, watchlist: ''}
    }

    componentWillMount() {
        this.props.setHeader(
            "Film",
            {'Liste de films': '/movies'},
            constants.bgStyle.color
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.matches.id !== prevProps.matches.id  || this.state.watchlist_ids !== prevState.watchlist_ids) {
            this.setState({loading: true});
            this.fetchMovie();
        }
    }

    componentDidMount() {
        if (localStorage.hasOwnProperty('token'))
            requests.watchlist.get(localStorage.getItem('token'))
                .then(res => this.setState({watchlist_ids: res.data.split(',')}));
        else
            this.fetchMovie();
    }

    fetchMovie() {
        requests.movies.detail(this.props.matches.id).then(res => {
            const current_breadcrumb = {'Liste de films': '/movies'};
            current_breadcrumb[res.data.title] = '';

            this.props.setHeader("Film", current_breadcrumb, 'color');
            this.setState({
                loading: false,
                detail: res.data,
                bgStyle: {
                    backgroundImage: `linear-gradient(rgba(2, 13, 24, 0.9), rgba(2, 13, 24, 0.7), rgba(2, 13, 24, 1)),
                              url("https://image.tmdb.org/t/p/w1280/${res.data.backdrop_path}")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50% 40%;',
                    backgroundColor: '#06121e'
                }
            });

        })
    }

    getTextBtnWatchList(id) {
        const ids = (this.state.watchlist|| '').split(',');
        if (ids.includes(id.toString()))
            return <span><i class="icon icon-cross"/> Supprimer de la watchlist</span>;
        else {
            return <span><i class="icon icon-bookmark"/> Ajouter à la watchlist</span>;
        }
    }

    updateWatchList(id) {
        const ids = (this.state.watchlist|| '').split(',');
        if (ids.includes(id.toString())) {
            requests.watchlist.remove(id).then(res => this.setState({watchlist: res.data}));
        } else {
            requests.watchlist.add(id).then(res => this.setState({watchlist: res.data}));
        }
    }

    getTextBtnSelection(id) {
        const selection = JSON.parse(localStorage.getItem('selection')) || {};
        const isSelected = Object.keys(selection).includes(id.toString());

        if (isSelected)
            return <span><i class="icon icon-cross"/> Supprimer de la selection</span>;
        else
            return <span><i class="icon icon-plus"/> Ajouter la selection</span>;
    }

    render(props, state) {
        if (state.loading)
            return (
                <div class="banner-0">
                    <div class="loading loading-lg"/>
                </div>
            );
        else
            return (
                <div class="banner-img" style={state.bgStyle}>
                    <div class="container grid-xl movie-page">
                        <div class="columns">
                            <div class="column col-3 col-lg-12 img-col">
                                <img src={`https://image.tmdb.org/t/p/w342/${state.detail.poster_path}`}
                                     alt={state.detail.title}
                                     class="img-responsive p-centered"/>
                                {Boolean(localStorage.hasOwnProperty('token')) ?
                                    <BigButton text={this.getTextBtnWatchList(state.detail.id)}
                                               onclick={() => this.updateWatchList(state.detail.id)}/> :
                                    <BigButton text={this.getTextBtnWatchList(state.detail.id)}
                                               onclick={() => this.updateWatchList(state.detail.id)}
                                               class={"disabled tooltip"}
                                               tip={"Connectez-vous pour avoir accès à la watchlist"}/>
                                    }

                                <BigButton
                                    onclick={() => props['update-selection'](state.detail.id, state.detail.title)}
                                    text={this.getTextBtnSelection(state.detail.id)}/>
                            </div>
                            <div class="column">
                                <h1 class="text-bold">
                                    {state.detail.title}
                                    <span class="text-gray date">({state.detail.release_date.slice(0, 4)})</span>
                                </h1>

                                <div class="rate-menu">
                                    <RateMenu vote-average={state.detail.vote_average}
                                              vote-count={state.detail.vote_count}
                                              title={state.detail.title}
                                              original-title={state.detail.original_title}
                                              imdb-id={state.detail.imdb_id}
                                              id={state.detail.id}/>
                                </div>

                                <div class="category-menu">
                                    <CategoryMenu movie-id={state.detail.id}
                                                  movie={state.detail}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default Movie
