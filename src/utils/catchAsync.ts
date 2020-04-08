import { Request, Response, NextFunction } from 'express';
export const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => any) => (
	req: Request,
	res: Response,
	next: NextFunction
) => fn(req, res, next).catch(next);
