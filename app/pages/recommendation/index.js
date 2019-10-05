import {h, Component} from 'preact';
import style from './style.css';

import CarouselList from "../../components/carousel/list";


class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.selection = JSON.parse(localStorage.getItem('selection'))
    }


    componentDidMount() {
        this.props.setHeader("Films", {'Liste de films': '/movies', 'Recommendation': ''});
    }

    render() {
        return (
            <div class="banner-0">
                <div class="container grid-xl">
                    {Object.keys(this.selection).map(id =>
                        <div>
                            <h3>Concernant <span class="text-bold">{this.selection[id]}</span></h3>
                            <CarouselList movie-id={id} selection={this.selection}/>
                        </div>
                    )}

                </div>
            </div>
        )
    }
}

export default Recommendation
