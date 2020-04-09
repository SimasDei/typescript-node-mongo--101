import mongoose, { Model, Document } from 'mongoose';
import slugify from 'slugify';

import { IBootcampModel, IBootcamp } from '../types/Bootcamp';
import { geocoder } from '../utils';

interface IBootcampSchema extends Document, IBootcamp {}

const BootcampSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		unique: [true, 'Name must be unique'],
		trim: true,
		maxLength: [50, 'Name canot be longer than 50 characters'],
	},
	slug: String,
	description: {
		type: String,
		required: [true, 'Description is required'],
		trim: true,
		maxLength: [144, 'Description can not be longer than 144 characters'],
	},
	website: {
		type: String,
		match: [/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi, 'Use a valid URL'],
	},
	email: {
		type: String,
		match: [
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Use a valid Email',
		],
	},
	phoneNumber: {
		type: String,
		match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, 'Use valid phone number'],
	},
	address: {
		type: String,
		required: [true, 'Provide a valid address'],
	},
	location: {
		type: {
			type: String,
			enum: ['Point'],
			required: [false, 'Provide a valid geo type'],
		},
		coordinates: {
			type: [Number],
			required: [false, 'Provide valid coordinates'],
			index: '2dsphere',
		},
		formattedAddress: String,
		street: String,
		city: String,
		state: String,
		zipcode: String,
		country: String,
	},
	careers: {
		type: [String],
		required: [true, 'Provide targeted careers of the bootcamp'],
		enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other'],
	},
	averageRating: {
		type: Number,
		min: [1, 'Rating must be between 1 and 10'],
		max: [10, 'Rating must be between 1 and 10'],
	},
	averageCost: Number,
	photo: {
		type: String,
		default: 'no-photo.jpg',
	},
	housing: {
		type: Boolean,
		default: false,
	},
	jobAssistance: {
		type: Boolean,
		default: false,
	},
	jobGuarantee: {
		type: Boolean,
		default: false,
	},
	acceptGi: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

BootcampSchema.pre<IBootcampSchema>('save', function (next) {
	console.log('Slugify has been released !', { schema: this });
	this.slug = slugify(this.name, { lower: true });
	next();
});

BootcampSchema.pre<IBootcampSchema>('save', async function (next) {
	const [location] = await geocoder.geocode(this.address);
	this.location = {
		type: 'Point',
		coordinates: [location.longitude as number, location.latitude as number],
		formattedAddress: location.formattedAddress,
		street: location.streetName,
		city: location.city,
		state: location.stateCode,
		zipcode: location.zipcode,
		country: location.countryCode,
	};

	delete this.address;
	next();
});

const BootcampModel: Model<IBootcampModel> = mongoose.model('Bootcamp', BootcampSchema);

export default BootcampModel;
