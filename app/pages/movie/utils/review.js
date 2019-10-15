import {h, Component} from 'preact';
import ObjectLine from "../../../components/objectLine";
import SmallButton from "../../../components/buttons/smallButton";


class Review extends Component {

    render(props) {
        if (props.total === 0)
            return (
                <h4 class="text-center">Aucune critique disponible</h4>
            );
        else
            return (
                <div>
                    {props.reviews.map(e =>
                        <div>
                            <div class="tile">
                                <div class="tile-icon hide-sm">
                                    <figure class="avatar avatar-lg" data-initial={e.author.slice(0, 3)}/>
                                </div>
                                <div class="tile-content">
                                    <p class="tile-title">{e.author}</p>
                                    <p class="tile-subtitle text-gray">{e.content}</p>
                                </div>
                                <div class="tile-action">
                                    <SmallButton text={<i class="fas fa-external-link-alt"/>} href={e.url} target="_blank"/>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    )}
                </div>
            )
    }
}

export default Review
