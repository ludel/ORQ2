import {h, Component} from 'preact';
import style from './style.css';


class SearchBar extends Component {

    render(props) {
        return (
            <div class="input-group input-inline search-div" style={{width: props.width}}>
                <input class="form-input search-input" type="text" placeholder="Film, Acteur, Réalisateur ..."/>
                <button class="btn input-group-btn search-button">
                    <i class="icon icon-search"/>
                </button>
            </div>
        )
    }
}

export default SearchBar
