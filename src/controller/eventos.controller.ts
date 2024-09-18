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
