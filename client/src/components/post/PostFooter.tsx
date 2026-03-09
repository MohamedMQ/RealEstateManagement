import { MessageCircleMoreIcon } from "lucide-react";
import TagList from "../shared/TagList";
import { getRepliesText } from "@/utils";

interface PostFooterProps {
	tags: string[] | undefined;
	replies_count: number | undefined;
}

export default function PostFooter({ tags, replies_count }: PostFooterProps) {
	return (
		<div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-6 py-3">
			<TagList tags={tags ?? []} />
			<div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
				<MessageCircleMoreIcon className="size-4 text-blue-500 dark:text-blue-400" />
				<p>{getRepliesText(replies_count)}</p>
			</div>
		</div>
	);
}
