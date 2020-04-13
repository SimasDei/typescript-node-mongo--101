import { Request, Response, NextFunction } from 'express';

import { HTTPStatus } from '../types/HTTPStatus';
import Bootcamp from '../models/Bootcamp';
import { ErrorResponse, catchAsync, geocoder } from '../utils/';

export const getBootcamps = catchAsync(async (req: Request, res: Response) => {
	let query;
	const requestQuery = { ...req.query };

	const removeFields = ['select', 'sort', 'page', 'limit'];
	removeFields.forEach((param) => delete requestQuery[param]);

	let queryString = JSON.stringify(requestQuery);
	queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

	query = Bootcamp.find(JSON.parse(queryString));

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
	const total = await Bootcamp.countDocuments();
	query = query.skip(startIndex).limit(limit);

	const pagination = { next: {}, prev: {}, total };
	if (endIndex < total) pagination.next = { page: page + 1, limit };
	if (startIndex > 0) pagination.prev = { page: page - 1, limit };

	const bootcamps = await query;
	res
		.status(HTTPStatus.OK)
		.json({ success: true, msg: 'Get all bootcamps', results: bootcamps.length, pagination, data: { bootcamps } });
});

export const getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const bootcamp = await Bootcamp.findById(req.params.bootcampId);
	if (!bootcamp) next(new ErrorResponse('Bootcamp not found 🍆', 404));
	res
		.status(HTTPStatus.OK)
		.json({ success: true, msg: `Get bootcamp with name of ${bootcamp?.name}`, data: { bootcamp } });
});

export const createBootcamp = catchAsync(async (req: Request, res: Response) => {
	const bootcamp = await Bootcamp.create(req.body);

	res
		.status(HTTPStatus.CREATED)
		.json({ success: true, msg: `Bootcamp "${bootcamp.name}" created 🎉`, data: { bootcamp } });
});

export const updateBootcamp = catchAsync(async (req: Request, res: Response) => {
	const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.bootcampId, req.body, {
		new: true,
		runValidators: true,
	});

	res
		.status(HTTPStatus.CREATED)
		.json({ success: true, msg: `Bootcamp "${bootcamp!.name}" updated`, data: { bootcamp } });
});

export const deleteBootcamp = catchAsync(async (req: Request, res: Response) => {
	await Bootcamp.findOneAndDelete({ _id: req.params.bootcampId });

	res.status(HTTPStatus.OK).json({ success: true, msg: `Bootcamp deleted` });
});

export const getBootcampsWithinRadius = async (req: Request, res: Response) => {
	const {
		params: { zipcode, distance },
	} = req;

	const [location] = await geocoder.geocode(zipcode);
	const { longitude, latitude } = location;
	const radius = parseInt(distance) / 6378;
	const bootcamps = await Bootcamp.find({
		location: { $geoWithin: { $centerSphere: [[longitude, latitude], radius] } },
	});

	res.status(200).json({
		success: true,
		results: bootcamps.length,
		data: {
			bootcamps,
		},
	});
};
