import express from 'express';
import paginate, { hasNextPages } from 'express-paginate';
import HttpError from 'http-errors';
import { PAGE_LINKS_NUMBER } from '../core/constants.js';
import { handlePageURLParam } from '../middlewares/page.value.middleware.js';

import explorationsRepository from '../repositories/exploration.repository.js';
import explorationRepository from '../repositories/exploration.repository.js';

const router = express.Router();

router.get('/', handlePageURLParam, paginate.middleware(20, 50), getAll);
router.get('/:uuidExploration', getOne);

async function getAll(req, res, next) {
  const retrieveOptions = {
    limit: req.query.limit,
    skip: req.skip,
  };

  try {
    const responseBody = {};

    let [explorations, totalDocuments] = await explorationsRepository.retrieveByCriteria({}, retrieveOptions);
    explorations = explorations.map((e) => {
      e = e.toObject({ getters: false, virtuals: false });
      e = explorationsRepository.transform(e);
      return e;
    });

    const totalPages = Math.ceil(totalDocuments / req.query.limit);
    const pageLinksFunction = paginate.getArrayPages(req);
    let pageLinks = pageLinksFunction(PAGE_LINKS_NUMBER, totalPages, req.query.page);

    responseBody._metadata = {
      hasNextPage: req.query.page < totalPages,
      page: req.query.page,
      limit: req.query.limit,
      skip: req.query.skip,
      totalPages: totalPages,
      totalDocuments: totalDocuments,
    };
    responseBody._links = {};

    let _links = ['prev', 'self', 'next'];

    if (req.query.page === 1) {
      _links = _links.splice(1, 2);
    }

    if (req.query.page === totalPages) {
      _links = _links.slice(0, 2);
      pageLinks = pageLinks.slice(1);
    }

    _links.forEach((link, index) => {
      responseBody._links[link] = `${process.env.BASE_URL}${pageLinks[index].url}`;
      //responseBody._links.prev link = 'prev';
    });

    responseBody.data = explorations;

    res.status(200).json(responseBody);
  } catch (err) {
    return next(err);
  }
}

async function getOne(req, res, next) {
  try {
    let exploration = await explorationsRepository.retrieveByUUID(req.params.uuidExploration);
    if(!exploration) {
        return next(HttpError.NotFound(`L'exploration avec le uuid ${req.params.uuidExploration} n'existe pas.`));
    }

    exploration = exploration.toObject({ getters:false, virtuals: false});
    exploration = explorationRepository.transform(exploration);

    res.status(200).json(exploration);

  } catch (err) {
    return next(err);
  }
}

export default router;
