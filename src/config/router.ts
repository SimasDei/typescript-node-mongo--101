import express, { Application } from 'express';

import { V1 } from '../routes/V1';

const statusRouter = express.Router();

statusRouter.get('/', (_, res) => {
	res.status(200).json({ msg: 'Ahoy Sailor o/ ⛵️🌊', status: 'OK' });
});

export const setupRoutes = (app: Application): void => {
	app.use('/status', statusRouter);
	app.use('/api/v1', V1);
};
