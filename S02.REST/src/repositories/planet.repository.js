import Planet from '../models/planet.model.js'; //Planet lien vers notre collection (table) planets en BD

class PlanetRepository {

    retrieveAll() {
        return Planet.find()
    }

}

export default new PlanetRepository();