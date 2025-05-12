import { rest } from 'msw';

export const handlers = [
  // — Cartelera —
  rest.get('/cartelera', (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        { id: 1, titulo: 'Matrix', descripcion: 'El elegido...', duracion: 136, posterUrl: '' },
        { id: 2, titulo: 'Interstellar', descripcion: 'Más allá...', duracion: 169, posterUrl: '' },
      ])
    )
  ),
  rest.get('/cartelera/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({ id, titulo: `Película ${id}`, descripcion: 'Detalle mock', duracion: 120, posterUrl: '' })
    );
  }),

  // — Usuarios —
  rest.post('/usuarios/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === 'test@test.com' && password === '123456') {
      return res(
        ctx.status(200),
        ctx.json({ message: 'Login exitoso', token: 'fake-jwt', user: { id: 1, username: 'Test', email } })
      );
    }
    return res(ctx.status(401), ctx.json({ error: 'Credenciales inválidas' }));
  }),
  rest.post('/usuarios/register', async (req, res, ctx) => {
    const { username, email } = await req.json();
    return res(ctx.status(201), ctx.json({ id: 2, username, email }));
  }),

  // — Reservas —
  rest.post('/reservar', async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(201), ctx.json({ id: 1, ...body, estado: 'CONFIRMADA' }));
  }),
  rest.get('/reservas/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    return res(
      ctx.status(200),
      ctx.json([{ id: 1, user_id: Number(userId), funcion_id: 1, cantidad_boletos: 2, estado: 'CONFIRMADA' }])
    );
  }),
];
