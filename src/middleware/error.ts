import { Request, Response, NextFunction } from 'express';

import { ErrorResponse } from '../utils/errorResponse';

interface AppError extends Error {
	statusCode?: number;
	value?: string;
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
	let error = { ...err };
	error.message = err.message;
	if (err.name === 'CastError') {
		error.message = `Resource with id of: ${err.value}, was not found`;
		error = new ErrorResponse(error.message, 404);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Server error 💥',
	});
};
