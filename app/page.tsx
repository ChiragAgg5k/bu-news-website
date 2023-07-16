'use client';
import firebase_app from '@/firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

export default function Home() {
	const router = useRouter();
	const auth = getAuth(firebase_app);

	const [loaderColor, setLoaderColor] = useState<string>('#000000');

	useEffect(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setLoaderColor('#ffffff');
		}
	}, []);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				router.push('/home');
			} else {
				router.push('/signup');
			}
		});
	}, [auth, router]);

	return (
		<div className="flex h-screen items-center justify-center" id="app">
			<ReactLoading type="bars" color={loaderColor} height={100} width={50} />
		</div>
	);
}
