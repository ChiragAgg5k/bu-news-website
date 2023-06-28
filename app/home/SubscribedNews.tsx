import Link from "next/link";
import { News } from "../types";
import Image from "next/image";

export default function SubscribedNews(props: {
	subscribedNews: News[] | undefined;
}) {
	return (
		<div className="p-6 lg:p-8">
			<h3 className="text-2xl font-bold">Subscribed News</h3>
			{props.subscribedNews === undefined ? (
				<div className="my-4 flex flex-col">
					<p className="text-lg">Loading subscribed news...</p>
				</div>
			) : props.subscribedNews.length === 0 ? (
				<p className="text-lg">
					You have not subscribed to any news yet.
				</p>
			) : (
				props.subscribedNews.map((news, index) => {
					return (
						<div
							key={index}
							className="my-12 flex flex-col sm:my-8">
							<h4 className="text-xl font-bold">
								{news.newsHeading}
							</h4>
							<div className="flex flex-col sm:flex-row">
								<div className="mb-4 text-base">
									<p className="mb-4 mr-2 text-base line-clamp-6">
										{news.newsDescription}
									</p>
									<div className="mb-8 flex justify-between text-lg">
										<p>
											-{" "}
											{news.username
												? news.username
												: "Anonymous"}
										</p>
										<Link
											href="#"
											className="mr-8 font-light hover:underline">
											Continue reading
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
	);
}
