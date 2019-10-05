import {h, Component} from 'preact';

import style from './style.css';

class Footer extends Component {
    render() {
        return (
            <footer class="footer">
                <div class="container grid-xl ">
                    <div class="columns text-center flex-centered">
                        <div class="column col-lg-4 col-md-12 ">
                            <ul class="nav m-2">
                                <li class="nav-item">
                                    <a href="/movies">Films</a>
                                </li>
                                <li class="nav-item">
                                    <a href="/">Célébrités</a>
                                </li>
                                <li class="nav-item">
                                    <a href="/">À Propos</a>
                                </li>
                            </ul>
                        </div>
                        <div class="column col-lg-4 col-md-12">
                            Site de recommandation de film en fonction de préference cinématographique
                        </div>
                        <div class="column col-lg-4 col-md-12">
                            On regarde Quoi - Tout droit réservé © Copyright 2019
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer
