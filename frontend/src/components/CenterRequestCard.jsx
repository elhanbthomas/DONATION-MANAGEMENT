import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Done } from '@mui/icons-material';

function CenterRequestCard({ request, onClick, current }) {
  return (
    <Card key={request.req_id} sx={{ width: 300 }}>
      <CardContent>
        {/* Item name with a tick icon if the request is current and shipped */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">{request.item_type.name}</Typography>
          {(current && request.isShipped) && (
            <Done color="success" fontSize="small" />
          )}
        </Box>

        <Typography color="text.secondary">Center: {request.center.name}</Typography>
        <Typography color="text.secondary">Quantity: {request.quantity}</Typography>
        <Typography color="text.secondary">Requested on: {new Date(request.request_time).toLocaleDateString('en-GB')}</Typography>

        <Button
          disabled={request.isReceived || (current && !request.isShipped) || (!current && request.isShipped)}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => onClick(request)}
        >
          {(current && !request.isShipped) ? 'Pending' : (!current && request.isShipped) ? 'Accepted' : (current && request.isShipped) ? 'Received' : 'Accept'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default CenterRequestCard;
