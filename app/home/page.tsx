"use client";
import firebase_app from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { useEffect } from "react";

export default function Home() {
	const auth = getAuth(firebase_app);
	const { push } = useRouter();
	useEffect(() => {
		if (!auth.currentUser) {
			push("/signup");
		}
	}, [auth.currentUser, push]);

	const user = auth.currentUser;
	const db = getDatabase(firebase_app);

	const userRef = ref(db, `users/${user?.uid}`);
	onValue(userRef, (snapshot) => {
		const data = snapshot.val();
		console.log(data);
	});

	return (
		<main>
			<h1>Home</h1>
			<button
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
