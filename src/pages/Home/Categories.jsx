import React from 'react';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Box, Grid, Toolbar, Typography } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'; import Card from '@mui/material/Card';
import { Link } from "react-router-dom";
import AcUnitIcon from '@mui/icons-material/AcUnit';

const Categories = ({ name, data, error, isLoading }) => {

    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div>Loading...</div>;


    return (
        <>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 600, padding: '0px 20px', color: 'white' }}>
                {name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} >
                <Grid container wrap style={{ overflowX: 'scroll', overflowY: 'hidden', }}>
                    {data.data.genres.map((item) => (
                        <Grid key={item.id} item xs={12} sm={4} md={2} p={2}>
                            <Link to={`/genres/${item.id}`} style={{ textDecoration: 'none' }}>
                                <Card sx={{
                                    border: '3px solid red',
                                    height: 150,
                                    minWidth: 150,
                                    borderRadius: "10%",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    background: 'black',
                                    justifyContent: 'center',
                                    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.poster_path})`,
                                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
                                }}>
                                    <LocalMoviesIcon style={{ color: 'white', width: 50, height: 50 }} />
                                    <Typography gutterBottom variant="h6" bold component="div" nowrap style={{ fontWeight: 600, color: 'white' }}>
                                        {item.name}
                                    </Typography>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default Categories