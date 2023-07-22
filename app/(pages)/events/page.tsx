import { getDatabase, ref, get } from 'firebase/database';
import NavBar from '../../components/NavBar';
import firebase_app from '@/firebase/config';
import { Events } from '@/app/types';

async function getEvents() {
	const db = getDatabase(firebase_app);
	const uploadRef = ref(db, `events/`);

	const res = await get(uploadRef).then((snapshot) => {
		const data = snapshot.val();
		const events: Events[] = [];

		for (const key in data) {
			events.unshift(data[key]);
		}

		return events;
	});

	return res;
}

export default async function ProfilePage() {
	const events = await getEvents();

	return (
		<div className="dark:text-white">
			<NavBar />
			<h1>Events Page</h1>
			<p>{JSON.stringify(events)}</p>
		</div>
	);
}
