import {h, Component} from 'preact';
import constants from "../../constants";

class Translation extends Component {
    render(props) {
        return constants.trad[props.value] || props.value
    }
}

export default Translation
