// Importations nécessaires
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PredictionHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/api/history');
        setHistory(response.data.history);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">Historique des Prédictions</h1>
      {loading ? (
        <p>Chargement de l'historique...</p>
      ) : (
        <table className="table-auto w-full max-w-4xl bg-gray-800 rounded-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Équipe A</th>
              <th className="px-4 py-2">Équipe B</th>
              <th className="px-4 py-2">Score Prédit</th>
              <th className="px-4 py-2">Score Réel</th>
            </tr>
          </thead>
          <tbody>
            {history.map((match, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="border px-4 py-2">{match.date}</td>
                <td className="border px-4 py-2">{match.teamA}</td>
                <td className="border px-4 py-2">{match.teamB}</td>
                <td className="border px-4 py-2">{match.predictedScoreA} - {match.predictedScoreB}</td>
                <td className="border px-4 py-2">
                  {match.actualScoreA !== null && match.actualScoreB !== null 
                    ? `${match.actualScoreA} - ${match.actualScoreB}` 
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PredictionHistoryPage;
