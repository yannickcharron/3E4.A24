import express from 'express';
import paginate from 'express-paginate';
import HttpError from 'http-errors';

import { handlePageURLParam } from '../middlewares/page.value.middleware.js';

import explorationsRepository from '../repositories/exploration.repository.js';

const router = express.Router();

router.get('/', handlePageURLParam, paginate.middleware(20, 50), getAll);
router.get('/:uuidExploration', getOne);

async function getAll(req, res, next) {

    const retrieveOptions = {
        limit: req.query.limit,
        skip: req.skip
    };
    
    try {
        const responseBody = {};

        const totalDocuments = await explorationsRepository.count();
        let explorations = await explorationsRepository.retrieveByCriteria({}, retrieveOptions);
        explorations = explorations.map(e => {
            e = e.toObject({getters:false, virtuals:false});
            e = explorationsRepository.transform(e);
            return e;
        });

        responseBody._metadata = {
            hasNextPage: true,
            page: req.query.page,
            limit: req.query.limit,
            skip: req.query.skip,
            totalPages: Math.ceil(totalDocuments / req.query.limit),
            totalDocuments:totalDocuments
        };
        responseBody._links = {
            prev:``,
            self:``,
            next:``
        };
        responseBody.data = explorations;

        res.status(200).json(responseBody);

    } catch(err) {
        return next(err);
    }
}

async function getOne(req, res, next) {
    //TODO: Retrouver une exploration spécifique
}

export default router;
