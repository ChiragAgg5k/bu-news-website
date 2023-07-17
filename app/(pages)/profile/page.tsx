'use client';
import firebase_app from '@/firebase/config';
import NavBar from '../../components/NavBar';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
	const router = useRouter();

	function LogOut() {
		getAuth(firebase_app).signOut();
		router.push('/signup');
	}

	return (
		<div className="dark:text-white">
			<NavBar />
			<h1>Profile Page</h1>
			<button onClick={LogOut}>Log Out</button>
		</div>
	);
}
