import Card from "@/components/Card";
import EmptyResource from "@/components/EmptyResource";
import { Post } from "@/db/models/Post";

export const metadata = {
	title: "Blogs Page",
};

const Blog = async () => {
	const posts = await Post.all();

	return (
		<>
			{posts && posts?.length > 0 ? (
				<div className="my-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{posts &&
						posts.map((post) => (
							<Card
								key={post.id}
								post={post}
							/>
						))}
				</div>
			) : (
				<EmptyResource resource={"posts"} />
			)}
		</>
	);
};

export default Blog;
