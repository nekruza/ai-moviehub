import React from 'react';
import { Box, CircularProgress, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import MovieDialog from '../../components/MovieDialog';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MovieData from '../../api/MovieData';
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'


const HomeMovies = ({ name, data, error, isLoading }) => {
    const { addToFavourite } = MovieData()
    const queryClient = useQueryClient();

    const { mutate, isLoading: isLoadingMutate, isSuccess: isSuccessMutate } = useMutation(
        (list) => addToFavourite(list)
    );

    React.useEffect(() => {
        queryClient.invalidateQueries("favorite");
    }, [isSuccessMutate])

    if (error) return <div>Request Failed</div>;
    if (isLoading || isLoadingMutate) return <CircularProgress />;


    return (
        <>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 600, padding: '0px 20px', color: 'white' }}>
                {name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} >
                <Grid container wrap style={{ overflowX: 'scroll', overflowY: 'hidden', }}>
                    {data.data.results.map((item) => (
                        <Grid key={item.id} item xs={6} sm={4} md={2} p={1}>
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
                                        'rgba(0,0,0,0.9) 70%, rgba(0,0,0,0) 100%)',
                                    color: 'white',
                                    padding: 15
                                }}>
                                    {/* <h3 style={{ margin: '5px 0px' }}>
                                        {item.original_title}
                                    </h3>
                                    <Typography variant="body2"  >
                                        <Button style={{ background: '#f5c518', color: 'black', fontWeight: 600, margin: "5px 5px 5px 0px", padding: 3, fontSize: 10 }}> IMDb: {item.vote_average}</Button>
                                    </Typography> */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <MovieDialog movie={item} />
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
            </Box>
        </>
    )
}

export default HomeMovies