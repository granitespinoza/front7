import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Container
    sx={{
      minHeight: '100vh',
      bgcolor: '#121212',
      color: 'white',
      textAlign: 'center',
      py: 5,
    }}
  >
    <Typography variant="h3" fontWeight="bold">
      404
    </Typography>
    <Typography variant="h5" gutterBottom>
      ¡Oops! Página no encontrada
    </Typography>
    <Button
      variant="contained"
      component={Link}
      to="/"
      sx={{
        backgroundColor: '#4fc3f7',
        color: 'black',
        fontWeight: 'bold',
        mt: 3,
        '&:hover': { backgroundColor: '#29b6f6' },
      }}
    >
      Volver al Inicio
    </Button>
  </Container>
);

export default NotFound;