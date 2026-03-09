import { AuthFormHeader } from "@/components/forms/auth";
import UpdatePostForm from "@/components/forms/update-post/UpdatePostForm";
import React from "react";

interface UpdateParamsProps {
	params: {
		slug: string;
	};
}

export default function UpdatePostPage({ params }: UpdateParamsProps) {
	return (
		<div>
			<AuthFormHeader
				title="Update Post"
				staticText="Want to go back?"
				linkText="Back to Posts"
				linkHref="/welcome"
			/>
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-10">
					<UpdatePostForm params={params} />
				</div>
			</div>
		</div>
	);
}
