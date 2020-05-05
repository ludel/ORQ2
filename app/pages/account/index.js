import {h, Component} from 'preact';
import MovieCard from "../../components/movieCard";
import requests from "../../requests";
import constants from "../../constants";

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {currentMovie:{}, cursor: 0, loading: true, watchlist_ids:''}
    }

    componentDidMount() {
        requests.watchlist.get(localStorage.getItem('token'))
            .then(res => this.setState({watchlist_ids: res.data.toString().split(',')}));

        this.props.setHeader("Compte", {}, constants.bgStyle.image);
    }

    fetchMovie(){
        requests.movies.detail(this.state.watchlist_ids[this.state.cursor]).then(res => {
            this.setState({currentMovie: res.data, loading: false})
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.cursor !== prevState.cursor || this.state.watchlist_ids !== prevState.watchlist_ids) {
            this.setState({loading: true});
            this.fetchMovie();
        }
    }

    next() {
        if (this.state.cursor + 1 < this.state.watchlist_ids.length)
            this.setState({cursor: this.state.cursor + 1});
        else
            this.setState({cursor: 0});
    };

    before() {
        if (this.state.cursor > 0)
            this.setState({cursor: this.state.cursor - 1});
        else
            this.setState({cursor: this.state.watchlist_ids.length - 1});
    };

    getWatchList(){
        if(this.state.loading)
            return <div class="banner-0"><div class="loading loading-lg"/></div>;
        else
            return <div class="columns">
                        <div class="column col-1 flex-centered c-hand hide-sm" onClick={() => this.before()}>
                            <i class="icon icon-arrow-left icon-4x"/>
                        </div>

                        <div class="column">
                            <MovieCard id={this.state.currentMovie.id}
                               title={this.state.currentMovie.title}
                               release_date={this.state.currentMovie.release_date || ''}
                               vote_average={this.state.currentMovie.vote_average}
                               poster_path={this.state.currentMovie.poster_path}
                               overview={this.state.currentMovie.overview}
                               original_language={this.state.currentMovie.original_language || ''}/>
                        </div>

                        <div class="column col-1 flex-centered c-hand hide-sm" onClick={() => this.next()}>
                            <i class="icon icon-arrow-right icon-4x"/>
                        </div>
                    </div>
    }

    render(props, state) {
        return (
            <div class="container grid-xl person-page">
                <h1>Mon compte</h1>

                <div>
                    <h3>Watchlist</h3>
                    {this.getWatchList()}
                </div>
            </div>
        )
    }
}

export default Account
