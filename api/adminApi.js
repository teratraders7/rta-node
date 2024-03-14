import express from 'express'
import adminRoutes from '../routes/v1/adminRoutes.js';

const adminApi = express()

adminApi.use('/admin', adminRoutes)


export default adminApi;