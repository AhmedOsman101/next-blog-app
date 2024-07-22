import Link from "next/link";
import Image from "next/image";
import { StringLimit, FormattedDate } from "@/lib/Helpers";

const Card = ({ post }) => {
	return (
		<>
			<div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 grid-rows-[auto_1fr] grid">
				<Link
					href={`blog/${post.id}`}
					className={
						post?.image
							? "relative w-full md:h-48 lg:h-56"
							: "hidden"
					}>
					<Image
						fill
						className="object-cover rounded-t-lg"
						src={post?.image}
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

					<div className="flex items-center gap-3 mt-4">
						<div className="relative h-10 w-10">
							<Image
								fill
								className="object-cover rounded-full"
								src={post.user?.image}
								alt="Avatar"
							/>
						</div>
						<div className="card-footer flex flex-col">
							<p
								className="font-semibold text-gray-700 dark:text-gray-200">
								{post.user.name}
							</p>
							<span className="mx-1 text-xs text-gray-600 dark:text-gray-300 uppercase">
								{FormattedDate(post.created_at)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
