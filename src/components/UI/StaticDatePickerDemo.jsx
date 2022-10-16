import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import 'dayjs/locale/ru'


export default function StaticDatePickerDemo({lessons, setDate}) {
  const [value, setValue] = React.useState(dayjs());
  const arrayOfDays = new Set(lessons.map(less => less.date))

  const isHaveLessons = (date) => {
    const calendarDay = new Date(date).toLocaleDateString('en-CA')
    return !arrayOfDays.has(calendarDay);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
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

const sameDay = (day1, day2) => {
  return day1.getFullYear() === day2.getFullYear()
    && day1.getDate() === day2.getDate()
    && day1.getMonth() === day2.getMonth();
}
