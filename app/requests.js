import {config} from './config'
import axios from 'axios';

export default {
    movies: {
        popularity(page) {
            return axios.get(`${config.API_URL}movies/popular/${page}`)
        },
        top(page) {
            return axios.get(`${config.API_URL}movies/top/${page}`)
        },
        upcoming(page) {
            return axios.get(`${config.API_URL}movies/upcoming/${page}`)
        },
        now_playing(page) {
            return axios.get(`${config.API_URL}movies/now-playing/${page}`)
        },
        search(query, page) {
            return axios.get(`${config.API_URL}movies/search/${query}/${page}`)
        },
        detail(id) {
            return axios.get(`${config.API_URL}movies/${id}`)
        },
        recommendation(id, selectionMoviesIds) {
            return axios.get(`${config.API_URL}movies/${id}/recommendation/${selectionMoviesIds.join(',')}`)
        }
    },
    people: {
        search(query, page) {
            return axios.get(`${config.API_URL}peoples/search/${query}/${page}`)
        },
    },
    scoring: {
        movie(query) {
            return axios.get(`https://apis.justwatch.com/content/titles/fr_FR/popular?body={"content_types":["movie"],"page":1,"page_size":1,"query":"${query}"}`)
        }
    },

}
