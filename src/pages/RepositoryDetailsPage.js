import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Avatar, CircularProgress, Card, CardContent, Grid, Button } from '@mui/material';

const RepositoryDetailsPage = () => {
  const { id } = useParams(); // Get the repository ID from the URL
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      try {
        const response = await fetch(`https://api.github.com/repositories/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setRepository(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositoryDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Grid container justifyContent="center" sx={{ p: 2 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4">{repository.name}</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {repository.description || 'No description available.'}
            </Typography>
            <Typography variant="body2">Stars: {repository.stargazers_count}</Typography>
            <Typography variant="body2">Forks: {repository.forks_count}</Typography>
            <Typography variant="body2">License: {repository.license?.name || 'No license'}</Typography>
            <Avatar alt={repository.owner.login} src={repository.owner.avatar_url} sx={{ width: 40, height: 40, mt: 2 }} />
            <Typography variant="body2">Owner: 
              <Link to={`/owner/${repository.owner.login}`} style={{ textDecoration: 'underline', marginLeft: '4px' }}>
                {repository.owner.login}
              </Link>
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} href={repository.html_url} target="_blank" rel="noopener noreferrer">
              View Repository
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RepositoryDetailsPage;
