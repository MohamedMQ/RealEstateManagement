"use client";

import { useGetAllMyBookmarksQuery } from "@/lib/redux/features/posts/postApiSlice";
import {
	formatDate,
	getRepliesText,
	getViewText,
	sortByDateDescending,
} from "@/utils";
import Spinner from "../shared/Spinner";
import { formatDistanceToNow, parseISO } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { Bookmark, EyeIcon, MessageSquareQuoteIcon } from "lucide-react";

export default function BookmarkedPostCard() {
	const { data, isLoading } = useGetAllMyBookmarksQuery();
	const bookmarks = data?.bookmarked_posts;

	const sortedBookmarks = sortByDateDescending(
		bookmarks?.results ?? [],
		"created_at",
	);

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}
	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3">
				<Bookmark className="size-7 text-blue-600 dark:text-blue-400" />
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					My Bookmarks
					<span className="ml-2 text-lg font-normal text-gray-500 dark:text-gray-400">
						({bookmarks?.results.length ?? 0})
					</span>
				</h1>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{sortedBookmarks && sortedBookmarks.length > 0 ? (
					sortedBookmarks.map((bookmarkItem) => (
						<div
							key={bookmarkItem.id}
							className="card-hover relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
						>
							<div className="absolute top-3 right-3">
								<Bookmark className="size-4 fill-amber-400 text-amber-400" />
							</div>
							<div className="p-5 pr-10">
								<h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
									{bookmarkItem.title.length > 40
										? `${bookmarkItem.title.substring(0, 40)}...`
										: bookmarkItem.title}
								</h3>

								<div className="flex text-xs text-gray-400 dark:text-gray-500 gap-3 mb-3">
									<span>
										Posted {formatDate(bookmarkItem.created_at).toString()}
									</span>
									<span>
										Updated{" "}
										{formatDistanceToNow(parseISO(bookmarkItem.updated_at), {
											addSuffix: true,
										})}
									</span>
								</div>

								<p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
									{bookmarkItem.body.length > 80
										? `${bookmarkItem.body.substring(0, 80)}...`
										: bookmarkItem.body}
								</p>

								<div className="flex items-center justify-between">
									<Link href={`/post/${bookmarkItem.slug}`}>
										<Button
											size="sm"
											className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
										>
											View Post
										</Button>
									</Link>
									<div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
										<span className="flex items-center gap-1">
											<EyeIcon className="size-4 text-blue-500 dark:text-blue-400" />
											{getViewText(bookmarkItem.view_count)}
										</span>
										<span className="flex items-center gap-1">
											<MessageSquareQuoteIcon className="size-4 text-blue-500 dark:text-blue-400" />
											{getRepliesText(bookmarkItem.replies.length)}
										</span>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="col-span-2 flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
						<Bookmark className="size-12 mb-3 opacity-30" />
						<p className="text-lg font-medium">No bookmarks yet</p>
					</div>
				)}
			</div>
		</div>
	);
}
