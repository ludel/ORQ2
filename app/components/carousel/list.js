import {h, Component} from 'preact';
import style from './style.css';

import requests from "../../requests";
import CarouselItem from "./item";


class CarouselList extends Component {
    constructor(props) {
        super(props);
        this.state = {movieIds: [], currentIndex: 0, loading: true}
    }

    componentDidMount() {
        requests.movies.recommendation(this.props['movie-id'], Object.keys(this.props.selection)).then(res => {
            const ids = Object.values(res.data['ids']);
            console.log(ids);
            this.setState({movieIds: ids, loading: false});
        })
    }

    next() {
        if (this.state.currentIndex + 1 < this.state.movieIds.length)
            this.setState({currentIndex: this.state.currentIndex + 1});
        else
            this.setState({currentIndex: 0});
    };

    before() {
        if (this.state.currentIndex - 1 > 0)
            this.setState({currentIndex: this.state.currentIndex - 1});
        else
            this.setState({currentIndex: this.state.movieIds.length - 1});
    };

    set(index) {
        this.setState({currentIndex: index});
    }

    render(props, state) {
        if (!state.loading)
            return (
                <div>
                    <div class="columns">
                        <div class="column col-1 flex-centered c-hand hide-sm" onClick={() => this.before()}>
                            <i class="icon icon-arrow-left icon-4x"/>
                        </div>

                        <div class="column">
                            <CarouselItem movie-id={state.movieIds[state.currentIndex]}/>
                        </div>

                        <div class="column col-1 flex-centered c-hand hide-sm" onClick={() => this.next()}>
                            <i class="icon icon-arrow-right icon-4x"/>
                        </div>
                    </div>

                    <ul class="pagination page-carousel flex-centered ">
                        {state.movieIds.map((e, i) =>
                            <li class="page-item c-hand">
                                <a class={"dot-carousel " + (i === state.currentIndex ? 'dot-active' : '')}
                                   onClick={() => this.set(i)}>&bull;</a>
                            </li>)}
                    </ul>
                </div>
            )
    }
}

export default CarouselList
