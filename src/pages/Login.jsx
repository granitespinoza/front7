import { useState } from 'react';
import { login } from '../api/auth';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/');
      })
      .catch(err => alert('Credenciales incorrectas'));
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
        <LockIcon sx={{ fontSize: 50, color: 'orange' }} />
        <Typography variant="h4" fontWeight="bold" mt={1} mb={3}>
          Iniciar sesión
        </Typography>

        <form onSubmit={handleSubmit}>
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
            Entrar
          </Button>
        </form>

        <Typography mt={3}>
          ¿No tienes cuenta?{' '}
          <MuiLink component={Link} to="/register" sx={{ color: '#4fc3f7' }}>
            Regístrate aquí
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
