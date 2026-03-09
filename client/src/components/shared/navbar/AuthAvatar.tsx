"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthNavigation } from "@/hooks";
import { useUserProfile } from "@/hooks/useUseProfile";
import { BookMarked, CircleUser, LogOut, User, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AuthAvatar() {
	const { handleLogout } = useAuthNavigation();

	const { profile, isLoading, isError } = useUserProfile();

	if (isLoading) {
		return null;
	}

	if (isError) {
		return null;
	}

	return (
		<div>
			{profile && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className="cursor-pointer size-9 ring-2 ring-blue-400/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-950 hover:ring-blue-500/70 transition-all">
							<AvatarImage alt="auth image" src={profile.avatar} />
							<AvatarFallback className="bg-blue-600">
								<CircleUser className="text-white size-5" />
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>

					<DropdownMenuContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-1 min-w-[180px]">
						<DropdownMenuLabel className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 pb-2 border-b border-gray-100 dark:border-gray-800">
							My Account
						</DropdownMenuLabel>
						<DropdownMenuSeparator className="bg-transparent" />
						<DropdownMenuItem className="rounded-md cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100">
							<Link href="/profile" className="flex items-center gap-2 w-full">
								<User className="size-4" /> My Profile
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem className="rounded-md cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100">
							<Link href="/tenants" className="flex items-center gap-2 w-full">
								<Users className="size-4" /> Tenants
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem className="rounded-md cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100">
							<Link href="/bookmark" className="flex items-center gap-2 w-full">
								<BookMarked className="size-4" /> My Bookmarks
							</Link>
						</DropdownMenuItem>

						<DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800 my-1" />

						<DropdownMenuItem
							onClick={handleLogout}
							className="rounded-md cursor-pointer text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-700 flex items-center gap-2"
						>
							<LogOut className="size-4" /> Log Out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
}
