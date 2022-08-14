import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import moviedata from '../../api/MovieData';
import { useQuery } from '@tanstack/react-query'
import { Box, Grid, IconButton, InputBase, Paper } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Search from './Search';
import useMovieStore from '../../Zustand';



const SearchResult = () => {

    const searchQuery = useMovieStore((state) => state.searchQuery)



    return (
        <Grid container sx={{ overflow: 'auto', marginTop: 10 }}>
            {searchQuery.length > 0 ?

                <>
                    <Box
                        p={1}
                        component="main"
                        sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 250, background: 'black', color: 'white', borderRadius: 1, width: "98.5%", margin: 1, boxSizing: 'border - box' }}
                    >
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { xs: 300, sm: 400 }, height: 50 }}
                        >
                            <h2>See your search result below ...</h2>
                        </Paper>
                    </Box>

                    <>
                        {searchQuery
                            .map((item) => (
                                <Grid key={item.id} item xs={6} sm={4} md={3} lg={2} p={1} >
                                    <Link to={`/movie/${item.id}`} style={{ textDecoration: 'none' }}>
                                        <Card sx={{
                                            height: 300,
                                            // minWidth: 200,
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
                                                <Typography gutterBottom variant="h7" component="div" style={{ fontWeight: 800 }}>
                                                    {item.original_title}
                                                </Typography>
                                                <Typography variant="body2"  >
                                                    <strong> IMDB: {item.vote_average}</strong>
                                                </Typography>
                                                <Button size="small" variant="contained" color="error">More Info</Button>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                    </>
                </>
                :
                <Box
                    p={1}
                    component="main"
                    sx={{
                        display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 250, background: 'black', color: 'white', borderRadius: 1, width: "98.5%", margin: 1, boxSizing: 'border - box'
                    }}
                >
                    <Paper
                        component="form"
                        sx={{ p: '2px 8px', display: 'flex', alignItems: 'center', width: { xs: 300, sm: 400 }, height: 50 }}
                    >
                        <h2>Oops no movies found ...</h2>
                    </Paper>
                </Box>
            }
        </Grid>
    )
}


export default SearchResult