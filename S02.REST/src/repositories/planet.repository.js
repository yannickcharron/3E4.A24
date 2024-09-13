import Planet from '../models/planet.model.js'; //Planet lien vers notre collection (table) planets en BD

class PlanetRepository {

    retrieveAll() {
        return Planet.find()
    }

    retrieveByUUID(uuidPlanet) {
        return Planet.findOne({uuid: uuidPlanet})
    }

}

export default new PlanetRepository();