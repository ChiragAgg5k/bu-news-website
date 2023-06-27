"use client";
import firebase_app from "@/firebase/config";
import { User, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { get, getDatabase, onValue, ref, set } from "firebase/database";
import { use, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";
import { ImArrowRight2, ImSpinner3 } from "react-icons/im";
import Link from "next/link";

interface UserDetail {
	name: string;
	phoneNo: string;
	city: string | undefined;
	admin: boolean;
}

interface News {
	authorized: boolean;
	category: string;
	dateInMilliseconds: number;
	mImageUrl: string;
	newsDescription: string;
	newsHeading: string;
	promoted: boolean;
	username: string;
}

interface Weather {
	temp: number;
	description: string;
	icon: string;
}

function logout() {
	const auth = getAuth(firebase_app);
	auth.signOut();
}

export default function Home() {
	const [user, setUser] = useState<User | null>(null);
	const { push } = useRouter();

	useEffect(() => {
		const auth = getAuth(firebase_app);

		auth.onAuthStateChanged((user) => {
			if (!user) {
				push("/signup");
			} else {
				setUser(user);
			}
		});
	}, [push]);

	const [userDetail, setUserDetail] = useState<UserDetail | null>({
		name: "...",
		phoneNo: "",
		city: undefined,
		admin: false
	});

	const [promotedNews, setPromotedNews] = useState<News[]>([]);

	useEffect(() => {
		const db = getDatabase(firebase_app);
		const userRef = ref(db, `users/${user?.uid}`);
		const uploadRef = ref(db, `uploads/`);

		onValue(userRef, (snapshot) => {
			const data = snapshot.val();
			setUserDetail(data);
		});

		onValue(uploadRef, (snapshot) => {
			const data = snapshot.val();
			const news: News[] = [];
			for (const key in data) {
				if (data[key].authorized && data[key].promoted) {
					news.push(data[key]);
				}
			}
			setPromotedNews(news);
		});
	}, [user]);

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

	const [activeNewsIndex, setActiveNewsIndex] = useState<number>(0);
	const [activeNews, setActiveNews] = useState<News | null>(null);

	useEffect(() => {
		if (!activeNews && promotedNews.length > 0) {
			setActiveNews(promotedNews[0]);
		}
	}, [activeNews, promotedNews]);

	return (
		<main>
			<NavBar />
			{/* Greeting and today's weather */}
			<div className="flex flex-col border-b-2 lg:flex-row">
				<div className="w-full p-6 lg:p-8 lg:pr-0">
					<div className="flex justify-between">
						<div>
							<h2 className="text-4xl font-bold">{greeting()}</h2>
							<h3 className="text-3xl font-bold">
								{userDetail?.name.split(" ")[0]}
							</h3>
							<p>{date()}</p>
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
					<div className="mt-4">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Veritatis, facilis reiciendis fugit cumque
							aliquam quam quibusdam, itaque dicta accusamus nulla
							amet facere! Nulla molestias veniam ratione
							laudantium tempore excepturi debitis?
						</p>
					</div>
				</div>
				<div className="w-full">
					{activeNews ? (
						<div className="relative m-4 rounded-xl p-4 hover:bg-gray-200">
							<div className="flex flex-col sm:flex-row">
								<Image
									src={activeNews.mImageUrl}
									width={500}
									height={300}
									alt="news image"
									className="object-fit mx-auto h-52 w-auto rounded-lg sm:w-full"
								/>
								<div className="p-5">
									<h4 className="mb-2 font-bold">
										{activeNews.newsHeading}
									</h4>
									<p className="mb-4">
										{activeNews.newsDescription.length >
										200 ? (
											<>
												{activeNews.newsDescription.substring(
													0,
													200
												)}
												...
											</>
										) : (
											activeNews.newsDescription
										)}
									</p>
									<Link
										href="#"
										className="font-light hover:underline">
										Continue reading
									</Link>
									<button
										onClick={() => {
											if (
												activeNewsIndex <
												promotedNews.length - 1
											) {
												setActiveNewsIndex(
													activeNewsIndex + 1
												);
												setActiveNews(
													promotedNews[
														activeNewsIndex + 1
													]
												);
											} else {
												setActiveNewsIndex(0);
												setActiveNews(promotedNews[0]);
											}
										}}>
										<ImArrowRight2 className="absolute right-0 mr-4 text-2xl" />
									</button>
								</div>
							</div>
						</div>
					) : (
						<p className="flex h-full items-center justify-center">
							Loading...
						</p>
					)}
				</div>
			</div>
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
