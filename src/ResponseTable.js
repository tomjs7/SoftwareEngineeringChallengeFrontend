import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ResponseTable = ({ response }) => {
    const [tableData, setTableData] = useState([]);
  
    useEffect(() => {
      if (response && response.length > 0) {
        const countMap = {};
        response.forEach((number) => {
          countMap[number] = (countMap[number] || 0) + 1;
        });
  
        const formattedData = Object.entries(countMap).map(([value, count]) => ({
          value: Number(value),
          count,
        }));
  
        setTableData(formattedData);
      }
    }, [response]);
  
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pack Size Required</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.value}>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

export default ResponseTable;