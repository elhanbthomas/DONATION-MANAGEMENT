import React from 'react';
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography } from '@mui/material';

// Define columns for DataGrid
const columns = [
  { field: 'name', headerName: 'Item Name', width: 200 },
  { field: 'desc', headerName: 'Description', width: 450 },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 120 },
  { field: 'last_updated', headerName: 'Last Updated', width: 180 },
];

export default function InventoryView() {
  const [inventoryItems, setInventoryItems] = React.useState([]);
  const initData = async () => {
    try {
      const requestRes = await axios.get('http://localhost:8000/api/center/inventory', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setInventoryItems(requestRes.data);
    } catch (err) {
      console.error(err);
    }
  }
  React.useEffect(() => {
    initData()
  }, [])
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Center Inventory
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={inventoryItems.map((item) => { return { ...item, id: item.inventory_id, name: item.item_type.name, desc: item.item_type.description } })}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </Container>
  );
}
