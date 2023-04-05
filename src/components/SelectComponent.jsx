import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectComponent = ({name, value, setValue, values, disabled}) => {


  return (
    <Box sx={{ minWidth: 140, paddingInline: '5px'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          disabled={disabled}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={name}
          onChange={e => setValue(e.target.value)}
        >
          {values.map( (item, index) =>
            <MenuItem key={index + item.ID} value={item.ID}>{item.VALUE}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectComponent;
