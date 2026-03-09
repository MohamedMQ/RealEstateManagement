import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
} from "react-hook-form";

type FormFieldComponentProps<TFieldValues extends FieldValues> = {
	label?: string;
	name: Path<TFieldValues>;
	register: UseFormRegister<TFieldValues>;
	errors: FieldErrors<TFieldValues>;
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	required?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	isPassword?: boolean;
	isTextArea?: boolean;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	className?: string;
	disabled?: boolean;
};
export function FormFieldComponent<TFieldValues extends FieldValues>({
	label,
	name,
	register,
	disabled = false,
	errors,
	type = "text",
	placeholder,
	required = false,
	startIcon,
	endIcon,
	link,
	className,
	isPassword = false,
	isTextArea = false,
}: FormFieldComponentProps<TFieldValues>) {
	const errorMessage = errors[name]?.message as unknown as string;

	const renderInputComponent = () => {
		if (isTextArea) {
			return (
				<Textarea
					{...register(name, { required })}
					placeholder={placeholder}
					className={`dark:text-gray-100 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-blue-500 focus:ring-blue-500/20 ${className}`}
				/>
			);
		} else if (isPassword) {
			return (
				<PasswordInput
					{...register(name, { required })}
					placeholder={placeholder}
					className={`dark:text-gray-100 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-blue-500 focus:ring-blue-500/20 ${className}`}
				/>
			);
		} else {
			return (
				<Input
					id={name}
					{...register(name, { required })}
					type={type}
					placeholder={placeholder}
					startIcon={startIcon}
					endIcon={endIcon}
					disabled={disabled}
					className={`dark:text-gray-100 rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-blue-500 focus:ring-blue-500/20 ${className}`}
				/>
			);
		}
	};

	return (
		<div>
			<div className="mb-1.5 flex justify-between items-center">
				<label
					htmlFor={name}
					className="text-sm font-semibold text-gray-700 dark:text-gray-300"
				>
					{label}
				</label>
				{link && (
					<Link
						href={link.linkUrl}
						className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
					>
						{link.linkText}
					</Link>
				)}
			</div>
			<div className="mt-1">{renderInputComponent()}</div>
			{errorMessage && (
				<span className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
					{errorMessage}
				</span>
			)}
		</div>
	);
}
