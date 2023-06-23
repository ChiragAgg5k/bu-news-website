"use client";
import firebase_app from "@/firebase/config";
import { User, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { get, getDatabase, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

interface UserDetail {
	name: string;
	phoneNo: string;
	city: string;
	admin: boolean;
}

export default function Home() {
	const auth = getAuth(firebase_app);
	const { push } = useRouter();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (!user) {
				push("/signup");
			} else {
				setUser(user);
			}
		});
	}, [auth, push]);

	const db = getDatabase(firebase_app);
	const [userDetail, setUserDetail] = useState<UserDetail | null>({
		name: "",
		phoneNo: "",
		city: "",
		admin: false
	});

	const userRef = ref(db, `users/${user?.uid}`);

	useEffect(() => {
		get(userRef).then((snapshot) => {
			if (snapshot.exists()) {
				setUserDetail(snapshot.val());
			}
		});
	}, [userRef]);

	return (
		<main>
			<NavBar />
			{userDetail && (
				<>
					<p className="mt-20">Welcome {userDetail?.name}</p>
					<p className="">Phone No: {userDetail?.phoneNo}</p>
					<p className="">City: {userDetail?.city}</p>
					<p className="">
						Admin: {userDetail?.admin ? "Yes" : "No"}
					</p>
				</>
			)}
			<p className="mt-20">Work in progress...</p>
			<button
				className="my-1 px-16 rounded bg-sky-700 py-3 text-center text-white hover:bg-sky-600 focus:outline-none"
				onClick={() => {
					auth.signOut().then(() => {
						push("/signup");
					});
				}}>
				Logout
			</button>
		</main>
	);
}
