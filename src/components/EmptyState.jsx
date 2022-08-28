import { Avatar, Box, Card, Grid } from '@mui/material';
import React from 'react';

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';


function EmptyState({ title, subtitle, }) {

    return (
        <Grid container xs={12} style={{ margin: 'auto', height: "70vh", }}>
            <Card
                style={{ boxShadow: 'none !important', background: 'black', paddingBottom: "0px", marginBottom: 0, margin: 'auto', width: "80%", minHeight: '363px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box
                    style={{
                        widht: '100vw',
                        margin: 70,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <div>
                        <Avatar
                            alt="..."
                            style={{ width: 80, height: 80, marginBottom: 25 }}
                        >
                            <PriorityHighIcon style={{ width: 60, height: 60 }} />
                        </Avatar>
                    </div>
                    <p
                        style={{
                            color: '#7B8794',
                            fontSize: '24px',
                            fontWeight: 600,
                            marginBottom: 5,
                            textAlign: 'center'
                        }}
                    >
                        {title}
                    </p>
                    <p
                        style={{
                            color: '#7B8794',
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: 5,
                            textAlign: 'center'
                        }}
                    >
                        {subtitle}
                    </p>
                </Box>
            </Card>
        </Grid>
    );
}

export default EmptyState;