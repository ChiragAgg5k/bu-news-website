import NavBar from '../../../components/NavBar';
import { News } from '../../../types';
import { get, getDatabase, ref } from 'firebase/database';
import firebase_app from '@/firebase/config';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const allCategories = {
	all: 'All',
	general: 'General',
	sports: 'Sports',
	'clubs-related': 'Clubs Related',
	events: 'Event',
};

async function getNews(category: string): Promise<News[]> {
	const db = getDatabase(firebase_app);
	const uploadRef = ref(db, `uploads/`);

	const res = await get(uploadRef).then((snapshot) => {
		const data = snapshot.val();
		const news: News[] = [];

		for (const key in data) {
			if (data[key].authorized) {
				data[key]['id'] = key;
				if (category === 'All') news.unshift(data[key]);
				else if (data[key].category === category) news.unshift(data[key]);
			}
		}

		return news;
	});

	return res;
}

export default async function HeadlinesPage({
	params,
}: {
	params: {
		category: string;
	};
}) {
	const news = await getNews(allCategories[params.category as keyof typeof allCategories]);

	return (
		<main className="flex min-h-screen flex-col justify-between dark:text-white">
			<NavBar />
			<div>
				{/* Category Selector */}
				<div className="ml-2 mt-4 flex overflow-scroll">
					{Object.keys(allCategories).map((category, index) => {
						return (
							<Link
								href={category}
								key={index}
								className={`mb-4 mr-2 whitespace-nowrap rounded ${
									params.category === category
										? 'bg-gray-400 text-white dark:bg-gray-700'
										: 'bg-gray-300 dark:bg-gray-600'
								} px-10 py-4 transition-all ease-in-out hover:bg-gray-400 hover:text-white active:bg-gray-500 dark:hover:bg-gray-700 sm:flex-grow`}
							>
								{allCategories[category as keyof typeof allCategories]}
							</Link>
						);
					})}
				</div>

				{/* Headlines */}
				<div className="px-6 last:pb-8 lg:px-8">
					{news.length === 0 ? (
						<p>No news found.</p>
					) : (
						news.map((news, index) => {
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
													href={`/news/${news.id}`}
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
