import Card from "@/components/Card";

export const metadata = {
	title: "Blogs Page",
};

const Blog = () => {
	return (
		<>
			<div className="my-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</>
	);
};

export default Blog;
