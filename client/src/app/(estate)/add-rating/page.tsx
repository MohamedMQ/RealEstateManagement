import CreateRatingForm from "@/components/forms/add-rating/CreateRatingForm";
import { AuthFormHeader } from "@/components/forms/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Alpha Apartments | Add Rating",
	description:
		"Tenants can rate the technicians, if they are satisfied or dissatisfied with the services rendered to them",
};

export default function AddRatingPage() {
	return (
		<div>
			<AuthFormHeader
				title="Rate a Technician"
				staticText="Tell us what you think about the services rendered"
				linkText="Back to Technicians Page"
				linkHref="/technicians"
			/>
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-10">
					<CreateRatingForm />
				</div>
			</div>
		</div>
	);
}
