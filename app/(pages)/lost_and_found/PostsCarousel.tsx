"use client";
import { LostFoundPost } from "@/app/types";
import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";

function dateInMillisecondsToDateString(dateInMili: string) {
	const date = new Date(dateInMili);
	return `${date.toLocaleString("default", { weekday: "long" })}, ${date.getDate()} ${date.toLocaleString("default", {
		month: "long",
	})} ${date.getFullYear()}`;
}

function PostItem({ post }: { post: LostFoundPost }) {
	return (
		<div
			key={post.itemDate}
			className="relative mb-10 flex w-full max-w-lg rounded bg-gray-400 text-gray-800 dark:bg-gray-600 dark:text-gray-200 md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
		>
			<div className="m-6 flex w-full flex-col justify-between">
				<div>
					<h3 className="text-xl font-bold">{post.itemName}</h3>
					<p className="font-sm">{post.itemDescription}</p>
					<p className="mb-2 text-sm">{post.itemLocation}</p>
					<Link href={`/profile?userId=${post.toContactUID}`} className="font-medium hover:underline">
						Contact
					</Link>
				</div>
				<p>{dateInMillisecondsToDateString(post.itemDate)}</p>
			</div>
			<Image
				src={post.itemImageURL}
				alt="Lost Item Image"
				width={500}
				height={500}
				className="xl:max-h-68 my-auto max-h-52 w-full rounded object-cover sm:max-h-56 md:max-h-60 lg:max-h-64"
			/>
		</div>
	);
}

export default function PostsCarousel({ posts }: { posts: LostFoundPost[] }) {
	return (
		<Tabs>
			<TabList className="mx-2 mb-10 flex items-center justify-around border-b-2 py-8 text-xl text-gray-800 hover:cursor-pointer dark:border-gray-500 dark:text-gray-200 sm:mx-6">
				<Tab className="rounded bg-gray-400 px-8 py-3 text-center transition-all ease-in-out hover:bg-gray-500 hover:text-white dark:bg-gray-600 dark:hover:bg-gray-700 sm:px-16">
					Lost Posts
				</Tab>
				<Tab className="rounded bg-gray-400 px-8 py-3 text-center transition-all ease-in-out hover:bg-gray-500 hover:text-white dark:bg-gray-600 dark:hover:bg-gray-700 sm:px-16">
					Found Posts
				</Tab>
			</TabList>

			<TabPanel className="mb-4 flex flex-col items-center justify-center">
				{posts.map((post) => {
					if (post.type === "lost") {
						return <PostItem post={post} key={post.itemDate} />;
					}
				})}

				<div className="my-4 flex items-center justify-center">
					<p className="mr-2 inline-block text-base">Lost something? Post it on the </p>
					<button className="inline-block rounded bg-sky-700 px-3 py-1 text-lg text-white transition ease-in-out hover:bg-sky-600 active:bg-sky-800">
						Lost & Found
					</button>
				</div>
			</TabPanel>

			<TabPanel className="mb-4 flex flex-col items-center justify-center">
				{posts.map((post) => {
					if (post.type === "found") {
						return <PostItem post={post} key={post.itemDate} />;
					}
				})}

				<div className="my-4 flex items-center justify-center">
					<p className="mr-2 inline-block text-base">Found something? Post it on the </p>
					<button className="inline-block rounded bg-sky-700 px-3 py-1 text-lg text-white transition ease-in-out hover:bg-sky-600 active:bg-sky-800">
						Lost & Found
					</button>
				</div>
			</TabPanel>
		</Tabs>
	);
}
