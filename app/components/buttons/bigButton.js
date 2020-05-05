import {h, Component} from 'preact';
import style from './style.css';


class BigButton extends Component {

    render(props) {
        if (props.type === "submit")
            return (
                <button class={`btn red-big-btn c-hand ${props.loading}`} onClick={props.onclick}
                        type="submit">{props.text}
                </button>
            );
        else
            return (
                <a class={`btn red-big-btn c-hand ${props.loading} ${props.class}`} onClick={props.onclick} data-tooltip={props.tip}
                   href={props.href}>{props.text}</a>
            );
    }
}

export default BigButton
