'use client';

import { useEffect } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import Link from 'next/link';
import { animateScroll } from 'react-scroll';

export default function NavBar() {
	var scroll = animateScroll;

	function scrollToTop() {
		scroll.scrollToTop();
	}

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
			<div
				className="flex justify-between dark:text-white
			"
				id="upperNav"
			>
				<div className="flex items-center py-8 pl-6 sm:pl-8">
					<h2 className="mr-2 inline-block text-3xl font-bold sm:text-4xl">BU NEWS</h2>
					<h4 className="hidden font-bold sm:inline-block"> - The pulse of university life</h4>
				</div>
				<div className="flex items-center">
					<Link href="/profile">
						<BsFillPersonFill className="mr-6 rounded-full bg-red-700 p-2 text-5xl text-white transition-all ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-red-600 active:bg-red-800" />
					</Link>
				</div>
			</div>
			<nav className="sticky top-0 z-20">
				<ul className="flex justify-between bg-sky-700 py-4 text-white">
					<h3
						id="subHeading"
						title="Click to scroll to top"
						className="group ml-5 hidden text-xl font-bold hover:cursor-pointer sm:invisible sm:inline-block"
						onClick={() => {
							scrollToTop();
						}}
					>
						BU NEWS
						<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
					</h3>
					<div className="flex justify-between text-lg text-white sm:justify-end">
						<Link href="/home" className="group mx-3 transition duration-300 sm:mx-4">
							Home
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</Link>
						<Link href="/headlines/all" className="group mx-3 transition duration-300 sm:mx-4">
							Headlines
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</Link>
						<Link href="/events" className="group mx-3 transition duration-300 sm:mx-4">
							Events
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</Link>
						<Link
							href="/lost_and_found"
							className="group mx-3 transition duration-300 before:content-['L_&_F'] sm:mx-4 sm:before:content-['Lost_And_Found']"
						>
							<span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
						</Link>
					</div>
				</ul>
			</nav>
		</>
	);
}
