import { capitalizeFirstLetter, formatDate } from "@/utils";
import { Briefcase, CalendarDays, Map, Star } from "lucide-react";

interface TechnicianDetailsProps {
	country_of_origin: string;
	occupation: string;
	date_joined: string;
	average_rating: number;
}

export default function TechnicianCardDetails({
	country_of_origin,
	occupation,
	date_joined,
	average_rating,
}: TechnicianDetailsProps) {
	return (
		<div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
			<p className="flex items-center gap-2">
				<Map className="size-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
				<span className="font-medium text-gray-700 dark:text-gray-300">
					Country:
				</span>
				<span>{country_of_origin}</span>
			</p>
			<p className="flex items-center gap-2">
				<Briefcase className="size-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
				<span className="font-medium text-gray-700 dark:text-gray-300">
					Occupation:
				</span>
				<span>{capitalizeFirstLetter(occupation)}</span>
			</p>
			<p className="flex items-center gap-2">
				<Star className="size-4 text-amber-400 flex-shrink-0" />
				<span className="font-medium text-gray-700 dark:text-gray-300">
					Rating:
				</span>
				<span className="flex items-center gap-0.5">
					{[...Array(5)].map((_, index) => {
						const ratingValue = index + 0.5;
						return (
							<span key={index}>
								{average_rating >= index + 1 ? (
									<Star className="size-3.5 text-amber-400 fill-current" />
								) : average_rating >= ratingValue ? (
									<Star
										className="size-3.5 text-amber-400 fill-current"
										fillOpacity={0.5}
									/>
								) : (
									<Star className="size-3.5 text-gray-300 dark:text-gray-600" />
								)}
							</span>
						);
					})}
				</span>
			</p>
			<p className="flex items-center gap-2">
				<CalendarDays className="size-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
				<span className="font-medium text-gray-700 dark:text-gray-300">
					Joined:
				</span>
				<span>{formatDate(date_joined).toString()}</span>
			</p>
		</div>
	);
}
