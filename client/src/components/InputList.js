import * as React from 'react';
import {List, ListItem, TextField, IconButton, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function InputList({listItems, removeItem, updateSteps, step, item, setTraining, setPpe}) {

  const updateList = (v,i) => {
    const list = [...listItems];
    list[i] = v;
    if (item === 't') {
        setTraining(list);
    } else if (item === 'p') {
        setPpe(list);
    } else {
        updateSteps(step, item, list)
    }
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {listItems.map((value, i) => (
        <ListItem
          key={i}
          secondaryAction={
            <Tooltip title="Delete" onClick={removeItem}>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
          }
        >
          <TextField id="outlined-basic" variant="outlined" size="small" fullWidth value={value} onChange={(e) => updateList(e.target.value, i)} sx={{paddingRight: '15px'}}/>
        </ListItem>
      ))}
    </List>
  );
}