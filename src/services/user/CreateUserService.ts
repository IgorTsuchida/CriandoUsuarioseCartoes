import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UserRequest {
    name: string
    email: string
    login: string
    password: string
}

class CreateUserService {
    async execute({ name, email, login, password }: UserRequest) {
        if (!email) {
            throw new Error("E-mail não foi enviado")
        }
        const UserAreadyExists = await prismaClient.usuario.findFirst(
            {
                where: {
                    email: email
                }
            }
        )
        if (UserAreadyExists) {
            throw new Error('Email já está sendo utilizado')
        }

        const passwordHash = await hash(password, 8);
        const user = await prismaClient.usuario.create({
            data: {
                nome: name,
                email: email,
                login: login,
                senha: passwordHash
            },
            select: {
                id: true,
                nome: true,
                email: true,
                login: true
            }
        })
        return user;
    }
}
export { CreateUserService };