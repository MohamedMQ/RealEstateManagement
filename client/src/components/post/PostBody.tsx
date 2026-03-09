import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { PenSquare } from "lucide-react";

interface PostBodyProps {
	body: string | undefined;
	slug: string | undefined;
	canUpdate?: boolean;
}

export default function PostBody({ body, slug, canUpdate }: PostBodyProps) {
	return (
		<div className="border-b border-gray-100 dark:border-gray-800 px-6 py-5">
			<p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
				{body}
			</p>
			{canUpdate && (
				<Link href={`/post/update-post/${slug}`}>
					<Button className="mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium gap-2 transition-colors">
						<PenSquare className="size-4" />
						Update Post
					</Button>
				</Link>
			)}
		</div>
	);
}
