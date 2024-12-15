// Importations nécessaires
import React, { useState, useEffect } from 'react';

const generateFakeData = (count) => {
  const players = [];
  for (let i = 1; i <= count; i++) {
    players.push({
      name: `Joueur ${i}`,
      predictedValue: (Math.random() * 100).toFixed(2) + ' M€',
    });
  }
  return players;
};

const PlayerMarketTable = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Génération de données factices pour 1000 joueurs
    const fakeData = generateFakeData(1000);
    setPlayers(fakeData);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">Valeurs Marchandes des Joueurs</h1>

      <div className="overflow-x-auto w-full px-4">
        <table className="table-auto w-full bg-gray-800 text-left border border-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 border-b border-gray-600">Nom du Joueur</th>
              <th className="px-4 py-2 border-b border-gray-600">Valeur Prédite (2024)</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                <td className="px-4 py-2 border-b border-gray-600">{player.name}</td>
                <td className="px-4 py-2 border-b border-gray-600">{player.predictedValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerMarketTable;
