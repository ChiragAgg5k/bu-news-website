import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ImArrowRight2 } from 'react-icons/im'
import Link from 'next/link'
import { News } from '../types'

export default function PromotedNews(props: { promotedNews: News[] }) {
	const [activeNewsIndex, setActiveNewsIndex] = useState<number>(0)
	const [activeNews, setActiveNews] = useState<News | null>(null)

	useEffect(() => {
		if (!activeNews && props.promotedNews.length > 0) {
			setActiveNews(props.promotedNews[0])
		}
	}, [activeNews, props.promotedNews])

	return (
		<div className="w-full">
			{activeNews ? (
				<div className="relative m-4 rounded-xl bg-gray-100 p-4 transition-all ease-in-out hover:bg-gray-200">
					<div className="flex flex-col sm:flex-row">
						<Image
							src={activeNews.mImageUrl}
							width={500}
							height={300}
							alt="news image"
							className="object-fit mx-auto h-52 w-auto rounded-lg sm:w-full"
						/>
						<div className="p-5">
							<h4 className="mb-2 font-bold">{activeNews.newsHeading}</h4>
							<p className="mb-4">
								{activeNews.newsDescription.length > 200 ? (
									<>
										{activeNews.newsDescription.substring(0, 200)}
										...
									</>
								) : (
									activeNews.newsDescription
								)}
							</p>
							<Link
								className="mr-8 font-light hover:underline"
								href={{
									pathname: '/news/',
									query: {
										id: activeNews.id,
									},
								}}
							>
								Continue Reading
							</Link>
							<button
								onClick={() => {
									if (activeNewsIndex < props.promotedNews.length - 1) {
										setActiveNewsIndex(activeNewsIndex + 1)
										setActiveNews(props.promotedNews[activeNewsIndex + 1])
									} else {
										setActiveNewsIndex(0)
										setActiveNews(props.promotedNews[0])
									}
								}}
							>
								<ImArrowRight2 className="absolute right-0 mr-4 text-2xl hover:scale-105" />
							</button>
						</div>
					</div>
				</div>
			) : (
				<p className="flex h-full items-center justify-center py-20 lg:py-0">Loading...</p>
			)}
		</div>
	)
}
