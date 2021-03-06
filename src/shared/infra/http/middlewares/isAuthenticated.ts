import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
    iat: number;
    ext: number;
    sub: string;
}

export default function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token is inválid or missing');
    }
    //composição do authHeader = Bearer asdfasd1948s4d98fa4s9d8f4a9s8d4f9as8d4f9a8
    const [, /*Bearer*/ token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, auth.jwt.secret);

        const { sub } = decodedToken as ITokenPayload;

        req.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new AppError('Inválid Token');
    }
}
