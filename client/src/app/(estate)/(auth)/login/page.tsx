"use client";
import { AuthFormHeader, LoginForm } from "@/components/forms/auth";
import OauthButtons from "@/components/shared/OauthButtons";
import { useRedirectIfAuthenticated } from "@/hooks";

export default function LoginPage() {
	useRedirectIfAuthenticated();
	return (
		<div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-10 px-4">
			<div className="w-full max-w-md">
				<AuthFormHeader
					title="Welcome back"
					staticText="Don't have an account?"
					linkText="Register here"
					linkHref="/register"
				/>
				<div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-7">
					<LoginForm />
					<div className="flex items-center gap-3 my-5">
						<div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
						<span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
							or continue with
						</span>
						<div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
					</div>
					<OauthButtons />
				</div>
			</div>
		</div>
	);
}
