'use client';
import NavBar from '../../components/NavBar';
import { User, getAuth } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserDetail } from '@/app/types';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import Image from 'next/image';
import { getDownloadURL, getStorage, ref as getStorageRef } from 'firebase/storage';
import firebase_app from '@/firebase/config';
import Link from 'next/link';
import ReactLoading from 'react-loading';
import { AiOutlineShareAlt, AiFillCheckCircle } from 'react-icons/ai';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ProfilePage() {
	const router = useRouter();
	const [userProfileImageUrl, setUserProfileImageUrl] = useState<string | undefined>(undefined);
	const [loaderColor, setLoaderColor] = useState<string>('#000000');
	const [copied, setCopied] = useState<boolean>(false);

	useEffect(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setLoaderColor('#ffffff');
		}
	}, []);

	function LogOut() {
		getAuth(firebase_app).signOut();
		router.push('/signup');
	}

	const userId = useSearchParams().get('userId');
	const [user, setUser] = useState<User | null>(null);
	const [userDetail, setUserDetail] = useState<UserDetail | null>({
		name: '...',
		phoneNo: '...',
		city: undefined,
		admin: false,
	});

	useEffect(() => {
		const auth = getAuth(firebase_app);

		auth.onAuthStateChanged((user) => {
			if (!user) {
				if (userId === null) {
					router.push('/signup');
				}
			} else {
				setUser(user);
			}
		});
	}, [router, userId]);

	useEffect(() => {
		const db = getDatabase(firebase_app);
		const storage = getStorage(firebase_app);

		let storageRef;
		let userRef;

		// Show shared user's profile
		if (!user && userId) {
			userRef = ref(db, `users/${userId}`);
			storageRef = getStorageRef(storage, `profile_images/${userId}`);

			// Show currently logged in user's profile
		} else if (user && !userId) {
			if (user.isAnonymous) {
				setUserDetail({
					name: 'Guest',
					phoneNo: 'n/a',
					city: 'n/a',
					admin: false,
				});
				setUserProfileImageUrl('/default-profile-image.jpg');
				return;
			}
			userRef = ref(db, `users/${user.uid}`);
			storageRef = getStorageRef(storage, `profile_images/${user.uid}`);

			// Even though user is logged in, since userID is present, show that user's profile
		} else if (user && userId) {
			userRef = ref(db, `users/${userId}`);
			storageRef = getStorageRef(storage, `profile_images/${userId}`);
		}

		// In case both user and userId are null, useEffect above redirects to signup page

		if (userRef) {
			onValue(userRef, (snapshot) => {
				if (snapshot.exists()) {
					setUserDetail(snapshot.val());
				}
			});
		}

		if (storageRef) {
			getDownloadURL(storageRef)
				.then((url) => {
					setUserProfileImageUrl(url);
				})
				.catch((error) => {
					setUserProfileImageUrl('/default-profile-image.jpg');
				});
		}
	}, [user, userId]);

	return (
		<div className="h-screen dark:text-white">
			<NavBar />

			<div className="mt-16 flex h-4/6 items-center justify-center sm:mt-0">
				<div className="relative flex flex-col rounded-lg border-2 border-gray-400 p-10">
					<div className="flex flex-col-reverse items-center justify-between sm:flex-row">
						<div className="pr-10 text-lg">
							<h1 className="text-3xl font-bold">Profile</h1>
							<p>Name: {userDetail?.name}</p>
							<p>Email: {user?.email ? user?.email : 'n/a'}</p>
							<p>Contact: {userDetail?.phoneNo}</p>
							<p>City or Zip Code: {userDetail?.city}</p>
						</div>
						{userProfileImageUrl === undefined ? (
							<div className="p-10">
								<ReactLoading type="bars" color={loaderColor} height={40} width={40} />
							</div>
						) : (
							<Image
								src={userProfileImageUrl}
								width={200}
								height={200}
								className="mb-8 rounded-full sm:mb-0"
								alt="Profile Image"
							/>
						)}
					</div>

					{/* Don't show controls on sharable link */}
					{user && !userId && (
						<div className="mt-10 flex justify-around">
							{!user.isAnonymous && (
								<Link
									href="#"
									className="my-1 mr-8 rounded border border-red-500 bg-white px-16 py-3 text-center text-red-500 hover:bg-gray-100 focus:outline-none"
								>
									Edit Profile
								</Link>
							)}
							<Link
								href="signup"
								onClick={() => LogOut()}
								className="my-1 rounded bg-red-500 px-16 py-3 text-center text-white hover:bg-red-600 focus:outline-none"
							>
								Log Out
							</Link>
						</div>
					)}

					{/* Show share button only when not already on sharable link, and user is not Anonymous */}
					{!user?.isAnonymous &&
						!userId &&
						(copied ? (
							<AiFillCheckCircle
								className="absolute bottom-4 right-4 text-3xl"
								title="Copied to clipboard"
							/>
						) : (
							<CopyToClipboard text={`${window.location.href.split('?')[0] + '?userId=' + user?.uid}`}>
								<AiOutlineShareAlt
									className="absolute bottom-4 right-4 text-3xl hover:cursor-pointer"
									onClick={() => {
										setCopied(true);
										setTimeout(() => {
											setCopied(false);
										}, 3000);
									}}
								/>
							</CopyToClipboard>
						))}
				</div>
			</div>
		</div>
	);
}
