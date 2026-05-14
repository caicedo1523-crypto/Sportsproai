const pool = require('../config/database');

class Match {
  static async getAll(filters = {}) {
    let query = `
      SELECT m.*, 
             home_team.name as home_team_name,
             away_team.name as away_team_name,
             league.name as league_name
      FROM matches m
      JOIN teams home_team ON m.home_team_id = home_team.id
      JOIN teams away_team ON m.away_team_id = away_team.id
      JOIN leagues league ON m.league_id = league.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (filters.status) {
      query += ` AND m.status = $${params.length + 1}`;
      params.push(filters.status);
    }
    
    if (filters.league_id) {
      query += ` AND m.league_id = $${params.length + 1}`;
      params.push(filters.league_id);
    }
    
    query += ` ORDER BY m.start_time DESC LIMIT 100`;
    
    const result = await pool.query(query, params);
    return result.rows;
  }
  
  static async getById(id) {
    const query = `
      SELECT m.*, 
             home_team.name as home_team_name,
             away_team.name as away_team_name,
             league.name as league_name
      FROM matches m
      JOIN teams home_team ON m.home_team_id = home_team.id
      JOIN teams away_team ON m.away_team_id = away_team.id
      JOIN leagues league ON m.league_id = league.id
      WHERE m.id = $1
    `;
    
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
  
  static async updateScore(matchId, homeScore, awayScore) {
    const query = `
      UPDATE matches 
      SET home_goals = $1, away_goals = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `;
    
    const result = await pool.query(query, [homeScore, awayScore, matchId]);
    return result.rows[0];
  }
}

module.exports = Match;
