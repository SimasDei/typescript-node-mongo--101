import express = require('express');

const app: express.Application = express();
app.get('/', function (req, res) {
	res.send('Ahoy Sailor o/ ⛵️');
});
app.listen(3000, function () {
	console.log('App is running on port 3000');
});
