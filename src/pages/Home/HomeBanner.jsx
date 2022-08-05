import React from 'react';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Box, Grid, Toolbar, Typography } from '@mui/material';
import MovieData from '../../api/MovieData';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


const HomeBanner = ({ data, error, isLoading }) => {


    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div>Loading...</div>;


    return (
        <Box nowrap style={{
            overflowX: 'hidden', overflowY: 'hidden', height: '90vh',
            width: '100vw', background: 'black',
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data.data.results[0].poster_path})`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'

        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                padding: 20
            }}>

                <div style={{
                    background: 'linear-gradient(to right, rgba(0,0,0,0.7) 10%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    color: 'white',
                    padding: "15px",
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    fontFamily: 'Open san'
                }}>
                    <Typography gutterBottom variant="h6" bold component="div" nowrap style={{ color: 'rgb(229, 9, 20)', fontWeight: 600, maxWidth: 600 }}>
                        Top Rated
                    </Typography>
                    <Typography gutterBottom variant="h2" bold component="div" nowrap style={{ color: '#ffcd00', fontWeight: 600, maxWidth: 600 }}>
                        {data.data.results[0].original_title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" style={{ color: 'white', fontWeight: 500, maxWidth: 600, margin: '20px 0px' }}>
                        {data.data.results[0].overview.slice(0, 200)}...
                    </Typography>
                    <Typography variant="body2">
                        <strong> IMDB: {data.data.results[0].vote_average}</strong>
                    </Typography>
                    <Link to={`movie/${data.data.results[0].id}`} style={{ textDecoration: 'none' }}>
                        <Button size="small" variant='contained'>More Info</Button>
                    </Link>
                </div>
                {/* <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w500/${data.data.results[0].poster_path}`}
                    alt="green iguana"
                    style={{ width: 500, height: 650, objectFit: 'contain', marginRight: 100 }}
                /> */}
            </div>
        </Box>
    )
}

export default HomeBanner