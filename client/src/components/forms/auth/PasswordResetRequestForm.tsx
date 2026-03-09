"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordRequestMutation } from "@/lib/redux/features/auth/authApiSlice";
import { useForm } from "react-hook-form";
import {
	passwordResetRequestSchema,
	TPasswordResetRequestSchema,
} from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import { MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

export default function PasswordResetRequestForm() {
	const [resetPasswordRequest, { isLoading }] =
		useResetPasswordRequestMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TPasswordResetRequestSchema>({
		resolver: zodResolver(passwordResetRequestSchema),
		mode: "all",
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (
		values: z.infer<typeof passwordResetRequestSchema>,
	) => {
		try {
			await resetPasswordRequest(values).unwrap();
			toast.success("Request sent, check your email for the reset link");
			reset();
		} catch (e) {
			const errorMessage = extractErrorMessage(e);
			toast.error(errorMessage || "An error occurred");
		}
	};
	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-md flex-col gap-4"
			>
				<FormFieldComponent
					label="Email Address"
					name="email"
					register={register}
					errors={errors}
					placeholder="Email Address"
					startIcon={<MailIcon className="size-5 text-blue-500" />}
				/>
				<Button
					type="submit"
					className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 transition-colors"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Request Password Reset`}
				</Button>
			</form>
		</main>
	);
}
