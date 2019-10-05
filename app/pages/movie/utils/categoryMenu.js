import {h, Component} from 'preact';

import Overview from "./overview";
import Casting from "./casting";
import Media from "./media";
import Review from "./review";

class CategoryMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {category: "overview"}
    }


    getActive(name) {
        return name === this.state.category ? 'active' : ''
    }

    * getCredit(job, creditType) {
        for (const person of this.props.movie.credits[creditType]) {
            if (person['job'] === job)
                yield person
        }
    }

    getCurrentCategory() {
        switch (this.state.category) {
            case 'overview':
                return <Overview overview={this.props.movie.overview}
                                 release-date={this.props.movie.release_date}
                                 runtime={this.props.movie.runtime}
                                 keywords={this.props.movie.keywords.keywords}
                                 director={Array.from(this.getCredit('Director', 'crew'))}
                                 writer={this.getCredit('Writing', 'crew')}
                                 actors={this.props.movie.credits.cast}
                                 genres={this.props.movie.genres.slice(0, 3)}
                                 video={this.props.movie.videos.results}/>;
            case 'casting':
                return <Casting credits={this.props.movie.credits}/>;
            case 'reviews':
                return <Review reviews={this.props.movie.reviews.results}
                               total={this.props.movie.reviews.total_results}/>;
            case 'media':
                return <Media videos={this.props.movie.videos.results}
                              backdrops={this.props.movie.images.posters}
                              posters={this.props.movie.images.backdrops}/>;
            default:
                return ''
        }
    }

    render(props, state) {
        return (
            <div>
                <ul class="tab tab-block tab-category">
                    <li class={`tab-item ${this.getActive('overview')}`}>
                        <a onClick={() => this.setState({category: 'overview'})} class="tab-link c-hand">
                            <i class="fas fa-home"/>
                        </a>
                    </li>
                    <li class={`tab-item ${this.getActive('casting')}`}>
                        <a onClick={() => this.setState({category: 'casting'})} class="tab-link c-hand">Casting</a>
                    </li>
                    <li class={`tab-item ${this.getActive('reviews')}`}>
                        <a onClick={() => this.setState({category: 'reviews'})} class="tab-link c-hand">Critiques</a>
                    </li>
                    <li class={`tab-item hide-sm ${this.getActive('media')}`}>
                        <a onClick={() => this.setState({category: 'media'})} class="tab-link c-hand">Media</a>
                    </li>
                </ul>

                <div>
                    {this.getCurrentCategory()}
                </div>

            </div>
        )
    }
}

export default CategoryMenu
