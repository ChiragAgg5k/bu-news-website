'use client'
import firebase_app from '@/firebase/config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ReactLoading from 'react-loading'

export default function Home() {
	const router = useRouter()
	const auth = getAuth(firebase_app)

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				router.push('/home')
			} else {
				router.push('/signup')
			}
		})
	}, [auth, router])

	return (
		<div className="flex h-screen items-center justify-center">
			<ReactLoading type="bars" color="#000000" height={100} width={50} />
		</div>
	)
}
