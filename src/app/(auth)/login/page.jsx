import Link from "next/link";

import { auth, signIn } from "@/lib/auth";

const Login = async () => {
	const session = await auth();
	console.info(session);

	const githubLogin = async () => {
		"use server";
		await signIn("github");
	};

	return (
		<div className="container flex flex-col items-center justify-center px-6 lg:py-12 mx-auto py-8">
			<form className="w-full max-w-md">
				<h1 className="text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
					Login
				</h1>

				<div className="relative flex items-center mt-8">
					<span className="absolute">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</span>

					<input
						type="email"
						name="email"
						className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-12 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
						placeholder="Email address"
					/>
				</div>

				<div className="relative flex items-center mt-4">
					<span className="absolute">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</span>

					<input
						type="password"
						className="block w-full px-12 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
						name="password"
						placeholder="Password"
					/>
				</div>

				<div className="mt-6">
					<button className="w-full px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
						Log in
					</button>

					<p className="mt-4 text-center text-gray-600 dark:text-gray-400">
						or sign in with
					</p>
				</div>
			</form>

			<form
				action={githubLogin}
				className="w-full max-w-md">
				<button
					className="w-full flex items-center justify-center px-6 py-3 mt-4 text-gray-600 duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
					type="submit">
					<svg
						className="w-8 h-8 mx-2"
						viewBox="0 0 24 24"
						fill="CurrentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"></path>
					</svg>
					<span className="mx-2">Sign in with Github</span>
				</button>
				<div className="mt-6 text-center">
					<p className="text-sm">
						Don’t have an account yet?
						<Link
							href="register"
							className="hover:underline text-blue-500 dark:text-blue-400 ml-1">
							Register
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
