'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Signup, SignupAnonymously } from './signup';
import { AiFillEye, AiTwotoneEyeInvisible } from 'react-icons/ai';
import { SignUpPageProps } from '../types';

export default function SignUpPage() {
	const [signUp, setSignUp] = useState<SignUpPageProps>({
		email: '',
		password: '',
		name: '',
		phoneNo: '',
		city: '',
		admin: false,
	});
	const [loading1, setLoading1] = useState(false);
	const [loadingText, setLoadingText] = useState('Sign Up');
	const [guestLoading, setGuestLoading] = useState('Click here');
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleForm = async (event: FormEvent) => {
		event.preventDefault();
		setLoadingText('Signing Up...');

		const { error } = await Signup(signUp);

		if (error) {
			setLoadingText('Signup Failed');
			setTimeout(() => {
				setLoadingText('Sign Up');
			}, 1000);
			return;
		}

		// else successful
		setLoadingText('Sign Up Successful');
		return router.push('/home');
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleGuestLogin = async () => {
		setGuestLoading('Loading...');
		await SignupAnonymously();
		router.push('/home');
	};

	return (
		<div className="flex flex-col md:flex-row">
			<Image
				src={'/background.jpg'}
				alt="Picture of the University"
				width={500}
				height={500}
				className="pointer-events-none absolute z-10 h-full w-full object-cover opacity-5"
			/>
			<div className="relative z-0 flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-600 to-sky-900 py-32 text-white md:min-h-screen">
				<div className="z-20 text-center">
					<h1 className="text-5xl font-bold">BU News</h1>
					<h3 className="mb-8 text-lg">The pulse of University life</h3>

					<p className="mb-5">Already have an account? </p>

					<button
						disabled={loading1}
						className="my-1 w-full rounded bg-white py-3 text-center text-red-500 hover:bg-gray-100 focus:outline-none"
						onClick={() => {
							setLoading1(true);
							router.push('/login');
						}}
					>
						{loading1 ? 'Loading...' : 'Sign in here'}
					</button>

					<div className="mt-10">
						<p className="mr-1 inline-block">Or</p>

						<p
							onClick={() => {
								handleGuestLogin();
							}}
							className="inline-block border-b hover:cursor-pointer hover:border-b-2"
						>
							{guestLoading}
						</p>

						<p className="ml-1 inline-block">to login as a guest</p>
					</div>
				</div>
			</div>
			<div className="flex min-h-screen w-full flex-col bg-gray-200 md:w-2/3">
				<Image
					src={'/background.jpg'}
					alt="Picture of the University"
					width={500}
					height={500}
					className="pointer-events-none absolute z-10 h-full w-full object-cover opacity-10 md:hidden"
				/>
				<div className="container z-10 mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
					<form className="w-full rounded bg-white px-6 py-10 text-black shadow-md" onSubmit={handleForm}>
						<h1 className="mb-8 text-center text-3xl font-medium">Sign up</h1>
						<input
							type="text"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="fullname"
							placeholder="Full Name*"
							onChange={(event) => {
								setSignUp({
									...signUp,
									name: event.target.value,
								});
							}}
							required
						/>

						<input
							type="text"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="email"
							placeholder="Email*"
							onChange={(event) => {
								setSignUp({
									...signUp,
									email: event.target.value,
								});
							}}
						/>

						<input
							type="tel"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="contact"
							placeholder="Contact (+91)"
							onChange={(event) => {
								setSignUp({
									...signUp,
									phoneNo: event.target.value,
								});
							}}
						/>

						<input
							type="text"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="city"
							placeholder="City or Zip Code"
							onChange={(event) => {
								setSignUp({
									...signUp,
									city: event.target.value,
								});
							}}
						/>

						<div className="flex items-center justify-end">
							{showPassword ? (
								<AiTwotoneEyeInvisible
									className="absolute z-20 mr-3 text-2xl"
									onClick={() => handleShowPassword()}
								/>
							) : (
								<AiFillEye
									className="absolute z-20 mr-3 text-2xl"
									onClick={() => handleShowPassword()}
								/>
							)}
							<input
								type={showPassword ? 'text' : 'password'}
								id="password_input"
								className="relative block w-full rounded border border-gray-200 p-3 hover:border-red-300"
								name="password"
								placeholder="Password*"
								required
								onChange={(event) => {
									setSignUp({
										...signUp,
										password: event.target.value,
									});
								}}
							/>
						</div>

						<button
							type="submit"
							className="my-1 mt-4 w-full rounded bg-red-500 py-3 text-center text-white hover:bg-red-600 focus:outline-none"
						>
							{loadingText}
						</button>

						<div className="mt-8 text-center text-sm text-gray-700">
							Using android? Download the app instead, from{' '}
							<a
								className="border-b border-gray-700 text-gray-700 no-underline"
								rel="noreferrer"
								target="_blank"
								href="https://play.google.com/store/apps/details?id=com.chiragagg5k.bu_news_android"
							>
								Play Store
							</a>{' '}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
