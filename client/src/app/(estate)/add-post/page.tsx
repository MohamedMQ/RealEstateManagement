import CreatePostForm from "@/components/forms/add-post/CreatePostForm";
import { AuthFormHeader } from "@/components/forms/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Alpha Apartments | Add a Post",
	description:
		"Authenticated users can ask any question or post some content for all users to see",
};

export default function AddPostPage() {
	return (
		<div>
			<AuthFormHeader
				title="Create a post"
				staticText="Ask Questions, share thoughts or information with everyone!"
				linkText="Back to Home Page"
				linkHref="/welcome"
			/>
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-10">
					<CreatePostForm />
				</div>
			</div>
		</div>
	);
}
