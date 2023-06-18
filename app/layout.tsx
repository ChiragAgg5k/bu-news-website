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
		<>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</>
	);
}
