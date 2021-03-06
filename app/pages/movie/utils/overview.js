import {h, Component} from 'preact';

import Minutes from "../../../components/time/minutes";
import DateFormat from "../../../components/time/dateFormat";
import ObjectLine from "../../../components/objectLine";
import Translation from "../../../components/translation";
import constants from "../../../constants";

class Overview extends Component {
    getNamesLink(category) {
        return category.map((e, i) => <span>
            <a href={`#/person/${e.id}`}>{e.name}</a>{i < category.length - 1 ? ', ' : ''}
        </span>
        )
    }

    getNames(category, className, separator) {
        const names = category.map((element) => element.name);
        return names.map(((name, i) => <span class={className}><Translation value={name}/>{i < names.length - 1 ? separator : ''}</span>))
    }

    getMainTrailer() {
        if (this.props.video[0])
            return this.props.video[0].key;
        else
            return ''
    }


    render(props, state) {
        return (
            <div class="columns">
                <div class="column col-8 col-lg-12">
                    <div class="overview-col-item">
                        <h5>Synopsis</h5>
                        <p class="text-gray">{props.overview}</p>
                    </div>

                    <div class="overview-col-item">
                        <h5>Trailer</h5>
                        <div class="video-responsive ">
                            <iframe src={`https://www.youtube.com/embed/${this.getMainTrailer()}`}/>
                        </div>
                    </div>

                    <div class="overview-col-item">
                        <h5>Casting</h5>
                        {props.actors.slice(0, 6).map(e =>
                            <ObjectLine profile-path={e.profile_path} name={e.name} character={e.character} href={`/person/${e.id}`}/>)}
                    </div>

                    <hr/>

                </div>

                <div class="column overview-col">
                    <div class="overview-col-item">
                        <h6 class="text-bold text-gray">Titre originale: </h6>
                        {props['original-title']} <span class="text-gray">({props['original-language']})</span>
                    </div>
                    <div class="overview-col-item">
                        <h6 class="text-bold text-gray">Réalisateur: </h6>
                        {this.getNamesLink(props['director'])}
                    </div>
                    <div class="overview-col-item">
                        <h6 class="text-bold text-gray">Acteurs principaux: </h6>
                        {this.getNamesLink(props['actors'].slice(0, 3))}

                    </div>
                    <div class="overview-col-item">
                        <h6 class="text-bold text-gray">Genres:</h6>
                        {this.getNames(props.genres, '', ', ')}
                    </div>
                    <div class="overview-col-item">
                        <h6 class="text-bold text-gray">Date de sortie:</h6>
                        <DateFormat value={props['release-date']} separator="/"/>
                    </div>
                    <div class="overview-col-item">
                        <h6 class="text-bold text-gray">Durée:</h6>
                        <Minutes value={props.runtime} separator="h"/>
                    </div>
                    <div class="overview-col-item">
                        <h6 class="text-bold text-gray">Mots clés:</h6>
                        {this.getNames(props.keywords, 'label mr-1 mt-1', '')}
                    </div>
                </div>
            </div>
        )
    }
}

export default Overview
