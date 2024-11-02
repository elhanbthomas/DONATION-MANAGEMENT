import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import { List, ListItem, ListItemText } from '@mui/material';
import { Delete } from '@mui/icons-material';


export default function CenterRequestForm({ goBack }) {
  const [items, setItems] = React.useState([]);
  const [itemOptions, setItemOptions] = React.useState([]); // Add more items as needed
  const [newItem, setNewItem] = React.useState({ item: '', quantity: '' });
  const [error, setError] = React.useState('');

  const initData = async () => {
    try {
      const itemRes = await axios.get('http://127.0.0.1:8000/api/itemtypes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setItemOptions(itemRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    initData();
  }, []);

  const handleNewItemChange = (event, value) => {
    setNewItem((prev) => ({ ...prev, item: itemOptions.filter((item) => item.name === value)[0] }));
    setError(''); // Clear error when user changes input
  };

  const handleNewQuantityChange = (event) => {
    setNewItem((prev) => ({ ...prev, quantity: event.target.value }));
  };

  const handleAddItem = () => {
    if (newItem.item === '' || newItem.quantity === '') {
      setError('Both item and quantity are required.');
      return;
    }

    // Check if the item is already added
    const existingItem = items.find((itemObj) => itemObj.item === newItem.item);

    if (existingItem) {
      setError('This item has already been added. You can edit its quantity.');
      return;
    }

    // Add new item
    setItems([...items, newItem]);
    setNewItem({ item: '', quantity: '' }); // Reset the input fields
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/api/center/request",
        items.map((item) => {
          return {
            item_type: item.item.type_id,
            quantity: item.quantity
          }
        })
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        })
      goBack()
    } catch (err) {
      alert("Something went wrong")
      console.log(err)
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '80%', textAlign: 'center', mt: '80px' }}>
        <Typography variant="h5" gutterBottom>
          Center Request
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {/* Input for adding new item */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Autocomplete
            fullWidth
            options={itemOptions.map((item) => item.name)}
            value={newItem.item ? newItem.item.name : ''}
            onChange={handleNewItemChange}
            renderInput={(params) => (
              <TextField {...params} label="Item" margin="normal" />
            )}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Quantity"
            type='number'
            value={newItem.quantity}
            onChange={handleNewQuantityChange}
            margin="normal"
            sx={{ mr: 2 }}
          />
          <IconButton onClick={handleAddItem} >
            <AddCircleIcon />
          </IconButton>
        </Box>
        <List sx={{ mt: 2 }} dense={false}>
          {items.map((item, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveItem(index)}>
                <Delete />
              </IconButton>
            }>
              <ListItemText primary={item.item.name} secondary={`Quantity: ${item.quantity}`} />
            </ListItem>
          ))}
        </List>

        <Button
          variant="outlined"
          onClick={handleSubmit}
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
