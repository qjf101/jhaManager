import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import styled from '@emotion/styled';

export default function Nav({tab, setTab, setEditJha, setViewJha}) {
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

  const clearJha = () => {
    setViewJha(null)
    setEditJha(null)
  };

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
        <StyledTab label="Create New JHA" onClick={() => clearJha()}/>
        <StyledTab label="View All JHAs" onClick={() => clearJha()}/>
      </Tabs>
    </Box>
  );
}
