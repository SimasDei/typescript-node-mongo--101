import { Document } from 'mongoose';

export interface IBootcamp {
	name: string;
	description: string;
	website: string;
	slug: string;
	phone: string;
	email: string;
	address: string;
	careers: string[];
	housing: boolean;
	jobAssistance: boolean;
	jobGuarantee: boolean;
	acceptGi: boolean;
	location: {
		type: string;
		coordinates: number[];
		formattedAddress?: string;
		street?: string;
		city?: string;
		state?: string;
		zipcode?: string;
		country?: string;
	};
}

export interface IBootcampModel extends IBootcamp, Document {}
