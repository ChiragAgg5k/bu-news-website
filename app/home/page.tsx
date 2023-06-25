"use client";
import firebase_app from "@/firebase/config";
import { User, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { get, getDatabase, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";
import { ImSpinner3 } from "react-icons/im";

interface UserDetail {
	name: string;
	phoneNo: string;
	city: string;
	admin: boolean;
}

interface Weather {
	temp: number;
	description: string;
	icon: string;
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
		name: "...",
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

	// greeting = {"Good Morning", "Good Afternoon", "Good Evening", "Good Night"}
	const greeting = () => {
		const date = new Date();
		const hour = date.getHours();
		if (hour >= 0 && hour < 12) {
			return "Good Morning";
		} else if (hour >= 12 && hour < 16) {
			return "Good Afternoon";
		} else if (hour >= 16 && hour < 20) {
			return "Good Evening";
		} else {
			return "Good Night";
		}
	};

	const date = () => {
		const date = new Date();
		const dayName = date.toLocaleString("default", { weekday: "long" });
		const monthName = date.toLocaleString("default", { month: "long" });
		const day = date.getDate();

		return `${dayName}, ${day} ${monthName}`;
	};

	const [weather, setWeather] = useState<Weather | null>(null);
	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${userDetail?.city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.cod === 200) {
					setWeather({
						temp: Math.round((data.main.temp - 273.15) * 100) / 100,
						description: data.weather[0].description,
						icon: data.weather[0].icon
					});
				}
			});
	}, [userDetail?.city]);

	return (
		<main>
			<NavBar />
			{/* Greeting and today's weather */}
			<div className="flex flex-col border-b-2 md:flex-row">
				<div className="flex justify-between p-6 sm:p-8 w-full">
					<div>
						<h2 className="text-4xl font-bold">{greeting()}</h2>
						<h3 className="text-3xl font-bold">
							{userDetail?.name.split(" ")[0]}
						</h3>
						<p>{date()}</p>
					</div>
					<div className="mr-8 sm:mr-0">
						{weather ? (
							<div className="flex items-center">
								<Image
									src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
									width={64}
									height={64}
									alt="weather icon"
									className="w-16 h-16"
								/>
								<div className="ml-4">
									<p className="text-3xl font-bold">
										{weather.temp}°C
									</p>
									<p>{weather.description}</p>
								</div>
							</div>
						) : (
							<p>
								<ImSpinner3 className="animate-spin text-4xl" />
							</p>
						)}
					</div>
				</div>
				<div className="w-full p-8">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Modi nisi ipsa quo facilis necessitatibus aperiam
						laboriosam obcaecati numquam adipisci consequatur. Cum
						fugiat sapiente expedita modi odio tenetur dolorem
						dolore esse?
					</p>
				</div>
			</div>
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
