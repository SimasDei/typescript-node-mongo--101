import mongoose, { Model, Document, Schema } from 'mongoose';

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

const CourseModel: Model<ICourseModel> = mongoose.model('Course', courseSchema);

export default CourseModel;
