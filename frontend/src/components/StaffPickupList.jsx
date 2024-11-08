import React, { useState } from 'react';
import { Modal, Box, Button, Typography, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import StaffPickupCard from './StaffPickupCard';

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

export default function StaffPickupList({ afterReceiveFn, afterSelectFn, items, volunteers }) {
    const [open, setOpen] = useState(false); // Modal open state
    const [volunteer, setVolunteer] = useState(false); // Modal open state
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
                    <StaffPickupCard handleButtonClick={() => handleOpen(item)} buttonText={(item.forPickup) ? 'Assign Volunteer' : 'Received'} key={items.indexOf(item)} item={item} />
                ))}
            </Box>

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

                            {(selectedItem && !selectedItem.forPickup) ?
                                <>
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
                                                afterReceiveFn(selectedItem);
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
                                </> : <>

                                    <Typography
                                        variant="h6"
                                        id="modal-modal-title"
                                        sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
                                    >
                                        Select a Volunteer
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="volunteer-select-label">Volunteer</InputLabel>
                                            <Select
                                                labelId="volunteer-select-label"
                                                value={volunteer}
                                                onChange={(e) => setVolunteer(e.target.value)}
                                                label="Volunteer"
                                            >
                                                {
                                                    volunteers.map((volunteer) => (
                                                        <MenuItem value={volunteer.v_id}>{volunteer.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                afterSelectFn(selectedItem, volunteer)
                                                handleClose();
                                            }}
                                            sx={{ minWidth: 100 }}
                                        >
                                            Select
                                        </Button>
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handleClose}
                                        sx={{ minWidth: 100, mt: 2, width: '100%' }}
                                        startIcon={<Close />}
                                    >
                                        Cancel
                                    </Button>
                                </>

                            }
                        </Box>
                    </Modal>
                </Box>
            </Modal >
        </Box >
    );
}
