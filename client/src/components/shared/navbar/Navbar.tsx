import { HomeModernIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";
import ThemeSwitcher from "./ThemeSwitcher";
import AuthAvatar from "@/components/shared/navbar/AuthAvatar";

export default function Navbar() {
	return (
		<nav className="glass fixed z-50 w-full border-b border-gray-200 dark:border-gray-800 shadow-sm">
			<div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-12">
				<Link href="/" className="flex items-center gap-2.5 group">
					<HomeModernIcon className="size-8 text-blue-600 dark:text-blue-400" />
					<p className="font-bold text-gray-900 dark:text-white hidden sm:block text-lg tracking-tight">
						Alpha Apartments
					</p>
				</Link>

				<div className="flex items-center gap-2 sm:gap-3">
					<ThemeSwitcher />
					<AuthAvatar />
					<MobileNavbar />
				</div>
			</div>
		</nav>
	);
}
