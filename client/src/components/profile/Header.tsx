"use client";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { useTheme } from "next-themes";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
	const { data } = useGetUserProfileQuery();
	const { theme } = useTheme();
	const profile = data?.profile;
	return (
		<div className="flex flex-col items-center gap-4 py-6">
			<Avatar className="size-32 rounded-full ring-4 ring-blue-400/50 ring-offset-4 ring-offset-white dark:ring-offset-gray-950 overflow-hidden">
				<AvatarImage
					src={
						profile?.avatar ||
						(theme === "dark"
							? "/assets/icons/user-profile-circle.svg"
							: "/assets/icons/user-profile-light-circle.svg")
					}
					alt="profile image"
					width={128}
					height={128}
					className="object-cover"
				/>
			</Avatar>
			<div className="text-center space-y-1">
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
					{profile?.full_name}
				</h1>
				<p className="text-blue-600 dark:text-blue-400 font-medium">
					@{profile?.username}
				</p>
			</div>
		</div>
	);
}
