"use client";

import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import Spinner from "@/components/shared/Spinner";
import { TabsContent } from "@/components/ui/tabs";
import { ProfileItem } from "./ProfileItem";
import {
	BadgeCheck,
	Briefcase,
	CalendarDays,
	Contact,
	Home,
	Hotel,
	Map,
	MapPinnedIcon,
	Star,
	UserRoundCheck,
} from "lucide-react";
import { capitalizeFirstLetter, formatDate } from "@/utils";

function AboutContent() {
	const { data, isLoading } = useGetUserProfileQuery();
	const profile = data?.profile;

	return (
		<TabsContent value="about">
			{isLoading ? (
				<div className="flex-center py-16">
					<Spinner size="xl" />
				</div>
			) : (
				<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<ProfileItem
								icon={<Contact className="size-4" />}
								label="Name"
								value={profile?.full_name || ""}
							/>
							<ProfileItem
								icon={<UserRoundCheck className="size-4" />}
								label="Gender"
								value={capitalizeFirstLetter(profile?.gender || "")}
							/>
							<ProfileItem
								icon={<CalendarDays className="size-4" />}
								label="Joined"
								value={formatDate(profile?.date_joined).toString() || ""}
							/>
							<ProfileItem
								icon={<BadgeCheck className="size-4" />}
								label="Reputation"
								value={`${profile?.reputation} / 100` || ""}
							/>
							<ProfileItem
								icon={<Map className="size-4" />}
								label="Country"
								value={profile?.country_of_origin || ""}
							/>
							<ProfileItem
								icon={<MapPinnedIcon className="size-4" />}
								label="City"
								value={profile?.city_of_origin || ""}
							/>
						</div>
						<div>
							<ProfileItem
								icon={<Briefcase className="size-4" />}
								label="Occupation"
								value={capitalizeFirstLetter(profile?.occupation || "")}
							/>
							<ProfileItem
								icon={<Home className="size-4" />}
								label="Apartment"
								value={profile?.apartment?.unit_number || "None"}
							/>
							<ProfileItem
								icon={<Hotel className="size-4" />}
								label="Building"
								value={`${profile?.apartment?.building || "None"}, Floor: ${profile?.apartment?.floor || "None"} `}
							/>
							<ProfileItem
								icon={<Star className="size-4" />}
								label="Avg Rating"
								value={profile?.average_rating?.toString() || ""}
							/>

							<div className="py-2 border-b border-gray-100 dark:border-gray-800">
								<p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
									Bio
								</p>
								<p className="text-sm text-gray-700 dark:text-gray-300">
									{profile?.bio || "You have not added any bio info yet!"}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</TabsContent>
	);
}

export default function About() {
	return <AboutContent />;
}
