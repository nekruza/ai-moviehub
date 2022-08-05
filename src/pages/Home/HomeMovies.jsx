import React from 'react';
import { Box, Grid, Toolbar, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


const HomeMovies = ({ name, data, error, isLoading }) => {

    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div>Loading...</div>;


    return (
        <>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 600, padding: '0px 20px', color: 'white' }}>
                {name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} >
                <Grid container wrap style={{ overflowX: 'scroll', overflowY: 'hidden', }}>
                    {data.data.results.map((item) => (
                        <Grid key={item.id} item xs={12} sm={4} md={2} p={1}>
                            <Card sx={{
                                height: 300,
                                minWidth: 200,
                                display: 'flex',
                                justifyContent: 'end',
                                flexDirection: 'column',
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.poster_path})`,
                                backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
                            }}>
                                <CardContent style={{
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 50%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                    color: 'white',
                                    padding: 15
                                }}>
                                    <Typography gutterBottom variant="h6" bold component="div" nowrap>
                                        {item.original_title}
                                    </Typography>
                                    <Typography variant="body2"  >
                                        <strong> IMDB: {item.vote_average}</strong>
                                    </Typography>
                                    <Link to={`/movie/${item.id}`} style={{ textDecoration: 'none' }}>
                                        <Button size="small" variant='contained'>More Info</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default HomeMovies