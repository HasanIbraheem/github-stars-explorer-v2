import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

function MainLayout({ children }) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            GitHub Stars Explorer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </>
  );
}

export default MainLayout;
