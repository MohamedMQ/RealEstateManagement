"use client";

import {
	useGetPopularTagsQuery,
	useGetTopPostsQuery,
} from "@/lib/redux/features/posts/postApiSlice";
import { ChevronRight, Flame, Hash } from "lucide-react";
import Link from "next/link";

export default function RightNavbar() {
	const { data } = useGetTopPostsQuery();
	const topPosts = data?.top_posts.results;
	const { data: tagData } = useGetPopularTagsQuery();
	return (
		<section className="bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 custom-scrollbar sticky right-0 top-0 flex h-screen w-[260px] flex-col gap-8 overflow-y-auto p-4 pt-20 max-xl:hidden">
			<div className="mt-4">
				<div className="flex items-center gap-2 mb-3">
					<Flame className="size-4 text-orange-500" />
					<h3 className="font-semibold text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wider">
						Top Posts
					</h3>
				</div>
				<div className="flex flex-col gap-0.5">
					{topPosts && topPosts.length > 0 ? (
						topPosts.map((post) => (
							<Link
								key={post.id}
								href={`/post/${post.slug}`}
								className="group flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
							>
								<p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 truncate">
									{post.title.length > 25
										? `${post.title.substring(0, 25)}...`
										: post.title}
								</p>
								<ChevronRight className="size-3.5 text-gray-400 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
							</Link>
						))
					) : (
						<p className="text-sm text-gray-400 dark:text-gray-500 px-2">
							No top posts yet
						</p>
					)}
				</div>
			</div>

			<div className="h-px bg-gray-200 dark:bg-gray-800" />

			<div>
				<div className="flex items-center gap-2 mb-3">
					<Hash className="size-4 text-blue-600 dark:text-blue-400" />
					<h3 className="font-semibold text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wider">
						Popular Tags
					</h3>
				</div>
				<div className="flex flex-wrap gap-1.5">
					{tagData && tagData.popular_tags.results.length > 0 ? (
						tagData.popular_tags.results.slice(0, 8).map((tag) => (
							<Link
								key={tag.slug}
								href={`/tags/${tag.slug}`}
								className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
							>
								#{tag.name}
								<span className="text-gray-400 dark:text-gray-500 text-[10px]">
									{tag.post_count}
								</span>
							</Link>
						))
					) : (
						<p className="text-sm text-gray-400 dark:text-gray-500">
							No tags yet
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
