import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { pagination } from 'typeorm-pagination';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

const app = express();
app.use(pagination);

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/', express.static(uploadConfig.directory)); //Rota estática para os arquivos que foram upados
app.use(routes);
app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    console.log(error);
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} 🚀`);
});
