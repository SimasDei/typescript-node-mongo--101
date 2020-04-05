/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
dotenv.config();

import { setupExpress, setupRoutes } from './config';
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
