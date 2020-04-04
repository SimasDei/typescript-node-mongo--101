"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send('Ahoy Sailor o/ ⛵️');
});
app.listen(3000, function () {
    console.log('App is running on port 3000');
});
