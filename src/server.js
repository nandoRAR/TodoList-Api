import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRoutes);

app.listen(5000, ()=>{
    console.log('Server listening on port 5000');
})