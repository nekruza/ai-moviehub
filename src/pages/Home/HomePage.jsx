import React from 'react';
import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query'
import HomeMovies from './HomeMovies';
import MovieData from '../../api/MovieData';
import HomeBanner from './HomeBanner';
import Categories from './Categories';

function HomePage(props) {

    const { popularMovies, movieGenreList, movieEachGenre, movieTrending, movieTopRated } = MovieData()

    const { data, error, isLoading } = useQuery(['popular'], () => popularMovies())
    const { data: trending, error: errorT, isLoading: isLoadingT } = useQuery(['trending'], () => movieTrending())
    const { data: toprated, error: errorL, isLoading: isLoadingL, } = useQuery(['toprated'], () => movieTopRated())
    const { data: categories, error: errorC, isLoading: isLoadingC, status } = useQuery(['categories'], () => movieGenreList())
    const { data: eachGenre, error: eachGenreError, isLoading: eachGenreLoading, status: statusGenre } = useQuery(['movieEachGenre', 28], () => movieEachGenre(28));


    //scroll up
    var scrollTop = function () {
        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        scrollTop()
    }, [])

    return (
        <div style={{ marginTop: 50, background: '#000000eb' }}>
            <HomeBanner name="Top Rated" data={eachGenre} error={eachGenreError} isLoading={eachGenreLoading} />
            <Toolbar />
            <Categories name="Genres" data={categories} error={errorC} isLoading={isLoadingC} />
            <Toolbar />
            <HomeMovies name="Top Rated" data={toprated} error={errorL} isLoading={isLoadingL} />
            <HomeMovies name="Popular" data={data} error={error} isLoading={isLoading} />
            <HomeMovies name="Trending" data={trending} error={errorT} isLoading={isLoadingT} />
            <Toolbar />
            <Toolbar />
        </div>
    );
}

export default HomePage;

