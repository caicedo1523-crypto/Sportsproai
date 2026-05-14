const axios = require('axios');

class SportsAPIService {
  constructor() {
    this.footballAPI = axios.create({
      baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
      headers: {
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.API_FOOTBALL_KEY
      }
    });
  }
  
  async getLiveMatches() {
    try {
      const response = await this.footballAPI.get('/fixtures', {
        params: { live: 'all' }
      });
      return response.data.response;
    } catch (error) {
      console.error('Error fetching live matches:', error);
      return [];
    }
  }
  
  async getMatchDetails(fixtureId) {
    try {
      const response = await this.footballAPI.get('/fixtures', {
        params: { id: fixtureId }
      });
      return response.data.response[0];
    } catch (error) {
      console.error('Error fetching match details:', error);
      return null;
    }
  }
  
  async getTeamStats(teamId, leagueId, season) {
    try {
      const response = await this.footballAPI.get('/teams/statistics', {
        params: { team: teamId, league: leagueId, season }
      });
      return response.data.response;
    } catch (error) {
      console.error('Error fetching team stats:', error);
      return null;
    }
  }
  
  async getLeagueStandings(leagueId, season) {
    try {
      const response = await this.footballAPI.get('/standings', {
        params: { league: leagueId, season }
      });
      return response.data.response[0].standings;
    } catch (error) {
      console.error('Error fetching standings:', error);
      return null;
    }
  }
}

module.exports = new SportsAPIService();
