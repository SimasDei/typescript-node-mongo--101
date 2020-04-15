import express from 'express';

import * as controller from '../controllers/courses';

export const router = express.Router({ mergeParams: true });

router.route('/').get(controller.getCourses);
