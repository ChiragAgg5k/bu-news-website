"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import Login from "./login";
import { AiFillEye, AiTwotoneEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading1, setLoading1] = useState(false); // for login button
	const [loading2, setLoading2] = useState(false); // for redirecting to signup
	const router = useRouter();

	const handleForm = async (event: FormEvent) => {
		event.preventDefault();

		const { result, error } = await Login(email, password);

		if (error) {
			return console.log(error);
		}

		// else successful
		console.log(result);
		return router.push("/home");
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
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
			<div className="relative z-0 flex py-32 md:min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-600 to-sky-900 text-white">
				<div className="z-20 text-center">
					<h1 className="text-5xl font-bold">BU News</h1>
					<h3 className="mb-8 text-lg">
						The pulse of University life
					</h3>

					<p className="mb-5">
						New to BU News? Create an account to get started
					</p>

					<button
						className="my-1 px-16 rounded bg-white py-3 text-center text-red-500 hover:bg-gray-100 focus:outline-none"
						onClick={() => {
							router.push("/signup");
							setLoading2(true);
						}}>
						{loading2 ? "Loading..." : "Sign up here"}
					</button>
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
							Login
						</h1>

						<input
							type="text"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="email"
							placeholder="Email"
							required
							onChange={(event) => setEmail(event.target.value)}
						/>

						<div className="flex justify-end items-center">
							{showPassword ? (
								<AiTwotoneEyeInvisible
									className="absolute z-20 text-2xl mr-3"
									onClick={() => handleShowPassword()}
								/>
							) : (
								<AiFillEye
									className="absolute z-20 text-2xl mr-3"
									onClick={() => handleShowPassword()}
								/>
							)}
							<input
								type={showPassword ? "text" : "password"}
								className="block w-full rounded border border-gray-200 p-3 hover:border-red-300"
								name="password"
								placeholder="Password"
								required
								onChange={(event) =>
									setPassword(event.target.value)
								}
							/>
						</div>

						<button
							type="submit"
							onClick={() => {
								setLoading1(true);
								handleForm;
							}}
							className="my-1 mt-4 w-full rounded bg-red-500 py-3 text-center text-white hover:bg-red-600 focus:outline-none">
							{loading1 ? "Loading..." : "Login"}
						</button>

						<div className="mt-8 text-center text-sm text-gray-700">
							Forgot your password?
							<Link
								href="/forgot-password"
								className="border-b border-black">
								{" "}
								Click here{" "}
							</Link>
							to reset it.
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
