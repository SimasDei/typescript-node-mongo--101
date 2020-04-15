import express from 'express';

import * as controller from '../controllers/courses';

export const router = express.Router();

router.route('/').get(controller.getCourses);
router.route('/:bootcampId').get(controller.getCourses);
