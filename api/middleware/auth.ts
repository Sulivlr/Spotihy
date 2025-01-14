import {NextFunction, Request, Response} from 'express';

export interface RequestWithSomething extends Request {
    something?: string;
}

const auth = (req: RequestWithSomething, res: Response, next: NextFunction) => {
    req.something = 'Something';
    next();
};

export default auth;