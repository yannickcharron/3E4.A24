import { Router } from 'express';

import PLANETS from '../data/planets.js';

import planetRepository from '../repositories/planet.repository.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const planets = await planetRepository.retrieveAll();
    res.status(200).json(planets);
  } catch (err) {
    res.status(500).end();
  }
});

//: devant dans l'url => paramètre
router.get('/:idPlanet', (req, res) => {
  const idPlanet = parseInt(req.params.idPlanet, 10);
  // const planets = PLANETS.filter(p => p.id === idPlanet); //Filter retourne un tableau
  // if(planets.length > 0) {
  //     // Le id existe (planet existe)
  //     res.status(200).json(planets[0]);
  // } else {
  //     // Le id existe pas
  //     res.status(404).end();
  // }

  const planet = PLANETS.find((p) => p.id === idPlanet);
  if (planet) {
    res.status(200).json(planet);
  } else {
    res.status(404).end();
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
