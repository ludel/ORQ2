import {h, Component} from 'preact';

import style from './style.css';
import {config} from '../../config'

import Breadcrumb from "../../components/breadcrumb";
import BigRoundButton from "../../components/buttons/bigRoundButton";
import Image from "../../components/image";
import SearchBar from "../../components/searchBar";


class Header extends Component {
    constructor(props) {
        super(props);
    }

    isAuth() {
        return Boolean(localStorage.hasOwnProperty('token'))
    }

    render(props, state) {
        return (
            <header class="header" style={this.props['bg-type']}>
                <div class="navbar container grid-xl">
                    <section class="navbar-section">
                        <a href="/" class="navbar-brand">
                            <Image src="img/logo-min.png" alt="On Regarde Quoi"/>
                        </a>

                        <a href="/movies" class="text-no-decoration text-light hide-lg">
                            <h1 class="mb-0 ml-2">{props.menu}</h1>
                        </a>
                    </section>

                    <section class="show-lg text-right">
                        <div class="accordion">
                            <input id="accordion-4" type="checkbox" name="accordion-checkbox" checked="" hidden/>
                            <label class="btn burger c-hand " htmlFor="accordion-4">
                                <i class="icon icon-menu icon-2x m-0 p-0 text-light"/>
                            </label>

                            <div class="accordion-body bg-gray text-dark s-rounded">
                                <ul class="menu menu-nav">
                                    <li class="menu-item"><a href="#/movies">Films</a></li>
                                    <li class="menu-item"><a href="#/persons">Célébrités</a></li>
                                    <li class="menu-item"><a href="#/recommendation">Recommandations</a></li>
                                    <li class="menu-item"><a href="#/account">Mon compte</a></li>
                                </ul>
                            </div>
                        </div>
                    </section>


                    <section class="navbar-center hide-lg">
                        <SearchBar width='21rem' limit={3}/>
                    </section>

                    {this.isAuth() ?
                        <section className="navbar-section hide-lg text-bold">
                            <BigRoundButton text="Mon compte" href="#/account"/>
                        </section> :
                        <section className="navbar-section hide-lg text-bold">
                            <a href="/sign-in" className="nav-title">Connexion</a>
                            <BigRoundButton text="Inscription" href="sign-up"/>
                        </section>
                    }

                </div>

                <div class="text-center mt-2">
                    <Breadcrumb current={props.breadcrumb}/>
                </div>

            </header>
        )
    }
}

export default Header
