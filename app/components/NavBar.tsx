"use client";

import { useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";

export default function NavBar() {
	useEffect(() => {
		const upperNav = document.querySelector("#upperNav");
		const subHeading = document.querySelector("#subHeading");
		const nav = document.querySelector("nav");

		if (!upperNav || !subHeading || !nav) return;

		window.addEventListener("scroll", () => {
			if (window.scrollY > upperNav.clientHeight) {
				subHeading.classList.remove("invisible");
			} else {
				subHeading.classList.add("invisible");
			}
		});
	}, []);

	return (
		<>
			<div className="flex justify-between" id="upperNav">
				<div className="flex items-center py-6">
					<h2 className="ml-6 mr-2 inline-block text-4xl font-bold text-black">
						BU NEWS
					</h2>
					<h4 className="inline-block font-bold text-black">
						{" "}
						- The pulse of university life
					</h4>
				</div>
				<div className="flex items-center">
					<BsFillPersonFill className="mr-6 rounded-full bg-red-700 p-2 text-5xl text-white" />
				</div>
			</div>
			<nav className="sticky top-0">
				<ul className="flex justify-between bg-sky-700 py-4 text-white">
					<h3
						id="subHeading"
						className="invisible ml-5 text-xl font-bold">
						BU NEWS
					</h3>
					<span className="flex justify-end">
						<a
							href="#"
							className="group mx-4 text-lg text-white transition duration-300">
							Home
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</a>
						<a
							href="#"
							className="group mx-4 text-lg text-white transition duration-300">
							Headlines
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</a>
						<a
							href="#"
							className="group mx-4 text-lg text-white transition duration-300">
							Events
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</a>
						<a
							href="#"
							className="group mx-4 text-lg text-white transition duration-300">
							Lost and Found
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</a>
					</span>
				</ul>
			</nav>
		</>
	);
}
