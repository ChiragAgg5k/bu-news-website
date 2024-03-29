import './globals.css';
import { Raleway } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

const raleway = Raleway({ subsets: ['latin'] });

export const metadata = {
	title: 'BU News',
	description: 'The unofficial news source for Bennett University, by students, for students.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning={true} className="dark:bg-zinc-900">
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body className={raleway.className} suppressHydrationWarning={true}>
				<NextTopLoader showSpinner={false} />
				{children}
			</body>
		</html>
	);
}
