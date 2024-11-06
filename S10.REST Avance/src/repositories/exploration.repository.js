import Exploration from '../models/exploration.model.js';

class ExplorationsRepository {
    
    retrieveAll() {
        return Exploration.find();
    }

    retrieveByCriteria(filter, retrieveOptions) {
        const limit = retrieveOptions.limit;
        const skip = retrieveOptions.skip;

        return Exploration.find().limit(limit).skip(skip);

    }

    count() {
        return Exploration.estimatedDocumentCount();
    }

    retrieveByUUID(explorationUUID, retrieveOptions) {

    }

    transform(exploration, retrieveOptions = {}, transformOptions = {}) {

        exploration.href = `${process.env.BASE_URL}/explorations/${exploration.uuid}`;


        delete exploration._id;
        delete exploration.uuid;

        return exploration;
    }

}

export default new ExplorationsRepository();