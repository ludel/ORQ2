import {h, Component} from 'preact';
import style from './style.css';


import requests from "../../requests";

import DateFormat from "../../components/time/dateFormat";
import ObjectLine from "../../components/objectLine";

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {detail: {}, loading: true}
    }

    componentDidUpdate(prevProps) {
        if (this.props.matches.id !== prevProps.matches.id) {
            this.setState({loading: true});
            this.fetchPerson();
        }
    }

    componentDidMount() {
        this.props.setHeader("Célébrités", {'Liste des célébrités': '/persons'});
        this.fetchPerson()
    }

    fetchPerson() {
        requests.people.detail(this.props.id).then(res => {
            const current_breadcrumb = {'Liste des célébrités': '/persons'};
            current_breadcrumb[res.data.name] = '';

            this.props.setHeader("Célébrités", current_breadcrumb);
            this.setState({detail: res.data, loading: false})
        })
    }

    getCastLine = (casting) => casting.map(e => {
        if (e.title && e.release_date)
            return <ObjectLine profile-path={e.poster_path} name={e.title} character={e.character}
                               href={`#/movie/${e.id}`} date={e.release_date.slice(0, 4)}/>
    });

    getCrewLine = (crew) => crew.map(e => {
        if (e.department === this.state.detail.known_for_department && e.title && e.release_date)
            return <ObjectLine profile-path={e.poster_path} name={e.title} character={e.job}
                               href={`#/movie/${e.id}`} date={e.release_date.slice(0, 4)}/>
    });

    switchCastCrew() {
        const credits = this.state.detail.combined_credits;

        if (this.state.detail.known_for_department === 'Acting') {
            const sortCast = credits.cast.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            return this.getCastLine(sortCast);
        } else {
            const sortCrew = credits.crew.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            return this.getCrewLine(sortCrew);
        }
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
                <div class="container grid-xl person-page">
                    <div class="columns">
                        <div class="column col-3 col-lg-12">
                            <img src={`https://image.tmdb.org/t/p/w342/${state.detail.profile_path}`}
                                 alt={state.detail.title}
                                 class="img-responsive p-centered"/>
                        </div>
                        <div class="column">

                            <div class="columns">
                                <div class="column col-8 col-lg-12">
                                    <h1 class="text-bold">
                                        {state.detail.name}
                                        <span class="text-gray job"> ({state.detail.known_for_department}) </span>
                                    </h1>

                                    {state.detail.biography ?
                                        <div class="person-col-item">
                                            <h5>Biographie</h5>
                                            <p class="text-gray">{state.detail.biography}</p>
                                            <p class="text-right">- Source: TMDb</p>
                                        </div> : ''}

                                    <div class="person-col-item">
                                        <h5>Filmographie</h5>
                                        {this.switchCastCrew()}
                                    </div>


                                </div>
                                <div class="column person-col">
                                    <div class="person-col-item">
                                        <h6 class="text-bold text-gray">Nom complet: </h6>
                                        <span>{state.detail.name}</span>
                                    </div>
                                    <div class="person-col-item">
                                        <h6 class="text-bold text-gray">Genre: </h6>
                                        <span>{state.detail.gender === 1 ? 'Femme' : 'Homme'}</span>
                                    </div>
                                    <div class="person-col-item">
                                        <h6 class="text-bold text-gray">Date de naissance: </h6>
                                        <DateFormat value={state.detail.birthday} separator="/"/>
                                    </div>
                                    <div class="person-col-item">
                                        <h6 class="text-bold text-gray">Date de décès: </h6>
                                        {state.detail.deathday ?
                                            <DateFormat value={state.detail.deathday} separator="/"/> : 'Indisponible'}
                                    </div>

                                    <div class="person-col-item">
                                        <h6 class="text-bold text-gray">Lieu de naissance: </h6>
                                        <span>{state.detail.place_of_birth}</span>
                                    </div>
                                    <div class="person-col-item">
                                        <h6 class="text-bold text-gray">Site officiel: </h6>
                                        <a href={state.detail.homepage} target="_blank"> Lien <i
                                            class="icon icon-lg icon-link"/> </a>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            )
    }
}

export default Person
