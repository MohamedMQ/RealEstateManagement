"use client";

import { useGetMyPostsQuery } from "@/lib/redux/features/posts/postApiSlice";
import { TabsContent } from "@/components/ui/tabs";
import Spinner from "@/components/shared/Spinner";
import Link from "next/link";
import { formatDate } from "@/utils";
import { Clock, FileText } from "lucide-react";

export default function Posts() {
	const { data, isLoading } = useGetMyPostsQuery();
	const myPosts = data?.my_posts;

	return (
		<TabsContent value="posts">
			{isLoading ? (
				<div className="flex-center py-16">
					<Spinner size="xl" />
				</div>
			) : (
				<>
					<div className="flex items-center gap-2 mb-4">
						<FileText className="size-5 text-blue-600 dark:text-blue-400" />
						<h2 className="font-semibold text-gray-700 dark:text-gray-200">
							My Posts
							<span className="ml-2 text-sm font-normal text-gray-400">
								({myPosts?.count ?? 0})
							</span>
						</h2>
					</div>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{myPosts && myPosts.results.length > 0 ? (
							myPosts.results.map((post) => (
								<Link
									key={post.id}
									href={`/post/${post.slug}`}
									className="group rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all"
								>
									<h3 className="font-semibold text-gray-800 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
										{post.title}
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
										{post.body}
									</p>
									<div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
										<Clock className="size-3" />
										<span>{formatDate(post.created_at).toString()}</span>
									</div>
								</Link>
							))
						) : (
							<div className="col-span-2 flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
								<FileText className="size-10 mb-2 opacity-30" />
								<p className="text-base font-medium">No posts yet</p>
							</div>
						)}
					</div>
				</>
			)}
		</TabsContent>
	);
}
