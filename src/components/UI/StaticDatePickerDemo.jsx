import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';


export default function StaticDatePickerDemo({lessons, setDate}) {
  const [value, setValue] = React.useState(dayjs());
  const arrayOfDays = new Set(lessons.map(less => new Date(less.date).toISOString().split('T')[0]))

  const isHaveLessons = (date) => {
    return !arrayOfDays.has(new Date(date).toISOString().split('T')[0]);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setDate(new Date(newValue))
        }}
        shouldDisableDate={isHaveLessons}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
