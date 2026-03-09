import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
	provider: "google";
	children: React.ReactNode;
	[rest: string]: any;
}

export default function OauthButton({ provider, children, ...rest }: Props) {
	return (
		<Button
			className="w-full mt-3 flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all h-11"
			{...rest}
		>
			<span className="flex items-center justify-center gap-2">{children}</span>
		</Button>
	);
}
