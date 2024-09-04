import { Router } from 'express';

import PLANETS from '../data/planets.js';

const router = Router();

router.get('/planets', (req, res) => {
    res.status(200);
    res.json(PLANETS); //Content-Type = application/json et envoie la réponse
});

router.post('/planets', (req, res) => {
    res.status(405).end();
});

export default router;