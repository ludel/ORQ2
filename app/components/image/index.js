import {h, Component} from 'preact';
import {config} from "../../config";


class Image extends Component {
    render(props) {
        return (
            <img src={config.ASSETS_URL + props.src} alt={props.alt} class={props.class} height={props.height}
                 width={props.width}/>
        )
    }
}

export default Image
