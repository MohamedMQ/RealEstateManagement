"use client";

import { UseGoogle } from "@/utils";
import OauthButton from "./OauthButton";
import Image from "next/image";

export default function OauthButtons() {
	return (
		<div className="mt-2">
			<OauthButton provider="google" onClick={UseGoogle}>
				<Image
					src="/assets/icons/google.svg"
					alt="Google"
					width={18}
					height={18}
				/>
				Sign in with Google
			</OauthButton>
		</div>
	);
}
