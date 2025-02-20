import Link from "next/link";
export default function Custom404() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6">
        <h1 className="text-8xl font-bold text-red-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-600 mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 px-6 py-3 bg-red-500 text-white text-lg rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
        >
          🔙 Go Back Home
        </Link>
      </div>
    );
  }
  