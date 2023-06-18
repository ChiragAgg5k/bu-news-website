"use client";
import firebase_app from "@/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const auth = getAuth(firebase_app);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			router.push("/home");
		} else {
			router.push("/signup");
		}
	});
	return <main></main>;
}
