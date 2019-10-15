import {h, Component} from 'preact';
import style from './style.css';

class Video extends Component {
    constructor() {
        super();
        this.state = {iframe: "", modal: ""}
    }

    generateIframe() {
        this.setState({
            iframe: <iframe src={`https://www.youtube.com/embed/${this.props['src-key']}`} frameBorder="0"
                            allowFullScreen height="100%" width="100%"/>,
            modal: "active"
        })
    }

    deleteIframe() {
        this.setState({iframe: "", modal: ""})
    }

    render(props, state) {
        return (
            <div>
                <div class="c-auto" onClick={() => this.generateIframe()}>
                    <div class="video-container">
                        <i class="fas fa-play-circle fa-2x play-btn"/>
                        <img src={`https://img.youtube.com/vi/${props['src-key']}/0.jpg`}
                             class="img-responsive mb-2 c-hand" alt={props['src-key']}/>
                    </div>
                </div>

                <div class={`modal modal-lg ${state.modal}`} id={props.id}>
                    <a class="modal-overlay" aria-label="Close" onClick={() => this.deleteIframe()}/>
                    <div class="modal-container" role="document">
                        <div class="modal-header">
                            <a class="btn btn-clear float-right" aria-label="Close"
                               onClick={() => this.deleteIframe()}/>
                        </div>
                        <div class="modal-body">
                            {this.state.iframe}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Video
