"use client";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetTrigger,
} from "@/components/ui/sheet";
import { leftNavLinks } from "@/constants";
import { useAuthNavigation } from "@/hooks";
import { HomeModernIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LeftNavContent() {
	const pathname = usePathname();

	const { filteredNavLinks } = useAuthNavigation();
	return (
		<section className="flex h-full flex-col gap-1 pt-2">
			{filteredNavLinks.map((linkItem) => {
				const isActive =
					(pathname.includes(linkItem.path) && linkItem.path.length > 1) ||
					pathname === linkItem.path;
				return (
					<SheetClose asChild key={linkItem.path}>
						<Link
							href={linkItem.path}
							className={`${isActive ? "border-l-2 border-blue-600 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400" : "border-l-2 border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"} flex items-center gap-3 rounded-r-lg pl-3 pr-3 py-2.5 transition-all duration-200`}
						>
							<Image
								src={linkItem.imgLocation}
								alt={linkItem.label}
								width={20}
								height={20}
								className={`${isActive ? "opacity-100" : "color-invert"} flex-shrink-0`}
							/>
							<p
								className={`${isActive ? "font-semibold" : "font-medium"} text-sm`}
							>
								{linkItem.label}
							</p>
						</Link>
					</SheetClose>
				);
			})}
		</section>
	);
}

export default function MobileNavbar() {
	const { handleLogout, isAuthenticated } = useAuthNavigation();
	return (
		<Sheet>
			<SheetTrigger asChild className="cursor-pointer">
				<Image
					src="/assets/icons/mobile-menu.svg"
					alt="Mobile Menu"
					width={36}
					height={36}
					className="invert-colors sm:hidden"
				/>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800"
			>
				<Link href="/" className="flex items-center gap-2 mb-6">
					<HomeModernIcon className="size-8 text-blue-600" />
					<p className="font-bold text-gray-900 dark:text-white text-lg">
						Alpha{" "}
						<span className="text-blue-600 dark:text-blue-400">Apartments</span>
					</p>
				</Link>

				<div>
					<SheetClose asChild>
						<LeftNavContent />
					</SheetClose>

					<SheetClose asChild>
						<SheetFooter className="mt-6 flex flex-col gap-2">
							{isAuthenticated ? (
								<Button
									onClick={handleLogout}
									className="w-full rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
								>
									Log Out
								</Button>
							) : (
								<>
									<Link href="/register" className="w-full">
										<Button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
											Register
										</Button>
									</Link>
									<Link href="/login" className="w-full">
										<Button
											variant="outline"
											className="w-full rounded-lg border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
										>
											Login
										</Button>
									</Link>
								</>
							)}
						</SheetFooter>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
}
