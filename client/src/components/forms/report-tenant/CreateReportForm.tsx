"use client";

import { useReportTenantMutation } from "@/lib/redux/features/reports/reportApiSlice";
import {
	reportCreateSchema,
	TReportCreateSchema,
} from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormFieldComponent } from "../FormFieldComponent";
import { Contact2Icon, FlagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

export default function CreateReportForm() {
	const router = useRouter();
	const [reportTenant, { isLoading }] = useReportTenantMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TReportCreateSchema>({
		resolver: zodResolver(reportCreateSchema),
		mode: "all",
	});

	const onSubmit = async (values: TReportCreateSchema) => {
		try {
			await reportTenant(values).unwrap();
			toast.success(
				"Your report has been received. The management shall take action immediately",
			);
			reset();
			router.push("/profile");
		} catch (error) {
			const errorMessage = extractErrorMessage(error);
			toast.error(errorMessage || "An error occurred");
		}
	};
	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-md flex-col gap-4 dark:text-black"
			>
				<FormFieldComponent
					label="Title"
					name="title"
					register={register}
					errors={errors}
					placeholder="Title"
					startIcon={<FlagIcon className="size-5 text-blue-500" />}
				/>

				<FormFieldComponent
					label="Tenant's Username"
					name="reported_user_username"
					register={register}
					errors={errors}
					placeholder="Add Tenants Username"
					startIcon={<Contact2Icon className="size-5 text-blue-500" />}
				/>

				<FormFieldComponent
					label="Description"
					name="description"
					register={register}
					errors={errors}
					placeholder="Detailed Description of the problem"
					isTextArea
				/>

				<Button
					type="submit"
					className="mt-2 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 transition-colors"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Send Report`}
				</Button>
			</form>
		</main>
	);
}
