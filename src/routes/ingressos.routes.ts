import express, { Router } from 'express';
import { buscarIngressosPorCodigo ,buscarIngressoPorCpf, Listaringressos } from '../controller/ingressos.controller';

const ingressosRouter: Router = express.Router();

ingressosRouter.get('/ingressos', Listaringressos);
ingressosRouter.get('/ingressos/:cpf', buscarIngressoPorCpf);
ingressosRouter.get('/ingressos/codigo/:codigo', buscarIngressosPorCodigo)

export default ingressosRouter;   
