import { Types, Document } from 'mongoose';

export interface ICourse {
	title: String;
	description: String;
	weeks: String;
	tuition: Number;
	minimalSkill: IMinimalSkill;
	scholarshipAvailable: Boolean;
	bootcamp: Types.ObjectId;
}

enum IMinimalSkill {
	beginner,
	intermediate,
	advanced,
}

export interface ICourseModel extends ICourse, Document {}
