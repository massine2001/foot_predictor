// Importations nécessaires
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

// 1. Page : Graphique interactif

const PlayerValueChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const data = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
    const labels = data.map((_, i) => `Joueur ${i + 1}`);

    const ctx = document.getElementById('playerChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Valeur marchande (M€)',
            data,
            backgroundColor: data.map((value) =>
              value > 70
                ? 'rgba(255, 99, 132, 0.8)'
                : value > 40
                ? 'rgba(75, 192, 192, 0.8)'
                : 'rgba(54, 162, 235, 0.8)'
            ),
            borderRadius: 5,
          },
          {
            type: 'line',
            label: 'Tendance',
            data,
            borderColor: 'rgba(255, 205, 86, 0.8)',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleFont: { size: 16 },
            bodyFont: { size: 14 },
            footerFont: { style: 'italic' },
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#ffffff',
              font: { size: 14 },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#ffffff',
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              color: '#ffffff',
              stepSize: 20,
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
        animation: {
          duration: 1500,
          easing: 'easeOutBounce',
        },
      },
    });

    setChartData(data);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center">
        Valeurs Marchandes <span className="text-yellow-400">Incroyables</span>
      </h1>
      <div className="w-11/12 md:w-3/4 h-96 bg-gray-800 rounded-lg shadow-lg p-4">
        <canvas id="playerChart" />
      </div>
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

const PlayerHeatmap = () => {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const data = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
    );
    setHeatmapData(data);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-800 to-blue-900 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">Carte de Chaleur des Valeurs</h1>
      <div className="grid grid-cols-10 gap-1">
        {heatmapData.flat().map((value, index) => (
          <div
            key={index}
            className="w-10 h-10 md:w-14 md:h-14"
            style={{
              backgroundColor: `rgba(255, ${255 - value * 2}, ${255 - value * 2}, 1)`,
            }}
          >
            <p className="text-sm text-center pt-2">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlayerScatterPlot = () => {
  useEffect(() => {
    const data = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));

    const ctx = document.getElementById('scatterChart').getContext('2d');

    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Valeur par Rapport',
            data,
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            ticks: { color: '#ffffff' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
          },
          y: {
            ticks: { color: '#ffffff' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
          },
        },
      },
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-center">Nuage de Points Interactif</h1>
      <div className="w-11/12 md:w-3/4 h-96 bg-gray-800 rounded-lg shadow-lg p-4">
        <canvas id="scatterChart" />
      </div>
    </div>
  );
};

const PlayerTimeline = () => {
  useEffect(() => {
    const data = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));

    const ctx = document.getElementById('timelineChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => `Jour ${i + 1}`),
        datasets: [
          {
            label: 'Évolution de Valeur (M€)',
            data,
            borderColor: 'rgba(75, 192, 192, 0.8)',
            borderWidth: 2,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000,
          easing: 'easeOutQuart',
        },
        scales: {
          x: {
            ticks: { color: '#ffffff' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
          },
          y: {
            ticks: { color: '#ffffff' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
          },
        },
      },
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-t from-blue-900 to-gray-900 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Ligne du Temps Dynamique</h1>
      <div className="w-11/12 md:w-3/4 h-96 bg-gray-800 rounded-lg shadow-lg p-4">
        <canvas id="timelineChart" />
      </div>
    </div>
  );
};


export { PlayerValueChart, PlayerSearch, PlayerRanking, PlayerHeatmap, PlayerScatterPlot, PlayerTimeline };
