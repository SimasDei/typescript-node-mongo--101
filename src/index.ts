/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { WebpackHotModule } from './types/WebpackHotModule';

dotenv.config();

/**
 * App Variables
 */
const app: express.Application = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Ahoy Sailor o/ ⛵️');
});

/**
 * Server Activation
 */
const server = app.listen(process.env.PORT, () => {
	console.log(`App is running on port ${process.env.PORT} 🥁`);
});

/**
 * Webpack HMR Activation
 */

declare const module: WebpackHotModule;
if (module.hot) {
	module.hot.accept();
	module.hot.dispose(() => server.close());
}
