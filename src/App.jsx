import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Pelicula from './pages/Pelicula';
import Reservas from './pages/Reservas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pelicula/:id" element={<Pelicula />} />
      <Route path="/reservas" element={<Reservas />} />
      <Route path="*" element={<NotFound />} /> {/* Ruta 404 */}
    </Routes>
    <Footer />
  </BrowserRouter>
);


export default App;