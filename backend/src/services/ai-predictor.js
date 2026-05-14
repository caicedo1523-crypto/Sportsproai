const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class AIPredictorService {
  async predictMatch(matchData) {
    try {
      const prompt = this.buildPredictionPrompt(matchData);
      
      const response = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional sports analyst expert in football predictions and value betting.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });
      
      return this.parsePredictionResponse(response.choices[0].message.content);
    } catch (error) {
      console.error('AI Prediction Error:', error);
      throw error;
    }
  }
  
  buildPredictionPrompt(matchData) {
    return `
Analiza este partido de fútbol y proporciona pronósticos profesionales:

Partido: ${matchData.home_team} vs ${matchData.away_team}
Liga: ${matchData.league}
Fecha: ${matchData.date}

Datos del equipo casa:
- Últimos 5 partidos: ${JSON.stringify(matchData.home_recent_form)}
- Posesión promedio: ${matchData.home_possession}%
- xG promedio: ${matchData.home_xg}
- Goles por partido: ${matchData.home_goals_per_game}

Datos del equipo visitante:
- ��ltimos 5 partidos: ${JSON.stringify(matchData.away_recent_form)}
- Posesión promedio: ${matchData.away_possession}%
- xG promedio: ${matchData.away_xg}
- Goles por partido: ${matchData.away_goals_per_game}

Cuotas disponibles:
- Casa: ${matchData.odds_home}
- Empate: ${matchData.odds_draw}
- Visitante: ${matchData.odds_away}
- Over 2.5: ${matchData.odds_over_2_5}
- Under 2.5: ${matchData.odds_under_2_5}

Proporciona en JSON:
{
  "prediction_1x2": "1/X/2",
  "probability_home": 0.0,
  "probability_draw": 0.0,
  "probability_away": 0.0,
  "expected_goals": 0.0,
  "recommended_pick": "descripción",
  "value_analysis": "análisis de valor",
  "confidence": "high/medium/low",
  "risk_level": "low/medium/high"
}
    `;
  }
  
  parsePredictionResponse(response) {
    try {
      const jsonMatch = response.match(/\{[^{}]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return null;
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return null;
    }
  }
  
  calculateValueBet(prediction, odds) {
    const impliedProbability = 1 / odds;
    const predictedProbability = prediction.probability_home;
    
    if (predictedProbability > impliedProbability) {
      const value = (predictedProbability * odds) - 1;
      return {
        is_value: value > 0.05,
        value_percentage: (value * 100).toFixed(2),
        edge: ((predictedProbability - impliedProbability) * 100).toFixed(2)
      };
    }
    
    return { is_value: false, value_percentage: 0 };
  }
}

module.exports = new AIPredictorService();
