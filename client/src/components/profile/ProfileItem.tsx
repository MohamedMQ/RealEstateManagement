import React from "react";

interface ProfileItemProps {
	icon: React.ReactNode;
	label: string;
	value: string;
}

export const ProfileItem: React.FC<ProfileItemProps> = ({
	icon,
	label,
	value,
}) => (
	<div className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
		<span className="text-blue-500 dark:text-blue-400">{icon}</span>
		<span className="text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[90px]">
			{label}
		</span>
		<span className="text-sm text-gray-800 dark:text-gray-200 font-medium">
			{value}
		</span>
	</div>
);
