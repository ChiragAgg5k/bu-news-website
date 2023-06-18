"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import Signup from "./signup";

export default function SignupPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading1, setLoading1] = useState(false);
	const [loading2, setLoading2] = useState(false);
	const router = useRouter();

	const handleForm = async (event: FormEvent) => {
		event.preventDefault();
		setLoading2(true);

		const { result, error } = await Signup(email, password);

		if (error) {
			return console.log(error);
		}

		// else successful
		console.log(result);
		return router.push("/admin");
	};

	return (
		<div className="flex flex-col md:flex-row">
			<Image
				src={"/background.jpg"}
				alt="Picture of the University"
				width={500}
				height={500}
				className="pointer-events-none absolute z-10 h-full w-full object-cover opacity-5"
			/>
			<div className="relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-600 to-sky-900 text-white">
				<div className="z-20 text-center">
					<h1 className="text-5xl font-bold">BU News</h1>
					<h3 className="mb-8 text-lg">
						The pulse of University life
					</h3>

					<p className="mb-5">Already have an account? </p>

					<button
						disabled={loading1}
						className="my-1 w-full rounded bg-white py-3 text-center text-red-500 hover:bg-gray-100 focus:outline-none"
						onClick={() => {
							setLoading1(true);
							router.push("/login");
						}}>
						{loading1 ? "Loading..." : "Sign in here"}
					</button>

					<div className="mt-10">
						<p className="mr-1 inline-block">Or</p>

						<a href="" className="inline-block border-b">
							click here
						</a>

						<p className="ml-1 inline-block">to login as a guest</p>
					</div>
				</div>
			</div>
			<div className="flex min-h-screen w-full flex-col bg-gray-200 md:w-2/3">
				<Image
					src={"/background.jpg"}
					alt="Picture of the University"
					width={500}
					height={500}
					className="pointer-events-none absolute z-10 h-full w-full object-cover opacity-10 md:hidden"
				/>
				<div className="container z-10 mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
					<form
						className="w-full rounded bg-white px-6 py-10 text-black shadow-md"
						onSubmit={handleForm}>
						<h1 className="mb-8 text-center text-3xl font-medium">
							Sign up
						</h1>
						<input
							type="text"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="fullname"
							placeholder="Full Name"
							required
						/>

						<input
							type="text"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="email"
							placeholder="Email"
							required
							onChange={(event) => setEmail(event.target.value)}
						/>

						<input
							type="text"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="contact"
							placeholder="Contact"
							required
						/>

						<input
							type="text"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="city"
							placeholder="City or Zip Code"
							required
						/>

						<input
							type="password"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="password"
							placeholder="Password"
							required
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>

						<button
							type="submit"
							disabled={loading2}
							className="my-1 w-full rounded bg-red-500 py-3 text-center text-white hover:bg-red-600 focus:outline-none">
							{loading2 ? "Loading..." : "Sign up"}
						</button>

						<div className="mt-8 text-center text-sm text-gray-700">
							By signing up, you agree to the{" "}
							<a
								className="border-b border-gray-700 text-gray-700 no-underline"
								href="#">
								Terms of Service
							</a>{" "}
							and{" "}
							<a
								className="border-b border-gray-700 text-gray-700 no-underline"
								href="#">
								Privacy Policy
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
