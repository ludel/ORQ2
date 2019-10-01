import {h, Component} from 'preact';
import style from './style.css';


class BigButton extends Component {

    render(props) {
        return (
            <button class={`btn red-big-btn c-hand ${props.loading}`} type="submit">{props.text}</button>
        )
    }
}

export default BigButton
