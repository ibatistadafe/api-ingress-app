// auth.controller.ts
import { Request, Response } from 'express';


export async function eventos(req: Request, res: Response): Promise<void> {

    res.status(200).json(
        [
            {
              "id": 1,
              "image": "cultos",
              "description": "NOSSOS CULTOS AOS DOMINGOS ÁS 10h e 18:30h",
              "value": "0,00",
              "status": "Disponível"
            },
            {
              "id": 2,
              "image": "kids",
              "description": "IBF KIDS AOS DOMINGOS ÁS 10h e 18:30h",
              "value": "0,00",
              "status": "Disponível"
            },
            {
              "id": 3,
              "image": "praca",
              "description": "EVANGELISMO NA PRAÇA SÁBADO 02/03 ÁS 9h00",
              "value": "0,00",
              "status": "Disponível"
            },
            {
              "id": 4,
              "image": "homens",
              "description": "ENCONTRO HOMENS SÁBADO 23/03 ÁS 8h",
              "value": "0,00",
              "status": "Disponível"
            },
            {
              "id": 5,
              "image": "ceia",
              "description": "ESPECIAL PÁSCOA DOMINGO DIA 31/03 ÁS 10h e 18:30",
              "value": "0,00",
              "status": "Disponível"
            },
            {
              "id": 6,
              "image": "day-camp",
              "description": "DAY CAMP",
              "value": "VALOR: R$50,00",
              "status": "Disponível"
            }
          ]
          
    );
 
}
