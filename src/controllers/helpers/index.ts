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

export const queryStringHandler = (requestQuery: Request['query']) => {
	let queryString = JSON.stringify(requestQuery);
	queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
	return queryString;
};

export const requestQueryHandler = (req: Request) => {
	const requestQuery = { ...req.query };
	const removeFields = ['select', 'sort', 'page', 'limit'];
	removeFields.forEach((param) => delete requestQuery[param]);

	return requestQuery;
};
