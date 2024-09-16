// auth.controller.ts
import { Request, Response } from 'express';
import { prisma } from "../../lib/prisma";
import jwt from 'jsonwebtoken';

async function verificarUsuario(login: string, senha: string): Promise<boolean> {
    let usuario;

    try {
        if (login.includes('@')) {
            usuario = await prisma.cadastro.findUnique({
                where: { email: login }
            });
        } else {
            usuario = await prisma.cadastro.findUnique({
                where: { cpf: login }
            });
        }

        if (!usuario) {
            return false;
        }

        const senhaCorreta = senha === usuario.senha ? true : false;

        return senhaCorreta
    } catch (error) {
        console.error('Erro ao verificar usuário:', error);
        return false;
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    const { login, senha } = req.body;
    const usuarioValido = await verificarUsuario(login, senha);
    if (usuarioValido) {
        const token = jwt.sign({ login }, 'secreto', { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
}
