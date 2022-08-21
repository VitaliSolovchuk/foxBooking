import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled, tableCellClasses } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    // hover: theme.palette.action.hoverOpacity
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableComponent = ({clumns, values}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {clumns.map((item,index) =>
              index === 0
                ? <StyledTableCell>{item.name}</StyledTableCell>
                : <StyledTableCell align="right">{item.name}&nbsp;</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((row, index) => (
            <StyledTableRow
              hover
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {clumns.map((item, index) =>
                index === 0
                  ? <StyledTableCell component="th" scope="row">{item.value}</StyledTableCell>
                  : <StyledTableCell align="right">{row?.[item.value]}&nbsp;</StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
