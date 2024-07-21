import { StringLimit } from "@/lib/Helpers";
import Image from "next/image";
import Link from "next/link";

const Card = ({ post }) => {
	return (
		<>
			<div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 grid-rows-[auto_1fr] grid">
				<Link
					href={`blog/${post.id}`}
					className="relative w-full h-[14.8rem]">
					<Image
						fill
						className="object-scale-down rounded-t-lg"
						src="https://images.pexels.com/photos/10147934/pexels-photo-10147934.jpeg"
						alt="Article Image"
					/>
				</Link>

				<div className="p-6 pt-4 grid card-body">
					<div className="card-title">
						<Link
							href={`blog/${post.id}`}
							className="block mt-2 text-lg font-semibold hover:underline w-fit">
							{StringLimit(post.title, 50)}
						</Link>
					</div>

					<div className="card-content mt-2">
						<p className="text-sm text-gray-600 dark:text-gray-400">
							{StringLimit(post.body, 150)}
						</p>
					</div>

					<div className="card-footer mt-4 flex flex-col">
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
							className="font-semibold text-gray-700 dark:text-gray-200">
							John Doe
						</Link>
						<span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
							21 SEP 2015
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
