import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DatePickerViews({dateValue, setDateValue}) {


  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker',] } >
        <DatePicker label={'Select the month and year'} views={['month', 'year']} disableFuture defaultValue={dayjs()} 
          onChange={(newValue) => setDateValue(newValue)} inputFormat={"YYYY-MM"} sx={{width:"10px",}} />
      </DemoContainer>
    </LocalizationProvider>
  );
}