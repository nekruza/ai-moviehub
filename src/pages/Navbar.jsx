import * as React from 'react';
import { useQuery } from '@tanstack/react-query'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import './Styles/styles.css'
import Search from './SearchResult/Search';
import logo from '../Icons/logo.png'
import { Avatar, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import useMovieStore from '../Zustand';
import MovieData from '../api/MovieData';

const drawerWidth = 240;
const navItems = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'Categories',
        link: '/genres/28'
    },
];


function Navbar({ window, user, fetchToken }) {
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [favMovLength, setfavMovLength] = React.useState(0);
    const [watchListLenght, setWatchListLenght] = React.useState(0);

    const { getFavourite, getWatchlist } = MovieData()

    const { data, status } = useQuery(['favorite'], () => getFavourite())

    const { data: watchlistData, status: watchlistStatus } = useQuery(['watchlist'], () => getWatchlist())

    const fMvieLength = status === 'success' && data.data.results.length
    const wMovieLength = watchlistStatus === 'success' && watchlistData.data.results.length

    React.useEffect(() => {
        setfavMovLength(fMvieLength)
    }, [data, status])

    console.log('data', fMvieLength)

    React.useEffect(() => {
        setWatchListLenght(wMovieLength)
    }, [watchlistData, watchlistStatus])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                AI MovieHub
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) =>
                    <Link to={item.link} style={{ textDecoration: 'none' }}>
                        <ListItem key={item.name} disablePadding sx={location.pathname == item.link ? { color: 'red', background: 'black', border: '1px solid red' } : { color: 'black' }}>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                )}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" style={{
                color: '#E50914', background: 'black'
            }}>
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
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={logo} alt='...' width={35} height={35} />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontWeight: 600, color: '#E50914', marginLeft: 1 }}
                            >
                                AI MovieHub
                            </Typography>
                        </Box>
                    </Link>

                    <Search />

                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Link to={item.link} style={{ textDecoration: 'none' }}>
                                <Button key={item.name} sx={location.pathname == item.link ? { color: 'red', border: '1px solid red' } : { color: 'white' }}>
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {!user.username ?
                        <Button variant='outline' onClick={fetchToken}>
                            Login
                        </Button>
                        :
                        <>
                            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                <Link to={'/favorite'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Tooltip title="Favorite Movies">
                                        <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Badge badgeContent={favMovLength} color="error" >
                                                <FavoriteBorderIcon style={{ color: 'white' }} />
                                            </Badge>
                                        </ListItemIcon>
                                    </Tooltip>
                                </Link>
                                <Link to={'/watchlist'} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Tooltip title="Watchlist">
                                        <ListItemIcon style={{ display: 'flex', justifyContent: 'center' }} >
                                            <Badge badgeContent={watchListLenght} color="error">
                                                <AddToQueueIcon style={{ color: 'white' }} />
                                            </Badge>
                                        </ListItemIcon>
                                    </Tooltip>
                                </Link>
                            </Box>
                            <AccountMenu user={user} />
                        </>
                    }
                </Toolbar>
            </AppBar>
            <Box component="nav">
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
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default Navbar;



function AccountMenu({ user, history }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    function logout() {
        localStorage.removeItem('session_id');

        window.location = '/';
    }

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                content: '""',
            },
        },
    }));

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <Tooltip title="Account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                style={{ background: 'black', border: '2px solid white', width: 35, height: 35 }}
                            >
                                {user.username && user.username[0].toUpperCase()}
                            </Avatar>
                        </StyledBadge>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Link to={'/favorite'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MenuItem>
                        <ListItemIcon>
                            <FavoriteBorderIcon fontSize="small" />
                        </ListItemIcon>
                        Favourites
                    </MenuItem>
                </Link>
                <Link to={'/watchlist'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <MenuItem>
                        <ListItemIcon>
                            <AddToQueueIcon fontSize="small" />
                        </ListItemIcon>
                        Watching List
                    </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
