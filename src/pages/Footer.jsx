import React from 'react';
import { Box, Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import DashboardIcon from '@mui/icons-material/Dashboard';




function Footer(props) {
    return (
        <Box sx={{ flexGrow: 1, background: 'black', color: 'white', padding: '20px' }} >
            <Grid container>
                <Grid item xs={12} md={3} style={{ textAlign: 'start', color: "red" }}> <h2>AI Movie Hub</h2></Grid>
                <Grid item xs={6} md={3}>
                    <List>
                        <h3 style={{ marginLeft: 15 }}>CONTACTS</h3>
                        {contactData.map((item, index) => (
                            <a href={item.link} style={{ textDecoration: 'none', color: 'white' }}>
                                <ListItem key={index} disablePadding style={{ border: '1px solid black' }}>
                                    <ListItemButton>
                                        <ListItemIcon style={{ color: 'white' }}>
                                            {item.logo}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            </a>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={6} md={3}>
                    <List>
                        <h3 style={{ marginLeft: 15 }}>CATEGORIES</h3>
                        {footerData.map((item, index) => (
                            <Link to={item.link} style={{ textDecoration: 'none', color: 'white' }}>
                                <ListItem key={index} disablePadding style={{ border: '1px solid black' }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <InboxIcon style={{ color: 'white' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={0} md={3}></Grid>
            </Grid>

        </Box>
    );
}

export default Footer;


const footerData = [
    {
        name: 'Popular',
        type: 'head',
        link: ''
    },
    {
        name: 'Trending',
        type: 'head',
        link: ''
    },
    {
        name: 'Action',
        type: 'head',
        link: ''
    },
    {
        name: 'Family',
        type: 'head',
        link: ''
    },
]


const contactData = [
    {
        name: 'LinkedIn',
        logo: <LinkedInIcon />,
        link: 'https://www.linkedin.com/in/navgani/'

    },
    {
        name: 'GitHub',
        logo: <GitHubIcon />,
        link: 'https://github.com/nekruza'

    },
    {
        name: 'Instagram',
        logo: <InstagramIcon />,
        link: 'https://www.instagram.com/nyavgani/'

    },
    {
        name: 'Portfolio',
        logo: <DashboardIcon />,
        link: ''

    },
]