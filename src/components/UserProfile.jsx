import { useEffect, useState } from 'react';
import { getUser } from '../api/auth';
import { Typography, Box } from '@mui/material';

const UserProfile = ({ userId }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    getUser(userId).then(res => setUsuario(res.data));
  }, [userId]);

  if (!usuario) return <div>Cargando...</div>;

  return (
    <Box
      sx={{
        textAlign: 'center',
        color: 'white',
        mt: 5,
        p: 3,
        borderRadius: 2,
        bgcolor: '#1e1e1e',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Perfil de Usuario
      </Typography>
      <Typography>Nombre: {usuario.username}</Typography>
      <Typography>Email: {usuario.email}</Typography>
    </Box>
  );
};

export default UserProfile;