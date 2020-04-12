/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import { setupExpress, setupRoutes } from './config';
import { setupMiddleware } from './middleware';
import { WebpackHotModule } from './types/WebpackHotModule';

/**
 * App Variables
 */
const app: express.Application = express();

/**
 *  App Configuration
 */
setupExpress(app);
setupRoutes(app);
setupMiddleware(app);

/**
 * Server Activation
 */
const server = app.listen(process.env.PORT, () => {
	console.log(`API is running on port ${process.env.PORT} 🥁`);
});

/**
 * Webpack HMR Activation
 */

declare const module: WebpackHotModule;
if (module.hot) {
	module.hot.accept();
	module.hot.dispose(() => server.close());
}

/**
 * Handle promise rejections
 */
process.on('unhandledRejection', (err, promise) => {
	console.log({
		msg: 'Server Exploded ! 💥',
		error: err,
	});

	server.close(() => process.exit(1));
});
