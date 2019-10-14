import {h, Component} from 'preact';

import style from './style.css';
import requests from "../../requests";
import PersonCard from "../../components/personCard";
import BigRoundButton from "../../components/buttons/bigRoundButton";

class Persons extends Component {
    constructor(props) {
        super(props);
        this.state = {page: 1, personData: [], loadingClass: ""}
    }


    componentDidMount() {
        this.props.setHeader("Célébrités", {'Liste des célébrités': '/people'});
        this.addPersonCard()
    }

    addPersonCard() {
        this.setState({loadingClass: 'loading'});
        requests.people.popular(this.state.page)
            .then(res => {
                    for (const data of res.data.results) {
                        const currentPerson = this.state.personData;
                        this.setState({
                            personData: currentPerson.concat({
                                id:data.id,
                                name: data.name,
                                mainJob: data.known_for_department,
                                profilePath: data.profile_path
                            }),
                        })
                    }
                }
            )
            .finally(() => {
                this.setState({loadingClass: '', page: this.state.page + 1});
            })
    }

    render(props, state) {
        return (
            <div class="container grid-xl">
                <div class="columns">
                    {state.personData.map(data =>
                        <div class="col-3 col-md-6">
                            <PersonCard id={data.id} name={data.name} profile-path={data.profilePath} subtitle={data.mainJob}/>
                        </div>
                    )}
                </div>
                <div class="text-center m-2" onClick={() => this.addPersonCard()}>
                    <BigRoundButton text="Plus" loading={this.state.loadingClass}/>
                </div>
            </div>
        )
    }
}

export default Persons
