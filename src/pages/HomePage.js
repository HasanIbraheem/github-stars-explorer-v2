import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchRepositories from '../hooks/useFetchRepositories';
import { TextField, Button, Card, CardContent, Typography, CircularProgress, Grid, Link, Avatar } from '@mui/material';
import useDebounce from '../hooks/useDebounce';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const { repositories, loading, error } = useFetchRepositories(query || '');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleCardClick = (repo) => {
    navigate(`/repository/${repo.id}`);
  };

  return (
    <div>
      <h1>Home Page</h1>
         <form onSubmit={handleSearch}>
          <TextField
            variant="outlined"
            placeholder="Search repositories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"  // Reduces height
            sx={{ mb: 3, width: '30%' }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ ml: 1, height: '40px' }} // Matches TextField height
          >
            Search
          </Button>
        </form>


      {loading && <CircularProgress />}
      {error && <Typography color="error">Error: {error}</Typography>}
      
      <Grid container spacing={2}>
        {repositories.length > 0 ? (
          repositories.map((repo) => (
            <Grid item xs={12} sm={6} md={4} key={repo.id}>
              <Card onClick={() => handleCardClick(repo)} style={{ cursor: 'pointer' }}>
                <CardContent>
                  <Avatar 
                    alt={repo.owner.login} 
                    src={repo.owner.avatar_url} 
                    sx={{ width: 40, height: 40, mb: 1 }} 
                  />
                  <Typography variant="h6">{repo.name}</Typography>
                  <Typography color="textSecondary">Stars: {repo.stargazers_count}</Typography>
                  <Typography variant="body2">
                    {repo.description || 'No description available.'}
                  </Typography>
                  <Typography variant="body2">
                    Owner: 
                    <Link 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        navigate(`/owner/${repo.owner.login}`);
                      }} 
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      {repo.owner.login}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No repositories found.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default HomePage;
