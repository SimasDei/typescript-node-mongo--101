import express from 'express';
import { router as bootcampsRouter } from './bootcamps';
import { router as coursesRouter } from './courses';

export const V1 = express.Router();

V1.use('/bootcamps', bootcampsRouter);
V1.use('/courses', coursesRouter);
