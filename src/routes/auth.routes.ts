// auth.routes.ts
import express, { Router } from 'express';
import { login } from '../controller/auth.controller';

const router: Router = express.Router();

router.post('/login', login);

export default router;
