"use client";

import { Input } from "@/components/ui/input";
import { setSearchTerm } from "@/lib/redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { Search } from "lucide-react";
import React from "react";

const UsersSearch = () => {
	const dispatch = useAppDispatch();
	const searchTerm = useAppSelector((state) => state.user.searchTerm);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchTerm(event.target.value));
	};
	return (
		<div className="relative mb-4 flex items-center">
			<Search className="absolute left-3.5 size-4 text-blue-500 dark:text-blue-400 pointer-events-none" />
			<Input
				placeholder="Search by username, first or last name"
				type="search"
				value={searchTerm}
				onChange={handleInputChange}
				className="pl-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-blue-500 focus-visible:border-blue-500 h-11"
			/>
		</div>
	);
};

export default UsersSearch;
