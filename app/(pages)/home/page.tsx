"use client";
import firebase_app from "@/firebase/config";
import { User, getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Image from "next/image";
import PromotedNews from "./PromotedNews";
import { News, NewsCategory, UserDetail, Weather } from "../../types";
import SubscribedNews from "./SubscribedNews";
import ReactLoading from "react-loading";
import Footer from "../../components/Footer";

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

	const [categories, setCategories] = useState<NewsCategory | undefined>(undefined);
	const [allNews, setAllNews] = useState<News[]>([]);
	const [promotedNews, setPromotedNews] = useState<News[]>([]);
	const [subscribedNews, setSubscribedNews] = useState<News[] | undefined>(undefined);

	useEffect(() => {
		const db = getDatabase(firebase_app);
		const userRef = ref(db, `users/${user?.uid}`);
		const uploadRef = ref(db, `uploads/`);

		if (!user) return;

		if (user?.isAnonymous) {
			setUserDetail({
				name: 'Guest',
				phoneNo: '',
				city: '',
				admin: false,
			});
			setCategories({
				"Clubs Related": false,
				Event: false,
				General: false,
				Sports: false
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

			const all: News[] = [];
			const promoted: News[] = [];
			for (const key in data) {
				if (data[key].authorized) {
					data[key]["id"] = key;
					if (data[key].promoted) {
						promoted.push(data[key]);
					}
					all.push(data[key]);
				}
			}

			promoted.reverse();
			setPromotedNews(promoted);
			setAllNews(all);
		});
	}, [user]);

	useEffect(() => {
		if (categories === undefined) return;
		const subscribed: News[] = [];
		for (const key in allNews) {
			if (categories[allNews[key].category as keyof NewsCategory]) {
				subscribed.push(allNews[key]);
			}
		}
		subscribed.reverse();
		setSubscribedNews(subscribed);
	}, [categories, allNews]);

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
						description: 'Not Found',
						icon: '01d',
					});
				}
			});
	}, [userDetail]);

	if (!user)
		return (
			<div className="flex min-h-screen items-center justify-center dark:bg-zinc-900 dark:text-white">
				<p className="text-xl font-medium">Redirecting...</p>
			</div>
		);

	return (
		<main className="flex min-h-screen flex-col justify-between dark:bg-zinc-900 dark:text-white">
			<NavBar />
			{/* Greeting and today's weather */}
			<div className="flex flex-col border-b-2 py-4 dark:border-gray-700 lg:flex-row">
				<div className="w-full p-6 lg:p-8 lg:pr-0">
					<div className="flex justify-between">
						<div>
							<h2 className="whitespace-nowrap text-3xl font-bold sm:text-4xl">{greeting()}</h2>
							<h3 className="text-2xl font-bold sm:text-3xl">{userDetail?.name.split(" ")[0]}</h3>
							<p className="text-lg">{date()}</p>
						</div>
						<div className="sm:mr-8 lg:mr-0">
							{weather ? (
								<div className="flex items-center">
									<Image
										src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
										width={64}
										height={64}
										alt="weather icon"
										priority
										className="h-16 w-16"
									/>
									<div className="ml-4">
										<p className="text-2xl font-bold sm:text-3xl">{weather.temp}°C</p>
										<p>{weather.description}</p>
									</div>
								</div>
							) : (
								<ReactLoading type="bars" color="rgb(3 105 161)" height={50} width={50} />
							)}
						</div>
					</div>
					<div className="mt-8">
						<p>
							Welcome to BU News, the pulse of university life and the unofficial news source for the students, faculty,
							and staff of Bennett University.
						</p>
					</div>
				</div>
				<PromotedNews promotedNews={promotedNews} />
			</div>
			<SubscribedNews
				subscribedNews={subscribedNews}
				subscribedCategories={categories}
				guest={user?.isAnonymous ?? false}
				uid={user?.uid}
			/>
			<Footer />
		</main>
	);
}
