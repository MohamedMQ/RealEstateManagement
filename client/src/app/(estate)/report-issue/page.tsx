import { AuthFormHeader } from "@/components/forms/auth";
import CreateIssueForm from "@/components/forms/report-issue/CreateIssueForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Alpha Apartments | Report Issue",
	description:
		"Tenants can report any issues to the management with regards to their apartments",
};

export default function ReportIssuePage() {
	return (
		<div>
			<AuthFormHeader title="Report an issue with your Apartment" />
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-10">
					<CreateIssueForm />
				</div>
			</div>
		</div>
	);
}
