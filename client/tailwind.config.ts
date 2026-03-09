import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				// Legacy colors kept for compatibility
				googleBlue: "#4285F4",
				asparagus: "#60992D",
				deepBlueGrey: "#263238",
				grayOverlay: "rgba(125,144,201,0.34)",
				lightGray: "#7B8EC8",
				electricIndigo: "#2563eb",
				richBlack: "#0D1317",
				veryBlack: "#000000",
				babyPowder: "#FBFEF9",
				pumpkin: "#d97706",
				platinum: "#DDE1E4",
				lightGrey: "#EEEEEE",
				pear: "#C2E812",
				eerieBlack: "#171D1C",
				ballonWhite: "#dfe6f6",
				// Clean professional design system
				brand: {
					50: "#eff6ff",
					100: "#dbeafe",
					200: "#bfdbfe",
					300: "#93c5fd",
					400: "#60a5fa",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
					800: "#1e40af",
					900: "#1e3a8a",
					950: "#172554",
				},
				accent: {
					50: "#ecfdf5",
					100: "#d1fae5",
					200: "#a7f3d0",
					300: "#6ee7b7",
					400: "#34d399",
					500: "#10b981",
					600: "#059669",
					700: "#047857",
					800: "#065f46",
					900: "#064e3b",
				},
				neon: {
					cyan: "#0891b2",
					green: "#059669",
					purple: "#7c3aed",
					pink: "#db2777",
					orange: "#d97706",
				},
				surface: {
					light: "#f9fafb",
					dark: "#0f1117",
					card: "#ffffff",
					"card-dark": "#111827",
					border: "#e5e7eb",
					"border-dark": "#1f2937",
				},
			},
			backgroundImage: {
				"gradient-brand":
					"linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
				"gradient-dark": "linear-gradient(135deg, #0f1117 0%, #111827 100%)",
				"gradient-card":
					"linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(59,130,246,0.02) 100%)",
				"gradient-hero":
					"linear-gradient(160deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)",
				"gradient-neon": "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
				"gradient-warm": "linear-gradient(135deg, #d97706 0%, #dc2626 100%)",
				"gradient-success": "linear-gradient(135deg, #059669 0%, #0891b2 100%)",
			},
			boxShadow: {
				"glow-brand": "0 4px 14px rgba(37,99,235,0.25)",
				"glow-accent": "0 4px 14px rgba(16,185,129,0.25)",
				"glow-cyan": "0 4px 14px rgba(8,145,178,0.25)",
				"card-hover":
					"0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)",
				"nav-glass": "0 1px 3px rgba(0,0,0,0.05)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in-up": {
					from: { opacity: "0", transform: "translateY(10px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				shimmer: {
					"0%": { backgroundPosition: "-200% 0" },
					"100%": { backgroundPosition: "200% 0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in-up": "fade-in-up 0.4s ease-out",
				shimmer: "shimmer 2s linear infinite",
			},
			fontFamily: {
				openSans: ["var(--font-openSans)"],
				robotoSlab: ["var(--font-robotoSlab)"],
			},
			borderRadius: {
				"4xl": "2rem",
				"5xl": "2.5rem",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
