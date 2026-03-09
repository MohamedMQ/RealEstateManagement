"use client";
import { Button } from "@/components/ui/button";
import { leftNavLinks } from "@/constants";
import { useAuthNavigation } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftNavbar() {
	const pathname = usePathname();
	const { handleLogout, filteredNavLinks, isAuthenticated } =
		useAuthNavigation();
	return (
		<section className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-4 pt-20 max-sm:hidden lg:w-[260px]">
			<div className="flex flex-1 flex-col gap-0.5 mt-4">
				{filteredNavLinks.map((linkItem) => {
					const isActive =
						(pathname.includes(linkItem.path) && linkItem.path.length > 1) ||
						pathname === linkItem.path;
					return (
						<Link
							href={linkItem.path}
							key={linkItem.label}
							className={`${
								isActive
									? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold"
									: "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
							} flex items-center justify-start gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150`}
						>
							<Image
								src={linkItem.imgLocation}
								alt={linkItem.label}
								width={20}
								height={20}
								className={`${isActive ? "opacity-100" : "opacity-60 dark:opacity-50"} flex-shrink-0 color-invert`}
							/>
							<p className={`text-sm max-lg:hidden`}>{linkItem.label}</p>
						</Link>
					);
				})}
			</div>

			{isAuthenticated ? (
				<div className="flex flex-col gap-2 pb-4">
					<Button
						onClick={handleLogout}
						className="w-full rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-none transition-colors"
					>
						Log Out
					</Button>
				</div>
			) : (
				<div className="flex flex-col gap-2 pb-4">
					<Link href="/login" className="w-full">
						<Button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-none transition-colors">
							Login
						</Button>
					</Link>
					<Link href="/register" className="w-full">
						<Button
							variant="outline"
							className="w-full rounded-lg border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium shadow-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
						>
							Register
						</Button>
					</Link>
				</div>
			)}
		</section>
	);
}
