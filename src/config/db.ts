import mongoose from 'mongoose';

const connectionString = () => {
	const url = process.env
		.MONGO_URL!.replace('<user>', process.env.MONGO_USER as string)
		.replace('<password>', process.env.MONGO_PASSWORD as string)
		.replace('<database>', process.env.MONGO_DB as string);
	return url;
};

export const connectDb = async () => {
	try {
		const connection = await mongoose.connect(connectionString(), {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log(`Connected to database: ${connection.connection.host} 🥑🍾`);
	} catch (error) {
		console.log(error);
	}
};
