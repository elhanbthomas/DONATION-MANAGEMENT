import { Card, CardMedia, Chip, Box, Accordion, AccordionSummary, AccordionDetails, Divider, Checkbox, Button, Typography, CardContent, List, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';


const Status = ({ picked, received }) => {
    let status = "", color = "";
    if (!picked) {
        status = "Pickup Requested"
        color = 'warning'
    } else if (picked && !received) {
        status = "Picked Up"
        color = 'primary'
    } else if (received) {
        status = "Received"
        color = 'success'
    }
    return (
        <Chip label={status} color={color} />
    )
}

export default function VolunteerPickupCard({ handlePicked, handleReceived, item, picked, received }) {
    item = item.pickup_id
    return (
        <Accordion>
            <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography sx={{ width: '100%', alignContent: 'center' }}> {item.item_type.name}<span> &#8226; </span>{item.quantity}</Typography>
                <Status picked={picked} received={received} />
            </AccordionSummary>
            <AccordionDetails>
                <Card variant="outlined" sx={{ width: '100%', display: 'flex', flexDirection: 'row', borderRadius: 2, boxShadow: 3 }} >
                    <CardMedia
                        component="img"
                        image={`http://127.0.0.1:8000${item.image}`}
                        alt="Donation"
                        sx={{
                            width: 350,
                            objectFit: 'cover',
                        }}
                    />
                    <Divider orientation='vertical' flexItem />
                    <CardContent sx={{ width: '100%' }}>
                        <List disablePadding>
                            <ListItem>
                                <ListItemText primary="Item" secondary={item.item_type.name} />
                            </ListItem>
                            <Divider component="li" />

                            <ListItem>
                                <ListItemText primary="Quantity" secondary={item.quantity} />
                            </ListItem>
                            <Divider component="li" />

                            <ListItem>
                                <ListItemText primary="Description" secondary={item.description} />
                            </ListItem>
                            <Divider component="li" />

                            <ListItem>
                                <ListItemText
                                    primary="Requested At"
                                    secondary={new Date(item.requested_at).toLocaleDateString('en-GB')}
                                />
                            </ListItem>
                            <Divider component="li" />

                            <ListItem>
                                <ListItemText primary="Donor Name" secondary={item.donor.name} />
                            </ListItem>
                            <Divider component="li" />

                            <ListItem>
                                <ListItemText primary="District" secondary={item.donor.district} />
                            </ListItem>
                            <Divider component="li" />

                            <ListItem>
                                <ListItemText primary="City" secondary={item.donor.city} />
                            </ListItem>
                            <Divider component="li" />

                            <ListItem>
                                <ListItemText primary="Phone Numbers" secondary={item.donor.phone_numbers.map((num) => num.number).join(', ')} />
                            </ListItem>
                            {(item.donor.longitude && item.donor.latitude) &&
                                <ListItem>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={`http://maps.google.com/maps?z=12&t=m&q=loc:${item.donor.latitude}+${item.donor.longitude}`}
                                        target='_blank'
                                        sx={{ mt: 2, width: '100%' }}
                                    >
                                        Show Location
                                    </Button>
                                </ListItem>
                            }

                            {!picked && (
                                <ListItem>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handlePicked}
                                        sx={{ mt: 2, width: '100%', boxRadius: 2 }}
                                    >
                                        Picked Up
                                    </Button>
                                </ListItem>
                            )}

                            {(picked && !received) && (
                                <ListItem>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleReceived}
                                        sx={{ mt: 2, width: '100%', boxRadius: 2 }}
                                    >
                                        Received
                                    </Button>
                                </ListItem>
                            )}
                        </List>
                    </CardContent>
                </Card>
            </AccordionDetails>
        </Accordion>

    )
}
