import React from 'react';
import { Link } from "react-router-dom";
import { Box, Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import useMovieStore from '../../Zustand';
import image from '../Home/background_banner_movieHub/1.png'
import EmptyState from '../../components/EmptyState';



const SearchResult = () => {

    const searchQuery = useMovieStore((state) => state.searchQuery)



    return (
        <Grid container sx={{ overflow: 'auto', marginTop: 10 }}>
            {searchQuery.length > 0 ?

                <>
                    <Box
                        p={1}
                        component="main"
                        sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 450, background: '#141414', color: 'white', borderRadius: 1, width: "98.5%", margin: 1, boxSizing: 'border - box' }}
                    >
                        <img src={image} alt="" style={{ objectFit: 'fill', width: '100%', borderRadius: 8, margin: '15px 10px', maxWidth: 800 }} />
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

                <EmptyState title="Oops no movies found :/" subtitle="Search for something else" />
            }
        </Grid>
    )
}


export default SearchResult