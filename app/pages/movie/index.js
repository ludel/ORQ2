import {h, Component} from 'preact';
import requests from "../../requests";
import style from './style.css';

import BigButton from "../../components/buttons/bigButton";
import BigRoundButton from "../../components/buttons/bigRoundButton";
import SmallButton from "../../components/buttons/smallButton";

import RateMenu from "./utils/scoreMenu";
import CategoryMenu from "./utils/categoryMenu";

class Movie extends Component {
    constructor() {
        super();
        this.state = {loading: true, detail: {}, bgStyle: {}}
    }

    componentWillMount() {
        this.props.setHeader(
            "Film",
            {'Liste de films': '/movies'},
            'color'
        );
    }

    componentDidMount() {
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
                    <div class="container grid-xl movie-page" >
                        <div class="columns">
                            <div class="column col-3 col-lg-12 img-col">
                                <img src={`https://image.tmdb.org/t/p/w342/${state.detail.poster_path}`}
                                     alt={state.detail.title}
                                     class="img-responsive p-centered" />

                                <BigButton text={<span><i class="icon icon-bookmark"/> Ajouter à la watchlist</span>}/>
                                <BigButton text={<span><i class="icon icon-plus"/> Ajouter au favoris</span>}/>
                            </div>
                            <div class="column">
                                <h1 class="text-bold">
                                    {state.detail.title}
                                    <span class="text-gray date">({state.detail.release_date.slice(0, 4)})</span>
                                </h1>

                                <div class="rate-menu">
                                    <RateMenu vote-average={state.detail.vote_average}
                                              vote-count={state.detail.vote_count}
                                              title={state.detail.title}/>
                                </div>

                                <div class="category-menu">
                                    <CategoryMenu category={props.matches.category || 'overview'}
                                                  movie-id={state.detail.id}
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
