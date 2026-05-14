const Match = require('../models/Match');
const SportsAPIService = require('../services/sports-api');
const AIPredictorService = require('../services/ai-predictor');

class MatchesController {
  async getAllMatches(req, res) {
    try {
      const filters = {
        status: req.query.status,
        league_id: req.query.league_id
      };
      
      const matches = await Match.getAll(filters);
      res.json({ success: true, data: matches });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async getLiveMatches(req, res) {
    try {
      const liveMatches = await SportsAPIService.getLiveMatches();
      res.json({ success: true, data: liveMatches });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async getMatchById(req, res) {
    try {
      const match = await Match.getById(req.params.id);
      if (!match) {
        return res.status(404).json({ error: 'Match not found' });
      }
      res.json({ success: true, data: match });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async getPrediction(req, res) {
    try {
      const match = await Match.getById(req.params.id);
      if (!match) {
        return res.status(404).json({ error: 'Match not found' });
      }
      
      const prediction = await AIPredictorService.predictMatch(match);
      res.json({ success: true, data: prediction });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MatchesController();
