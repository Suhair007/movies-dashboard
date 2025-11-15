import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
        <p className="text-gray-400 mb-8">
          The movie you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

