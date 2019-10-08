import {h, Component} from 'preact';

import style from './style.css';


class PersonCard extends Component {
    render(props) {
        return (
            <div class="person-card">
                <div class="columns">
                    <div class="column col-3 ">
                        <a href={`/person/${props.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w45/${props['profile-path']}`} class="flex-centered"
                                 alt={props.name}/>
                        </a>
                    </div>

                    <div class="column">
                        <a href={`/person/${props.id}`} class="text-bold text-light">
                            <h5>
                                {props.name}
                            </h5>
                        </a>
                        <span class="">{props.subtitle}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonCard
