import {h, Component} from 'preact';
import style from './style.css';

import requests from "../../requests";
import MovieCard from "../movieCard";


class CarouselItem extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true}
    }


    componentDidMount() {
        this.fetchMovie()
    }

    componentDidUpdate(prevProps) {
        if (this.props['movie-id'] !== prevProps['movie-id']) {
            this.fetchMovie()
        }
    }

    fetchMovie() {
        this.setState({loading: true});
        requests.movies.detail(this.props['movie-id']).then(res => {
            this.setState({
                id: res.data.id,
                title: res.data.title,
                release_date: res.data.release_date,
                vote_average: res.data.vote_average,
                poster_path: res.data.poster_path,
                overview: res.data.overview,
                adult: res.data.adult,
                original_language: res.data.original_language,
                loading: false
            })
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
                <MovieCard id={state.id}
                           title={state.title}
                           release_date={state.release_date || ''}
                           vote_average={state.vote_average}
                           poster_path={state.poster_path}
                           overview={state.overview}
                           adult={state.adult}
                           original_language={state.original_language}/>

            )
    }
}

export default CarouselItem
