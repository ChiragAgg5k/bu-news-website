'use client';

import { useEffect } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import Link from 'next/link';

export default function NavBar() {
	useEffect(() => {
		const upperNav = document.querySelector('#upperNav');
		const subHeading = document.querySelector('#subHeading');
		const nav = document.querySelector('nav');

		if (!upperNav || !subHeading || !nav) return;

		window.addEventListener('scroll', () => {
			if (window.scrollY > upperNav.clientHeight) {
				subHeading.classList.remove('sm:invisible');
			} else {
				subHeading.classList.add('sm:invisible');
			}
		});
	}, []);

	return (
		<>
			<div className="flex justify-between" id="upperNav">
				<div className="flex items-center py-6">
					<h2 className="ml-6 mr-2 inline-block text-3xl font-bold text-black sm:text-4xl">BU NEWS</h2>
					<h4 className="hidden font-bold text-black sm:inline-block"> - The pulse of university life</h4>
				</div>
				<div className="flex items-center">
					<BsFillPersonFill className="mr-6 rounded-full bg-red-700 p-2 text-5xl text-white hover:cursor-pointer hover:bg-red-600 active:bg-red-800" />
				</div>
			</div>
			<nav className="sticky top-0 z-20">
				<ul className="flex justify-between bg-sky-700 py-4 text-white">
					<h3 id="subHeading" className="ml-5 hidden text-xl font-bold sm:invisible sm:inline-block">
						BU NEWS
					</h3>
					<div className="flex justify-center text-lg text-white sm:justify-end">
						<Link href="/home" className="group mx-3 transition duration-300 sm:mx-4">
							Home
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</Link>
						<a href="#" className="group mx-3 transition duration-300 sm:mx-4">
							Headlines
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</a>
						<a href="#" className="group mx-3 transition duration-300 sm:mx-4">
							Events
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</a>
						<a
							href="#"
							className="group mx-3 transition duration-300 before:content-['L_&_F'] sm:mx-4 sm:before:content-['Lost_And_Found']"
						>
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</a>
					</div>
				</ul>
			</nav>
		</>
	);
}
