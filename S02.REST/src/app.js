import express from 'express';

const app = express();

app.get('/status', (req, res) => {
    res.status(200).end();
});

app.get('/', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'text/html');
    res.send('<h1>Première route vcfsdf</h1>');
});

export default app;