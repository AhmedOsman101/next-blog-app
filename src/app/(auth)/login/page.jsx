import Link from "next/link";

const Login = async () => {
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

			<div className="w-full max-w-md">
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
			</div>
		</div>
	);
};

export default Login;
