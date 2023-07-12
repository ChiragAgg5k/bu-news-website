import Link from 'next/link';
import { News, NewsCategory } from '../types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubscribedNews(props: {
	subscribedNews: News[] | undefined;
	subscribedCategories: NewsCategory | undefined;
	guest: boolean;
}) {
	const [categories, setCategories] = useState<String>('loading...');
	const router = useRouter();

	useEffect(() => {
		if (props.subscribedCategories === undefined) return;

		let categories = '';
		for (const category in props.subscribedCategories) {
			if (props.subscribedCategories.hasOwnProperty(category) && props.subscribedCategories[category]) {
				categories += category + ', ';
			}
		}
		categories = categories.slice(0, -2);
		setCategories(categories);
	}, [props.subscribedCategories]);

	return (
		<div className="border-b-2 p-6 lg:p-8">
			<h3 className="text-2xl font-bold">Subscribed News</h3>
			<div className="mt-4">
				{props.subscribedNews === undefined ? (
					<div className="my-4 flex flex-col">
						<p className="text-lg">Loading subscribed news...</p>
					</div>
				) : props.subscribedNews.length === 0 ? (
					<>
						<p className="inline-block text-base">You have not subscribed to any news yet.</p>
					</>
				) : (
					<>
						<p>You have subscribed to the following news categories: {categories}.</p>
						{props.subscribedNews.map((news, index) => {
							return (
								<div key={index} className="my-12 flex flex-col sm:my-8">
									<h4 className="text-xl font-bold">{news.newsHeading}</h4>
									<div className="flex flex-col sm:flex-row">
										<div className="mb-4 text-base">
											<p className="mr-2 line-clamp-6 text-base">{news.newsDescription}</p>
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
						})}
					</>
				)}
			</div>
			<div className="mt-8 flex items-center justify-center">
				<p className="mr-2 inline-block text-base">
					{props.guest
						? 'You need to login to subscribe to news categories...'
						: 'Subscribe to more news categories - '}
				</p>
				<button
					className="disable:hover:cursor-default inline-block rounded bg-red-700 px-3 py-1 text-lg text-white transition ease-in-out hover:bg-red-600 active:bg-red-800 disabled:bg-gray-600"
					disabled={props.guest}
					onClick={() => {}}
				>
					Subscribe
				</button>
			</div>
		</div>
	);
}
