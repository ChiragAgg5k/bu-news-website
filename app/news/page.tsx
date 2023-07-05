'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { News } from '../types'
import { getDatabase, onValue, ref } from 'firebase/database'
import firebase_app from '@/firebase/config'
import NavBar from '../components/NavBar'
import Image from 'next/image'

function dateInMillisecondsToDateString(date: number) {
	const d = new Date(date)
	const month = d.toLocaleString('default', {
		month: 'long',
	})
	const day = d.getDate()
	const year = d.getFullYear()
	return `${month} ${day}, ${year}`
}

export default function NewsPage() {
	const searchParams = useSearchParams()
	const id = searchParams.get('id')

	const [news, setNews] = useState<News | undefined>(undefined)

	useEffect(() => {
		const db = getDatabase(firebase_app)
		const uploadRef = ref(db, `uploads/`)

		onValue(uploadRef, (snapshot) => {
			const data = snapshot.val()

			for (const key in data) {
				if (key === id) setNews(data[key])
			}
		})
	}, [id])

	return (
		<div>
			<NavBar />
			<div className="m-4">
				{news === undefined ? (
					<p>Loading...</p>
				) : (
					<div>
						<h2 className="my-8 text-2xl font-bold">{news.newsHeading}</h2>
						<div className="flex flex-col lg:flex-row lg:items-start">
							<p className="whitespace-pre-line">{news.newsDescription}</p>
							<Image
								src={news.mImageUrl}
								alt="News Image"
								className="my-4 w-full max-w-sm object-contain lg:ml-8 lg:mr-4"
								width={500}
								height={500}
							/>
						</div>
						<p className="mt-6 text-lg font-medium">{news.username ? news.username : 'Anonymous'}</p>
						<p className="mb-6 text-base">{dateInMillisecondsToDateString(news.dateInMilliseconds)}</p>
					</div>
				)}
			</div>
		</div>
	)
}
