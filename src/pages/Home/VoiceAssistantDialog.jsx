import React from 'react';
import image from './background_banner_movieHub/2.png'
import Dialog from '@mui/material/Dialog';


export default function VoiceAssistantDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            handleClickOpen()
        }, 5000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div style={{ background: 'transparent' }}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <img src={image} alt="" style={{ objectFit: 'fill', width: '100%', border: '3px solid white', borderRadius: 8 }} />
            </Dialog>
        </div>
    );
}