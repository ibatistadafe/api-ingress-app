import express, { Router } from 'express';
import { atualizarStatusPagamento, buscarIngressoPorCpf, Listaringressos } from '../controller/ingressos.controller';

const ingressosRouter: Router = express.Router();

ingressosRouter.get('/ingressos', Listaringressos);
ingressosRouter.get('/ingressos/:cpf', buscarIngressoPorCpf);
// ingressosRouter.put('/ingressos/:codigo/status', atualizarStatusPagamento); --> não funciona 

export default ingressosRouter;   
