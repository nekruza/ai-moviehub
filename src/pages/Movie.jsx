import React from 'react';
import { useParams } from 'react-router';
import moviedata from '../api/MovieData';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



function Movie(props) {
    const { movieByID } = moviedata()
    const { id } = useParams()


    // Using the hook
    const { data, error, isLoading } = useQuery(['movie', id], () => movieByID(id));

    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {console.log('each movie', data.data)}
            <Card sx={{ maxHeight: 450, maxWidth: 500, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', m: 1 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={`https://image.tmdb.org/t/p/w500/${data.data.poster_path}`}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" nowrap>
                        {data.data.original_title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {data.data.overview}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        Vote Average: {data.data.vote_average}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        Vote Count: {data.data.vote_count}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Play</Button>
                    <Button size="small">Share</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Movie;

