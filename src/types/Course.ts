import { Types, Document } from 'mongoose';

export interface ICourse {
	title: String;
	description: String;
	weeks: String;
	tuition: Number;
	minimumSkill: IMinimumSkill;
	scholarshipAvailable: Boolean;
	bootcamp: Types.ObjectId;
}

enum IMinimumSkill {
	beginner,
	intermediate,
	advanced,
}

export interface ICourseModel extends ICourse, Document {}
