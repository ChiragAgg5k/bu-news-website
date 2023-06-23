"use client";
import firebase_app from "@/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function Home() {
	const router = useRouter();
	const auth = getAuth(firebase_app);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				router.push("/home");
			} else {
				router.push("/signup");
			}
		});
	}, [auth, router]);

	return <main></main>;
}
