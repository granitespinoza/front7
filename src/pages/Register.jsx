import { useState } from 'react';
import { register } from '../api/auth';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dni, setDni] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ username, email, password, dni })
      .then(() => {
        alert('Registro exitoso');
        navigate('/login');
      })
      .catch((err) => alert('Error al registrar'));
  };

  return (
    <Box
      sx={{
        bgcolor: '#121212',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: '#1e1e1e',
          borderRadius: 2,
          p: 4,
          maxWidth: 400,
          width: '100%',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <EditIcon sx={{ fontSize: 50, color: '#fdd835' }} />
        <Typography variant="h4" fontWeight="bold" mt={1} mb={3}>
          Regístrate
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography align="left">Usuario</Typography>
          <TextField
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tu nombre de usuario"
            sx={{ mb: 2, mt: 1, bgcolor: 'white', borderRadius: 1 }}
          />

          <Typography align="left">Correo electrónico</Typography>
          <TextField
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@dominio.com"
            sx={{ mb: 2, mt: 1, bgcolor: 'white', borderRadius: 1 }}
          />

          <Typography align="left">Contraseña</Typography>
          <TextField
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            sx={{ mb: 2, mt: 1, bgcolor: 'white', borderRadius: 1 }}
          />

          <Typography align="left">DNI</Typography>
          <TextField
            fullWidth
            required
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder="8 dígitos"
            sx={{ mb: 3, mt: 1, bgcolor: 'white', borderRadius: 1 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#4fc3f7',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#29b6f6' },
            }}
          >
            Registrar
          </Button>
        </form>

        <Typography mt={3}>
          ¿Ya tienes cuenta?{' '}
          <MuiLink component={Link} to="/login" sx={{ color: '#4fc3f7' }}>
            Inicia sesión aquí
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
