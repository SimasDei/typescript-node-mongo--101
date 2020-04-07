import { Request, Response, NextFunction } from 'express';

import { HTTPStatus } from '../types/HTTPStatus';
import Bootcamp from '../models/Bootcamp';

export const getBootcamps = async (req: Request, res: Response, next: NextFunction) => {
	const bootcamps = await Bootcamp.find();
	res
		.status(HTTPStatus.OK)
		.json({ success: true, msg: 'Get all bootcamps', results: bootcamps.length, data: { bootcamps } });
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
	const bootcamp = await Bootcamp.findById(req.params.bootcampId);
	res
		.status(HTTPStatus.OK)
		.json({ success: true, msg: `Get bootcamp with name of ${bootcamp!.name}`, data: { bootcamp } });
};

export const createBootcamp = async (req: Request, res: Response, next: NextFunction) => {
	const bootcamp = await Bootcamp.create(req.body);

	res
		.status(HTTPStatus.CREATED)
		.json({ success: true, msg: `Bootcamp "${bootcamp.name}" created 🎉`, data: { bootcamp } });
};
