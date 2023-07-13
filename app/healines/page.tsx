'use client';

import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { AllNews, News, NewsCategory } from '../types';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import firebase_app from '@/firebase/config';
import ReactLoading from 'react-loading';

export default function Headlines() {
	const allCategories = ['All', 'General', 'Sports', 'Clubs Related', 'Event'];

	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [allNews, setAllNews] = useState<AllNews | undefined>(undefined);

	// Fetch all news
	useEffect(() => {
		if (allNews != undefined) return;
		console.log('Fetching all news');

		const db = getDatabase(firebase_app);
		const uploadRef = ref(db, `uploads/`);
		onValue(uploadRef, (snapshot) => {
			const data = snapshot.val();
			const general: News[] = [];
			const sports: News[] = [];
			const clubsRelated: News[] = [];
			const event: News[] = [];
			const all: News[] = [];

			for (const key in data) {
				if (data[key].authorized) {
					all.push(data[key]);

					if (data[key].category === 'General') {
						general.push(data[key]);
					}

					if (data[key].category === 'Sports') {
						sports.push(data[key]);
					}

					if (data[key].category === 'Clubs Related') {
						clubsRelated.push(data[key]);
					}

					if (data[key].category === 'Event') {
						event.push(data[key]);
					}
				}
			}

			setAllNews({
				General: general,
				Sports: sports,
				'Clubs Related': clubsRelated,
				Event: event,
				All: all,
			});
		});
	}, [allNews]);

	return (
		<div className="">
			<NavBar />

			{/* Category Selector */}
			<div className="ml-2 mt-4 flex overflow-scroll">
				{allCategories.map((category, index) => {
					return (
						<button
							key={index}
							onClick={() => setSelectedCategory(category)}
							className="mb-4 mr-2 whitespace-nowrap rounded bg-gray-300 px-10 py-4 transition-all ease-in-out hover:bg-gray-400 hover:text-white active:bg-gray-500 sm:flex-grow"
						>
							{category}
						</button>
					);
				})}
			</div>

			{/* Healines */}
			<div className="">
				{allNews === undefined || selectedCategory === undefined ? (
					<div className="my-40 flex items-center justify-center">
						<ReactLoading type="bars" color="#000" height={40} width={40} />
					</div>
				) : allNews[selectedCategory].length === 0 ? (
					<p>No news found.</p>
				) : (
					allNews[selectedCategory].map((news, index) => {
						return <div key={index}>{news.newsHeading}</div>;
					})
				)}
			</div>
		</div>
	);
}
