import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { Cadastro } from './interfaces/cadastro.interface';
import { prisma } from "../lib/prisma";
import { v4 as uuidv4 } from 'uuid';
import eventosRouter from './routes/eventos.routes';

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', authRoutes);
app.use('/eventos', eventosRouter);


let cadastros: Cadastro[] = [];
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});


app.post('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.post('/cadastrar', async (req: Request, res: Response) => {
  const cadastro: Cadastro = req.body;
  cadastro.id = uuidv4();
  try {
    await prisma.cadastro.create({
      data: cadastro,
    });
    console.log('Cadastro criado com sucesso.');
    res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar cadastro:', error);
    res.status(500).json({ message: 'Erro ao criar cadastro.' });
  } finally {
    await prisma.$disconnect(); // Desconecta o Prisma Client
  }
});

app.get('/cadastros', async (req: Request, res: Response) => {
  try {
    const cadastros = await prisma.cadastro.findMany();
    res.json(cadastros)
  } catch (error) {
    console.error('Erro ao listar cadastros:', error);
  } finally {
    await prisma.$disconnect();
  }
});

// Endpoint para criar um recurso
app.post('/resource', (req: Request, res: Response) => {
  const data = req.body;
  res.status(201).send(data);
});



// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


//https://www.youtube.com/watch?v=mWERmpulRIw