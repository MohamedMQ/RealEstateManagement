import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	endIcon?: React.ReactNode;
	startIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, endIcon, startIcon, ...props }, ref) => {
		return (
			<div className="relative w-full">
				{startIcon && (
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						{startIcon}
					</div>
				)}
				<input
					type={type}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						startIcon && "pl-10",
						endIcon && "pr-10",
						className,
					)}
					ref={ref}
					{...props}
				/>
				{endIcon && (
					<div className="absolute inset-y-0 right-0 flex items-center pr-3">
						{endIcon}
					</div>
				)}
			</div>
		);
	},
);
Input.displayName = "Input";

export { Input };
