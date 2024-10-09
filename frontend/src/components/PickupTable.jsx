import * as React from "react";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { WidthFull } from "@mui/icons-material";
import axios from "axios";

export default function PickupTable(){

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        {field: 'item_type', headerName: 'Item', flex: 1 },
        {field: 'description', headerName: 'Description', flex: 1 },
        {field: 'd_name', headerName:'Donor Name', flex: 1},
        { field: 'quantity', headerName: 'Quantity', flex: 1 },
        { 
            field: 'timestamp', 
            headerName: 'Date and Time', 
            flex: 1,
            valueFormatter: (params) => {
                const date = new Date(params);
                return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
              }
        },
        {
            field: 'image',
            headerName: 'Image', 
            flex: 1,
            renderCell: (params) => (
                // console.log(params.value)
                <img src={`http://127.0.0.1:8000${params.value}`} alt="Image" />
            )
        },
        
    ]
    const [error, setError] = React.useState(null)
    const [rows,setRows] = React.useState([])
    React.useEffect(() => {
        const fetchList = async () => {
            try{
                const response = await axios.get('http://127.0.0.1:8000/api/volunteer/pickup',{
                    headers: {
                        "Content-Type": 'application/json',
                    }

                })
                const formattedData = response.data.map((item, index) => ({
                    ...item,
                    id: item.id || index + 1,
                  }));

                setRows(formattedData);
            }catch(err){
                setError(err)
            }
        }
        fetchList()
    }, []);

    return (
        <Paper elevation={3} sx={{width:'100%', height:600}}>
            <DataGrid 
                rows={rows}
                columns={columns}
                checkboxSelection
            />
          
        </Paper>
    )
}