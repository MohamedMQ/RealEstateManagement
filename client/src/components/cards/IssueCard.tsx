import Link from "next/link";
import React from "react";
import { Hotel, AlertCircle } from "lucide-react";

interface Issue {
	id: string;
	title: string;
	description: string;
	apartment_unit: string;
	status: string;
	priority: string;
}

interface IssueCardProps {
	issue: Issue;
}

const priorityColors: Record<string, string> = {
	high: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400",
	medium: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400",
	low: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
};

const statusColors: Record<string, string> = {
	open: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
	in_progress:
		"bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400",
	resolved:
		"bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
	closed: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
};

export default function IssueCard({ issue }: IssueCardProps) {
	const priorityClass =
		priorityColors[issue.priority?.toLowerCase()] ?? priorityColors.low;
	const statusClass =
		statusColors[issue.status?.toLowerCase()] ?? statusColors.open;

	const priorityBorder: Record<string, string> = {
		high: "border-l-red-500",
		medium: "border-l-amber-500",
		low: "border-l-emerald-500",
	};
	const borderClass =
		priorityBorder[issue.priority?.toLowerCase()] ?? "border-l-blue-500";

	return (
		<Link href={`/issue/${issue.id}`}>
			<div
				className={`card-hover rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden border-l-4 ${borderClass}`}
			>
				<div className="p-5">
					<div className="flex items-start gap-3 mb-3">
						<AlertCircle className="size-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
						<h3 className="font-semibold text-gray-900 dark:text-white text-base leading-snug">
							{issue.title.length > 40
								? `${issue.title.substring(0, 40)}...`
								: issue.title}
						</h3>
					</div>

					<p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
						{issue.description.length > 80
							? `${issue.description.substring(0, 80)}...`
							: issue.description}
					</p>

					<p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
						<Hotel className="size-4 text-blue-500 dark:text-blue-400" />
						<span>Apt #{issue.apartment_unit}</span>
					</p>

					<div className="flex justify-between gap-2">
						<span
							className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusClass}`}
						>
							{issue.status}
						</span>
						<span
							className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityClass}`}
						>
							{issue.priority}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
