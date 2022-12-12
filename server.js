const express = require("express");
const app = express();
const port = process.env.PORT || 8888;
const petishRouter = require('./src/routes/petish.route');
const cors = require("cors")
require('dotenv').config();

const corsOptions = {
    origin: '*',
    Credentials: true,
    optionSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/petish', petishRouter);

app.listen(port, () => {
    console.log(`petish API is running on port ${port}`);
});