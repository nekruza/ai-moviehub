import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingCircle() {
    return (
        <Box sx={{ display: 'flex', height: '80vh', width: '100vw', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress style={{ width: '200px', height: '200px', color: 'red' }} />
        </Box>
    );
}