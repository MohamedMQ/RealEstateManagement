import { useTheme } from "next-themes";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { ClockIcon, EyeIcon } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { getViewText } from "@/utils";

interface PostHeaderProps {
	title: string | undefined;
	avatar: string | undefined;
	author_username: string | undefined;
	created_at: string | undefined;
	view_count: number | undefined;
}

export default function PostHeader({
	avatar,
	author_username,
	created_at,
	view_count,
}: PostHeaderProps) {
	const { theme } = useTheme();

	return (
		<div className="flex items-center justify-between flex-wrap gap-3">
			<div className="flex items-center gap-3">
				<Avatar className="ring-2 ring-blue-400/50 ring-offset-1 ring-offset-white dark:ring-offset-gray-900">
					<AvatarImage
						src={
							avatar ??
							(theme === "dark"
								? "/assets/icons/user-profile-circle.svg"
								: "/assets/icons/user-profile-light-circle.svg")
						}
						alt="Author Avatar"
						className="size-10 rounded-full object-cover"
					/>
				</Avatar>
				<span className="font-semibold text-gray-800 dark:text-white text-lg">
					@{author_username}
				</span>
			</div>

			<div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
				<span className="flex items-center gap-1.5">
					<ClockIcon className="size-4 text-blue-500 dark:text-blue-400" />
					{created_at
						? formatDistanceToNow(parseISO(created_at), { addSuffix: true })
						: "Loading..."}
				</span>
				<span className="flex items-center gap-1.5">
					<EyeIcon className="size-4 text-blue-500 dark:text-blue-400" />
					{getViewText(view_count)}
				</span>
			</div>
		</div>
	);
}
