import {h, Component} from 'preact';

import style from './style.css';
import requests from "../../requests";

import BigRoundButton from "../../components/buttons/bigRoundButton";
import BigButton from "../../components/buttons/bigButton";
import MovieCard from "../../components/movieCard";
import BarFilter from "../../components/barFilter";
import Menu from "../../components/menu";
import SmallButton from "../../components/buttons/smallButton";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.filters = {
            'top': 'Notes des spectateurs',
            'popularity': 'Popularité',
            'now_playing': "À l'affiche",
            'upcoming': "Sortie à venir",
        };

        this.state = {
            page: 1,
            moviesValues: [],
            loadingClass: "",
            totalResults: 0,
            search: ""
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.matches.filter !== prevProps.matches.filter) {
            this.setState({
                moviesValues: [],
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
            return requests.movies.top(this.state.page);
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
                const currentMoviesValue = this.state.moviesValues;

                this.setState({
                    moviesValues: currentMoviesValue.concat({
                        id: data.id,
                        title: data.title,
                        release_date: data.release_date,
                        vote_average: data.vote_average,
                        poster_path: data.poster_path,
                        adult: data.adult,
                        overview: data.overview,
                        original_language: data.original_language,
                        is_clustered: data.is_clustered,
                    }),
                    totalResults: res.data.total_results
                })
            }
        }).finally(() => {
            this.setState({loadingClass: '', page: this.state.page + 1});
        });
    }

    searchChange = (event) => {
        this.setState({search: event.target.value});
    };

    getTextBtnSelection(id) {
        const selection = JSON.parse(localStorage.getItem('selection'));
        const isSelected = Object.keys(selection).includes(id.toString());

        if (isSelected)
            return <span><i class="icon icon-cross"/> Supprimer de la selection</span>;
        else
            return <span><i class="icon icon-check"/> Ajouter à la selection</span>
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
                                       active-filter={this.filters[props.matches.filter] || 'Notes des spectateurs'}/>

                            {state.moviesValues.map(data =>
                                <div>
                                    <MovieCard id={data.id}
                                               title={data.title}
                                               release_date={data.release_date || ''}
                                               vote_average={data.vote_average}
                                               poster_path={data.poster_path}
                                               overview={data.overview}
                                               adult={data.adult}
                                               original_language={data.original_language}
                                               footerCard={
                                                   <SmallButton
                                                       onclick={() => this.props['update-selection'](data.id, data.title)}
                                                       text={this.getTextBtnSelection(data.id)}
                                                       visibility=""/>
                                               }/>
                                </div>
                            )}

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
                                           placeholder="Oblivion, Interstellar ..."/>
                                    <BigButton text="Rechercher"/>
                                </form>
                            }/>

                            <Menu title="Selection" body={
                                <div>
                                    {Object.keys(props.selection).map(item => (
                                        <div class="toast selection-movie-toast mt-1">
                                            <button class="btn btn-clear float-right"
                                                    onClick={() => this.props['update-selection'](item, props.selection[item])}/>
                                            {props.selection[item]}
                                        </div>
                                    ))}
                                    <form action="/recommendation">
                                        <BigButton text="Valider la selection"/>
                                    </form>
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
