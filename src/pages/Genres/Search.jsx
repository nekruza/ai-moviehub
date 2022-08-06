import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';


function Search({ setSearchWord }) {
    return (
        <Box
            p={1}
            component="main"
            sx={{
                display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: 250, background: 'black', color: 'white', borderRadius: 1, width: "98.5%", margin: 1, boxSizing: 'border - box'
            }}
        >
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height: 50 }}
            >
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for movies"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={(e) => setSearchWord(e.target.value)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton sx={{ p: '10px', color: '#E50914' }} aria-label="directions">
                    <LocalMoviesIcon />
                </IconButton>
            </Paper>
        </Box>
    );
}

export default Search;