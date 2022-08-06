import React from 'react';
import { useParams } from 'react-router';
import MovieData from '../api/MovieData';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Grid, Toolbar } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import MovieListByGenre from './Genres/MovieListByGenre';
import { Link } from 'react-router-dom';



function Movie(props) {
    const { movieByID, movieRecommendations } = MovieData()
    const { id } = useParams()

    //scroll up
    var scrollTop = function () {
        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        scrollTop()
    }, [])

    // Using the hook
    const { data, error, isLoading } = useQuery(['movie', id], () => movieByID(id));
    const { data: movieRecommendationsData, error: movieRecommendationsError, isLoading: movieRecommendationsLoading } = useQuery(['recommendations', id], () => movieRecommendations(id));

    if (error || movieRecommendationsError) return <div>Request Failed</div>;
    if (isLoading || movieRecommendationsLoading) return <div>Loading...</div>;

    return (
        <>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', background: '#141414', paddingBottom: 20 }}>
                <Toolbar />
                <Grid item xs={12} p={0} sx={{
                    display: 'flex', justifyContent: 'center', width: '100vw', padding: 2,
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data.data.poster_path})`,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
                }}>
                    <Grid container sx={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${data.data.poster_path})`,
                        p: 1, display: 'flex', flexDirection: 'row', width: { xs: '100%', md: '80%' },
                        background: 'linear-gradient(to right, rgba(0,0,0, 0.9) 150px, rgba(0,0,0, 0.84) 100%)', color: 'white',
                        lineHeight: 1.5
                    }}>
                        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CardMedia
                                component="img"
                                height="500px"
                                image={`https://image.tmdb.org/t/p/w500/${data.data.poster_path}`}
                                alt="green iguana"
                                sx={{ width: 300, height: 500, borderRadius: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', p: 1 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" >
                                    <strong>{data.data.original_title}</strong> ({data.data.release_date.slice(0, 4)})
                                </Typography>
                                <Typography variant="body1"  >
                                    {data.data.release_date} | {data.data.status},{data.data.genres.map((item) => item.name + ', ')} | {data.data.runtime} minutes
                                </Typography>
                                <Button style={{ background: '#f5c518', color: 'black', fontWeight: 600, margin: "5px 15px 5px 0px" }}>IMDb: {data.data.vote_average}</Button>
                                <Button style={{ background: 'purple', color: 'white', fontWeight: 600, margin: 5 }}>Count: {data.data.popularity}</Button>
                                <h3>Overview</h3>
                                <Typography variant="body2"  >
                                    {data.data.overview}
                                </Typography>
                                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start', }}>
                                    <div style={{ marginRight: 40 }}>
                                        <h5 style={{ margin: 0 }}>
                                            Language
                                        </h5>
                                        <Typography variant="body2"  >
                                            {data.data.original_language}
                                        </Typography>
                                        <h5 style={{ margin: 0 }}>
                                            Budget
                                        </h5>
                                        <Typography variant="body2"  >
                                            ${data.data.budget}
                                        </Typography>
                                        <h5 style={{ margin: 0 }}>
                                            Revenue
                                        </h5>
                                        <Typography variant="body2"  >
                                            ${data.data.revenue}
                                        </Typography>
                                    </div>
                                    <div>
                                        <h5 style={{ margin: 0 }}>
                                            Production Companies:
                                            <Grid container style={{ display: 'flex', }}>
                                                {data.data.production_companies.map(item =>
                                                    <Grid item xs={12} sm={4}>
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            alt=""
                                                            style={{
                                                                border: '1px solid white', background: 'white', borderRadius: 5, padding: 5,
                                                                margin: '10px 15px 10px 0px', width: 100, height: 50, objectFit: 'contain', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 8px 0px'
                                                            }}
                                                            image={`https://image.tmdb.org/t/p/w500/${item.logo_path}`
                                                            }
                                                        />
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </h5>
                                    </div>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant='contained' style={{ fontWeight: 600, background: 'red', color: 'white', margin: 6 }}>Play Trailer</Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} p={2} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Toolbar />
                    <Typography gutterBottom variant="h4" component="div" style={{ color: 'white', background: 'red', textAlign: 'left' }}>
                        <strong>Watch Similar Movies</strong>
                    </Typography>
                    <Grid container sx={{ overflow: 'auto', width: { xs: '100%', sm: '80% ' } }}>
                        {movieRecommendationsData.data.results.slice(0, 10)
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
                                            <Typography gutterBottom variant="h7" component="div" style={{ fontWeight: 800 }}>
                                                {item.original_title}
                                            </Typography>
                                            <Typography variant="body2"  >
                                                <strong> IMDB: {item.vote_average}</strong>
                                            </Typography>
                                            <Link to={`/movie/${item.id}`} style={{ textDecoration: 'none' }}>
                                                <Button size="small" variant="contained" color="error">More Info</Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Movie;

