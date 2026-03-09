import Link from "next/link";
import React from "react";

interface TagProps {
	tags: string[];
}

export default function TagList({ tags }: TagProps) {
	return (
		<div className="flex flex-wrap gap-2 mt-2">
			{tags.map((tag, index) => (
				<Link key={index} href={`/tags/${tag}`}>
					<span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/40 transition-colors">
						#{tag}
					</span>
				</Link>
			))}
		</div>
	);
}
