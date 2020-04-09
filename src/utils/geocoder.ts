import nodeGeocoder, { Options } from 'node-geocoder';

const options = {
	provider: process.env.GEOCODER_PROVIDER,
	httpAdapter: 'https',
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null,
} as Options;

export const geocoder = nodeGeocoder(options);
