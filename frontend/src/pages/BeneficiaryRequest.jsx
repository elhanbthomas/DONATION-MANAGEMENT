import React, { useState } from 'react';
import axios from 'axios'
import { Box, Button, TextField, Typography, Stepper, Step, StepLabel, List, ListItem, IconButton, ListItemText, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export default function BeneficiaryRequest({ goBack }) {
  const [itemOptions, setItemOptions] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    address: '',
    pincode: '',
    B_requests: [], // Array to store multiple items
  });
  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get('http://127.0.0.1:8000/api/itemtypes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setItemOptions(res.data);
    }
    fetchData();
  }, [])

  const handleSubmit = async () => {
    let token = localStorage.getItem('accessToken')
    try {
      console.log(formData);
      const res = await axios.post("http://127.0.0.1:8000/api/beneficiary/request", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      goBack()
    } catch (err) {
      alert('something went wrong')
      console.error(err)
    }
  }

  const [currentItem, setCurrentItem] = useState({ item_type: '', quantity: '' }); // Temporary item data

  const handleNewItemChange = (event, value) => {
    setCurrentItem((prev) => ({ ...prev, item_type: itemOptions.filter((item) => item.name === value)[0].type_id }));
  };

  const steps = ['Beneficiary Details', 'Beneficiary Request'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // Add item to the list
  const addItem = () => {
    if (currentItem.item_type && currentItem.quantity) {
      setFormData((prevData) => ({
        ...prevData,
        B_requests: [...prevData.B_requests, currentItem],
      }));
      setCurrentItem({ item_type: '', quantity: '' }); // Reset current item input fields
    }
  };

  // Remove item from the list
  const removeItem = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      B_requests: prevData.B_requests.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const renderFormStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Phone" name="phone" type="number" value={formData.phone} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="State" name="state" value={formData.state} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="City" name="city" value={formData.city} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Address" multiline rows={4} name="address" value={formData.address} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} fullWidth margin="normal" />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6">Add Items</Typography>

            <Autocomplete
              fullWidth
              options={itemOptions.map((item) => item.name)}
              value={itemOptions.filter((item) => item.type_id === currentItem.item_type)[0]?.name || ''}
              onChange={handleNewItemChange}
              renderInput={(params) => (
                <TextField {...params} label="Item" margin="normal" />
              )}
              sx={{ mr: 2 }}
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={currentItem.quantity}
              onChange={handleItemChange}
              fullWidth
              margin="normal"
            />
            <Button variant="outlined" onClick={addItem} sx={{ mt: 2 }} fullWidth>
              Add Item
            </Button>

            {/* List of added items */}
            <List sx={{ mt: 2 }}>
              {formData.B_requests.map((item, index) => (
                <ListItem key={index} secondaryAction={
                  <IconButton edge="end" onClick={() => removeItem(index)}>
                    <DeleteIcon />
                  </IconButton>
                }>
                  <ListItemText primary={itemOptions.filter((k) => k.type_id === item.item_type)[0]?.name} secondary={`Quantity: ${item.quantity}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Beneficiary Form
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ my: 4 }}>
        {renderFormStep()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
