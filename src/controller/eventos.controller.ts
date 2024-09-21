// auth.controller.ts
import { Request, Response } from 'express';
import { prisma } from "../../lib/prisma";

export async function eventos(req: Request, res: Response): Promise<void> {
  let evento
    try {
      evento = prisma.evento.findMany();
      res.status(200).json(eventos);
    }
    catch(err) {
      console.error('Error fetching events:', err); 
    res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function buscarEventoPorId(id: string) {
  let evento;
  try {
    evento = prisma.evento.findMany({
      where: {
        id: id
      },
    });

    if((await evento).length > 0) {
      console.log('Evento encontrado:', evento);
      return evento;
    } else {
      console.log('Nenhum evento encontrado com o id fornecido');
    }
  } catch (error) {
    console.log(error)
  }
}
