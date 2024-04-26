import prismaClient from "../../prisma";

interface VerifyCard {
    num: string
    id_userSe: string
}

class VerifyCardService {
    async execute({ num, id_userSe }: VerifyCard) {
        const Card = await prismaClient.cartao.findFirst(
            {
                where: {
                    numero: num
                }
            }
        )
        if (!Card) {
            throw new Error("O cartão não está cadastrado!");
        }
        if (Card.id_usuario == id_userSe) {
            return { ok: true };
        } else {
            return { nok: "Não deu certo:(" };
        }
    }
}

export { VerifyCardService }