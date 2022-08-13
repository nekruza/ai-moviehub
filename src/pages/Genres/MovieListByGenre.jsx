import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import moviedata from '../../api/MovieData';
import { useQuery } from '@tanstack/react-query'
import { Grid } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Search from './Search';




const MovieListByGenre = () => {
    const { id } = useParams()
    // Data

    const { movieEachGenre } = moviedata()
    const { data: eachGenre, error: eachGenreError, isLoading: eachGenreLoading, status: statusGenre } = useQuery(['movieEachGenre', id], () => movieEachGenre(id));

    //Search 
    const [searchWord, setSearchWord] = React.useState('')

    const filterList = (item, array) => {
        return searchWord.length > 0 ? item.original_title && item.original_title.toLowerCase().indexOf(searchWord.toLowerCase()) > -1 : array
    }

    if (eachGenreError) return <div>Request Failed</div>;
    if (eachGenreLoading) return <div>Loading...</div>;

    return (
        <Grid container sx={{ overflow: 'auto' }}>
            <Search setSearchWord={setSearchWord} />
            {eachGenre.data.results
                .filter((item, key, array) => filterList(item, array))
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
        </Grid>
    )
}


export default MovieListByGenre