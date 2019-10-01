import {h, Component} from 'preact';


class DateFormat extends Component {
    constructor() {
        super();
        this.state = {day: "", month: "", year: ""}
    }

    componentDidMount() {
        const date = new Date(this.props.value);
        this.setState({
            day: ('0' + date.getDate()).slice(-2),
            month: ('0' + date.getMonth()).slice(-2),
            year: date.getFullYear(),
        });
    }

    render(props, state) {
        return (
            <span>
                {state.day}{props.separator}{state.month}{props.separator}{state.year}
            </span>
        )
    }
}

export default DateFormat
