import { LostFoundPost } from "@/app/types";
import NavBar from "../../components/NavBar";
import { get, getDatabase, ref } from "firebase/database";
import firebase_app from "@/firebase/config";
import PostsCarousel from "./PostsCarousel";

async function getLostFoundData(): Promise<LostFoundPost[]> {
	const db = getDatabase(firebase_app);
	const uploadRef = ref(db, `lost_found/`);

	const res = get(uploadRef).then((snapshot) => {
		const data = snapshot.val();
		const lost = data.lost;
		const found = data.found;

		const posts: LostFoundPost[] = [];

		for (const key in lost) {
			lost[key].type = "lost";
			posts.unshift(lost[key]);
		}

		for (const key in found) {
			found[key].type = "found";
			posts.unshift(found[key]);
		}

		return posts;
	});

	return res;
}

export default async function ProfilePage() {
	const posts = await getLostFoundData();

	return (
		<div className="dark:text-white">
			<NavBar />
			<PostsCarousel posts={posts} />
		</div>
	);
}
