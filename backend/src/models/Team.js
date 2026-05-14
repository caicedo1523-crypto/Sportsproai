const pool = require('../config/database');

class Team {
  static async getById(id) {
    const query = `
      SELECT * FROM teams WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
  
  static async getStats(teamId) {
    const query = `
      SELECT 
        t.*,
        COUNT(CASE WHEN m.home_team_id = t.id AND m.status = 'finished' THEN 1 END) as matches_played,
        SUM(CASE WHEN m.home_team_id = t.id AND m.home_goals > m.away_goals THEN 1 ELSE 0 END) as wins,
        SUM(CASE WHEN m.home_team_id = t.id AND m.home_goals = m.away_goals THEN 1 ELSE 0 END) as draws,
        SUM(CASE WHEN m.home_team_id = t.id AND m.home_goals < m.away_goals THEN 1 ELSE 0 END) as losses,
        SUM(CASE WHEN m.home_team_id = t.id THEN m.home_goals ELSE 0 END) as goals_for
      FROM teams t
      LEFT JOIN matches m ON (m.home_team_id = t.id OR m.away_team_id = t.id)
      WHERE t.id = $1
      GROUP BY t.id
    `;
    
    const result = await pool.query(query, [teamId]);
    return result.rows[0];
  }
}

module.exports = Team;
