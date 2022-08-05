import React, { useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import moviedata from '../../api/MovieData';
import { useQuery } from '@tanstack/react-query'
import { Grid, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import Search from './Search';
import '../Styles/styles.css'



const drawerWidth = 240;

export default function MovieByGenre(props) {
    const location = useLocation()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => (setMobileOpen(!mobileOpen))

    const container = window !== undefined ? () => window().document.body : undefined;


    // Data
    const [genreID, setGenreID] = React.useState(28)
    const [movieGenreData, setMovieGenreData] = React.useState([])

    const { movieGenreList, movieEachGenre } = moviedata()


    // Using the hook
    const { data, error, isLoading } = useQuery(['movieGenreList'], movieGenreList);
    const { data: eachGenre, error: eachGenreError, isLoading: eachGenreLoading, status: statusGenre } = useQuery(['movieEachGenre', genreID], () => movieEachGenre(genreID));

    React.useEffect(() => {
        statusGenre === "success" && setMovieGenreData(eachGenre.data.results)
    }, [eachGenre, statusGenre])

    if (error || eachGenreError) return <div>Request Failed</div>;
    if (isLoading || eachGenreLoading) return <div>Loading...</div>;

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {data.data.genres.slice(0, 11).map((item) => (
                    <Link to={`/genres/${item.id}`} style={location.pathname == `/genres/${item.id}` ? { textDecoration: 'none', color: '#E50914' } : { textDecoration: 'none', color: 'black' }}>
                        <ListItem className="onmouse" key={item.id} disablePadding style={{ background: location.pathname == `/genres/${item.id}` ? 'black' : 'white', borderRadius: 10 }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon color="error" />
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>

    )

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'black' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Typography variant="h6" noWrap component="div" style={{ color: '#E50914', fontWeight: 600 }}>
                            AI MovieHub
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, overflow: 'auto', zIndex: 0, position: 'inherit', }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' }, zIndex: 0, position: 'inherit', border: '1px solid white', background: 'white',
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'inherit', },
                    }}
                    open={true}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ marginBottom: 20, overflowX: 'hidden', overflowY: 'hidden', width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Search />
                <Outlet />
            </Box>
        </Box>
    );
}




