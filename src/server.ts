import express, { Request, Response, NextFunction, Router } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { router } from './routes';

const app = express();



app.use(express.json());
app.use(cors());
app.use(router);

//middeware para tratamento de erros nas rotas
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        //se o valor recebido for uma instância do tipo erro
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error.'
    })
})

app.listen(3333, () => console.log("SERVIDOR ON"));