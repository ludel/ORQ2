import {h, Component} from 'preact';


class BrowserRouter extends Component {
    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            console.log("on route change");
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}

/*if (this.props.matches !== prevProps.matches) {
    window.dataLayer = window.dataLayer || [];
    function gtag() {dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-35012998-2');
}*/

export default BrowserRouter
