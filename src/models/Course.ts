import mongoose, { Model, Document, Types } from 'mongoose';

import { ICourse, ICourseModel } from '../types/Course';

interface ICourseSchema extends Document, ICourse {}

const courseSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, 'Please add a course title'],
	},
	description: {
		type: String,
		required: [true, 'Please add a course description'],
	},
	weeks: {
		type: String,
		required: [true, 'Please add course duration in number of weeks'],
	},
	tuition: {
		type: Number,
		required: [true, 'Please add tuition cost in hours true'],
	},
	minimumSkill: {
		type: String,
		required: [true, 'Please add minimum skill'],
		enum: ['beginner', 'intermediate', 'advanced'],
	},
	scholarshipAvailable: {
		type: Boolean,
		default: false,
	},
	bootcamp: {
		type: mongoose.Types.ObjectId,
		ref: 'Bootcamp',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

courseSchema.statics.getAverageCost = async function (bootcampId: Types.ObjectId) {
	console.log("I'm a robot beep-boop");

	const obj = await this.aggregate([
		{
			$match: { bootcamp: bootcampId },
		},
		{
			$group: {
				_id: '$bootcamp',
				averageCost: { $avg: '$tuition' },
			},
		},
	]);
};

courseSchema.pre<ICourseSchema>('remove', function () {
	//@ts-ignore
	this.constructor.getAverageCost(this.bootcamp);
});

courseSchema.post<ICourseSchema>('save', function () {
	//@ts-ignore
	this.constructor.getAverageCost(this.bootcamp);
});

const CourseModel: Model<ICourseModel> = mongoose.model('Course', courseSchema);

export default CourseModel;
