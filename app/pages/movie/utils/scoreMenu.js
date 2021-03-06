import {h, Component} from 'preact';
import requests from "../../../requests";
import Image from "../../../components/image";

class RateMenu extends Component {
    constructor() {
        super();
        this.state = {tomato: 0, imdb: 0, metacritic: 0}
    }

    componentDidMount() {
        requests.scoring.movie(this.props.title).then(res => {
            try {
                const scores = res.data['items'][0]['scoring'];
                const tomato = this.getScore(scores, 'tomato:meter');
                const imdb = this.getScore(scores, 'imdb:score');
                const metacritic = this.getScore(scores, 'metacritic:score');

                this.setState({
                    tomato: tomato || {value: '-'},
                    imdb: imdb || {value: '-'},
                    metacritic: metacritic || {value: '-'}
                });
            }catch (e) {
                this.setState({
                    tomato: {value: '-'},
                    imdb: {value: '-'},
                    metacritic: {value: '-'}
                });
            }
        })
    }

    getScore(scores, source) {
        for (const score of scores)
            if (score['provider_type'] === source)
                return score;

    }


    render(props, state) {
        return (
            <div class="columns bar-vote text-center">
                <div class="column col-3">
                    <span>
                        <button class="btn btn-link m-0 tooltip" data-tooltip="The Movie DB">
                        <i class="fas fa-star fa-lg icon-star"/>
                        </button>
                        <a class="btn btn-link m-0 text-light" href={`https://www.themoviedb.org/movie/${props.id}`} target="_blank">
                        {props['vote-average']} <span class="text-gray">/10</span>
                        </a>
                    </span>
                </div>

                <div class="column col-3 vertical-line ">
                    <button class="btn btn-link m-0 tooltip" data-tooltip="Rotten Tomato">
                        <Image src="img/icon/rottentomato.png"/>
                    </button>
                    <a class="btn btn-link m-0 text-light"
                       href={`https://www.rottentomatoes.com/m/${props['original-title'].toLowerCase().replace(/ /g, '_')}`}
                       target="_blank">
                        {state.tomato.value} <span class="text-gray">/100</span>
                    </a>
                </div>

                <div class="column col-3 vertical-line">
                    <button class="btn btn-link m-0 tooltip" data-tooltip="IMDB">
                        <Image src="img/icon/imdb.png"/>
                    </button>
                    <a class="btn btn-link m-0 text-light" href={`https://www.imdb.com/title/${props['imdb-id']}`} target="_blank">
                        {state.imdb.value} <span class="text-gray">/10</span>
                    </a>
                </div>

                <div class="column col-3 vertical-line">
                    <button class="btn btn-link m-0 tooltip" data-tooltip="MetaCritic">
                        <Image src="img/icon/metacritic.png"/>
                    </button>
                    <a class="btn btn-link m-0 text-light">
                        {state.metacritic.value} <span class="text-gray">/10</span>
                    </a>
                </div>
            </div>
        )
    }
}

export default RateMenu
