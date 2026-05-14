-- Drop existing tables if they exist
DROP TABLE IF EXISTS match_events CASCADE;
DROP TABLE IF EXISTS team_statistics CASCADE;
DROP TABLE IF EXISTS predictions CASCADE;
DROP TABLE IF EXISTS matches CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS leagues CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    firebase_uid VARCHAR(255) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url TEXT,
    subscription_tier VARCHAR(50) DEFAULT 'free',
    is_premium BOOLEAN DEFAULT false,
    bankroll DECIMAL(10, 2) DEFAULT 0,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0,
    roi DECIMAL(5, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leagues table
CREATE TABLE leagues (
    id SERIAL PRIMARY KEY,
    api_id INT UNIQUE,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    logo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams table
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    api_id INT UNIQUE,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    logo_url TEXT,
    venue_name VARCHAR(255),
    venue_capacity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Matches table
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    api_id INT UNIQUE,
    league_id INT NOT NULL REFERENCES leagues(id),
    home_team_id INT NOT NULL REFERENCES teams(id),
    away_team_id INT NOT NULL REFERENCES teams(id),
    home_goals INT DEFAULT 0,
    away_goals INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'scheduled',
    start_time TIMESTAMP NOT NULL,
    elapsed_time INT DEFAULT 0,
    home_possession DECIMAL(5, 2),
    away_possession DECIMAL(5, 2),
    home_xg DECIMAL(5, 2),
    away_xg DECIMAL(5, 2),
    home_shots SMALLINT,
    away_shots SMALLINT,
    home_shots_on_target SMALLINT,
    away_shots_on_target SMALLINT,
    home_corners SMALLINT,
    away_corners SMALLINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Match Events table
CREATE TABLE match_events (
    id SERIAL PRIMARY KEY,
    match_id INT NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    event_type VARCHAR(50), -- 'goal', 'card', 'substitution', 'corner'
    minute INT,
    team_id INT NOT NULL REFERENCES teams(id),
    player_name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team Statistics table
CREATE TABLE team_statistics (
    id SERIAL PRIMARY KEY,
    team_id INT NOT NULL REFERENCES teams(id),
    league_id INT NOT NULL REFERENCES leagues(id),
    season INT,
    matches_played INT DEFAULT 0,
    wins INT DEFAULT 0,
    draws INT DEFAULT 0,
    losses INT DEFAULT 0,
    goals_for INT DEFAULT 0,
    goals_against INT DEFAULT 0,
    goals_difference INT DEFAULT 0,
    points INT DEFAULT 0,
    avg_possession DECIMAL(5, 2),
    avg_xg DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team_id, league_id, season)
);

-- Predictions table
CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    match_id INT NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    prediction_type VARCHAR(50), -- '1x2', 'over_under', 'both_teams_score'
    predicted_outcome VARCHAR(100),
    probability DECIMAL(5, 4),
    confidence VARCHAR(20), -- 'high', 'medium', 'low'
    risk_level VARCHAR(20),
    value_analysis TEXT,
    odds DECIMAL(6, 2),
    recommended_stake DECIMAL(10, 2),
    is_value_bet BOOLEAN DEFAULT false,
    value_percentage DECIMAL(5, 2),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'won', 'lost', 'cancelled'
    result VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_matches_league ON matches(league_id);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_start_time ON matches(start_time);
CREATE INDEX idx_match_events_match ON match_events(match_id);
CREATE INDEX idx_predictions_match ON predictions(match_id);
CREATE INDEX idx_team_stats_team ON team_statistics(team_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_firebase ON users(firebase_uid);
