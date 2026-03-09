import { AuthFormHeader } from "@/components/forms/auth";
import CreateReportForm from "@/components/forms/report-tenant/CreateReportForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Alpha Apartments | Report Tenant",
	description:
		"Tenants can report their fellow tenants in cases of misconduct or misbehavior",
};

export default function ReportTenantPage() {
	return (
		<div>
			<AuthFormHeader
				title="Report a Tenant"
				staticText="All reports shall remain anonymous. We shall act accordingly, but shall not disclose details of who raised the concern."
				linkText="Back to Profile"
				linkHref="/profile"
			/>
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-10">
					<CreateReportForm />
				</div>
			</div>
		</div>
	);
}
