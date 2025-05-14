import { useState } from 'react';
import { createReserva } from '../api/reservas';
import { TextField, Button } from '@mui/material';

const ReservaForm = ({ peliculaId, usuarioId }) => {
  const [fecha, setFecha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createReserva({ fecha, peliculaId, usuarioId })
      .then(() => alert('Reserva creada'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Fecha"
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
        sx={{ bgcolor: 'white', borderRadius: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: '#4fc3f7',
          color: 'black',
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#29b6f6' },
        }}
      >
        Reservar entradas
      </Button>
    </form>
  );
};

export default ReservaForm;