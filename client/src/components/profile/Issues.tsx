"use client";

import { useGetMyIssuesQuery } from "@/lib/redux/features/issues/issueApiSlice";
import React from "react";
import Spinner from "../shared/Spinner";
import { TabsContent } from "../ui/tabs";
import IssueCard from "../cards/IssueCard";
import { AlertCircle } from "lucide-react";

export default function Issues() {
	const { data, isLoading } = useGetMyIssuesQuery();
	const myIssue = data?.my_issues;

	return (
		<TabsContent value="my-issues">
			{isLoading ? (
				<div className="flex-center py-16">
					<Spinner size="xl" />
				</div>
			) : (
				<>
					<div className="flex items-center gap-2 mb-4">
						<AlertCircle className="size-5 text-blue-600 dark:text-blue-400" />
						<h2 className="font-semibold text-gray-700 dark:text-gray-200">
							My Issues
							<span className="ml-2 text-sm font-normal text-gray-400">
								({myIssue?.count})
							</span>
						</h2>
					</div>
					<div className="grid cursor-pointer grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{myIssue && myIssue.results.length > 0 ? (
							myIssue.results.map((issue) => (
								<IssueCard key={issue.id} issue={issue} />
							))
						) : (
							<div className="col-span-3 flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
								<AlertCircle className="size-10 mb-2 opacity-30" />
								<p className="text-base font-medium">No issues raised yet</p>
							</div>
						)}
					</div>
				</>
			)}
		</TabsContent>
	);
}
