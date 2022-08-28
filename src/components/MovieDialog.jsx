import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Grid, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Link } from "react-router-dom";

export default function MovieDialog({ movie }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="error" onClick={handleClickOpen}>
                View Info
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="lg"
            >
                <DialogContent sx={{
                    background: 'black', border: '3px solid red',
                }}>
                    <Grid container sx={{
                        background: 'black',
                    }}>

                        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', }}>
                            <CardMedia
                                component="img"
                                image={movie.poster_path && `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt="image"
                                sx={{ width: { xs: 400, sm: 300 }, height: { xs: 500, sm: 400 }, borderRadius: 2, m: 2 }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', m: 2 }}>
                            <Typography gutterBottom variant="h3" bold component="div" nowrap style={{ color: '#008aff', fontWeight: 600, maxWidth: 600 }}>
                                {movie.original_title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" style={{ color: 'white', fontWeight: 500, maxWidth: 600, margin: '20px 0px' }}>
                                {movie.overview.slice(0, 200)}...
                            </Typography>
                            <Button style={{ background: '#f5c518', color: 'black', fontWeight: 600, margin: 0, padding: 3, width: 100, height: 30 }} height="20px"> IMDb: {movie.vote_average}</Button>
                            <Link to={`movie/${movie.id}`} style={{ textDecoration: 'none', width: 100 }}>
                                <Button size="small" variant="contained" color="error" style={{ marginTop: 10, width: 100 }}>More Info</Button>
                            </Link>
                        </Grid>
                        <Button style={{ position: 'absolute', top: 5, right: 10, color: 'red' }} onClick={handleClose}>Close</Button>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}



