import {h, Component} from 'preact';
import style from './style.css';

class Index extends Component {
    constructor() {
        super();
        this.state = {iframe: ""}
    }

    generateIframe() {
        this.setState({
            iframe: <iframe src={`https://www.youtube.com/embed/${this.props['src-key']}`} frameBorder="0"
                            allowFullScreen height="100%" width="100%"/>
        })
    }

    deleteIframe() {
        this.setState({iframe: ""})
    }

    render(props, state) {
        return (
            <div>
                <a href={`#${props.id}`} onClick={() => this.generateIframe()}>
                    <div className="video-container">
                        <i class="fas fa-play-circle fa-2x play-btn"/>
                        <img src={`https://img.youtube.com/vi/${props['src-key']}/0.jpg`}
                             class="img-responsive mb-2 c-hand" alt={props['src-key']}/>
                    </div>
                </a>

                <div class="modal modal-lg" id={props.id}>
                    <a class="modal-overlay" href="#" aria-label="Close" onClick={() => this.deleteIframe()}/>
                    <div class="modal-container" role="document">
                        <div class="modal-header">
                            <a class="btn btn-clear float-right" href="#" aria-label="Close"
                               onClick={() => this.deleteIframe()}/>
                        </div>
                        <div class="modal-body" style="height:920px">
                            {this.state.iframe}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
