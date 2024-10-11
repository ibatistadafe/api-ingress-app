export interface Ingresso {
    id: string;
    nomeEvento: string;
    nome: string;
    pago: boolean;
    cpf: string;
    email: string;
    telefone: string;
    tipo: string;
    valor: number;
    ingressosId: string;

}

export interface Ingressos {
    id: string;
    codigo: number;
    tickets: Array<Ingresso>;
    total: number;
    pago: boolean;
    nomeEvento: string;
}