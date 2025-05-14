import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPelicula } from '../api/movies';
import ReservaForm from '../components/ReservaForm';
import {
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Pelicula = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getPelicula(id).then(res => setPelicula(res.data));
  }, [id]);

  if (!pelicula) return <div>Cargando...</div>;

  return (
    <Box
      sx={{
        bgcolor: '#121212',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 5,
      }}
    >
      <Box
        sx={{
          bgcolor: '#1e1e1e',
          borderRadius: 2,
          padding: 4,
          textAlign: 'center',
          maxWidth: 300,
          boxShadow: 3,
        }}
      >
        <Typography
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: '#4fc3f7', display: 'block', mb: 2 }}
        >
          ← Volver
        </Typography>

        {user ? (
          <>
            <MovieIcon sx={{ fontSize: 50, color: '#aaa' }} />
            <Typography variant="h5" fontWeight="bold" mt={2}>
              {pelicula.titulo}
            </Typography>
            <Typography mt={1}>
              <strong>Duración:</strong> {pelicula.duracion} min
            </Typography>
            <Typography mt={1}>El elegido</Typography>

            <Box mt={3}>
              <ReservaForm peliculaId={pelicula.id} usuarioId={user.id} />
            </Box>
          </>
        ) : (
          <>
            <ErrorOutlineIcon sx={{ fontSize: 40, color: 'red' }} />
            <Typography color="error" fontWeight="bold" mt={2}>
              Debes iniciar sesión para reservar.
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#4fc3f7',
                color: 'black',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#29b6f6' },
              }}
              component={Link}
              to="/login"
            >
              Ir a Login
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Pelicula;