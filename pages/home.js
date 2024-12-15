import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Bienvenue sur le Site</h1>
      <nav className="flex space-x-6">
        <Link href="/graphique">
          <a className="text-blue-500 hover:underline">Graphique Interactif</a>
        </Link>
        <Link href="/recherche">
          <a className="text-blue-500 hover:underline">Recherche et Filtres</a>
        </Link>
        <Link href="/classements">
          <a className="text-blue-500 hover:underline">Classements</a>
        </Link>
      </nav>
    </div>
  );
};

export default Home;
