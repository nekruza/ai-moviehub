import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import useMovieStore from '../../Zustand';
import { useQuery } from '@tanstack/react-query'
import MovieData from '../../api/MovieData';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function Search() {
    const { movieSearch } = MovieData()
    const [query, setQuery] = React.useState('')

    const setSearchQuery = useMovieStore((state) => state.setSearchQuery)


    const { data, error, isLoading, refetch, status, isRefetching, isRefetchError } = useQuery(['seach', query],
        () => movieSearch(query), {
        notifyOnNetworkStatusChange: true,
        enabled: false // disable this query from automatically running
    });


    React.useEffect(() => {
        status == 'success' && setSearchQuery(data.data.results)
    }, [status])

    React.useEffect(() => {
        setQuery('action')
    }, [])

    if (status === 'error') return <span>Error: {error.message}</span>



    return (

        <Paper
            component="form"
            sx={{ flexGrow: { xs: 4, sm: 0.5 }, mr: { xs: 0, sm: 2 }, p: '2px 4px', display: 'flex', alignItems: 'center', width: { xs: 100, sm: 100 }, height: 38, border: '1px solid red', background: 'black', }}
        >
            <IconButton type="submit" sx={{ p: '10px', color: 'red' }} aria-label="search">
                <LocalMoviesIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1, color: 'white' }}
                placeholder="Search for movies"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5, color: 'white' }} orientation="vertical" />
            <Link to="/search" style={{ textDecoration: 'none', }}>
                <Button style={{ color: 'white' }} onClick={() => refetch()}>
                    <SearchIcon style={{ color: 'red', }} /> Search
                </Button>
            </Link>
        </Paper>
    );
}

export default Search;