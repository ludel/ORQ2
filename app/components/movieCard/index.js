import {h, Component} from 'preact';
import style from './style.css';

import constants from "../../constants";
import DateFormat from "../time/dateFormat";

class MovieCard extends Component {
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
                        Version Originale: {props.original_title}
                        <span class="text-gray"> ({constants.VO[props.original_language]})</span>
                    </p>
                    {this.props.footerCard}
                </div>
            </div>
        )
    }
}

export default MovieCard
