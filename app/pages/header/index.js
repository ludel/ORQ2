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
        this.state = {modal: ''};
    }

    openModal() {
        this.setState({modal: 'active'})
    }

    closeModal() {
        this.setState({modal: ''})
    }

    authMenu() {
        if (localStorage.hasOwnProperty('auth'))
            return (
                <section className="navbar-section hide-lg">
                    <BigRoundButton text="Mon compte" href="#"/>
                </section>
            );
        else
            return (
                <section class="navbar-section hide-lg">
                    <a href="/sign-in" class="nav-title">Connexion</a>
                    <BigRoundButton text="Inscription" href="sign-up"/>
                </section>
            )

    }

    render(props, state) {
        return (
            <header class="header" style={this.props['bg-type']}>
                <div class="navbar container grid-xl text-bold">
                    <section class="navbar-section">
                        <a href="/" class="navbar-brand">
                            <Image src="img/logo-min.png" alt="On Regarde Quoi"/>
                        </a>

                        <a href="/movies" class="text-no-decoration text-light hide-lg">
                            <h1 class="mb-0 ml-2">{props.menu}</h1>
                        </a>
                    </section>

                    {/* Mobile */}
                    <section class="show-lg">
                        <a class="btn burger" onClick={() => this.openModal()}>
                            <i class="icon icon-menu icon-2x m-0 p-0 text-light"/>
                        </a>
                    </section>


                    {/* computer */}
                    <section class="navbar-center hide-lg">
                        <SearchBar width='21rem' limit={3}/>
                    </section>

                    {this.authMenu()}

                </div>

                <div class="text-center mt-2">
                    <Breadcrumb current={props.breadcrumb}/>
                </div>

                <div class={`modal modal-lg ${state.modal}`} id="header-modal">
                    <a class="modal-overlay" onClick={() => this.closeModal()} aria-label="Close"/>

                    <div class="modal-container" role="document">

                        <div class="modal-header">
                            <a class="btn btn-clear btn-lg float-right text-error" onClick={() => this.closeModal()}
                               aria-label="Close"/>
                            <h2 class="modal-title text-light">Menu</h2>
                            <hr class="mb-0"/>
                        </div>

                        <div class="modal-body">
                            <a href="/" class="text-light">
                                <h4>Accueil <i class="icon icon-arrow-right"/></h4>
                            </a>
                            <a href="/movies" onClick={() => this.closeModal()} class="text-light" aria-label="Close">
                                <h4>Liste de films <i class="icon icon-arrow-right"/></h4>
                            </a>
                            <a href="#/recommendation" onClick={() => this.closeModal()} class="text-light"
                               aria-label="Close">
                                <h4>Recommandation <i class="icon icon-arrow-right"/></h4>
                            </a>

                            <div class="search-bar-burger">
                                <h3>Recherche</h3>
                                <SearchBar width='100%' limit={1}/>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <div class="text-center" onClick={() => this.closeModal()}>
                                <a href="#" class="nav-title">Connexion</a>
                                <BigRoundButton text="Inscription" href="#"/>
                            </div>
                        </div>
                    </div>
                </div>

            </header>
        )
    }
}

export default Header
