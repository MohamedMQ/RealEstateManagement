"use client";
import { useGetAllUsersQuery } from "@/lib/redux/features/users/usersApiSlice";
import { useTheme } from "next-themes";

import React from "react";
import Spinner from "../shared/Spinner";
import UsersSearch from "../shared/search/UsersSearch";
import TenantInfo from "./TenantInfo";
import {
	BrickWall,
	Briefcase,
	Building,
	CalendarDays,
	Map,
	School,
	Users,
} from "lucide-react";
import { formatDate } from "@/utils";
import ProtectedRoute from "../shared/ProtectedRoutes";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import PaginationSection from "../shared/PaginationSection";

function TenantCardContent() {
	const { theme } = useTheme();
	const searchTerm = useAppSelector((state) => state.user.searchTerm);
	const page = useAppSelector((state) => state.user.page);

	const { data, isLoading } = useGetAllUsersQuery({ searchTerm, page });

	const totalCount = data?.profiles.count || 0;
	const totalPages = Math.ceil(totalCount / 9);

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}

	return (
		<div className="animate-fade-in-up">
			<div className="mb-6">
				<h1 className="font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
					All Tenants
				</h1>
				<p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
					{data?.profiles.results.length ?? 0} residents in the community
				</p>
			</div>

			<UsersSearch />

			<div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{data && data.profiles.results.length > 0 ? (
					data.profiles.results.map((tenant) => (
						<div
							key={tenant.id}
							className="group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200"
						>
							<div className="p-5">
								<div className="flex flex-col items-center text-center mb-4">
									<div className="relative mb-3">
										<Avatar className="relative size-20 ring-2 ring-blue-400/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
											<AvatarImage
												alt="User profile avatar"
												src={
													tenant.avatar ||
													(theme === "dark"
														? "/assets/icons/user-profile-circle.svg"
														: "/assets/icons/user-profile-light-circle.svg")
												}
											/>
										</Avatar>
									</div>
									<h3 className="font-semibold text-gray-900 dark:text-white text-base">
										{tenant.full_name}
									</h3>
									<p className="text-sm font-medium text-blue-600 dark:text-blue-400">
										@{tenant.username}
									</p>
								</div>

								<div className="space-y-1.5 border-t border-gray-100 dark:border-gray-800 pt-4">
									<TenantInfo
										label="Country"
										value={tenant.country_of_origin}
										icon={Map}
									/>
									<TenantInfo
										label="Occupation"
										value={tenant.occupation}
										icon={Briefcase}
									/>
									<TenantInfo
										label="Joined"
										value={formatDate(tenant.date_joined).toString()}
										icon={CalendarDays}
									/>
									{tenant.apartment && (
										<>
											<TenantInfo
												label="Building"
												value={tenant.apartment.building}
												icon={Building}
											/>
											<TenantInfo
												label="Floor"
												value={tenant.apartment.floor}
												icon={School}
											/>
											<TenantInfo
												label="Unit"
												value={tenant.apartment.unit_number}
												icon={BrickWall}
											/>
										</>
									)}
								</div>
							</div>
						</div>
					))
				) : (
					<div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
						<div className="size-16 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center mb-4">
							<Users className="size-8 text-blue-500 dark:text-blue-400" />
						</div>
						<p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
							No tenants found
						</p>
					</div>
				)}
			</div>
			<div className="mt-8">
				<PaginationSection totalPages={totalPages} entityType="user" />
			</div>
		</div>
	);
}

export default function TenantCard() {
	return (
		<ProtectedRoute>
			<TenantCardContent />
		</ProtectedRoute>
	);
}
