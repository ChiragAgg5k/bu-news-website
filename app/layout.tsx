import Head from "next/head";
import "./globals.css";
import { Raleway } from "next/font/google";

const inter = Raleway({ subsets: ["latin"] });

export const metadata = {
	title: "BU News",
	description:
		"The unofficial news source for Bennett University, by students, for students."
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
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
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
