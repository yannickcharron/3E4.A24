import { Router } from 'express';
import HttpErrors from 'http-errors'

import PLANETS from '../data/planets.js';

import planetRepository from '../repositories/planet.repository.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const planets = await planetRepository.retrieveAll();
    res.status(200).json(planets);
  } catch (err) {
    return next(err);
  }
});

//: devant dans l'url => paramètre
router.get('/:uuidPlanet', async (req, res, next) => {

  //next = égale la gestion des erreurs
  try {
    //1. Trouver en base de données la planète avec uuid reçu en paramètre
    const planet = await planetRepository.retrieveByUUID(req.params.uuidPlanet);

    //2. La planète voulue n'existe pas
    if(!planet) {
      //Erreur 404
      return next(HttpErrors.NotFound(`Planet with uuid : ${req.params.uuidPlanet} not found`));
    }

    //3. Si l'existe envoyer la planète dans la réponse au client
    res.status(200).json(planet);
  } catch (err) {
    //Gestion d'erreur
    return next(err);
  }

});

router.post('/', (req, res) => {
  const newPlanet = req.body;

  if (newPlanet) {
    //On n'ajoute pas une planète vide
    const planet = PLANETS.find((p) => p.id === newPlanet.id);
    if (planet) {
      //Une planète possède le id de la nouvelle planète => Pas d'ajout possible
      return res.status(409).end();
    }

    PLANETS.push(newPlanet);
    res.status(201).json(newPlanet);
  }
});

router.delete('/:idPlanet', (req, res) => {
  const index = PLANETS.findIndex((p) => p.id === parseInt(req.params.idPlanet, 10));
  if (index === -1) {
    return res.status(404).end();
  }

  //La planète existe
  PLANETS.splice(index, 1);
  res.status(204).end();
});

router.patch('/:idPlanet', (req, res) => {
  res.status(405).end();
});

router.put('/:idPlanet', (req, res) => {
  res.status(501).end();
});

export default router;
