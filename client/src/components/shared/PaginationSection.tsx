import { setCurrentPage as setUserCurrentPage } from "@/lib/redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";

import { setCurrentPage as setPostCurrentPage } from "@/lib/redux/features/posts/postSlice";

interface PaginationSectionProps {
	totalPages: number;
	entityType: "user" | "post";
}

const PaginationSection = ({
	totalPages,
	entityType,
}: PaginationSectionProps) => {
	const dispatch = useAppDispatch();

	const currentPage = useAppSelector((state) =>
		entityType === "user" ? state.user.page : state.post.page,
	);

	const setCurrentPageAction =
		entityType === "user" ? setUserCurrentPage : setPostCurrentPage;

	if (totalPages <= 1) return null;

	const handlePreviousClick = () => {
		if (currentPage > 1) dispatch(setCurrentPageAction(currentPage - 1));
	};

	const handleNextClick = () => {
		if (currentPage < totalPages)
			dispatch(setCurrentPageAction(currentPage + 1));
	};

	return (
		<Pagination className="mt-4">
			<PaginationContent className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 px-2 py-1 shadow-sm">
				<PaginationItem className="cursor-pointer">
					<PaginationPrevious
						onClick={handlePreviousClick}
						className="rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink className="font-bold rounded-md bg-blue-600 text-white border-0 hover:bg-blue-700 min-w-[36px]">
						{currentPage}
					</PaginationLink>
				</PaginationItem>
				<PaginationItem className="cursor-pointer">
					<PaginationNext
						onClick={handleNextClick}
						className="rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationSection;
