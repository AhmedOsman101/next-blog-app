import Image from "next/image";
import Link from "next/link";

const Card = () => {
	return (
		<>
			<div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
				<div className="relative w-full h-[14.8rem]">
					<Image
						fill
						className="object-scale-down rounded-t-lg"
						src="https://images.pexels.com/photos/10147934/pexels-photo-10147934.jpeg"
						alt="Article Image"
					/>
				</div>

				<div className="p-6 pt-4">
					<div>
						<Link
							href="blog/1"
							className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline">
							I Built A Successful Blog In One Year
						</Link>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Molestie parturient et sem ipsum volutpat vel.
							Natoque sem et aliquam mauris egestas quam volutpat
							viverra. In pretium nec senectus erat. Et malesuada
							lobortis.
						</p>
					</div>

					<div className="mt-4">
						<div className="flex items-center">
							<div className="flex items-center">
								{/* <div className="relative">
									<Image
										fill
										className="object-cover h-10 rounded-full"
										src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
										alt="Avatar"
									/>
								</div> */}
								<Link
									href="#"
									className="mx-2 font-semibold text-gray-700 dark:text-gray-200">
									John Doe
								</Link>
							</div>
							<span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
								21 SEP 2015
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
