import Exploration from '../models/exploration.model.js';

class ExplorationsRepository {
    
    retrieveAll() {
        return Exploration.find();
    }

    retrieveByCriteria(filter, retrieveOptions) {
        const limit = retrieveOptions.limit;
        const skip = retrieveOptions.skip;

        const retrieveQuery = Exploration.find().limit(limit).skip(skip).sort({'explorationDate': 'desc'});
        const countQuery = Exploration.countDocuments();

        return Promise.all([retrieveQuery, countQuery]);

    }

    retrieveByUUID(explorationUUID, retrieveOptions) {
        return Exploration.findOne({uuid: explorationUUID});
    }

    transform(exploration, retrieveOptions = {}, transformOptions = {}) {

        exploration.href = `${process.env.BASE_URL}/explorations/${exploration.uuid}`;


        delete exploration._id;
        delete exploration.uuid;

        return exploration;
    }

}

export default new ExplorationsRepository();