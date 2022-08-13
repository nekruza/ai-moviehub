import React from 'react';
import '../Styles/styles.css'
import { Box, Grid, Toolbar, Typography } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'; import Card from '@mui/material/Card';
import { Link } from "react-router-dom";
import Icons from '../../Icons/Icons'



const Categories = ({ name, data, error, isLoading }) => {
    const icons = Icons()

    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div>Loading...</div>;


    return (
        <>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 600, padding: '0px 20px', color: 'white' }}>
                {name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} >
                <Grid container wrap style={{ overflowX: 'scroll', overflowY: 'hidden', }}>
                    {data.data.genres.slice(0, 11).filter(item => item.name !== 'Documentary').map((item) => (
                        <Grid key={item.id} item xs={12} sm={4} md={2} p={2}>
                            <Link to={`/genres/${item.id}`} style={{ textDecoration: 'none' }}>
                                <Card
                                    className='redHover'
                                    sx={{
                                        border: '3px solid grey',
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
                                    {icons.map((icon) => {
                                        return icon.name == item.name && <icon.icon style={{ width: 50, height: 50 }} />
                                    })}
                                    <Typography gutterBottom variant="h6" bold component="div" nowrap style={{ fontWeight: 600 }}>
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