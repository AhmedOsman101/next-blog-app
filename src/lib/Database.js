import DB from "./PrismaConnection";

const prisma = DB.connection;

export const getAllPosts = async () => {
	try {
		const posts = await prisma.post.findMany({
			include: {
				user: true,
			},
		});
		return posts;
	} catch (error) {
		console.log("Failed to fetch posts", error);
	}
};
