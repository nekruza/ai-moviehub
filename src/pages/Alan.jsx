import React from 'react';
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from 'react-router-dom';
import MovieData from '../api/MovieData';
import useMovieStore from '../Zustand';
import { useQuery } from '@tanstack/react-query'


function Alan(props) {
    const navigate = useNavigate();
    const setSearchQuery = useMovieStore((state) => state.setSearchQuery)



    React.useEffect(() => {
        alanBtn({
            key: '32b219edad97376774e406eb97bcf0b82e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, movies }) => {
                if (command === 'findMovie') {
                    setSearchQuery(movies)
                    navigate('/search')
                } else if (command === 'categories') {
                    navigate(`/genres/${28}`)
                }
            }
        });
    }, []);

}

export default Alan;