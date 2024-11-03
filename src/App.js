import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import RepositoryDetailsPage from './pages/RepositoryDetailsPage';
import OwnerDetailsPage from './pages/OwnerDetailsPage';
import theme from './theme/theme';
const App = () => {
  const [darkMode, setDarkMode] = useState(false);



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/repository/:id" element={<RepositoryDetailsPage />} />
            <Route path="/owner/:login" element={<OwnerDetailsPage />} />
          </Routes>
        </MainLayout>     
    </ThemeProvider>
  );
};

export default App;
