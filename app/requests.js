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
        matrix(selection) {
            return axios.post(`${config.API_URL}recommendation/matrix`, {
                "selection": selection
            })
        },
        recommendation(cursorAbout, userMatrix, selection) {
            return axios.post(`${config.API_URL}recommendation`, {
                cursorAbout: cursorAbout,
                userMatrix: userMatrix,
                selection: selection
            })
        },
    },
    people: {
        popular(page) {
            return axios.get(`${config.API_URL}peoples/popular/${page}`)
        },
        detail(id) {
            return axios.get(`${config.API_URL}peoples/${id}`)
        },
        search(query, page) {
            return axios.get(`${config.API_URL}peoples/search/${query}/${page}`)
        },
    },
    scoring: {
        movie(query) {
            return axios.get(`${config.API_URL}score/${query}`)
        }
    },
    watchlist:{
        add(id){
            return axios.post(`${config.API_URL}session/watchlist/add`, {
                token: localStorage.getItem('token'),
                movie_id: id
            })
        },
        remove(id){
            return axios.post(`${config.API_URL}session/watchlist/remove`, {
                token: localStorage.getItem('token'),
                movie_id: id
            })
        },
        get(token){
            return axios.get(`${config.API_URL}session/watchlist/${token}`)
        }
    }

}
