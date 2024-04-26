import {Request, Response} from 'express'
import { CreateCardService } from '../../services/cartoes/CreateCardService';

declare module "express-serve-static-core" {
    interface Request {
      user_id: string;
    }
  }

class CreateCardController{
    async handle(req: Request, res: Response){
        const {num, nomePro, validade, digito} = req.body;
        const user = req.user_id;

        const createCardService = new CreateCardService();

        const card = await createCardService.execute({num, nomePro, validade, digito, user});
        return res.json(card);
    }
}

export{CreateCardController};