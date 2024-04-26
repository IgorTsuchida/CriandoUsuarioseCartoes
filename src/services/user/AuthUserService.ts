import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        const user = await prismaClient.usuario.findFirst({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new Error("Usuário ou password estão incorretos!")
        }
        const passwordMathc = await compare(password, user.senha);
        if (!passwordMathc) {
            throw new Error("Usuário ou password estão incorretos!");
        }

        const token = sign(
            {
                nome: user.nome,
                usuario: user.email
            },
            process.env.JWT_SECRET!,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            login: user.login,
            token: token
        };
    }
}
export { AuthUserService };