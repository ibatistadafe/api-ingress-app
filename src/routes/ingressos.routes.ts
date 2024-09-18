import express, { Router } from 'express';
import { buscarIngressoPorCpf, Listaringressos } from '../controller/ingressos.controller';

const ingressosRouter: Router = express.Router();

ingressosRouter.get('/ingressos', Listaringressos);
ingressosRouter.get('/ingressos/:cpf', buscarIngressoPorCpf);

export default ingressosRouter;   
