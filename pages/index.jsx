import React, { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import Particles from 'react-tsparticles';

const HomePage = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 0.5, 1],
      y: [50, 0],
      transition: { duration: 2, ease: "easeInOut" }
    });
  }, [controls]);

  return (
    <MainLayout>
      {/* Animation de particules */}
      <Particles
        className="absolute inset-0 z-0"
        options={{
          background: { color: "#000000" },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#ffffff", opacity: 0.2 },
            move: { enable: true, speed: 1 },
            size: { value: 2 },
          },
        }}
      />

      {/* Image de fond floutée d'un stade */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-lg opacity-50 z-0"
        style={{
          backgroundImage: "url('/images/foot.avif')"
        }}
      />

      <div className="min-h-screen flex flex-col items-center justify-center relative z-10 text-white">
        {/* Titre avec effet d’émergence */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 text-center opacity-0"
          animate={controls}
        >
          Prédisez les Scores de Matchs avec l'IA!
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          className="text-lg md:text-xl text-center mb-12 max-w-xl opacity-0 blur-sm"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 1.2 }}
        >
          Découvrez notre projet IA qui utilise les données de matchs pour anticiper les scores avec précision.
        </motion.p>

        {/* Bouton de prédiction */}
        <Link href="/PredictionPage">
          <motion.button
            className="px-10 py-5 bg-gradient-to-r from-blue-500 via-blue-700 to-purple-500 text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl transition-transform"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 15px rgba(0, 153, 255, 0.7)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            Lancez une Prédiction
          </motion.button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default HomePage;
