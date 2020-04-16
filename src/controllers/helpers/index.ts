import { Request } from 'express';
import { Model } from 'mongoose';

import { IBootcampModel } from '../../types/Bootcamp';
import { ICourseModel } from '../../types/Course';

export const querySelect = (req: Request, query: any) => {
	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}
};
export const querySort = (req: Request, query: any) => {
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else query = query.sort('-createdAt');
};

export const paginationHandler = async (
	req: Request,
	query: any,
	Model: Model<IBootcampModel> | Model<ICourseModel>
) => {
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit) || 50;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await Model.countDocuments();
	query = query.skip(startIndex).limit(limit);

	const pagination = { next: {}, prev: {}, total };
	if (endIndex < total) pagination.next = { page: page + 1, limit };
	if (startIndex > 0) pagination.prev = { page: page - 1, limit };

	return pagination;
};
