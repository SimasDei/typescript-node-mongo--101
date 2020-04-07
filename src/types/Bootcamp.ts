import { Document, Schema, Model, model } from 'mongoose';

export interface IBootcamp {
	name: string;
	description: string;
	website: string;
	phone: string;
	email: string;
	address: string;
	careers: string[];
	housing: boolean;
	jobAssistance: boolean;
	jobGuarantee: boolean;
	acceptGi: boolean;
}

export interface IBootcampModel extends IBootcamp, Document {}
