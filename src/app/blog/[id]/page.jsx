import { Post } from "@/db/models/Post";
import { FormattedDate, GenerateTitle } from "@/lib/Helpers";
import Image from "next/image";

export const generateMetadata = async ({ params }) => {
	const { id } = params;

	const post = await Post.find(id);

	return {
		title: GenerateTitle(post.title),
		description: post.body,
	};
};

const SinglePost = async ({ params }) => {
	const { id } = params;

	const post = await Post.find(id);

	return (
		<section className="w-full">
			<div className="px-6 py-8 mx-auto">
				<h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
					From the blog
				</h1>

				<div className="mt-6 lg:-mx-6 lg:flex lg:items-center">
					<div
						className={
							post?.image
								? "w-full h-72 lg:mx-6 lg:w-1/2 lg:h-96 relative"
								: "hidden"
						}>
						<Image
							fill
							className="object-cover rounded-xl"
							src={post?.image}
							alt="Article Image"
						/>
					</div>

					{post && (
						<div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
							<p className="text-sm text-blue-400 uppercase">
								{FormattedDate(post.created_at)}
							</p>

							<p className="block mt-4 text-2xl font-semibold">
								{post.title}
							</p>

							<p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
								{post.body}
							</p>

							<div className="flex items-center gap-3 mt-6">
								<div className="relative h-10 w-10">
									<Image
										fill
										className="object-cover rounded-full"
										src={post.user?.image}
										alt="Avatar"
									/>
								</div>
								<h1 className="font-bold text-gray-700 dark:text-gray-200">
									{post.user.name}
								</h1>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default SinglePost;
