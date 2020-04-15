import express from 'express';

import * as controller from '../controllers/bootcamps';
import { router as courseRouter } from './courses';

export const router = express.Router();

router.route('/').get(controller.getBootcamps).post(controller.createBootcamp);

router.route('/:bootcampId').get(controller.getById).patch(controller.updateBootcamp).delete(controller.deleteBootcamp);

router.route('/radius/:zipcode/:distance').get(controller.getBootcampsWithinRadius);

router.use('/:bootcampId/courses', courseRouter);
