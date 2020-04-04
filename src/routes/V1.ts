import express from 'express';
import { router as bootcampsRouter } from './bootcamps';

export const V1 = express.Router();

V1.use('/bootcamps', bootcampsRouter);
