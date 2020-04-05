import { Request, Response, NextFunction } from 'express';

export const getBootcamps = (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({ success: true, msg: 'Get all bootcamps' });
};

export const getById = (req: Request, res: Response, next: NextFunction) => {
	res.status(200).json({ success: true, msg: `Get bootcamp with id of ${req.params.bootcampId}` });
};
