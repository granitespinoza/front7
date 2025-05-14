import { useEffect, useState } from 'react';
import { getReservasPorUsuario } from '../api/reservas';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Reservas = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (user) {
      getReservasPorUsuario(user.id).then(res => setReservas(res.data));
    }
  }, [user]);

  if (!user) return <Typography color="error">Inicia sesión para ver tus reservas</Typography>;

  return (
    <Box
      sx={{
        bgcolor: '#121212',
        minHeight: '100vh',
        color: 'white',
        textAlign: 'center',
        py: 5,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Mis Reservas
      </Typography>
      <List>
        {reservas.map(reserva => (
          <ListItem key={reserva.id}>
            <ListItemText
              primary={`🎬 ${reserva.pelicula_nombre}`}
              secondary={`📅 ${new Date(reserva.fecha).toLocaleDateString()}`}
              sx={{ color: '#4fc3f7' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Reservas;
