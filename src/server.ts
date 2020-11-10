import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './shared/infra/http/routes';
import uploadConfig from './config/upload';

import './shared/infra/typeorm';
import AppError from './shared/errors/AppError';

const app = express();

// evita que sites não autorizados tenham acesso
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Middlewares para tratativa de erro no express sãs obrigados a terem 4 parâmentros
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Se não for erro da rota então aparece a mensagem dos messages
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Caso seja erro não esperado

  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('teste');
});
