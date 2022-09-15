import axios from 'axios';
import useMovieStore from '../Zustand';


const API_KEY = process.env.REACT_APP_API_KEY

const MovieData = () => {
    const { user } = useMovieStore()


    const popularMovies = () => {
        return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    }

    const movieByID = (id) => {
        return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    }

    const movieGenreList = () => {
        return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    }

    const movieEachGenre = (id) => {
        return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`)
    }

    const movieTrending = () => {
        return axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    }

    const movieTopRated = () => {
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
    }

    const movieRecommendations = (id) => {
        return axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`)
    }

    const movieSearch = (searchQuery) => {
        return axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${API_KEY}`)
    }

    const addToFavourite = (list) => {
        return axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${API_KEY}&session_id=${localStorage.getItem('session_id')}`, list)
    }

    const getFavourite = () => {
        return axios.get(`https://api.themoviedb.org/3/account/${user.id}/favorite/movies?api_key=${API_KEY}&session_id=${localStorage.getItem('session_id')}`)
    }

    const addToWatchlist = (list) => {
        return axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${API_KEY}&session_id=${localStorage.getItem('session_id')}`, list)
    }

    const getWatchlist = () => {
        return axios.get(`https://api.themoviedb.org/3/account/${user.id}/watchlist/movies?api_key=${API_KEY}&session_id=${localStorage.getItem('session_id')}`)
    }


    return {
        popularMovies,
        movieByID,
        movieGenreList,
        movieEachGenre,
        movieTrending,
        movieTopRated,
        movieRecommendations,
        movieSearch,
        addToFavourite,
        addToWatchlist,
        getFavourite,
        getWatchlist
    }
}

export default MovieData