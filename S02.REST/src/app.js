import express from 'express';
import dayjs from 'dayjs';

import database from './core/database.js';

import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

import planetsRoutes from './routes/planets.routes.js';

database();
dayjs.extend(utc);
dayjs.extend(timezone);

const app = express();
app.use(express.json());

app.use('/planets', planetsRoutes);

//Route: /status
app.get('/status', (req, res) => {
  res.status(200).end();
});



export default app;
