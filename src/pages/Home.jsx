import MovieList from '../components/MovieList';
import { Typography, Box } from '@mui/material';


const Home = () => (
  <Box
    sx={{
      bgcolor: '#1a1a1a',
      minHeight: '100vh',
      py: 5,
      color: 'white',
      textAlign: 'center',
    }}
  >
    <Typography variant="h2" gutterBottom fontWeight="bold">
      Cartelera
    </Typography>
    <MovieList />
  </Box>
);

export default Home;