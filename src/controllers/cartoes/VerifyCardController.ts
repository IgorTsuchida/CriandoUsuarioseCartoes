import { Request, Response } from "express";
import { VerifyCardService } from "../../services/cartoes/VerifyCardService";
import { verify } from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
      user_id: string;
    }
  }
class VerifyCardController{
    async handle(req: Request, res:Response){
        const {num} = req.body;
        const id_userSe = req.user_id;

        const verifyCardService = new VerifyCardService();

        const verifyCard = await verifyCardService.execute({num, id_userSe});

        return res.json(verifyCard);
    }
}

export{VerifyCardController};