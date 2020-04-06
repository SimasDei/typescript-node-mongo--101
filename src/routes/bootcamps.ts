import express from 'express';

import * as controller from '../controllers/bootcamps';

export const router = express.Router();

router.route('/').get(controller.getBootcamps);

router.route('/:bootcampId').get(controller.getById);