import ApartmentCreateForm from "@/components/forms/apartment/ApartmentCreateForm";
import { AuthFormHeader } from "@/components/forms/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Alpha Apartments | Create Apartment",
	description: "Authenticated users can add their apartment details",
};

export default function AddApartmentPage() {
	return (
		<div>
			<AuthFormHeader
				title="Add Your Apartment"
				staticText="Want to go back?"
				linkText="Back to Profile"
				linkHref="/profile"
			/>
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-10">
					<ApartmentCreateForm />
				</div>
			</div>
		</div>
	);
}
