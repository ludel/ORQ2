import {h, Component} from 'preact';

import style from './style.css';
import requests from "../../requests";

import BigRoundButton from "../../components/buttons/bigRoundButton";
import BigButton from "../../components/buttons/bigButton";
import MovieCard from "../../components/movieCard";
import BarFilter from "../../components/barFilter";
import Menu from "../../components/menu";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.filters = {
            'popularity': 'Popularité',
            'top': 'Notes des spectateurs',
            'now_playing': "À l'affiche",
            'upcoming': "Sortie à venir",

        };
        this.state = {
            page: 1,
            moviesCard: [],
            loadingClass: "",
            totalResults: 0,
            selectedMovies: JSON.parse(localStorage.getItem('selection')) || {},
            search: ""
        };

        this.addSelection = this.updateMovieSelection.bind(this);
        this.searchChange = this.searchChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.matches.filter !== prevProps.matches.filter) {
            this.setState({
                moviesCard: [],
                page: 1
            });
            this.addMoviesCard();
        }
    }

    componentDidMount() {
        this.props.setHeader("Films", {'Liste de films': '/movies'});
        this.addMoviesCard();
    }

    getRequest() {
        const filter = this.props.matches.filter;

        if (!filter)
            return requests.movies.popularity(this.state.page);
        else if (!Object.keys(requests.movies).includes(filter))
            return requests.movies.search(filter, this.state.page);
        else
            return requests.movies[filter](this.state.page)
    }

    addMoviesCard() {
        this.setState({loadingClass: 'loading'});
        const filterRequest = this.getRequest();
        filterRequest.then(res => {
            for (const data of res.data.results) {
                const currentState = this.state.moviesCard;

                this.setState({
                    moviesCard: currentState.concat(
                        <MovieCard id={data.id}
                                   title={data.title}
                                   release_date={data.release_date || ''}
                                   vote_average={data.vote_average}
                                   poster_path={data.poster_path}
                                   overview={data.overview}
                                   adult={data.adult}
                                   original_language={data.original_language}
                                   is_clustered={data.is_clustered}
                                   add-selection={this.addSelection}/>
                    ),
                    totalResults: res.data.total_results
                })
            }
        }).finally(() => {
            this.setState({loadingClass: '', page: this.state.page + 1});
        });
    }

    updateMovieSelection(id, title) {
        const selection = this.state.selectedMovies;
        if (Object.keys(selection).includes(id.toString()))
            delete selection[id];
        else
            selection[id] = title;

        this.setState({
            selectedMovies: selection
        });
        localStorage.setItem('selection', JSON.stringify(selection))
    }

    searchChange(event) {
        this.setState({search: event.target.value});
    }


    render(props, state) {
        return (
            <div class="banner-0">
                <div class="container grid-xl">
                    <div class="columns">
                        <div class="column">
                            <BarFilter result={state.totalResults}
                                       type="film"
                                       filters={this.filters}
                                       active-filter={this.filters[props.matches.filter] || 'Popularité'}/>

                            {state.moviesCard}

                            <div class="text-center" onClick={() => this.addMoviesCard()}>
                                <BigRoundButton text="Plus" loading={this.state.loadingClass}/>
                            </div>
                        </div>

                        <div class="column col-3 hide-lg menu-col">
                            <Menu title="Recherche" body={
                                <form action={`/movies/${state.search}`}>
                                    <label class="input-label">Titre du film</label>
                                    <input class="form-input custom-input" type="text"
                                           onChange={this.searchChange}
                                           value={state.search}
                                           placeholder="Oblivion, Interstellar ..."/>
                                    <BigButton text="Rechercher"/>
                                </form>
                            }/>

                            <Menu title="Selection" body={
                                <div>
                                    {Object.keys(state.selectedMovies).map(item => (
                                        <div class="toast selection-movie-toast mt-1">
                                            <button class="btn btn-clear float-right"
                                                    onClick={() => this.updateMovieSelection(item, state.selectedMovies[item])}/>
                                            {state.selectedMovies[item]}
                                        </div>
                                    ))}

                                    <BigButton text="Valider la selection"/>
                                </div>
                            }/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//

export default Movies
