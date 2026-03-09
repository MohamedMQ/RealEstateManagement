import { HomeModernIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type FormHeaderProps = {
	title?: string;
	staticText?: string;
	linkText?: string;
	linkHref?: string;
};

export default function AuthFormHeader({
	title,
	staticText,
	linkHref,
	linkText,
}: FormHeaderProps) {
	return (
		<div className="text-center mb-6">
			<div className="inline-flex items-center justify-center size-14 rounded-lg bg-blue-600 shadow-md mb-4">
				<HomeModernIcon className="size-8 text-white" />
			</div>
			<h2 className="font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">
				{title}
			</h2>
			{(staticText || linkText) && linkHref && (
				<p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
					{staticText && <span>{staticText} </span>}
					{linkText && (
						<Link
							href={linkHref}
							className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
						>
							{linkText}
						</Link>
					)}
				</p>
			)}
		</div>
	);
}
