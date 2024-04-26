import prismaClient from "../../prisma";


interface CartaoRequest {
    num: string
    nomePro: string
    validade: string
    digito: string
    user: string
}

class CreateCardService {
    async execute({ num, nomePro, validade, digito, user }: CartaoRequest) {
        if (!num) {
            throw new Error("num do cartão não foi enviado");
        }
        if (!nomePro) {
            throw new Error("Informe o nome do proprietario!");
        }
        if (!validade) {
            throw new Error("Informe a validade!");
        }
        if (!digito) {
            throw new Error("Digito de seguranca não foi enviado");
        }

        const CardAreadyExists = await prismaClient.cartao.findFirst(
            {
                where: {
                    numero: num
                }
            }
        )
        if (CardAreadyExists) {
            throw new Error('Cartão já cadastrado!');
        }


        const card = await prismaClient.cartao.create({
            data: {
                numero: num,
                nomeProprietario: nomePro,
                validade: validade,
                digitoSeguranca: digito,
                id_usuario: user

            },
            select: {
                numero: true,
                nomeProprietario: true,
                validade: true,
                id_usuario: true
            }
        })
        return card;
    }
}
export { CreateCardService };