import {h, Component} from 'preact';

import style from './style.css';
import requests from "../../requests";
import Menu from "../../components/menu";
import BigButton from "../../components/buttons/bigButton";
import DateFormat from "../../components/time/dateFormat";
import CastLine from "../../components/castLine";

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

    switchCastCrew() {
        if (this.state.detail.known_for_department === 'Acting')
            return this.state.detail.combined_credits.cast.map(e => {
                    if (e.title)
                        return <CastLine profile-path={e.poster_path} name={e.title} character={e.character}
                                         href={`/movie/${e.id}`}/>
                }
            );
        else
            return this.state.detail.combined_credits.crew.map(e => {
                if (e.department === this.state.detail.known_for_department && e.title)
                    return <CastLine profile-path={e.poster_path} name={e.title} character={e.job}
                                     href={`/movie/${e.id}`}/>
            });
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

                                    <div class="person-col-item">
                                        <h5>Biographie</h5>
                                        <p class="text-gray">{state.detail.biography}</p>
                                    </div>

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
