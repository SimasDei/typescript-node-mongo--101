import { Application } from 'express';
import { errorHandler } from './error';

export const setupMiddleware = (app: Application) => {
	app.use(errorHandler);
};
