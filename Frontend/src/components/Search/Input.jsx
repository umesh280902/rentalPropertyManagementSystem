import * as React from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FixedTags() {
  const fixedOptions = [
    // Location[6]
];
  const [value, setValue] = React.useState([Location[0]]);

  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
        console.log(...newValue)
      }}
      options={Location}
      getOptionLabel={(option) => option.station}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.station}
            {...getTagProps({ index })}
            disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Search" placeholder="Add more" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const Location = [
  { "station": "Borivali West" },
  { "station": "Borivali East" },
  { "station": "Andheri West" },
  { "station": "Andheri East" },
  { "station": "Malad West" },
  { "station": "Malad East" },
  { "station": "Kandivali West" },
  { "station": "Kandivali East" },
  { "station": "Goregaon West" },
  { "station": "Goregaon East" },
  { "station": "Vile Parle West" },
  { "station": "Vile Parle East" },
  { "station": "Santacruz West" },
  { "station": "Santacruz East" },
  { "station": "Khar West" },
  { "station": "Khar East" },
  { "station": "Bandra West" },
  { "station": "Bandra East" },
  { "station": "Mumbai Central" }
];