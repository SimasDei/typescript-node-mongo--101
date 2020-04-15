import { Request, Response, NextFunction } from 'express';

import { HTTPStatus } from '../types/HTTPStatus';
import Course from '../models/Course';
import { ErrorResponse, catchAsync } from '../utils/';

export const getCourses = catchAsync(async (req: Request, res: Response) => {
	let query;
	const requestQuery = { ...req.query };

	const removeFields = ['select', 'sort', 'page', 'limit'];
	removeFields.forEach((param) => delete requestQuery[param]);

	let queryString = JSON.stringify(requestQuery);
	queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

	if (req.params.bootcampId) query = Course.find({ bootcamp: req.params.bootcampId });
	else query = Course.find(JSON.parse(queryString));

	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else query = query.sort('-createdAt');

	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit) || 50;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await Course.countDocuments();
	query = query.skip(startIndex).limit(limit);

	const pagination = { next: {}, prev: {}, total };
	if (endIndex < total) pagination.next = { page: page + 1, limit };
	if (startIndex > 0) pagination.prev = { page: page - 1, limit };

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
