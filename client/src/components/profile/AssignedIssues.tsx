"use client";

import { useGetMyAssignedIssuesQuery } from "@/lib/redux/features/issues/issueApiSlice";
import React from "react";
import Spinner from "../shared/Spinner";
import { TabsContent } from "../ui/tabs";
import IssueCard from "../cards/IssueCard";
import { ClipboardList } from "lucide-react";

export default function AssignedIssues() {
	const { data: assignedIssues, isLoading } = useGetMyAssignedIssuesQuery("");

	const myAssignedIssues = assignedIssues?.assigned_issues;

	return (
		<TabsContent value="assigned-issues">
			{isLoading ? (
				<div className="flex-center py-16">
					<Spinner size="xl" />
				</div>
			) : (
				<>
					<div className="flex items-center gap-2 mb-4">
						<ClipboardList className="size-5 text-blue-600 dark:text-blue-400" />
						<h2 className="font-semibold text-gray-700 dark:text-gray-200">
							Assigned Issues
							<span className="ml-2 text-sm font-normal text-gray-400">
								({myAssignedIssues?.count})
							</span>
						</h2>
					</div>
					<div className="grid cursor-pointer grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{myAssignedIssues && myAssignedIssues.results.length > 0 ? (
							myAssignedIssues.results.map((issue) => (
								<IssueCard key={issue.id} issue={issue} />
							))
						) : (
							<div className="col-span-3 flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
								<ClipboardList className="size-10 mb-2 opacity-30" />
								<p className="text-base font-medium">No issues assigned yet</p>
							</div>
						)}
					</div>
				</>
			)}
		</TabsContent>
	);
}
