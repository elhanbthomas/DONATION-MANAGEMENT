import { Card, CardMedia, Chip, Accordion, AccordionSummary, AccordionDetails, Divider, Button, Typography, CardContent, List, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';


const Status = ({ item }) => {
    let status = "", color = "";
    if (item.forPickup && !item.isPicked) {
        status = "Pickup Requested"
        color = 'warning'
    } else if (item.forPickup && item.isPicked) {
        status = "Picked Up"
        color = 'primary'
    } else if (!item.forPickup && !item.isAccepted) {
        status = "Pending"
        color = 'warning'
    } else if (item.isAccepted) {
        status = "Received"
        color = 'success'
    }
    return (
        <Chip label={status} color={color} />
    )
}

export default function ItemPickupCard({ handleButtonClick, buttonText, item, showButton }) {
    return (
        <Accordion>
            <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography sx={{ width: '100%', alignContent: 'center' }}> {item.item_type.name}<span> &#8226; </span>{item.quantity}</Typography>
                <Status item={item} />
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
                            {(!item.forPickup && !item.isAccepted) &&
                                <ListItem>
                                    <Button onClick={handleButtonClick}
                                        variant='contained'
                                        sx={{
                                            mt: 2, width: '100%', boxRadius: 2
                                        }}
                                    >{buttonText}</Button>
                                </ListItem>
                            }
                        </List>
                    </CardContent>

                </Card>
            </AccordionDetails>
        </Accordion>

    )
}
