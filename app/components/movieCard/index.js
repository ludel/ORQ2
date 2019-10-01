import {h, Component} from 'preact';
import style from './style.css';

import SmallButton from "../buttons/smallButton";
import {config} from '../../config'
import DateFormat from "../time/dateFormat";

class MovieCard extends Component {
    addToSelection() {
        const selection = JSON.parse(localStorage.getItem('selection'));
        const isSelected = Object.keys(selection).includes(this.props.id.toString());

        if (this.props.is_clustered === 'true') {
            if (isSelected)
                return <SmallButton text={<span><i className="icon icon-cross"/> Supprimer de la selection</span>}
                                    visibility=""/>;
            else
                return <SmallButton text={<span><i className="icon icon-check"/> Ajouter à la selection</span>}
                                    visibility=""/>;
        } else
            return <SmallButton text="Indisponible" visibility="disabled"/>;
    }

    render(props) {
        return (
            <div class="columns card-movie">
                <div class="column col-lg-12 col-2">
                    <a href={`/movie/${props.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w154/${props.poster_path}`}
                             class="img-responsive p-centered img-movie-card" alt={props.title}/>
                    </a>
                </div>

                <div class="column vertical-align">
                    <h5>
                        <a href={`/movie/${props.id}`} class="text-bold text-light"> {props.title}</a>
                        <span class="text-gray"> ({props.release_date.slice(0, 4)})</span>
                    </h5>

                    <h6>
                        <i class="fas fa-star icon-star"/>{props.vote_average}<label class="text-gray">/10</label>
                    </h6>

                    <p class="text-gray mb-0">
                        {props.overview}
                    </p>

                    <hr/>

                    <p class="mb-2">
                        Date de sortie: <DateFormat value={props.release_date} separator="/"/><br/>
                        Version Originale: {config.VO[props.original_language]}
                    </p>

                    <div onClick={() => props['add-selection'](props.id, props.title)}>
                        {this.addToSelection()}
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieCard
