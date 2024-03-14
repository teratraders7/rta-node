import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import adminApi from './api/adminApi.js'
import bodyParser from 'body-parser'
import clientApi from './api/clientApi.js'
import files from './config/files.js'


dotenv.config()
const app = express()
const port = process.env.PORT || 5000

connectDB();

const corsOptions = {
    origin: process.env.CLIENT,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors());

app.get("/", (req, res) => {
    res.send("API IS RUNNING...")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(files.uploads.root_directory));

// ** API Routes
app.use('/api/v1/code/', adminApi )
app.use('/api/v1/rta/', clientApi)

app.listen(port, () => console.log(`Server running on port ${port}`));
