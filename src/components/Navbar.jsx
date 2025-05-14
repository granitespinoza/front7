import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#1e1e1e' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: '#4fc3f7', textDecoration: 'none', fontWeight: 'bold' }}
        >
          🎬 Cartelera
        </Typography>
        <Box>
          {user && (
            <Button color="inherit" component={Link} to="/reservas">
              Mis Reservas
            </Button>
          )}
          {!user && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Iniciar Sesión
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Registrarse
              </Button>
            </>
          )}
          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;