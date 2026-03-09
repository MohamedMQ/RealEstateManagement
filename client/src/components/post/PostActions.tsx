import React from "react";
import Tooltip from "../shared/Tooltip";
import { BookMarkedIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

interface PostActionsProps {
	upvotes: number | undefined;
	downvotes: number | undefined;
	handleUpvote: () => void;
	handleDownVote: () => void;
	handleBookmarkPost: () => void;
	isUpvoteLoading: boolean;
	isDownvoteLoading: boolean;
	isBookmarkLoading: boolean;
}

export default function PostActions({
	upvotes,
	downvotes,
	handleUpvote,
	handleDownVote,
	handleBookmarkPost,
	isUpvoteLoading,
	isBookmarkLoading,
	isDownvoteLoading,
}: PostActionsProps) {
	return (
		<div className="flex items-center gap-4">
			<Tooltip content="Upvote this post" position="right">
				<button
					onClick={handleUpvote}
					disabled={isUpvoteLoading}
					className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50"
				>
					<ThumbsUpIcon className="size-5" />
					<span>{upvotes}</span>
				</button>
			</Tooltip>
			<Tooltip content="Downvote this post">
				<button
					onClick={handleDownVote}
					disabled={isDownvoteLoading}
					className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50"
				>
					<ThumbsDownIcon className="size-5" />
					<span>{downvotes}</span>
				</button>
			</Tooltip>
			<Tooltip content="Bookmark this post">
				<button
					onClick={handleBookmarkPost}
					disabled={isBookmarkLoading}
					className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50"
				>
					<BookMarkedIcon className="size-5" />
				</button>
			</Tooltip>
		</div>
	);
}
