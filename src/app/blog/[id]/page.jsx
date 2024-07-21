import Image from "next/image";

const SinglePost = ({ params }) => {
	const { id } = params;

	return (
		<section>
			<div className="container px-6 py-8 mx-auto">
				<h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
					From the blog
				</h1>

				<div className="mt-6 lg:-mx-6 lg:flex lg:items-center">
					<div className="w-full h-72 lg:mx-6 lg:w-1/2 lg:h-96 relative">
						<Image
							fill
							className="object-cover rounded-xl"
							src="https://images.pexels.com/photos/10147934/pexels-photo-10147934.jpeg"
							alt="Article Image"
						/>
					</div>

					<div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
						<p className="text-sm text-blue-400 uppercase">
							21 SEP 2015
						</p>

						<p className="block mt-4 text-2xl font-semibold">
							All the features you want to know
						</p>

						<p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Iure veritatis sint autem nesciunt, laudantium
							quia tempore delect
						</p>

						<h1 className="font-bold text-gray-700 dark:text-gray-200 mt-6">
							Amelia. Anderson
						</h1>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SinglePost;
