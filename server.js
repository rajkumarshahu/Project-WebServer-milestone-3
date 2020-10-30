const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const patients = require('./routes/patients');
const records = require('./routes/records');
const Patient = require('./models/Patient');

const app = express();

// Body parser
app.use(express.json());

// @desc    Logs request to console
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};

app.use(logger);

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/patients', patients);
app.use('/records', records);

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red);
	// Close server & exit process
	server.close(() => process.exit(1));
});
