import express from 'express';
import router from './routes/User/router';
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(cors())

app.use(router);

app.listen(3000, () => console.log('http://localhost:3000/'));