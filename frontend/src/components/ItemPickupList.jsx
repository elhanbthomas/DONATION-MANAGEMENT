import React, { useState } from 'react';
import { Modal, Box, Button, Typography, IconButton } from '@mui/material';
import ItemPickupCard from './ItemPickupCard';
import { Close } from '@mui/icons-material';

// Modal styling
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2, // Rounded corners
    outline: 'none',
};

export default function ItemPickupList({ afterConfirmFn, buttonText, items }) {
    const [open, setOpen] = useState(false); // Modal open state
    const [selectedItem, setSelectedItem] = useState(null); // Tracks the selected item

    React.useEffect(() => {
        console.log(items)
    }, [])
    // Open modal for a specific item
    const handleOpen = (item) => {
        setSelectedItem(item); // Set the selected item to display its data in the modal
        setOpen(true); // Open the modal
    };

    // Close modal
    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null); // Clear the selected item
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center', mt: 2 }}>
            {/* Render a list of items with a button to open the modal */}
            <Box sx={{ width: '100%', maxWidth: 800, gap: 2, display: 'flex', flexDirection: 'column' }}>
                {items.map((item) => (
                    <ItemPickupCard handleButtonClick={() => handleOpen(item)} buttonText={buttonText} key={items.indexOf(item)} item={item} />
                ))}
            </Box>

            {/* Modal that shows details for the selected item */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            {/* Close button */}
                            <IconButton
                                onClick={handleClose}
                                sx={{ position: 'absolute', top: 8, right: 8 }}
                                aria-label="close"
                            >
                                <Close />
                            </IconButton>

                            <Typography
                                variant="h6"
                                id="modal-modal-title"
                                sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
                            >
                                Are you sure?
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        afterConfirmFn(selectedItem);
                                        handleClose();
                                    }}
                                    sx={{ minWidth: 100 }}
                                >
                                    Yes
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleClose}
                                    sx={{ minWidth: 100 }}
                                >
                                    No
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Modal>
        </Box>
    );
}
