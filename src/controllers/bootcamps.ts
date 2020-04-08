import { Request, Response } from 'express';

import { HTTPStatus } from '../types/HTTPStatus';
import Bootcamp from '../models/Bootcamp';

export const getBootcamps = async (req: Request, res: Response) => {
	const bootcamps = await Bootcamp.find();
	res
		.status(HTTPStatus.OK)
		.json({ success: true, msg: 'Get all bootcamps', results: bootcamps.length, data: { bootcamps } });
};

export const getById = async (req: Request, res: Response) => {
	const bootcamp = await Bootcamp.findById(req.params.bootcampId);
	res
		.status(HTTPStatus.OK)
		.json({ success: true, msg: `Get bootcamp with name of ${bootcamp?.name}`, data: { bootcamp } });
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
