import {h, Component} from 'preact';
import style from './style.css';

import requests from "../../requests";
import MovieCard from "../movieCard";


class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {movies: [], cursor: 0, loading: true}
    }

    componentDidMount() {
        requests.movies.recommendation(this.props.about, this.props.matrix, this.props.selection).then(res => {
            const movies = Object.values(res.data).sort((a, b) => (a.score < b.score) ? 1 : -1);
            this.setState({movies: movies.slice(0, 10), loading: false});
        })
    }

    next() {
        if (this.state.cursor + 1 < this.state.movies.length)
            this.setState({cursor: this.state.cursor + 1});
        else
            this.setState({cursor: 0});
    };

    before() {
        if (this.state.cursor > 0)
            this.setState({cursor: this.state.cursor - 1});
        else
            this.setState({cursor: this.state.movies.length - 1});
    };

    set(index) {
        this.setState({cursor: index});
    }

    render(props, state) {
        if (state.loading)
            return (
                <div class="banner-0">
                    <div class="loading loading-lg"/>
                </div>
            );
        else {
            let movieCursor = state.movies[state.cursor];

            return (
                <div>
                    <div class="columns">
                        <div class="column col-1 flex-centered c-hand hide-sm" onClick={() => this.before()}>
                            <i class="icon icon-arrow-left icon-4x"/>
                        </div>

                        <div class="column">
                            <MovieCard id={movieCursor.data.id}
                                       title={movieCursor.data.title}
                                       release_date={movieCursor.data.release_date || ''}
                                       vote_average={movieCursor.data.vote_average / 10}
                                       poster_path={movieCursor.data.poster_path}
                                       overview={movieCursor.data.overview}
                                       original_language={movieCursor.data.original_language || ''}
                                       footerCard={
                                           <div>
                                               Relations:
                                               {Object.values(movieCursor.relations).map(e =>
                                                   <span class="label label-rounded">{e}</span>
                                               )}
                                           </div>
                                       }/>
                        </div>

                        <div class="column col-1 flex-centered c-hand hide-sm" onClick={() => this.next()}>
                            <i class="icon icon-arrow-right icon-4x"/>
                        </div>
                    </div>

                    <ul class="pagination page-carousel flex-centered ">
                        {state.movies.map((e, i) =>
                            <li class="page-item c-hand">
                                <a class={"dot-carousel " + (i === state.cursor ? 'dot-active' : '')}
                                   onClick={() => this.set(i)}>&bull;</a>
                            </li>)}
                    </ul>
                </div>
            )
        }
    }
}

export default Carousel
