import {h, Component} from 'preact';
import style from './style.css';


class CastLine extends Component {
    getInitialName() {
        const names = this.props.name.split(' ');
        try {
            return names[0][0] + names[1][0]
        } catch (e) {
            return ''
        }
    }

    render(props) {
        return (
            <div class="cast">
                <figure class="avatar avatar-xl" data-initial={this.getInitialName()}>
                    <img src={`https://image.tmdb.org/t/p/w92/${props['profile-path']}`} alt=" "/>
                </figure>
                <span class="cast-item ml-2">{props.name}</span>
                <span class="cast-item mr-0">{props.character}</span>
            </div>
        )
    }
}

export default CastLine
