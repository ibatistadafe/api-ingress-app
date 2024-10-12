import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { Cadastro } from './interfaces/cadastro.interface';
import { prisma } from "../lib/prisma";
import { v4 as uuidv4 } from 'uuid';
import eventosRouter from './routes/eventos.routes';
import ingressosRouter from './routes/ingressos.routes';
import { Evento } from '@prisma/client';
import { buscarIngressoPorCpf, buscarIngressosPorCodigo, Listaringressos } from './controller/ingressos.controller';
import { Ingresso, Ingressos } from './interfaces/ingresso.interface';
import bodyParser from 'body-parser';
import { buscarEventoPorId } from './controller/eventos.controller';

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

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

app.get('/eventos', async (req: Request, res: Response) => {
  try {
    const eventos = await prisma.evento.findMany();
    res.json(eventos);
  } catch(error) {
    console.error('Erro ao listar eventos:', error);
  } finally {
    await prisma.$disconnect();
  }
});

app.get('/eventos/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const evento = await buscarEventoPorId(id);
    res.json(evento);
  } catch (error) {
    console.log("Erro ao buscar evento", error);
  } finally {
    await prisma.$disconnect();
  }
})

app.post('/eventos', async (req: Request, res: Response) => {
  const evento: Evento = req.body;
  evento.id = uuidv4();
  try {
    await prisma.evento.create({
      data: evento,
    });
    console.log('Evento criado com sucesso.');
    res.status(201).json({ message: 'Evento realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).json({ message: 'Erro ao criar evento.' });
  } finally {
    await prisma.$disconnect(); // Desconecta o Prisma Client
  }
})

app.get('/ingressos/:cpf', async (req: Request, res: Response) => {
  const cpf = req.params.cpf;
  try {
    const ingressos = await buscarIngressoPorCpf(cpf);
    res.json(ingressos);
  } catch (error) {
    console.error("Erro ao buscar ingressos", error);
  } finally {
    await prisma.$disconnect();
  }
});

app.get('/ingressos/codigo/:codigo', async (req: Request, res: Response) => {
  const codigo = Number(req.params.codigo);
  try {
    const ingressos = await buscarIngressosPorCodigo(codigo);
    res.json(ingressos);
  } catch (error) {
    console.error("Erro ao buscar ingressos", error);
  } finally {
    await prisma.$disconnect();
  }
});

app.get('/ingressos', async (req: Request, res: Response) => {
  try {
    const ingressos = await Listaringressos(req, res);
    res.json(ingressos);
  } catch (erro) {
    console.error('Erro ao buscar ingressos', erro);
  } finally {
    await prisma.$disconnect();
  }
});

app.post('/ingressos', async (req: Request, res: Response) => {
  const { codigo, total, pago, nomeEvento, tickets } = req.body;

  try {
    const ingressos = await prisma.ingressos.create({
      data: {
        id: uuidv4(),
        codigo,
        total: total, // Certifique-se de que o total está no formato correto
        pago,
        nomeEvento,
        tickets: {
          create: tickets.map((ticket: Ingresso) => ({
            id: uuidv4(), // Gera um novo ID para cada ingresso
            nomePessoa: ticket.nome,
            cpf: ticket.cpf,
            email: ticket.email,
            telefone: ticket.telefone,
            tipo: ticket.tipo,
          }))
        }
      }
    });

    res.status(201).json(ingressos);
  } catch (error) {
    console.error('Erro ao criar ingressos:', error);
    res.status(500).json({ message: 'Erro ao criar ingressos.' });
  } finally {
    await prisma.$disconnect(); // Desconecta o Prisma Client
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