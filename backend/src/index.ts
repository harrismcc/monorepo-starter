import express from 'express';
import { LOCAL_PORT } from '@main/utils';

const app = express();
const port = LOCAL_PORT;

app.get('/', (req, res) => {
    res.send('Helmlo World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
