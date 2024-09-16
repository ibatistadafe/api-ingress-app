import express, { Router } from 'express';
import { eventos } from '../controller/eventos.controller';

const eventosRouter: Router = express.Router();

eventosRouter.get('/list-eventos', eventos);

export default eventosRouter;
