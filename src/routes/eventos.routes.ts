import express, { Router } from 'express';
import { buscarEventoPorId, eventos } from '../controller/eventos.controller';

const eventosRouter: Router = express.Router();

eventosRouter.get('/eventos', eventos);
eventosRouter.post('/eventos', eventos);
eventosRouter.get('/eventos/:id', buscarEventoPorId);

export default eventosRouter;   
