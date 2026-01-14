import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <main className="text-center p-4 sm:p-10 w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-purple-400">
          Welcome to Your To-Do App
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-gray-300">
          Organize your tasks, streamline your workflow, and boost your
          productivity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-base sm:text-lg transition duration-300 w-full sm:w-auto"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-base sm:text-lg transition duration-300 w-full sm:w-auto"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
