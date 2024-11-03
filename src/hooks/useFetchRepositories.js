import { useState, useEffect } from 'react';

const useFetchRepositories = (query) => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);
      setError(null);
      try {
        // If query is empty, fetch all repositories
        const url = query 
          ? `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`
          : `https://api.github.com/search/repositories?q=stars:>0&sort=stars&order=desc`;
          
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRepositories(data.items);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [query]);

  return { repositories, loading, error };
};

export default useFetchRepositories;
