import {h, Component} from 'preact';
import style from './style.css';


class BigRoundButton extends Component {

    render(props) {
        return (
            <a href={props.href} class={"red-btn-rounded text-light c-hand ml-2 " + props.loading}>{props.text}</a>
        )
    }
}

export default BigRoundButton
