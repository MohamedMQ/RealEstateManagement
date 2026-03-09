import ProtectedRoute from "@/components/shared/ProtectedRoutes";

import React from "react";

import type { Metadata } from "next";
import Header from "@/components/profile/Header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import About from "@/components/profile/About";
import Posts from "@/components/profile/Posts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Issues from "@/components/profile/Issues";
import AssignedIssues from "@/components/profile/AssignedIssues";
import Reports from "@/components/profile/Reports";

export const metadata: Metadata = {
	title: "Alpha Apartments | User Profile",
	description: "Signed in users can view all their profile information",
};

function ProfilePageContent() {
	return (
		<div className="space-y-6 px-4 pb-6 md:px-6">
			<Header />

			<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
				<Tabs defaultValue="about">
					<TabsList className="w-full rounded-none border-b border-gray-200 dark:border-gray-800 bg-transparent h-auto p-0 flex flex-wrap">
						<TabsTrigger
							value="about"
							className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 px-5 py-3 font-medium text-sm"
						>
							About
						</TabsTrigger>
						<TabsTrigger
							value="posts"
							className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 px-5 py-3 font-medium text-sm"
						>
							Posts
						</TabsTrigger>
						<TabsTrigger
							value="my-issues"
							className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 px-5 py-3 font-medium text-sm"
						>
							My Issues
						</TabsTrigger>
						<TabsTrigger
							value="my-reports"
							className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 px-5 py-3 font-medium text-sm"
						>
							My Reports
						</TabsTrigger>
						<TabsTrigger
							value="assigned-issues"
							className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 px-5 py-3 font-medium text-sm"
						>
							Assigned Issues
						</TabsTrigger>
					</TabsList>

					<div className="p-5">
						<About />
						<Posts />
						<Issues />
						<Reports />
						<AssignedIssues />
					</div>
				</Tabs>
			</div>

			<div className="flex flex-col sm:flex-row gap-3">
				<Link href="/profile/edit">
					<Button className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium w-full sm:w-auto px-8 transition-colors">
						Update Profile
					</Button>
				</Link>
				<Link href="/apartment">
					<Button
						variant="outline"
						className="rounded-lg border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium w-full sm:w-auto px-8"
					>
						Add Your Apartment
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default function ProfilePage() {
	return (
		<ProtectedRoute>
			<ProfilePageContent />
		</ProtectedRoute>
	);
}
