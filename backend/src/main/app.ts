import express from 'express'
import routes  from '@main/http/routes/routes';

const app = express();

app.use(express.json());
app.use(routes)


export default app;