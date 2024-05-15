import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { infoType } from '../Constants/config';


export default function Dropdown({infoTypeFilter, setInfoTypeFilter}) {

  const handleChange = (event) => {
    setInfoTypeFilter(event.target.value)
  };

  return (
    <FormControl className='-top-6 absolute z-40' sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Info</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={infoTypeFilter}
        label={infoTypeFilter}
        onChange={handleChange}
      >
        {Object.keys(infoType).map((item)=>{
            return(
                <MenuItem value={item}>{item}</MenuItem>
            )
        })}
      </Select>
    </FormControl>
  );
}
