import React, { useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom"
import { Link } from "react-router-dom";
import moviedata from '../../api/MovieData';
import { useQuery } from '@tanstack/react-query'
import { Button, Grid, IconButton } from '@mui/material';
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
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MenuIcon from '@mui/icons-material/Menu';
import Search from './Search';
import '../Styles/styles.css'
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';

const navItems = [
    {
        name: 'Home',
        link: '/',
    },
    {
        name: 'Categories',
        link: '/genres/28'
    },
    {
        name: 'Contact',
        link: ''
    }
];

const drawerWidth = 240;

export default function MovieByGenre(props) {
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => (setMobileOpen(!mobileOpen))

    //scroll up
    var scrollTop = function () {
        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        scrollTop()
    }, [])


    // Data
    const { movieGenreList } = moviedata()
    const { data, error, isLoading } = useQuery(['movieGenreList'], movieGenreList);

    if (error) return <div>Request Failed</div>;
    if (isLoading) return <div>Loading...</div>;

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <Link to={`/`} style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem className="onmouse" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon color="error" />
                            </ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItemButton>
                    </ListItem>
                </Link>
                {data.data.genres.slice(0, 11).map((item) => (
                    <Link to={`/genres/${item.id}`} style={location.pathname == `/genres/${item.id}` ? { textDecoration: 'none', color: '#E50914' } : { textDecoration: 'none', color: 'black' }}>
                        <ListItem className="onmouse" key={item.id} disablePadding style={{ background: location.pathname == `/genres/${item.id}` ? 'black' : 'white', borderRadius: 10, margin: 2, maxWidth: 230 }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LiveTvIcon color="error" />
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
                    <Link to={`/`} style={{ textDecoration: 'none', flexGrow: 1, }}>
                        <Typography variant="h6" noWrap component="div" style={{ flexGrow: 1, color: '#E50914', fontWeight: 600 }}>
                            AI MovieHub
                        </Typography>
                    </Link>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link to={item.link} style={{ textDecoration: 'none' }}>
                                <Button key={item.name} sx={location.pathname == item.link ? { color: 'red', border: '1px solid red' } : { color: 'white' }}>
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, overflow: 'auto', zIndex: 0, position: 'inherit', }}
                aria-label="mailbox folders"
            >
                <Drawer
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
                <Outlet />
            </Box>
        </Box>
    );
}




