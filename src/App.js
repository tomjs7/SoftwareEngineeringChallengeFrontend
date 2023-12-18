import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import './App.css';
import ResponseTable from './ResponseTable';

const apiEndpoint = "https://yrpc4u6uqg.execute-api.eu-north-1.amazonaws.com/production/calculatePacks"

function App() {

  const [inputValue, setInputValue] = useState('')
  const [tableData, setTableData] = useState([])

  // Ensure that only numeric values are present in the input.
  const isValidInput = (value) => /^[0-9]*$/.test(value);

  const handleInputChange = (event) => {
    if (isValidInput(event.target.value)) {
      setInputValue(event.target.value);
    }
  }

  const handleRequest = () => {
    fetchData(inputValue)
  }

  const fetchData = async (inputValue) => {
    try {
      const itemsOrdered = inputValue
      const response = await fetch(`${apiEndpoint}?itemsOrdered=${itemsOrdered}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: Response status: ${response.status}`);
      }
  
      const data = await response.json();
      const packsRequired = data.packsRequired || [];
      setTableData(packsRequired)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/gymshark.png" className="Logo" alt="Gymshark Logo" />
      </header>
      <div className="Info">
        <Alert severity="info">Welcome to the Gymshark Orders Tool! Here, users can input the desired quantity of items, and the tool will provide the optimal number of packages needed to fulfill the order.</Alert>
      </div>
      <div className="Grid">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Number of items"
                  variant="outlined"
                  value={inputValue}
                  onChange={handleInputChange}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="success" onClick={handleRequest} fullWidth>
                  Send Request
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
          <div className="Response-Table">
            <ResponseTable response={tableData} />
          </div>
          </Grid>
        </Grid>
        </div>
    </div>
  );
}

export default App;
