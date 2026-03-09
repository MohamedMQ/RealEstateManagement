"use client";

import {
	useDeleteIssueMutation,
	useGetSingleIssueQuery,
} from "@/lib/redux/features/issues/issueApiSlice";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { extractErrorMessage } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import {
	CheckCheck,
	CircleDot,
	Eye,
	Hotel,
	PenLine,
	Trash2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface IssueDetailsProps {
	params: {
		id: string;
	};
}

export default function IssueDetails({ params }: IssueDetailsProps) {
	const id = params.id;
	const { data } = useGetSingleIssueQuery(id);
	const issue = data?.issue;
	const router = useRouter();

	const { data: currentUser } = useGetUserProfileQuery();

	const canUpdate = issue?.assigned_to === currentUser?.profile.full_name;

	const canDelete = issue?.reported_by === currentUser?.profile.full_name;

	const [deleteIssue] = useDeleteIssueMutation();

	const handleDeleteIssue = async () => {
		if (issue?.id) {
			try {
				await deleteIssue(issue.id).unwrap();
				router.push("/profile");
				toast.success("Your Issue was deleted");
			} catch (e) {
				const errorMessage = extractErrorMessage(e);
				toast.error(errorMessage || "An error occurred");
			}
		}
	};
	return (
		<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-card-hover">
			<div className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800">
				<div className="flex items-center justify-between gap-4 flex-wrap">
					<div>
						<h1 className="text-xl font-bold text-gray-900 dark:text-white">
							{issue?.title}
						</h1>
						<Link
							href="/profile"
							className="text-sm text-blue-600 hover:text-blue-600 mt-1 inline-block"
						>
							← Go back to profile
						</Link>
					</div>
					<div className="flex gap-2">
						{canUpdate && (
							<Link href={`/issue/update-issue/${id}`}>
								<Button
									size="sm"
									className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center gap-1.5"
								>
									<PenLine className="size-4" />
									Update Issue
								</Button>
							</Link>
						)}
						{canDelete && (
							<Button
								onClick={handleDeleteIssue}
								size="sm"
								className="rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium flex items-center gap-1.5"
							>
								<Trash2 className="size-4" />
								Delete Issue
							</Button>
						)}
					</div>
				</div>
			</div>

			<div className="px-6 py-5 grid gap-4 sm:grid-cols-2 border-b border-gray-100 dark:border-gray-800">
				<div className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-600/10">
						<Hotel className="size-4 text-blue-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							Apartment Number
						</p>
						<p className="font-semibold text-gray-800 dark:text-white">
							{issue?.apartment_unit}
						</p>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-600/10">
						<CheckCheck className="size-4 text-blue-600" />
					</div>
					<div>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							Reported By
						</p>
						<p className="font-semibold text-gray-800 dark:text-white">
							{issue?.reported_by}
						</p>
					</div>
				</div>
			</div>

			<div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
				<div className="flex items-start gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 dark:bg-accent-500/10 mt-0.5">
						<CircleDot className="size-4 text-accent-500" />
					</div>
					<div>
						<p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
							Description
						</p>
						<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
							{issue?.description}
						</p>
					</div>
				</div>
			</div>

			<div className="px-6 py-4 flex flex-wrap gap-4 items-center justify-between text-sm">
				<div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
					<span className="font-medium">Assigned to:</span>
					<span className="text-blue-600 font-semibold">
						{issue?.assigned_to || "Not assigned yet"}
					</span>
				</div>
				<div className="flex items-center gap-4">
					<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-500">
						{issue?.status}
					</span>
					<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
						{issue?.priority}
					</span>
					<span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
						<Eye className="size-4" />
						{issue?.view_count}
					</span>
				</div>
			</div>
		</div>
	);
}
