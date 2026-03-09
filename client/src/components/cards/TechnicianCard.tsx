"use client";

import { useGetAllTechniciansQuery } from "@/lib/redux/features/users/usersApiSlice";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { UserState } from "@/types";
import { useTheme } from "next-themes";
import Spinner from "../shared/Spinner";
import UsersSearch from "../shared/search/UsersSearch";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import TechnicianCardDetails from "./TechnicianCardDetails";
import Link from "next/link";
import { Button } from "../ui/button";
import PaginationSection from "../shared/PaginationSection";
import { Users } from "lucide-react";

export default function TechnicianCard() {
	const { theme } = useTheme();
	const searchTerm = useAppSelector(
		(state: UserState) => state.user.searchTerm,
	);
	const page = useAppSelector((state: UserState) => state.user.page);
	const { data, isLoading } = useGetAllTechniciansQuery({ searchTerm, page });
	const technicians = data?.non_tenant_profiles;

	const totalCount = technicians?.count || 0;
	const totalPages = Math.ceil(totalCount / 9);

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="xl" />
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<UsersSearch />
			<div className="flex items-center gap-3">
				<Users className="size-7 text-blue-600 dark:text-blue-400" />
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					All Technicians
					<span className="ml-2 text-lg font-normal text-gray-500 dark:text-gray-400">
						({technicians?.results.length ?? 0})
					</span>
				</h1>
			</div>

			<div className="grid cursor-pointer grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{technicians && technicians.results.length > 0 ? (
					technicians.results.map((technician) => (
						<div
							key={technician.id}
							className="card-hover rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
						>
							<div className="p-5">
								<div className="flex flex-col items-center gap-3 mb-4">
									<Avatar className="size-20 rounded-full ring-2 ring-blue-400/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 overflow-hidden">
										<AvatarImage
											className="rounded-full object-cover w-20 h-20"
											alt="User Profile Avatar"
											src={
												technician.avatar ||
												(theme === "dark"
													? "/assets/icons/user-profile-circle.svg"
													: "/assets/icons/user-profile-light-circle.svg")
											}
											width={80}
											height={80}
										/>
									</Avatar>
									<div className="text-center">
										<h3 className="text-xl font-bold text-gray-900 dark:text-white">
											{technician.full_name}
										</h3>
										<p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
											@{technician.username}
										</p>
									</div>
								</div>
								<div className="border-t border-gray-100 dark:border-gray-800 pt-4">
									<TechnicianCardDetails
										country_of_origin={technician.country_of_origin}
										occupation={technician.occupation}
										date_joined={technician.date_joined}
										average_rating={technician.average_rating}
									/>
								</div>
								<div className="mt-4">
									<Link href={`/add-rating?username=${technician.username}`}>
										<Button
											size="sm"
											className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
										>
											Rate this Technician
										</Button>
									</Link>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="col-span-3 flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
						<Users className="size-12 mb-3 opacity-30" />
						<p className="text-lg font-medium">No technicians found</p>
					</div>
				)}
			</div>
			<PaginationSection totalPages={totalPages} entityType="user" />
		</div>
	);
}
