import axios from 'axios';


const API_KEY = process.env.REACT_APP_API_KEY

const MovieData = () => {

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



    return {
        popularMovies,
        movieByID,
        movieGenreList,
        movieEachGenre,
        movieTrending,
        movieTopRated,
    }
}

export default MovieData