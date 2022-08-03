import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import styled from '@emotion/styled';

export default function Nav({tab, setTab, setViewJha}) {
  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  const StyledTab = styled(Tab)({
    height: '26px',
    paddingBottom: '25px',
    '&.Mui-selected': {
        backgroundColor: 'orange'
    }
  });

  return (
    <Box sx={{ width: '100%'}}>
      <Tabs
        onChange={handleChange}
        value={tab}
        sx={{
            height: '26px',
            minHeight: '26px',
            backgroundColor: 'grey !important'
        }}
      >
        <StyledTab label="Create New JHA" onClick={() => setViewJha(null)}/>
        <StyledTab label="View All JHAs" onClick={() => setViewJha(null)}/>
      </Tabs>
    </Box>
  );
}
