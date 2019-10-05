import {h, Component} from 'preact';
import style from './style.css';


class SmallButton extends Component {

    render(props) {
        return (
            <a href={props.href} onClick={props.onclick} class={`btn red-btn text-light ${props.visibility}`}
               target={props.target || '_self'}>{props.text}</a>
        )
    }
}

export default SmallButton
