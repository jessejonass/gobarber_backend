import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('\x1b[35m', '[GOBARBER BACKEND RUNNING [3333]]');
});
