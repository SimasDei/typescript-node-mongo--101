import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(err.stack);

	res.status(500).json({
		success: false,
		error: err.message,
	});
};
