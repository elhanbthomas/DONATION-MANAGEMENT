import { Add, Delete } from "@mui/icons-material";
import { Stack, FormControl, TextField, FormLabel, Fab, Box, IconButton, List, ListItem, ListItemText, withTheme } from "@mui/material";
import * as React from "react";


export default function PhoneNumberInput({ addNumFn, removeNumFn, nums }) {
    const [num, setNum] = React.useState(-1);
    React.useEffect(() => {
        setNum(-1);
    }, [nums])
    return (
        <>
            <FormControl dir="row">
                <FormLabel htmlFor="name">Phone No.</FormLabel>
                <TextField
                    autoComplete="phone"
                    name="phone"
                    id="phone"
                    placeholder="123456789"
                    type="text"
                    value={num != -1 ? num : ""}
                    onChange={(e) => setNum(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment:
                                <IconButton size="small" color="secondary" aria-label="add" onClick={() => num !== -1 && addNumFn(num)}>
                                    <Add />
                                </IconButton>
                        }
                    }}
                />
            </FormControl>
            {nums.length !== 0 && <List>
                {nums.map((item) => {
                    return <ListItem
                        key={nums.indexOf(item)}
                        secondaryAction={
                            <IconButton size="small" edge="end" aria-label="delete" onClick={() => removeNumFn(item)} >
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
            }
        </>
    )
}
