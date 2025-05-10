import { rest } from 'msw';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const handlers = [
  rest.get(`${API}/cartelera`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json([{ id:1, titulo:'Matrix', descripcion:'…', duracion:136 }] ))
  ),
  // añade más mocks según necesites…
];
