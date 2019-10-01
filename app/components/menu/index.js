import {h, Component} from 'preact';
import style from './style.css';

class Menu extends Component {


    render(props) {
        return (
            <div class="menu-content">
                <h3>{props.title}</h3>
                <div class="menu-body">
                    {props.body}
                </div>
            </div>
        )
    }
}

export default Menu
