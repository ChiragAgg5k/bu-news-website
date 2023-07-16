'use client';

import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { AllNews, News } from '../../types';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import firebase_app from '@/firebase/config';
import ReactLoading from 'react-loading';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/Footer';

export default function Headlines() {
	const allCategories = ['All', 'General', 'Sports', 'Clubs Related', 'Event'];

	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [allNews, setAllNews] = useState<AllNews | undefined>(undefined);
	const [loaderColor, setLoaderColor] = useState<string>('#000000');

	useEffect(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setLoaderColor('#ffffff');
		}
	}, []);

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
					data[key]['id'] = key;
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
		<main className="flex min-h-screen flex-col justify-between dark:text-white">
			<NavBar />
			<div>
				{/* Category Selector */}
				<div className="ml-2 mt-4 flex overflow-scroll">
					{allCategories.map((category, index) => {
						return (
							<button
								key={index}
								onClick={() => setSelectedCategory(category)}
								className={`mb-4 mr-2 whitespace-nowrap rounded ${
									selectedCategory === category
										? 'bg-gray-400 text-white dark:bg-gray-600'
										: 'bg-gray-300 dark:bg-gray-500'
								} px-10 py-4 transition-all ease-in-out hover:bg-gray-400 hover:text-white active:bg-gray-500 sm:flex-grow`}
							>
								{category}
							</button>
						);
					})}
				</div>

				{/* Healines */}
				<div className="px-6 lg:px-8">
					{allNews === undefined || selectedCategory === undefined ? (
						<div className="my-40 flex items-center justify-center">
							<ReactLoading type="bars" color={loaderColor} height={40} width={40} />
						</div>
					) : allNews[selectedCategory].length === 0 ? (
						<p>No news found.</p>
					) : (
						// allNews[selectedCategory].map((news, index) => {
						// 	return <div key={index}>{news.newsHeading}</div>;
						// })
						allNews[selectedCategory].map((news, index) => {
							return (
								<div key={index} className="my-12 flex flex-col sm:my-8">
									<h4 className="text-xl font-bold">{news.newsHeading}</h4>
									<div className="flex flex-col sm:flex-row">
										<div className="mb-4 text-base">
											<p className="mr-2 line-clamp-6 text-base dark:text-gray-400">
												{news.newsDescription}
											</p>
											<div className="mb-8 mt-4 flex flex-col-reverse justify-between text-lg sm:flex-row">
												<p className="ml-auto sm:ml-0">
													- {news.username ? news.username : 'Anonymous'}
												</p>
												<Link
													className="mr-8 font-light hover:underline"
													prefetch={true}
													href={{
														pathname: '/news/',
														query: {
															id: news.id,
														},
													}}
												>
													Continue Reading
												</Link>
											</div>
										</div>
										<Image
											src={news.mImageUrl}
											width={500}
											height={300}
											alt="news image"
											className="max-h-72 w-auto object-contain sm:h-64 sm:w-auto"
										/>
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>
			<Footer />
		</main>
	);
}
