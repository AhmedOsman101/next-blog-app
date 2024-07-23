import DB from "./PrismaConnection";

const prisma = DB.connection;

const getAllPosts = async () => {
	try {
		const posts = await prisma.post.findMany({
			include: {
				user: true,
			},
		});
		return posts;
	} catch (error) {
		console.info("Failed to fetch posts");
		throw new Error(error);
	}
};

const getPost = async (id) => {
	try {
		const post = await prisma.post.findUnique({
			where: { id },
			include: {
				user: true,
			},
		});
		return post;
	} catch (error) {
		console.info("Failed to fetch the post");
		throw new Error(error);
	}
};

const createPost = async (data) => {
	try {
		const post = await prisma.post.create({ data });
		return post;
	} catch (error) {
		console.info("Failed to create post");
		throw new Error(error);
	}
};

const getUser = async (id, withPosts = false) => {
	try {
		const user = prisma.user.findUnique({
			where: { id },
			include: {
				Post: withPosts,
			},
		});

		if (!user) {
			throw new Error("User was not found");
		}

		return user;
	} catch (error) {
		console.info("Failed to fetch the user", error);
	}
};

const getAllUsers = async () => {
	try {
		const users = await prisma.user.findMany({});
		return users;
	} catch (error) {
		console.info("Failed to fetch users");
		throw new Error(error);
	}
};

module.exports = {
	getAllPosts,
	getPost,
	createPost,
	getAllUsers,
	getUser,
};
