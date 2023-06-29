import { getDatabase, ref, set } from "firebase/database";
import firebase_app from "../../firebase/config";
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInAnonymously
} from "firebase/auth";
import { SignUpPageProps } from "../types";

const auth = getAuth(firebase_app);
const db = getDatabase(firebase_app);

function writeUserData(
	userId: string,
	name: string,
	phoneNo: string,
	city: string,
	admin: boolean
) {
	set(ref(db, "users/" + userId), {
		admin: admin,
		name: name,
		city: city,
		phoneNo: phoneNo
	});
}

export async function SignupAnonymously() {
	try {
		await signInAnonymously(auth);
	} catch (e) {
		console.log(e);
	}

	return;
}

export async function Signup(props: SignUpPageProps) {
	let result = null,
		error = null;

	try {
		result = await createUserWithEmailAndPassword(
			auth,
			props.email,
			props.password
		);
		writeUserData(
			result.user.uid,
			props.name,
			props.phoneNo,
			props.city,
			props.admin
		);
	} catch (e) {
		error = e;
	}

	return { result, error };
}
