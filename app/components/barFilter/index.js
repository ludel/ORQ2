import {h, Component} from 'preact';
import style from './style.css';


class BarFilter extends Component {

    render(props) {
        const keys = Object.keys(props.filters);
        const values = Object.values(props.filters);

        return (
            <div class="bar-filter">
                <div class="columns">

                    <div class="column">
                        <p class="btn btn-link text-light m-0 ml-2 c-auto">
                            <span class="text-bold">{props.result}</span> {props.type}s au total
                        </p>
                        {props.filters['Date de sortie']}
                    </div>

                    <div class="column vertical-line">
                        <div class="dropdown ml-2">
                            <label class="text-bold hide-lg ">Trier par: </label>

                            <a class="btn btn-link text-light dropdown-toggle m-0" tabIndex="0">
                                {props['active-filter']} <i class="icon icon-caret"/>
                            </a>
                            <ul class="menu">
                                {keys.map((key, index) => (
                                    <li class="menu-item text-dark">
                                        <a href={`/movies/${key}`}>{values[index]}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default BarFilter
