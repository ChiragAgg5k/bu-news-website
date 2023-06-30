"use client";
import firebase_app from "@/firebase/config";
import { User, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";
import { ImSpinner3 } from "react-icons/im";
import PromotedNews from "./PromotedNews";
import { News, NewsCategory, UserDetail, Weather } from "../types";
import SubscribedNews from "./SubscribedNews";

function logout() {
	const auth = getAuth(firebase_app);
	auth.signOut();
}

export default function Home() {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

	useEffect(() => {
		const auth = getAuth(firebase_app);

		auth.onAuthStateChanged((user) => {
			if (!user) {
				router.push("/signup");
			} else {
				setUser(user);
			}
		});
	}, [router]);

	const [userDetail, setUserDetail] = useState<UserDetail | null>({
		name: "...",
		phoneNo: "",
		city: undefined,
		admin: false
	});

	const [categories, setCategories] = useState<NewsCategory | undefined>(
		undefined
	);
	const [promotedNews, setPromotedNews] = useState<News[]>([]);
	const [subscribedNews, setSubscribedNews] = useState<News[] | undefined>(
		undefined
	);

	useEffect(() => {
		const db = getDatabase(firebase_app);
		const userRef = ref(db, `users/${user?.uid}`);
		const uploadRef = ref(db, `uploads/`);

		if (!user) return;

		if (user?.isAnonymous) {
			setUserDetail({
				name: "Guest",
				phoneNo: "",
				city: "",
				admin: false
			});
			setCategories({
				"Clubs Related": true,
				Event: true,
				General: true,
				Sports: true
			});
		} else {
			onValue(userRef, (snapshot) => {
				const data = snapshot.val();
				if (data) {
					setCategories(data.categories);
				}
				setUserDetail(data);
			});
		}

		onValue(uploadRef, (snapshot) => {
			const data = snapshot.val();

			const promoted: News[] = [];
			for (const key in data) {
				if (data[key].authorized) {
					if (data[key].promoted) promoted.push(data[key]);
				}
			}

			promoted.reverse();
			setPromotedNews(promoted);
		});
	}, [user]);

	useEffect(() => {
		if (categories === undefined) return;

		const db = getDatabase(firebase_app);
		const uploadRef = ref(db, `uploads/`);

		onValue(uploadRef, (snapshot) => {
			const subscribed: News[] = [];
			const data = snapshot.val();

			for (const key in data) {
				if (data[key].authorized) {
					if (categories[data[key].category as keyof NewsCategory]) {
						subscribed.push(data[key]);
					}
				}
			}

			subscribed.reverse();
			setSubscribedNews(subscribed);
		});
	}, [categories]);

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
		if (userDetail?.city === undefined) return;

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
				} else {
					setWeather({
						temp: 0,
						description: "Not Found",
						icon: "01d"
					});
				}
			});
	}, [userDetail]);

	return (
		<main>
			<NavBar />
			{/* Greeting and today's weather */}
			<div className="flex flex-col border-b-2 lg:flex-row">
				<div className="w-full p-6 lg:p-8 lg:pr-0">
					<div className="flex justify-between">
						<div>
							<h2 className="text-3xl font-bold sm:text-4xl">
								{greeting()}
							</h2>
							<h3 className="text-2xl font-bold sm:text-3xl">
								{userDetail?.name.split(" ")[0]}
							</h3>
							<p className="text-lg">{date()}</p>
						</div>
						<div className="mr-8 lg:mr-0">
							{weather ? (
								<div className="flex items-center">
									<Image
										src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
										width={64}
										height={64}
										alt="weather icon"
										className="h-16 w-16"
									/>
									<div className="ml-4">
										<p className="text-2xl font-bold sm:text-3xl">
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
					<div className="mt-8">
						<p>
							Welcome to BU News, the pulse of university life and
							the unofficial news source for the students,
							faculty, and staff of Bennett University.
						</p>
					</div>
				</div>
				<PromotedNews promotedNews={promotedNews} />
			</div>
			<SubscribedNews subscribedNews={subscribedNews} />
			<div className="mt-20 flex flex-col items-center justify-center">
				<p>Work in progress...</p>
				<button
					className="my-1 rounded bg-sky-700 px-16 py-3 text-center text-white hover:bg-sky-600 focus:outline-none"
					onClick={() => {
						logout();
					}}>
					Logout
				</button>
			</div>
		</main>
	);
}
