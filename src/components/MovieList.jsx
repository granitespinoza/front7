import { useEffect, useState } from 'react';
import { getPeliculas } from '../api/movies';
import { Typography, Box } from '@mui/material';

const MovieList = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    getPeliculas().then(res => setPeliculas(res.data));
  }, []);

  return (
    <Box>
      {peliculas.map(p => (
        <Typography
          key={p.id}
          variant="h5"
          sx={{ color: '#4f83ff', my: 2, fontWeight: 'bold' }}
        >
          {p.titulo}
        </Typography>
      ))}
    </Box>
  );
};

export default MovieList;
