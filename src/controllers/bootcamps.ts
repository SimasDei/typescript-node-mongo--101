import { Request, Response, NextFunction } from 'express';

import { HTTPStatus } from '../types/HTTPStatus';
import Bootcamp from '../models/Bootcamp';
import { ErrorResponse } from '../utils/errorResponse';

export const getBootcamps = async (req: Request, res: Response) => {
	const bootcamps = await Bootcamp.find();
	res
		.status(HTTPStatus.OK)
		.json({ success: true, msg: 'Get all bootcamps', results: bootcamps.length, data: { bootcamps } });
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const bootcamp = await Bootcamp.findById(req.params.bootcampId);
		if (!bootcamp) return next(new ErrorResponse('Lol, not found 🍆', 404));
		res
			.status(HTTPStatus.OK)
			.json({ success: true, msg: `Get bootcamp with name of ${bootcamp?.name}`, data: { bootcamp } });
	} catch (error) {
		return next(new ErrorResponse(error.message, error.statusCode));
	}
};

export const createBootcamp = async (req: Request, res: Response) => {
	const bootcamp = await Bootcamp.create(req.body);

	res
		.status(HTTPStatus.CREATED)
		.json({ success: true, msg: `Bootcamp "${bootcamp.name}" created 🎉`, data: { bootcamp } });
};

export const updateBootcamp = async (req: Request, res: Response) => {
	const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.bootcampId, req.body, {
		new: true,
		runValidators: true,
	});

	res
		.status(HTTPStatus.CREATED)
		.json({ success: true, msg: `Bootcamp "${bootcamp!.name}" updated`, data: { bootcamp } });
};

export const deleteBootcamp = async (req: Request, res: Response) => {
	await Bootcamp.findOneAndDelete({ _id: req.params.bootcampId });

	res.status(HTTPStatus.OK).json({ success: true, msg: `Bootcamp deleted` });
};
