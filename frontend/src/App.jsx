import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container } from '@mui/material';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/search/${query}`);
      setResults([...response.data]); 
    } catch (error) {
      console.error('Error fetching data from Elasticsearch:', error);
    }
  };
    useEffect(()=>{
      handleSearch()
    },[query])

  return (
    <Container>
      
      
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      
      <div>
        <h2>Results:</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result._source.title}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default App;
