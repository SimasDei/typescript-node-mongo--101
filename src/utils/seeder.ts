import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import { connectDb } from '../config';
import Bootcamp from '../models/Bootcamp';
import { IBootcamp } from '../types/Bootcamp';

dotenv.config({ path: './.env' });

connectDb();

const bootcamps = JSON.parse(fs.readFileSync(`./src/_data/bootcamps.json`, 'utf8')) as IBootcamp[];

const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);

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
