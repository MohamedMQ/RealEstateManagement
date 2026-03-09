import { Reply } from "@/types";
import { useTheme } from "next-themes";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow, parseISO } from "date-fns";

interface ReplyProps {
	reply: Reply;
}

export default function RepliesList({ reply }: ReplyProps) {
	const { theme } = useTheme();
	return (
		<div className="flex items-start gap-3 py-3">
			<Avatar className="ring-2 ring-blue-300 dark:ring-blue-600 ring-offset-1 flex-shrink-0">
				<AvatarImage
					src={
						reply.avatar ??
						(theme === "dark"
							? "/assets/icons/user-profile-circle.svg"
							: "/assets/icons/user-profile-light-circle.svg")
					}
					alt="Author Avatar"
					className="rounded-full"
					width={36}
					height={36}
				/>
			</Avatar>
			<div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
				<div className="flex items-center gap-3 mb-1">
					<span className="font-semibold text-gray-800 dark:text-white text-sm">
						@{reply.author_username}
					</span>
					<span className="text-xs text-gray-400 dark:text-gray-500">
						{formatDistanceToNow(parseISO(reply.created_at), {
							addSuffix: true,
						})}
					</span>
				</div>
				<p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
					{reply.body}
				</p>
			</div>
		</div>
	);
}
