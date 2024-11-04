// Importations nécessaires
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

const StatisticsPage = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('/api/statistics');
        setChartData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques:", error);
      }
    };

    fetchStatistics();
  }, []);

  if (!chartData) {
    return <p className="text-white">Chargement des statistiques...</p>;
  }

  const barData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Précision des prédictions (%)',
        data: chartData.accuracy,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Erreur moyenne des prédictions',
        data: chartData.averageError,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">Statistiques de Prédiction</h1>
      <div className="w-full max-w-4xl mb-8">
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <div className="w-full max-w-4xl">
        <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default StatisticsPage;
