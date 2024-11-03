import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Autocomplete, IconButton, CircularProgress } from '@mui/material'; // Added CircularProgress for loading indicator
import axios from 'axios';
import { MuiFileInput } from 'mui-file-input';
import { ArrowBack, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const steps = ['Enter Item Details', 'Upload Image', 'Review & Submit'];

export default function NewItemPickup({ goBack }) {
  const navigate = useNavigate();
  const [itemOptions, setItemOptions] = React.useState([]);
  const [centerOptions, setCenterOptions] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [lastPageContent, setLastPageContent] = React.useState('Uploading...');
  const [loading, setLoading] = React.useState(true); // New loading state
  const [formData, setFormData] = React.useState({
    center: '',
    item_type: '',
    quantity: '',
    description: '',
    image: null,
  });

  const initData = async () => {
    setLoading(true); // Start loading
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
    try {
      const centerRes = await axios.get('http://127.0.0.1:8000/api/center/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setCenterOptions(centerRes.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false); // Stop loading
  };

  React.useEffect(() => {
    initData();
  }, []);

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const uploadItemPickup = async () => {
    let token = localStorage.getItem('accessToken');
    try {
      const { imagePreviewUrl, ...data } = formData;
      const res = await axios.post('http://127.0.0.1:8000/api/donor/request', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLastPageContent('Uploaded');
    } catch (err) {
      alert('Something went wrong');
      console.error(err);
    }
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      uploadItemPickup();
    }
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      center: '',
      item_type: '',
      quantity: '',
      description: '',
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (newImage) => {
    const file = newImage;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: file,
          imagePreviewUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleItemChange = (event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      item_type: itemOptions.filter((item) => item.name === value)[0].type_id,
    }));
  };

  const handleCenterChange = (event, value) => {
    setFormData((prevData) => ({
      ...prevData,
      center: centerOptions.filter((center) => center.name === value)[0].CenterID,
    }));
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <React.Fragment>
          {/* Back button at the top */}
          <Box sx={{ p: 2 }}>
            <IconButton onClick={() => goBack()} sx={{ mb: 2 }} variant="outlined">
              <ArrowBack />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '70%' }}>
              {/* Stepper */}
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = <Typography variant="caption">Optional</Typography>;
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>{lastPageContent}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Make Another Donation</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {activeStep === 0 && (
                    <Box component="form" sx={{ mt: 2, mb: 1 }}>
                      <Autocomplete
                        fullWidth
                        options={centerOptions.map((center) => center.name)}
                        value={formData.center ? centerOptions.filter((center) => center.CenterID === formData.center)[0].name : ''}
                        onChange={handleCenterChange}
                        renderInput={(params) => (
                          <TextField {...params} label="Center" margin="normal" />
                        )}
                      />
                      <Autocomplete
                        fullWidth
                        options={itemOptions.map((item) => item.name)}
                        value={formData.item_type ? itemOptions.filter((item) => item.type_id === formData.item_type)[0].name : ''}
                        onChange={handleItemChange}
                        renderInput={(params) => (
                          <TextField {...params} label="Item" margin="normal" />
                        )}
                      />
                      <TextField
                        fullWidth
                        label="Quantity"
                        name="quantity"
                        type='number'
                        value={formData.quantity}
                        onChange={handleInputChange}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        margin="normal"
                        multiline
                        rows={4}
                      />
                    </Box>
                  )}
                  {activeStep === 1 && (
                    <Box sx={{ mt: 2, mb: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <MuiFileInput value={formData.image} onChange={handleImageChange}
                        inputProps={{ accept: '.png, .jpeg' }}
                        placeholder="Upload Image"
                        clearIconButtonProps={{
                          onClick: () => setFormData({ ...formData, image: null, imagePreviewUrl: null }),
                          title: "Remove",
                          children: <Close fontSize="small" />
                        }}
                      />
                      {formData.image && (
                        <Typography sx={{ mt: 1 }}>File: {formData.image.name}</Typography>
                      )}
                      {formData.imagePreviewUrl && (
                        <Box sx={{ mt: 2 }}>
                          <img
                            src={formData.imagePreviewUrl}
                            alt="Preview"
                            style={{ width: '80%', height: 'auto' }}
                          />
                        </Box>
                      )}
                    </Box>
                  )}
                  {activeStep === 2 && (
                    <Box sx={{ mt: 2, mb: 1 }}>
                      <Typography>Review your data:</Typography>
                      <Typography>Item: {formData.item}</Typography>
                      <Typography>Quantity: {formData.quantity}</Typography>
                      <Typography>Description: {formData.description}</Typography>
                      {formData.image && (
                        <Typography>Image: {formData.image.name}</Typography>
                      )}
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </Button>
                    )}
                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
