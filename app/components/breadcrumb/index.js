import {h, Component} from 'preact';
import style from './style.css';

import {Link} from 'preact-router';

class Breadcrumb extends Component {
    listBreadcrumbItem() {
        const items = [];
        for (const [key, value] of Object.entries(this.props.current)) {
            items.push(<li class="breadcrumb-item"><Link href={value} class="text-light text-bold">{key}</Link></li>)
        }
        return items
    }

    render() {
        return (
            <ul class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="/" class="text-light text-bold">Accueil</a>
                </li>
                {this.listBreadcrumbItem()}
            </ul>
        )
    }
}

export default Breadcrumb
