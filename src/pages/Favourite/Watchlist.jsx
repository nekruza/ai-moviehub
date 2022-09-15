import React from 'react';
import { Link } from "react-router-dom";
import { Box, Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import EmptyState from '../../components/EmptyState';
import MovieData from '../../api/MovieData';
import { useQuery } from '@tanstack/react-query'
import LoadingCircle from '../../components/LoadingCircle';
import Zoom from '@mui/material/Zoom';


const WatchList = () => {

    const { getWatchlist } = MovieData()

    const { data, error, isLoading } = useQuery(['watchlist'], () => getWatchlist())

    //scroll up
    var scrollTop = function () {
        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        scrollTop()
    }, [])

    if (error) return <div>Request Failed</div>;
    if (isLoading) return <LoadingCircle />;


    return (
        <Box sx={{ maxWidth: 1350, margin: '100px auto 10px' }}>
            <h2 style={{ padding: 10 }}>Watchlist</h2>
            <Grid container sx={{ overflow: 'auto', height: '80vh' }}>

                {data.data.results.length > 0 ?
                    <>
                        {data.data.results
                            .map((item) => (
                                <Zoom in={true}>
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
                                </Zoom>
                            ))}
                    </>
                    :
                    <EmptyState title="Oops no movies found :/" subtitle="Search for something else" />
                }
            </Grid>
        </Box>
    )
}


export default WatchList