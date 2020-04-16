import { Request, Response, NextFunction } from 'express';

import { HTTPStatus } from '../types/HTTPStatus';
import Course from '../models/Course';
import { ErrorResponse, catchAsync } from '../utils/';
import { querySelect, querySort, paginationHandler, queryStringHandler, requestQueryHandler } from './helpers';

export const getCourses = catchAsync(async (req: Request, res: Response) => {
	let query;
	const requestQuery = requestQueryHandler(req);
	const queryString = queryStringHandler(requestQuery);

	if (req.params.bootcampId) query = Course.find({ bootcamp: req.params.bootcampId });
	else query = Course.find(JSON.parse(queryString));

	querySelect(req, query);
	querySort(req, query);
	const pagination = await paginationHandler(req, query, Course);

	const courses = await query;
	res
		.status(HTTPStatus.OK)
		.json({ success: true, msg: 'Get all courses', results: courses.length, pagination, data: { courses } });
});

export const getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const course = await Course.findById(req.params.courseId);
	if (!course) next(new ErrorResponse('course not found 🍆', 404));
	res.status(HTTPStatus.OK).json({ success: true, msg: `Get course with name of ${course?.title}`, data: { course } });
});

export const createCourse = catchAsync(async (req: Request, res: Response) => {
	const course = await Course.create(req.body);

	res.status(HTTPStatus.CREATED).json({ success: true, msg: `Course "${course.title}" created 🎉`, data: { course } });
});

export const updateCourse = catchAsync(async (req: Request, res: Response) => {
	const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(HTTPStatus.CREATED).json({ success: true, msg: `Course "${course!.title}" updated`, data: { course } });
});

export const deleteCourse = catchAsync(async (req: Request, res: Response) => {
	await Course.findOneAndDelete({ _id: req.params.courseId });

	res.status(HTTPStatus.OK).json({ success: true, msg: `Course deleted` });
});
