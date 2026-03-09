import buildings from "@/../public/assets/images/buildings.webp";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { HomeModernIcon } from "@heroicons/react/24/solid";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Home | Alpha Apartments",
	description:
		"Alpha Apartments Home Page. Create your account to get started.",
};

export default function HomePage() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-gray-950">
			<div className="absolute inset-0 z-0">
				<Image
					src={buildings}
					alt="Apartments"
					fill
					style={{ objectFit: "cover", objectPosition: "center" }}
					priority
				/>
				<div className="absolute inset-0 bg-gray-950/70" />
				<div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
			</div>

			<nav className="relative z-20 flex items-center justify-between px-6 py-5 lg:px-16">
				<Link href="/" className="flex items-center gap-2.5">
					<HomeModernIcon className="size-8 text-white" />
					<span className="font-bold text-white text-xl tracking-tight">
						Alpha Apartments
					</span>
				</Link>
				<div className="flex items-center gap-3">
					<Link href="/login">
						<button className="px-5 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200">
							Sign In
						</button>
					</Link>
					<Link href="/register">
						<button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors duration-200">
							Get Started
						</button>
					</Link>
				</div>
			</nav>

			<main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 text-center">
				<h1 className="font-bold text-white leading-[1.1] mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl tracking-tight">
					Your apartment, <span className="text-blue-400">your community</span>
				</h1>

				<p className="text-gray-400 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
					Connect with tenants, report issues, find technicians, and manage your
					apartment life — all in one place.
				</p>

				<div className="flex flex-col sm:flex-row items-center gap-3">
					<Link href="/register" prefetch={false}>
						<button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors duration-200 group">
							Create Your Account
							<ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
						</button>
					</Link>
					<Link href="/login" prefetch={false}>
						<button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200">
							Already a tenant? Sign in
						</button>
					</Link>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-2 mt-16">
					{[
						"Post Updates",
						"Report Issues",
						"Find Technicians",
						"Connect with Tenants",
						"Manage Your Profile",
					].map((feat) => (
						<span
							key={feat}
							className="px-3.5 py-1.5 rounded-full text-sm text-gray-400 bg-white/5 border border-white/10"
						>
							{feat}
						</span>
					))}
				</div>
			</main>
		</div>
	);
}
