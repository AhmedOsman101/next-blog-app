import Card from "@/components/Card";
import axios from "axios";

export const metadata = {
	title: "Blogs Page",
};

const getData = async () => {
	const response = await axios.get("http://localhost:5000/blog");

	return response.data;
};

const Blog = async () => {
	const posts = await getData();
	return (
		<>
			<div className="my-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{posts &&
					posts.map((post) => (
						<Card
							key={post.id}
							post={post}
						/>
					))}
			</div>
		</>
	);
};

export default Blog;
