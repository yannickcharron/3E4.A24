import Planet from '../models/planet.model.js'; //Planet lien vers notre collection (table) planets en BD

const ZERO_KELVIN = -273.15;

class PlanetRepository {

    retrieveAll() {
        return Planet.find()
    }

    retrieveByUUID(uuidPlanet) {
        return Planet.findOne({uuid: uuidPlanet})
    }


    transform(planet, options = {}) {

        if(options.unit) {
            if(options.unit === 'c') {
                // Transformation de Kelvin à Celsius
                planet.temperature = parseFloat((planet.temperature + ZERO_KELVIN).toFixed(2), 10);
            }
        } 

        //Pour le TP qualité de l'air
        planet.newThing = {
            name: "Yannick"
        };

        delete planet._id;

        return planet;
    }

}

export default new PlanetRepository();