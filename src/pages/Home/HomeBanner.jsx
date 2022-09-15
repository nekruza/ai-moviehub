import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import AdbIcon from '@mui/icons-material/Adb';
import LoadingCircle from '../../components/LoadingCircle';

const HomeBanner = ({ data, error, isLoading }) => {

    const [movie, setMovie] = React.useState(0)

    const handleRandom = () => {
        const num = Math.floor(Math.random() * 19.5);
        setMovie(num)
    }

    React.useEffect(() => {
        let num = Math.floor(Math.random() * 18);
        if (movie <= num) {
            let myInterval = setInterval(() => {
                setMovie(item => item + 1)
            }, 150)
            return () => clearInterval(myInterval)
        }

    }, [movie])

    if (error) return <div>Request Failed</div>;
    if (isLoading) return <LoadingCircle />;


    return (
        <Box nowrap sx={{
            overflowX: 'hidden', overflowY: 'hidden', height: { xs: '', sm: '80vh' },
            width: '100vw', background: 'black',
            backgroundImage: data.data.results[movie].poster_path && `url(https://image.tmdb.org/t/p/w500/${data.data.results[movie].poster_path})`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'
        }}>
            <Grid container sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
                background: 'linear-gradient(to right, rgba(0,0,0, 0.3) 150px, rgba(0,0,0, 0.84) 100%)',
                width: { xs: '100%', md: '100%' },
                height: '100%',
                alignItems: 'center',
                padding: { xs: 0, sm: 2 }
            }}>
                <Grid item xs={12} sm={10} sx={{
                    background: 'linear-gradient(to right, rgba(0,0,0, 0.9) 150px, rgba(0,0,0, 0.84) 100%)',
                    color: 'white',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: "row" },
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Open san',
                    p: 2
                }}>

                    <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', }}>
                        <CardMedia
                            component="img"
                            image={data.data.results[movie].poster_path && `https://image.tmdb.org/t/p/w500/${data.data.results[movie].poster_path}`}
                            alt="image"
                            sx={{ width: { xs: 400, sm: 300 }, height: { xs: 500, sm: 400 }, borderRadius: 2, m: 2 }}
                        />
                    </Grid>

                    <Link to={`movie/${data.data.results[movie].id}`} style={{ textDecoration: 'none' }}>
                        <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', m: 2 }}>
                            <div style={{ display: 'flex' }}>
                                <Typography gutterBottom variant="h6" bold component="div" nowrap style={{ color: '#b8b8b8', fontWeight: 600, maxWidth: 600 }}>
                                    Random
                                </Typography>
                            </div>
                            <Typography gutterBottom variant="h3" bold component="div" nowrap style={{ color: '#008aff', fontWeight: 600, maxWidth: 600 }}>
                                {data.data.results[movie].original_title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" style={{ color: 'white', fontWeight: 500, maxWidth: 600, margin: '20px 0px' }}>
                                {data.data.results[movie].overview.slice(0, 200)}...
                            </Typography>
                            <Button style={{ background: '#f5c518', color: 'black', fontWeight: 600, margin: 0, padding: 3, width: 100, height: 30 }} height="20px"> IMDb: {data.data.results[movie].vote_average}</Button>
                            <Button size="small" variant="contained" color="error" style={{ marginTop: 10, width: 100 }}>More Info</Button>
                        </Grid>
                    </Link>

                </Grid>
                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', maxWidth: 220, p: 2 }}>
                    <h3 style={{ color: 'white' }}>Suggest me a movie! </h3>
                    <Button variant='contained' color='error' onClick={handleRandom} style={{ fontWeght: 600 }}>
                        <AdbIcon /> <h3> Click here! </h3>
                    </Button>
                </Grid>

                {/* <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w500/${data.data.results[0].poster_path}`}
                    alt="green iguana"
                    style={{ width: 500, height: 650, objectFit: 'contain', marginRight: 100 }}
                /> */}
            </Grid>
        </Box>
    )
}

export default HomeBanner