const express = require('express');
const dotenv = require('dotenv');

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

// eslint-disable-next-line no-console
app.listen(PORT, console.log(`server is running on port ${PORT}`));
