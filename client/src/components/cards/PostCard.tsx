"use client";

import { useGetAllPostsQuery } from "@/lib/redux/features/posts/postApiSlice";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { PostState } from "@/types";
import {
	formatDate,
	getRepliesText,
	getViewText,
	sortByDateDescending,
} from "@/utils";
import Spinner from "../shared/Spinner";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
	ArrowRight,
	Clock,
	Eye,
	MessageSquare,
	PlusCircle,
} from "lucide-react";
import PaginationSection from "../shared/PaginationSection";

export default function PostCard() {
	const page = useAppSelector((state: PostState) => state.post.page);
	const { data, isLoading } = useGetAllPostsQuery({ page });

	const totalCount = data?.posts.count || 0;
	const totalPages = Math.ceil(totalCount / 9);

	const sortedPosts = sortByDateDescending(
		data?.posts.results ?? [],
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
		<div className="animate-fade-in-up">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
				<div>
					<h1 className="font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">
						Community Posts
					</h1>
					<p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
						{data?.posts.results.length ?? 0} posts from your community
					</p>
				</div>
				<Link href="/add-post" className="self-start sm:self-auto">
					<Button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 transition-colors">
						<PlusCircle className="size-4" />
						New Post
					</Button>
				</Link>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{sortedPosts && sortedPosts.length > 0 ? (
					sortedPosts.map((postItem) => (
						<article
							key={postItem.id}
							className="group flex flex-col bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200"
						>
							<div className="p-5 flex flex-col flex-1">
								<h2 className="font-semibold text-base text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
									{postItem.title}
								</h2>

								<p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-1">
									{postItem.body.length > 120
										? `${postItem.body.substring(0, 120)}…`
										: postItem.body}
								</p>

								<div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-3">
									<Clock className="size-3" />
									<span>{formatDate(postItem.created_at).toString()}</span>
									<span className="text-gray-300 dark:text-gray-600">·</span>
									<span>
										{formatDistanceToNow(parseISO(postItem.updated_at), {
											addSuffix: true,
										})}
									</span>
								</div>

								<div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
									<Link href={`/post/${postItem.slug}`}>
										<span className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 inline-flex items-center gap-1 transition-colors">
											Read more
											<ArrowRight className="size-3" />
										</span>
									</Link>

									<div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
										<span className="flex items-center gap-1">
											<Eye className="size-3.5" />
											{getViewText(postItem.view_count)}
										</span>
										<span className="flex items-center gap-1">
											<MessageSquare className="size-3.5" />
											{getRepliesText(postItem.replies_count)}
										</span>
									</div>
								</div>
							</div>
						</article>
					))
				) : (
					<div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
						<MessageSquare className="size-10 mb-3 text-gray-300 dark:text-gray-600" />
						<p className="text-base font-medium text-gray-500 dark:text-gray-400">
							No posts yet — be the first to share something!
						</p>
						<Link href="/add-post" className="mt-4">
							<Button
								size="sm"
								className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
							>
								Create post
							</Button>
						</Link>
					</div>
				)}
			</div>

			<div className="mt-6">
				<PaginationSection totalPages={totalPages} entityType="post" />
			</div>
		</div>
	);
}
