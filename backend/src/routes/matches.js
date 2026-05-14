const express = require('express');
const router = express.Router();
const MatchesController = require('../controllers/matches-controller');

router.get('/', MatchesController.getAllMatches.bind(MatchesController));
router.get('/live', MatchesController.getLiveMatches.bind(MatchesController));
router.get('/:id', MatchesController.getMatchById.bind(MatchesController));
router.get('/:id/prediction', MatchesController.getPrediction.bind(MatchesController));

module.exports = router;
