import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

import { connectDb } from '../config';
import Bootcamp from '../models/Bootcamp';
import Course from '../models/Course';
import { IBootcamp } from '../types/Bootcamp';
import { ICourse } from '../types/Course';

connectDb();

const bootcamps = JSON.parse(fs.readFileSync(`./src/_data/bootcamps.json`, 'utf8')) as IBootcamp[];
const courses = JSON.parse(fs.readFileSync(`./src/_data/courses.json`, 'utf8')) as ICourse[];

const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);
		await Course.create(courses);

		console.log('Data imported! 🎉');
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

const deleteData = async () => {
	try {
		await Bootcamp.deleteMany({});
		await Course.deleteMany({});

		console.log('Data deleted! ☠️');
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

switch (process.argv[2]) {
	case '-i':
	case '--import':
		importData();
		break;
	case '-d':
	case '--delete':
		deleteData();
		break;
	default:
		console.log('Pass --import or --delete as an argument to populate/drop database 🍆');
		process.exit(0);
}
