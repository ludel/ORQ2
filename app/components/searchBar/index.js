import {h, Component} from 'preact';
import style from './style.css';
import requests from "../../requests";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            peoples: [],
            typing: false,
            typingTimeout: 0
        }
    }

    doneTyping = (event) => {
        const self = this;
        const searchFunction = this.search;
        const query = event.target.value;

        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        if (query)
            this.setState({
                typing: false,
                typingTimeout: setTimeout(function () {
                    searchFunction(self, query)
                }, 700)
            });
        else
            this.setState({movies: [], peoples: []})
    };

    search(self, query) {
        requests.movies.search(query, 1).then(res => {
            self.setState({
                movies: res.data.results.slice(0, self.props.limit).map(e => {
                    return {id: e.id, title: e.title, year: (e.release_date || '').slice(0, 4)}
                })
            });
        });

        requests.people.search(query, 1).then(res => {
            self.setState({
                peoples: res.data.results.slice(0, self.props.limit).map(e => {
                    return {id: e.id, name: e.name, department: e.known_for_department}
                })
            });
        })
    }

    render(props, state) {
        return (
            <div class="dropdown">

                <div class="input-group input-inline search-div" style={{width: props.width}}>
                    <input class="form-input search-input dropdown-toggle" tabIndex="0" type="text"
                           placeholder="Film, Acteur, Réalisateur ..." onKeyUp={this.doneTyping}/>
                    <ul class="menu menu-search">
                        <li class="divider search-divider" data-content="Films"/>
                        {state.movies.map((e) =>
                            <li class="menu-item">
                                <a href={`#/movie/${e.id}`} >{e.title} <span class="text-gray">{e.year}</span></a>
                            </li>
                        )}
                        <li class="divider search-divider" data-content="Personnes"/>
                        {state.peoples.map((e) =>
                            <li class="menu-item">
                                <a href={`#/person/${e.id}`}>{e.name} <span class="text-gray">{e.department}</span></a>
                            </li>
                        )}
                    </ul>

                    <button class="btn input-group-btn search-button">
                        <i class="icon icon-search"/>
                    </button>

                </div>

            </div>
        )
    }
}

export default SearchBar
