import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box sx={{ bgcolor: '#1e1e1e', color: 'white', p: 2, textAlign: 'center', mt: 5 }}>
    <Typography variant="body2">
      &copy; {new Date().getFullYear()} Cartelera App
    </Typography>
  </Box>
);

export default Footer;
