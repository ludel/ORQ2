import {h, Component} from 'preact';
import Index from "../../../components/video";

class Media extends Component {
    render(props, state) {
        return (
            <div>
                <div class="casting-video">
                    <h5>Videos <span class="text-gray">({props.videos.length})</span></h5>
                    <div class="columns">
                        {props.videos.map(e =>
                            <div class="column col-3 col-lg-12">
                                <Index id={`trailer-${e.id}`} src-key={e.key}/>
                            </div>
                        )}
                    </div>
                </div>

                <div class="casting-video">
                    <h5>Posters <span class="text-gray">({props.posters.length})</span></h5>
                    <div class="columns">
                        {props.posters.map(e =>
                            <div class="column col-3 col-lg-12">
                                <img src={`${e.key}/0.jpg`} class="img-responsive mb-2 c-hand" alt="poster"/>
                            </div>
                        )}
                    </div>
                </div>

                <div class="casting-video">
                    <h5>Font d'écran <span class="text-gray">({props.backdrops.length})</span></h5>
                    <div class="columns">
                        {props.backdrops.map(e =>
                            <div class="column col-3 col-lg-12">
                                <img src={`${e.key}/0.jpg`} class="img-responsive mb-2 c-hand" alt="backdrop"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Media
