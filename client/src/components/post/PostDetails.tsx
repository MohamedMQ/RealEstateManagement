"use client";

import {
	useBookmarkPostMutation,
	useDownvotePostMutation,
	useGetSinglePostQuery,
	useUpvotePostMutation,
} from "@/lib/redux/features/posts/postApiSlice";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { toast } from "react-toastify";
import { AuthFormHeader } from "../forms/auth";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import ProtectedRoute from "../shared/ProtectedRoutes";
import { getRepliesText, sortByDateDescending } from "@/utils";
import { MessageCircleMoreIcon } from "lucide-react";
import RepliesList from "./RepliesList";
import CreateReplyForm from "../forms/add-reply/CreateReplyForm";

interface PostDetailsProps {
	params: {
		slug: string;
	};
}

function PostDetailsContent({ params }: PostDetailsProps) {
	const slug = params.slug;
	const { data } = useGetSinglePostQuery(slug);
	const post = data?.post;

	const { data: currentUser } = useGetUserProfileQuery();
	const canUpdate = post?.author_username === currentUser?.profile.username;

	const [upvotePost, { isLoading: isUpvoteLoading }] = useUpvotePostMutation();
	const [downvotePost, { isLoading: isDownvoteLoading }] =
		useDownvotePostMutation();
	const [bookmarkPost, { isLoading: isBookmarkLoading }] =
		useBookmarkPostMutation();

	const sortedReplies = sortByDateDescending(post?.replies ?? [], "created_at");

	const handleUpvote = () => {
		post?.id && upvotePost(post.id);
		toast.success("Post Upvoted 😋");
	};

	const handleDownVote = () => {
		post?.id && downvotePost(post.id);
		toast.success("Post Downvoted 🥺");
	};

	const handleBookmarkPost = () => {
		post?.slug && bookmarkPost(post.slug);
		toast.success("This post has been added to your Bookmarks");
	};

	return (
		<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
			<AuthFormHeader
				title={post?.title}
				linkText="Go back to Home"
				linkHref="/welcome"
			/>
			<div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-gray-100 dark:border-gray-800 px-6 py-4">
				<PostHeader
					title={post?.title}
					avatar={post?.avatar}
					author_username={post?.author_username}
					created_at={post?.created_at}
					view_count={post?.view_count}
				/>
				<PostActions
					upvotes={post?.upvotes}
					downvotes={post?.downvotes}
					handleUpvote={handleUpvote}
					handleDownVote={handleDownVote}
					handleBookmarkPost={handleBookmarkPost}
					isUpvoteLoading={isUpvoteLoading}
					isDownvoteLoading={isDownvoteLoading}
					isBookmarkLoading={isBookmarkLoading}
				/>
			</div>
			<PostBody body={post?.body} slug={post?.slug} canUpdate={canUpdate} />
			<PostFooter tags={post?.tags} replies_count={post?.replies_count} />

			<div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 space-y-1">
				<span className="flex items-center gap-2 text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">
					<MessageCircleMoreIcon className="size-5 text-blue-500 dark:text-blue-400" />
					{getRepliesText(post?.replies_count)}
				</span>
				{sortedReplies && sortedReplies.length > 0 ? (
					sortedReplies.map((reply) => (
						<RepliesList key={reply.id} reply={reply} />
					))
				) : (
					<p className="text-sm text-gray-400 dark:text-gray-500">
						This post doesn&apos;t have any replies yet
					</p>
				)}
			</div>

			<div className="px-6 py-5">
				<h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
					Add your reply
				</h2>
				<CreateReplyForm slug={post?.slug} />
			</div>
		</div>
	);
}

export default function PostDetails({ params }: PostDetailsProps) {
	return (
		<ProtectedRoute>
			<PostDetailsContent params={params} />
		</ProtectedRoute>
	);
}
