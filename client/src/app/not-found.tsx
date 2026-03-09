import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 py-16">
			<div className="mx-auto max-w-md text-center">
				<p className="text-8xl font-black text-blue-600 dark:text-blue-400 sm:text-9xl">
					404
				</p>

				<h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
					Page not found
				</h1>
				<p className="mt-3 text-gray-500 dark:text-gray-400 leading-relaxed">
					Sorry, we could not find the page you are looking for.
				</p>

				<div className="mt-8">
					<Link
						href="/"
						className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors"
					>
						Go back home
					</Link>
				</div>
			</div>
		</main>
	);
}
