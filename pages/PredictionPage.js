// Importations nécessaires
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const PredictionPage = () => {
  const router = useRouter();
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/predict', { teamA, teamB, matchDate });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Erreur lors de la prédiction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">Prédiction de Score</h1>
      
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Équipe A"
          value={teamA}
          onChange={(e) => setTeamA(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
        />
        
        <input
          type="text"
          placeholder="Équipe B"
          value={teamB}
          onChange={(e) => setTeamB(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
        />

        <input
          type="date"
          value={matchDate}
          onChange={(e) => setMatchDate(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
        />
        
        <button
          onClick={handlePredict}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold"
          disabled={loading}
        >
          {loading ? 'Prédiction en cours...' : 'Obtenir la Prédiction'}
        </button>
      </div>

      {prediction && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-bold">Score Prévu</h2>
          <p>{teamA} : {prediction.teamAScore} - {teamB} : {prediction.teamBScore}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
