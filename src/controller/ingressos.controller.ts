// auth.controller.ts
import { Request, Response } from 'express';
import { prisma } from "../../lib/prisma";
import { Ingresso } from '../interfaces/ingresso.interface';
import { v4 as uuidv4 } from 'uuid';

export async function Listaringressos(req: Request, res: Response): Promise<void> {
  try {
    const ingressos = await prisma.ingresso.findMany();
    res.status(200).json(ingressos);
  } catch (err) {
    console.error('Error fetching ingressos:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function buscarIngressoPorCpf(cpf: string) {
    let ingresso;
    try {
        ingresso = prisma.ingresso.findMany({
            where: {
                cpf: cpf,
            },
        });

        if ((await ingresso).length > 0) {
            console.log('Ingressos encontrados:', ingresso);
            return ingresso;
          } else {
            console.log('Nenhum ingresso encontrado para o CPF fornecido.');
          }
        } catch (error) {
          console.error('Erro ao buscar ingressos:', error);
        }
}
