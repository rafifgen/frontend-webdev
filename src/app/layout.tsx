import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "NestJS Boilerplate - Premium Trading Platform",
	description:
		"Premium trade alerts, analysis and education for traders. Built with NestJS and Next.js.",
	keywords: "trading, signals, crypto, forex, stocks, NestJS, Next.js",
	authors: [{ name: "Webdev A10" }],
	openGraph: {
		title: "NestJS Boilerplate - Premium Trading Platform",
		description: "Premium trade alerts, analysis and education for traders",
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "NestJS Boilerplate - Premium Trading Platform",
		description: "Premium trade alerts, analysis and education for traders",
	},
	viewport: "width=device-width, initial-scale=1",
	robots: "index, follow",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
			</head>
			<body className={`${inter.className} antialiased`}>
				<AuthProvider>
					{children}
					<Toaster
						position="top-right"
						toastOptions={{
							duration: 4000,
							style: {
								background: "var(--background-color)",
								color: "var(--text-color)",
								borderRadius: "8px",
								border: "1px solid var(--border-color)",
								boxShadow:
									"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
							},
							success: {
								iconTheme: {
									primary: "var(--green-500)",
									secondary: "#fff",
								},
							},
							error: {
								iconTheme: {
									primary: "var(--red-500)",
									secondary: "#fff",
								},
							},
						}}
					/>
				</AuthProvider>
			</body>
		</html>
	);
}
