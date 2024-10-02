import { Add, Delete } from "@mui/icons-material";
import { Stack, FormControl, TextField, FormLabel, Fab, Box, IconButton, List, ListItem, ListItemText } from "@mui/material";
import * as React from "react";


export default function PhoneNumberInput() {
    const [nums, setNums] = React.useState([]);
    const [num, setNum] = React.useState(-1);
    const handleAdd = () => {
        setNums(nums.concat(num));
        setNum(-1);
    }
    const handleNumChange = (e) => {
        setNum(e.target.value)
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }} >
            <FormControl dir="row">
                <FormLabel htmlFor="name">Phone No.</FormLabel>
                <TextField
                    autoComplete="phone"
                    name="phone"
                    required
                    id="phone"
                    placeholder="123456789"
                    type="text"
                    value={num!=-1 ? num : ""}
                    onChange={handleNumChange}
                    slotProps={{
                        input: {
                            endAdornment:
                                <IconButton size="small" color="secondary" aria-label="add" onClick={handleAdd}>
                                    <Add />
                                </IconButton>
                        }
                    }}
                />
                <List>
                    {nums.map((item) => {
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={item}
                            />
                        </ListItem>
                    })}
                </List>
            </FormControl>

        </Box>
    )
}
