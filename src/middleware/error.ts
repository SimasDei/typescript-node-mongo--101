import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
	statusCode?: number;
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
	console.log(err.stack);

	res.status(err.statusCode || 500).json({
		success: false,
		error: err.message || 'Server error 💥',
	});
};
