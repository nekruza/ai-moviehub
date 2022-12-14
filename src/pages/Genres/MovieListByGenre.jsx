import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import moviedata from '../../api/MovieData';
import { useQuery } from '@tanstack/react-query'
import { Grid, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Search2 from './FilterByName'
import LoadingCircle from '../../components/LoadingCircle';
import MovieData from '../../api/MovieData';
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const MovieListByGenre = () => {
    const { id } = useParams()
    // Data

    const { movieEachGenre } = moviedata()
    const { data: eachGenre, error: eachGenreError, isLoading: eachGenreLoading, status: statusGenre } = useQuery(['movieEachGenre', id], () => movieEachGenre(id));

    const { addToFavourite } = MovieData()
    const queryClient = useQueryClient();

    const { mutate, isLoading: isLoadingMutate, isSuccess: isSuccessMutate } = useMutation(
        (list) => addToFavourite(list)
    );

    React.useEffect(() => {
        queryClient.invalidateQueries("favorite");
    }, [isSuccessMutate])


    //Search 
    const [searchWord, setSearchWord] = React.useState('')

    const filterList = (item, array) => {
        return searchWord.length > 0 ? item.original_title && item.original_title.toLowerCase().indexOf(searchWord.toLowerCase()) > -1 : array
    }

    if (eachGenreError) return <div>Request Failed</div>;
    if (eachGenreLoading || isLoadingMutate) return <LoadingCircle />;

    return (
        <Grid container sx={{ overflow: 'auto' }}>
            <Search2 setSearchWord={setSearchWord} />
            {eachGenre.data.results
                .filter((item, key, array) => filterList(item, array))
                .map((item) => (
                    <Grid key={item.id} item xs={6} sm={4} md={3} lg={2} p={1} >
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
                                {/* <Typography gutterBottom variant="h7" component="div" style={{ fontWeight: 800 }}>
                                        {item.original_title}
                                    </Typography>
                                    <Typography variant="body2"  >
                                        <strong> IMDB: {item.vote_average}</strong>
                                    </Typography> */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Link to={`/movie/${item.id}`} style={{ textDecoration: 'none' }}>
                                        <Button size="small" variant="outlined" color="error">More Info</Button>
                                    </Link>
                                    <IconButton
                                        style={{ padding: 0 }}
                                        onClick={() => mutate({
                                            "media_type": "movie",
                                            "media_id": item.id,
                                            "favorite": true
                                        })}
                                    >
                                        <FavoriteBorderIcon style={{ color: 'white', height: 30, width: 30, color: 'red' }} />
                                    </IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    )
}


export default MovieListByGenre