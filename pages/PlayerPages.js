// Importations nécessaires
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

// 1. Page : Graphique interactif
const PlayerValueChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const data = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
    const ctx = document.getElementById('playerChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((_, i) => `Joueur ${i + 1}`),
        datasets: [
          {
            label: 'Valeur marchande (M€)',
            data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      },
    });

    setChartData(data);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">Graphique des Valeurs Marchandes</h1>
      <canvas id="playerChart" width="400" height="200" />
    </div>
  );
};

// 2. Page : Recherche et filtres
const PlayerSearch = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minValue, setMinValue] = useState(0);

  useEffect(() => {
    const data = Array.from({ length: 1000 }, (_, i) => ({
      name: `Joueur ${i + 1}`,
      value: Math.floor(Math.random() * 100),
    }));
    setPlayers(data);
  }, []);

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) && player.value >= minValue
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">Recherche et Filtres</h1>
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Rechercher un joueur"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white"
        />
        <input
          type="number"
          placeholder="Valeur minimale (M€)"
          value={minValue}
          onChange={(e) => setMinValue(Number(e.target.value))}
          className="px-4 py-2 rounded bg-gray-800 text-white"
        />
      </div>

      <div className="overflow-y-auto max-h-96 w-full px-4">
        <table className="table-auto w-full bg-gray-800">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Valeur (M€)</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                <td className="px-4 py-2">{player.name}</td>
                <td className="px-4 py-2">{player.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 3. Page : Classements et statistiques
const PlayerRanking = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const data = Array.from({ length: 100 }, (_, i) => ({
      name: `Joueur ${i + 1}`,
      value: Math.floor(Math.random() * 100),
    })).sort((a, b) => b.value - a.value);
    setPlayers(data);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">Classements et Statistiques</h1>
      <div className="overflow-y-auto max-h-96 w-full px-4">
        <table className="table-auto w-full bg-gray-800">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2">Classement</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Valeur (M€)</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                <td className="px-4 py-2">#{index + 1}</td>
                <td className="px-4 py-2">{player.name}</td>
                <td className="px-4 py-2">{player.value} M€</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default { PlayerValueChart, PlayerSearch, PlayerRanking };
