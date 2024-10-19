// auth.controller.ts
import { json, Request, Response } from 'express';
import { prisma } from "../../lib/prisma";
import { Ingresso, Ingressos } from '../interfaces/ingresso.interface';
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


export async function buscarIngressosPorCodigo(codigo: number): Promise<Ingressos[]> {
  try {
    const ingressos = await prisma.ingressos.findMany({
      where: {
        codigo: codigo,
      },
      include: {
        tickets: true, // Inclui os tickets na consulta
      },
    });

    if (ingressos.length > 0) {
      console.log("Ingressos encontrados:", ingressos);

      // Transformar os dados para incluir as propriedades corretas nos tickets
      const ingressosTransformados = ingressos.map(ingresso => ({
        id: ingresso.id,
        codigo: ingresso.codigo,
        total: ingresso.total.toNumber(), // Converte Decimal para número, se necessário
        pago: ingresso.pago,
        nomeEvento: ingresso.nomeEvento,
        tickets: ingresso.tickets.map(ticket => ({
          id: ticket.id,
          nomeEvento: ingresso.nomeEvento, // Assumindo que você quer manter a referência do evento
          nome: ticket.nomePessoa, // Mapeando nomePessoa para nome
          pago: ingresso.pago, // Mapeando pagamento do ingresso
          cpf: ticket.cpf,
          email: ticket.email,
          telefone: ticket.telefone,
          tipo: ticket.tipo,
          ingressosId: ticket.ingressosId,
        })),
      }));

      return ingressosTransformados;
    } else {
      console.log("Nenhum ingresso encontrado para o código fornecido");
      return [];
    }
  } catch (error) {
    console.log("Erro ao buscar ingressos:", error);
    throw error; // Considere relançar ou tratar o erro conforme necessário
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



export async function atualizarStatusPagamento(req: Request, res: Response): Promise<void> {
  const status: boolean = req.body.status;
  const codigo: number = parseInt(req.params.codigo);

  try {
      const ingressosAtualizados = await prisma.ingressos.updateMany({
          where: { codigo: codigo },
          data: { pago: status }
      });

      if (ingressosAtualizados.count > 0) {
          const ingressos = await prisma.ingressos.findMany({
              where: { codigo: codigo },
              include: { tickets: true }
          });
          res.status(200).json(ingressos);
      } else {
          console.log("Nenhum ingresso encontrado para o código fornecido");
          res.status(404).json({ message: "Ingresso não encontrado" });
      }
  } catch (error) {
      console.error("Erro ao atualizar ingresso:", error);
      res.status(500).json({ message: "Erro ao atualizar ingresso" });
  }
}