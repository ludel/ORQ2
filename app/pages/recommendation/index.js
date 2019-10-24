import {h, Component} from 'preact';

import style from './style.css';
import requests from "../../requests";

import Carousel from "../../components/carousel";
import BigRoundButton from "../../components/buttons/bigRoundButton";


class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.selection = JSON.parse(localStorage.getItem('selection'));
        this.state = {matrix: {}, loading: true, number: 3}
    }


    componentDidMount() {
        this.props.setHeader("Films", {'Liste de films': '/movies', 'Recommendation': ''});

        requests.movies.matrix(this.selection).then(res => {
            this.setState({matrix: res.data, loading: false})
        })
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
                <div class="banner-0">
                    <div class="container grid-xl">
                        {Object.keys(state.matrix).slice(0, state.number).map(key =>
                            <div>
                                <h3>Concernant <span class="text-bold">{key}</span></h3>
                                <Carousel matrix={state.matrix} about={key} selection={Object.keys(this.selection)}/>
                            </div>
                        )}
                    </div>

                    <div class="text-center m-2" onClick={() => this.setState({number: state.number + 3})}>
                        <BigRoundButton text="Plus" loading={this.state.loadingClass}/>
                    </div>
                </div>
            )
    }
}

export default Recommendation
