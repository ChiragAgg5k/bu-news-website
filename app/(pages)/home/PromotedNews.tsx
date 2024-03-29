import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ImArrowRight2 } from 'react-icons/im';
import Link from 'next/link';
import { News } from '../../types';
import ReactLoading from 'react-loading';

export default function PromotedNews(props: { promotedNews: News[] }) {
	const [activeNewsIndex, setActiveNewsIndex] = useState<number>(0);
	const [activeNews, setActiveNews] = useState<News | null>(null);
	const [loaderColor, setLoaderColor] = useState<string>('#000000');

	useEffect(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setLoaderColor('#ffffff');
		}
	}, []);

	useEffect(() => {
		if (!activeNews && props.promotedNews.length > 0) {
			setActiveNews(props.promotedNews[0]);
		}
	}, [activeNews, props.promotedNews]);

	return (
		<div className="w-full">
			{activeNews ? (
				<div className="relative m-4 rounded-xl bg-gray-100 p-4 transition-all ease-in-out hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
					<div className="flex flex-col sm:flex-row">
						<Image
							src={activeNews.mImageUrl}
							width={500}
							height={500}
							alt="news image"
							className="mx-auto h-52 w-auto rounded-lg object-contain sm:w-full"
						/>
						<div className="p-5">
							<h4 className="mb-2 font-bold">{activeNews.newsHeading}</h4>
							<p className="mb-4 text-gray-700 dark:text-gray-300">
								{activeNews.newsDescription.length > 200 ? (
									<>
										{activeNews.newsDescription.substring(0, 200)}
										...
									</>
								) : (
									activeNews.newsDescription
								)}
							</p>
							<Link className="mr-8 font-light hover:underline" href={`/news/${activeNews.id}`}>
								Continue Reading
							</Link>
							<button
								onClick={() => {
									if (activeNewsIndex < props.promotedNews.length - 1) {
										setActiveNewsIndex(activeNewsIndex + 1);
										setActiveNews(props.promotedNews[activeNewsIndex + 1]);
									} else {
										setActiveNewsIndex(0);
										setActiveNews(props.promotedNews[0]);
									}
								}}
							>
								<ImArrowRight2 className="absolute right-0 mr-4 text-2xl hover:scale-105 active:scale-95" />
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className="flex h-full items-center justify-center py-20 lg:py-0">
					<ReactLoading type="bars" color={loaderColor} height={30} width={30} className="mr-4" />
					<p className="">Loading...</p>
				</div>
			)}
		</div>
	);
}
