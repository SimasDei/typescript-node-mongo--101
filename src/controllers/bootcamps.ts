import { Request, Response, NextFunction } from 'express';

import { HTTPStatus } from '../types/HTTPStatus';
import Bootcamp from '../models/Bootcamp';

export const getBootcamps = (req: Request, res: Response, next: NextFunction) => {
	res.status(HTTPStatus.OK).json({ success: true, msg: 'Get all bootcamps' });
};

export const getById = (req: Request, res: Response, next: NextFunction) => {
	res.status(HTTPStatus.OK).json({ success: true, msg: `Get bootcamp with id of ${req.params.bootcampId}` });
};

export const createBootcamp = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);

	res.status(HTTPStatus.CREATED).json({ success: true, msg: 'Get all bootcamps' });
};
