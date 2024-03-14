import express from 'express'
import clientRoutes from '../routes/v1/clientRoutes.js';

const clientApi = express()

clientApi.use('/client', clientRoutes)


export default clientApi;