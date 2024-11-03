import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Avatar, CircularProgress, Card, CardContent, Grid, Button } from '@mui/material';

const OwnerDetailsPage = () => {
  const { login } = useParams();
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${login}`);
        if (!response.ok) {
          throw new Error('Failed to fetch owner details');
        }
        const data = await response.json();
        setOwnerDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerDetails();
  }, [login]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Grid container justifyContent="center" sx={{ p: 2 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card variant="outlined">
          <CardContent sx={{ textAlign: 'center' }}>
            <Avatar alt={ownerDetails.login} src={ownerDetails.avatar_url} sx={{ width: 100, height: 100, mb: 2 }} />
            <Typography variant="h4">{ownerDetails.name || ownerDetails.login}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {ownerDetails.bio || 'No bio available.'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Location: {ownerDetails.location || 'No location provided.'}
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }} href={ownerDetails.html_url} target="_blank" rel="noopener noreferrer">
              View GitHub Profile
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OwnerDetailsPage;
