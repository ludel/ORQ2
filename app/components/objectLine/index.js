import {h, Component} from 'preact';
import style from './style.css';


class ObjectLine extends Component {
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
                    <a href={props.href}>
                        <img src={`https://image.tmdb.org/t/p/w92/${props['profile-path']}`} alt=" "/>
                    </a>
                </figure>
                <a class="cast-item text-bold text-light ml-2" href={props.href}>
                    {props.name} {props.date ? <span class="text-gray hide-sm">({props.date})</span> : ""}
                </a>
                <span class="cast-item text-justify mr-0 text-italic">{props.character}</span>
            </div>
        )
    }
}

export default ObjectLine
