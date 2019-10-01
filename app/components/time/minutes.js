import {h, Component} from 'preact';


class Minutes extends Component {
    constructor() {
        super();
        this.state = {hour: 0, minute: 0}
    }

    componentDidMount() {
        const hours = (this.props.value / 60);
        const roundHour = Math.floor(hours);

        this.setState({
            hour: Math.floor(hours),
            minute: ('0' + Math.round((hours - roundHour) * 60)).slice(-2)
        });
    }

    render(props, state) {
        return (
            <span>
                {state.hour}{props.separator}{state.minute}
            </span>
        )
    }
}

export default Minutes
