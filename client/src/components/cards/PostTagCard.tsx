"use client";

import { useGetPostsByTagQuery } from "@/lib/redux/features/posts/postApiSlice";
import Spinner from "../shared/Spinner";
import { formatDate, getRepliesText, getViewText } from "@/utils";
import { formatDistanceToNow, parseISO } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { EyeIcon, Hash, MessageSquareQuoteIcon } from "lucide-react";

interface SlugParamsProps {
	params: {
		tagSlug: string;
	};
}

export default function PostTagCard({ params }: SlugParamsProps) {
	const { data, isLoading } = useGetPostsByTagQuery(params.tagSlug);
	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}

	const posts = data?.posts_by_tag.results || [];

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<Hash className="size-7 text-blue-600" />
				<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
					Posts tagged with{" "}
					<span className="text-blue-600">&ldquo;{params.tagSlug}&rdquo;</span>
				</h1>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{posts.map((post) => (
					<div
						key={post.id}
						className="card-hover rounded-lg border-l-4 border-l-blue-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
					>
						<div className="p-5">
							<h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-1">
								{post.title.length > 40
									? `${post.title.substring(0, 40)}...`
									: post.title}
							</h3>

							<div className="flex text-xs text-gray-400 dark:text-gray-500 gap-3 mb-3">
								<span>Posted {formatDate(post.created_at).toString()}</span>
								<span>
									Updated{" "}
									{formatDistanceToNow(parseISO(post.updated_at), {
										addSuffix: true,
									})}
								</span>
							</div>

							<p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
								{post.body.length > 80
									? `${post.body.substring(0, 80)}...`
									: post.body}
							</p>

							<div className="flex items-center justify-between">
								<Link href={`/post/${post.slug}`}>
									<Button
										size="sm"
										className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
									>
										View Post
									</Button>
								</Link>
								<div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
									<span className="flex items-center gap-1">
										<EyeIcon className="size-4 text-blue-500" />
										{getViewText(post.view_count)}
									</span>
									<span className="flex items-center gap-1">
										<MessageSquareQuoteIcon className="size-4 text-blue-500" />
										{getRepliesText(post.replies_count)}
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
