import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels(prop) {
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox  />} label={prop.val1} />
      <FormControlLabel control={<Checkbox  />} label={prop.val2} />
      <FormControlLabel control={<Checkbox  />} label={prop.val3} />
      <FormControlLabel control={<Checkbox  />} label={prop.val4} />

    </FormGroup>
  );
}