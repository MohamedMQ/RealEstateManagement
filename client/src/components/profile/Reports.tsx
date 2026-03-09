"use client";

import { useGetMyReportsQuery } from "@/lib/redux/features/reports/reportApiSlice";
import React from "react";
import Spinner from "../shared/Spinner";
import { TabsContent } from "../ui/tabs";
import { formatDate } from "@/utils";
import { Flag, CalendarDays } from "lucide-react";

export default function Reports() {
	const { data, isLoading } = useGetMyReportsQuery();
	const myReport = data?.reports;

	return (
		<TabsContent value="my-reports">
			{isLoading ? (
				<div className="flex-center py-16">
					<Spinner size="xl" />
				</div>
			) : (
				<>
					<div className="flex items-center gap-2 mb-4">
						<Flag className="size-5 text-blue-600 dark:text-blue-400" />
						<h2 className="font-semibold text-gray-700 dark:text-gray-200">
							My Reports
							<span className="ml-2 text-sm font-normal text-gray-400">
								({myReport?.count})
							</span>
						</h2>
					</div>
					<div className="grid cursor-pointer grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{myReport && myReport.results.length > 0 ? (
							myReport.results.map((report) => (
								<div
									key={report.id}
									className="card-hover rounded-lg border-l-4 border-l-red-400 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
								>
									<div className="p-5">
										<h3 className="font-semibold text-gray-800 dark:text-white mb-2">
											{report.title}
										</h3>
										<p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
											{report.description}
										</p>
										<div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
											<CalendarDays className="size-3.5" />
											<span>{formatDate(report.created_at).toString()}</span>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="col-span-3 flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500">
								<Flag className="size-10 mb-2 opacity-30" />
								<p className="text-base font-medium">
									No reports submitted yet
								</p>
							</div>
						)}
					</div>
				</>
			)}
		</TabsContent>
	);
}
