export interface SignUpPageProps {
	email: string;
	password: string;
	name: string;
	phoneNo: string;
	city: string;
	admin: boolean;
}

export interface UserDetail {
	name: string;
	phoneNo: string;
	city: string | undefined;
	admin: boolean;
}

export interface News {
	id: string;
	authorized: boolean;
	category: string;
	dateInMilliseconds: number;
	mImageUrl: string;
	newsDescription: string;
	newsHeading: string;
	promoted: boolean;
	username: string;
}

export interface Weather {
	temp: number;
	description: string;
	icon: string;
}

export interface NewsCategory {
	"Clubs Related": boolean;
	[Event: string]: boolean;
	General: boolean;
	Sports: boolean;
}

export interface AllNews {
	All: News[];
	"Clubs Related": News[];
	[Event: string]: News[];
	General: News[];
	Sports: News[];
}

export interface LostFoundPost {
	type: "lost" | "found";
	contactno: string;
	itemDate: string;
	itemDescription: string;
	itemName: string;
	itemImageURL: string;
	itemLocation: string;
	toContactUID: string;
}

export interface Events {
	eventDate: number;
	eventDescription: string;
	eventHeading: string;
}
